<template>

  <div class="withdraw-wrapper">
    <hth-panel title="我要提现">
      <bank-card></bank-card>

      <ul class="withdrawMsgBox">
        <li>
          <span>账户余额：</span>
          <span><i class="remainingSumColor">{{ accountMoney | currency('') }}</i>元</span>
        </li>
        <li>
          <span>提现金额：</span>
          <input @blur="getWithdrawCost" v-model="withdrawData.inputMoney" type="number">
          <span>元</span>
          <a @click.stop="showBankLimit">(查看银行限额)</a>
        </li>
        <li>
          <span>银行联行号：</span>
          <input type="number" placeholder="人民银行分配的12位联行号">
          <button type="text" @click="dialogTableVisible = true" class="queryBtn">查询</button>
          <el-dialog title="联行号查询" :visible.sync="dialogTableVisible" id="dialog" :top="'65px'">
            <span id="prvince-sp">省份：</span>
            <el-select id="prvinceSelect" v-model="options[0]" @change = "changePrvince">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
          </el-select>
            <span id="city-sp">城市：</span>
            <el-select id="citySelect" v-model="cityOptions[0]" @change="">
              <el-option
                v-for="item in cityOptions"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <span id="keyword-sp">关键词：</span>
            <input id="keywordInput" type="text"><button class="queryAddress">查询</button>
            <el-table :data="gridData">
              <el-table-column property="date" label="序号"></el-table-column>
              <el-table-column property="name" label="联行行号"></el-table-column>
              <el-table-column property="address" label="银行名称"></el-table-column>
              <el-table-column property="address" label="地址"></el-table-column>
              <el-table-column property="address" label="选择"></el-table-column>
            </el-table>
            <button class="cancelBtn">取消</button>
            <button class="confirmBtn">确认</button>
          </el-dialog>
        </li>
        <li>
          <span>手续费：</span>
          <span>{{ commissionCharge | currency('')}} 元</span>
        </li>
        <li>
          <span>到账金额：</span>
          <span>{{ (Number(withdrawData.inputMoney) + commissionCharge) | currency('') }}元</span>
        </li>
        <li class="withdrawBtn">
          <button @click="withdraw">提现</button>
        </li>
      </ul>
      <div class="split-line"></div>
      <div class="warmPrompt">
        <h3>温馨提示</h3>
        <p>1、江西银行电子账户采用同卡进出设置，资金只能提现至您本人充值的银行卡。</p>
        <p>2、如果您填写的提现信息不正确可能会导致提现失败，由此产生的提现费用将不予返还。</p>
        <p>3、实时提现：单笔5万（含5万）以下资金提现，实时到账。</p>
        <p>4、单笔5万以上资金提现，受理时间为工作日9:00-16:45，到账时间为30分钟左右，依据发卡行不同可能略有差异，非受理时间段时，由于人民银行限制，将无法进行大额提现。</p>
        <p>5、首次大额提现时需填写开户银行联行号，请根据我们提供的方式查询后填写。</p>
        <p>6、提现费用每笔1元，到账金额=（提现金额-1元）。</p>
        <p>7、平台禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。</p>
        <p>8、如果提现出现任何疑问，请联系客服，400-698-8810</p>
      </div>
    </hth-panel>

    <bank-limit :visible="dialogBankLimitVisible" @close="closeBankLimit"></bank-limit>

    <request-bank-from :request-data="requestData"></request-bank-from>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HthPanel from 'common/Panel/index.vue';
  import BankLimit from '../components/BankLimit.vue';
  import BankCard from '../components/BackCard.vue';
  import RequestBankFrom from '../components/RequestBankFrom.vue';
  import { fetchWithdraw, fetchWithdrawCost, fetchAccountMoney, fetchPrvince, fetchCity } from 'api/home/account';

  export default {
    components: {
      HthPanel,
      BankLimit,
      BankCard,
      RequestBankFrom
    },
    computed: {
      ...mapGetters([
        'uuid',
        'bankCard',
        'bankName'
      ])
    },
    data() {
      return {
        options: [],
        changeprovice: '',
        cityOptions: [],
        gridData: [],
        dialogTableVisible: false,
        dialogBankLimitVisible: false,
        accountMoney: '',
        requestData: {},
        withdrawData: {
          inputMoney: '',
          source: 'pc',
          cnapNumber: '',
          cardNo: '',
          sessionId: ''
        },
        commissionCharge: 0
      }
    },
    methods: {
      withdraw() {
        this.withdrawData.cardNo = this.bankCard;
        this.withdrawData.sessionId = this.uuid;
        // 大于五万属于大额提现
        if (this.withdrawData.inputMoney > 50000) {
          console.log(this.withdrawData.inputMoney);
        }
        fetchWithdraw(this.withdrawData).then(response => {
          if (response.data.meta.code === 200) {
            this.requestData = response.data.data;
          }
        })
      },
      getWithdrawCost() { // 获取提现手续费
        if (!this.withdrawData.inputMoney) return;
        fetchWithdrawCost({ money: this.withdrawData.inputMoney })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.commissionCharge = response.data.data || 0;
            }
          })
      },
      getAccountMoney() {
        fetchAccountMoney()
          .then(response => {
            if (response.data.meta.code === 200) {
              this.accountMoney = response.data.data;
            }
          })
      },
      showBankLimit() {
        this.dialogBankLimitVisible = true;
      },
      closeBankLimit() {
        this.dialogBankLimitVisible = false;
      },
      createdFetchPrvince() {
        fetchPrvince().then(response => {
          if (response.data.meta.code === 200) {
            this.options = response.data.data;
          }
        })
      },
      changePrvince(prvincedata) {
        console.log(prvincedata)
        fetchCity({ province: prvincedata })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.cityOptions = response.data.data
            }
          })
      }
    },
    created() {
      this.getAccountMoney();
      this.createdFetchPrvince();
    }
  }
</script>

<style lang="scss">

  .withdraw-wrapper {
    width: 832px;

    .el-dialog {
      width: 747px;
      height: 372px;
    }

    .el-dialog__wrapper {
      overflow: hidden;
      left: 200px;
      top: 200px;
    }

    .el-dialog__body {
      padding-top: 5px;
      padding-right: 0;
    }

    #prvinceSelect {
      width: 102px;
      height: 26px;
    }

    #prvince-sp {
      font-size: 14px;
    }

    #city-sp {
      font-size: 14px;
      margin-left: 24px;
    }

    .el-select .el-input .el-select__caret {
      line-height: 43px;
    }

    #keywordInput {
      width: 200px;
      height: 30px;
    }

    #citySelect {
      width: 102px;
      height: 26px;
    }

    .queryAddress {
      display: inline-block;
      width: 65px;
      height: 26px;
      border-radius: 100px;
      background: #0671f0;
      color: white;
      margin-left: 20px;
    }

    .el-table--enable-row-hover {
      width: 688px;
      margin-top: 31px;
    }

    #keyword-sp {
      font-size: 14px;
      margin-left: 24px;
    }

    .cancelBtn {
      width: 120px;
      height: 40px;
      border-radius: 100px;
      background-color: #fff;
      border: solid 1px #979797;
      font-family: SourceHanSansCN;
      font-size: 18px;
      text-align: center;
      color: #9b9b9b;
      margin-left: 238px;
      margin-top: 57px;
    }

    .confirmBtn {
      width: 120px;
      height: 40px;
      border-radius: 100px;
      font-family: SourceHanSansCN;
      font-size: 18px;
      text-align: center;
      background-color: #378ff6;
      color: #fff;
      margin-left: 22px;
      margin-top: 57px;
    }

    .bankCardMsg {
      width: 300px;
      height: 163px;
      background: url(../../../assets/images/home/group-4.png) no-repeat;
      margin-left: 54px;

      p {
        color: #fff;
      }

      p.bankName {
        font-size: 20px;
        margin-left: 62px;
        padding-top: 15px;
      }

      p.bankNum {
        font-size: 26px;
        margin-top: 44px;
        margin-left: 37px;
      }
    }

    .withdrawMsgBox {
      margin-top: 10px;

      li {
        margin-left: 59px;

        span {
          font-size: 16px;
          line-height: 3.75;
          color: #394b67;
        }

        input {
          width: 249px;
          height: 38px;
          background-color: #fff;
          border: solid 1px #bfc1c4;
        }

        .queryBtn {
          width: 97px;
          height: 34.6px;
          background-color: #378ff6;
          border-radius: 100px;
          color: #fff;
        }

        a {
          font-size: 14px;
          color: #4990e2;
        }

        .remainingSumColor {
          color: #ff5f4b;
        }
      }

      li.withdrawBtn {
        margin-left: 129px;
        margin-bottom: 64px;

        button {
          width: 203px;
          height: 51px;
          border-radius: 100px;
          background-color: #378ff6;
          font-size: 18px;
          text-align: center;
          color: #fff;
        }
      }
    }

    .warmPrompt {
      margin-top: 25px;
      padding-bottom: 40px;

      h3 {
        font-size: 16px;
        line-height: 1;
        color: #394b67;
        margin-left: 59px;
        margin-bottom: 15px;
      }

      p {
        font-size: 14px;
        line-height: 1.79;
        color: #727e90;
        margin-left: 76px;
        margin-right: 68px;
      }
    }
  }
</style>
