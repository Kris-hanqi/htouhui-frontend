<template>
  <div class="withdraw-wrapper">
    <hth-panel title="我要提现">
      <!-- 显示银行卡 -->
      <bank-card></bank-card>
  
      <!-- 银行限额提示 -->
      <bank-limit :visible="dialogBankLimitVisible" @close="closeBankLimit"></bank-limit>
  
      <!-- 网关交互组件 -->
      <request-bank-from :request-data="requestData"></request-bank-from>
      
      <!-- 获取联行号 -->
      <union-bank :visible="dialogUnionBankVisible" @close="closeUnionBank"></union-bank>
  
      <!-- 交互表单 -->
      <form class="form-horizontal" style="margin-top: 20px;">
        <div class="form-group">
          <label class="col-md-2 control-label">账户余额</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ accountMoney | currency('') }}元</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">转入金额</label>
          <div class="col-md-5">
            <input type="text"
                   @blur="getWithdrawCost"
                   v-model.number="withdrawData.inputMoney"
                   class="form-control" placeholder="请输入提现金额">
          </div>
          <div class="col-md-4">
            <p class="form-control-static"><a @click.stop="showBankLimit">(查看银行限额)</a></p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">银行联行号</label>
          <div class="col-md-5">
            <input v-model="withdrawData.cnapNumber"
                   class="form-control" type="text" placeholder="人民银行分配的12位联行号">
          </div>
          <div class="col-md-4">
            <el-button type="info"
                       size="small"
                       @click="openUnionBank" round>查询</el-button>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">手续费</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ (commissionCharge || 0) | currency('') }}元</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">到账金额</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ (Number(withdrawData.inputMoney) - commissionCharge) | currency('') }}元</p>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-offset-2 col-md-4">
            <el-button type="primary"
                       class="btn-block"
                       :disabled="withdrawData.inputMoney === ''"
                       @click="withdraw"
                       :loading="loading" round>充值</el-button>
          </div>
        </div>
      </form>
      <div class="split-line"></div>
      <div class="hth-tips">
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HthPanel from 'common/Panel/index.vue';
  import BankLimit from '../components/BankLimit.vue';
  import BankCard from '../components/BackCard.vue';
  import RequestBankFrom from '../components/RequestBankFrom.vue';
  import UnionBank from './components/UnionBank.vue';
  import { fetchWithdraw, fetchWithdrawCost, fetchAccountMoney, fetchAllowLargeWithdraw } from 'api/home/account';

  export default {
    components: {
      HthPanel,
      BankLimit,
      BankCard,
      UnionBank,
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
        loading: false,
        showUnionBankInput: false,
        dialogBankLimitVisible: false,
        dialogUnionBankVisible: false,
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
      // 提现
      withdraw() {
        this.withdrawData.cardNo = this.bankCard;
        this.withdrawData.sessionId = this.uuid;
        // 大于五万属于大额提现
        if (this.withdrawData.inputMoney > 50000) {
          // 查看是否允许大额提现
          fetchAllowLargeWithdraw({ money: this.withdrawData.inputMoney })
            .then(response => {
              if (response.data.meta.code === 200) {
                if (response.data.meta.data === 'allow_large_withdraw') {
                  this.showUnionBankInput = true;
                  this.getRequestWithdrawData('large');
                }
              } else {
                console.log(response)
              }
            });
          return;
        }
        // 普通提现
        this.getRequestWithdrawData();
      },
      getRequestWithdrawData() {
        fetchWithdraw(this.withdrawData).then(response => {
          if (response.data.meta.code === 200) {
            this.requestData = response.data.data;
          }
        })
      },
      // 获取提现手续费
      getWithdrawCost() {
        if (!this.withdrawData.inputMoney) return;
        if (this.accountMoney < this.withdrawData.inputMoney) {
          this.$message({
            message: '提现金额大于账户余额!',
            type: 'error'
          });
          return;
        }
        this.loading = true;
        if (!this.withdrawData.inputMoney) return;
        fetchWithdrawCost({ money: this.withdrawData.inputMoney })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.commissionCharge = response.data.data || 0;
            }
            this.loading = false;
          })
      },
      // 获取账户余额
      getAccountMoney() {
        fetchAccountMoney()
          .then(response => {
            if (response.data.meta.code === 200) {
              this.accountMoney = response.data.data;
            }
          })
      },
      openUnionBank() {
        this.dialogUnionBankVisible = true;
      },
      closeUnionBank() {
        this.dialogUnionBankVisible = false;
      },
      showBankLimit() {
        this.dialogBankLimitVisible = true;
      },
      closeBankLimit() {
        this.dialogBankLimitVisible = false;
      }
    },
    created() {
      this.getAccountMoney();
    }
  }
</script>

<style lang="scss">
  .withdraw-wrapper {
    width: 832px;
  
    .form-horizontal .control-label {
      width: 120px;
    }
  }
</style>
