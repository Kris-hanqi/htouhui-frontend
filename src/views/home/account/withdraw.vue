<template>
  <div class="withdraw-wrapper">
    <hth-panel title="我要提现">
      <!-- 显示银行卡 -->
      <bank-card></bank-card>
  
      <!-- 网关交互组件 -->
      <request-bank-from :request-data="requestData"></request-bank-from>
      
      <!-- 获取联行号 -->
      <union-bank :visible="dialogUnionBankVisible" @close="closeUnionBank" @select-union-bank="selectUnionBank"></union-bank>
  
      <!-- 交互表单 -->
      <form class="form-horizontal" style="margin-top: 20px;">
        <div class="form-group">
          <label class="col-md-2 control-label">账户余额</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ accountMoney | currency('') }}元</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">提现金额</label>
          <div class="col-md-5">
            <input type="text"
                   v-model.number="money"
                   class="form-control" placeholder="请输入提现金额">
          </div>
        </div>
        <div class="form-group" v-if="showUnionBankInput">
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
            <p v-if="!money" class="form-control-static">{{ 0 | currency('') }}元</p>
            <p v-else="" class="form-control-static">{{ (commissionCharge || 0) | currency('') }}元</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">到账金额</label>
          <div class="col-md-5">
            <p v-if="!money" class="form-control-static">{{ 0 | currency('') }}元</p>
            <p v-else="" class="form-control-static">{{ (Number(money) - commissionCharge) | currency('') }}元</p>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-offset-2 col-md-4">
            <el-button type="primary"
                       class="btn-block"
                       :disabled="money === '' || this.accountMoney === 0"
                       @click="withdraw"
                       :loading="loading" round>提现</el-button>
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
  import operationalValidate from 'utils/home/operationalValidate';
  import HthPanel from 'common/Panel/index.vue';
  import BankCard from '../components/BackCard.vue';
  import RequestBankFrom from '../components/RequestBankFrom.vue';
  import UnionBank from './components/UnionBank.vue';
  import { fetchWithdraw, fetchWithdrawCost, fetchAccountMoney, fetchAllowLargeWithdraw } from 'api/home/account';
  import { validateNumber } from 'utils/validate';
  
  let allowLargeWithdrawNumber = 0;

  export default {
    components: {
      HthPanel,
      BankCard,
      UnionBank,
      RequestBankFrom
    },
    computed: {
      ...mapGetters([
        'uuid',
        'baseUrl',
        'bankCard',
        'bankName'
      ])
    },
    data() {
      return {
        loading: false,
        total: 0,
        showUnionBankInput: false,
        dialogBankLimitVisible: false,
        dialogUnionBankVisible: false,
        accountMoney: '',
        money: '',
        requestData: {},
        withdrawData: {
          inputMoney: '',
          source: 'pc',
          cnapNumber: '',
          cardNo: '',
          sessionId: '',
          callbackUrl: ''
        },
        commissionCharge: 0,
        operationalValidateData: ['openAccount', 'transactionPassword', 'bankCard']
      }
    },
    watch: {
      money(val) {
        this.getWithdrawCost(val);
      }
    },
    methods: {
      // 提现
      withdraw() {
        const result = operationalValidate(this.operationalValidateData);
        if (!result) return;
        if (this.accountMoney <= 0) {
          this.$message({
            message: '账户余额为0，不能提现',
            type: 'warning'
          });
          return;
        }
        if (!(this.money <= this.accountMoney && this.money > 1)) {
          this.$message({
            message: '提现金额应该在1.01和' + this.accountMoney + '之间',
            type: 'warning'
          });
          return;
        }
        this.withdrawData.cardNo = this.bankCard;
        this.withdrawData.inputMoney = this.money;
        this.withdrawData.sessionId = this.uuid;
        // 大于五万属于大额提现
        if (this.withdrawData.inputMoney >= 50002) {
          // 查看是否允许大额提现
          fetchAllowLargeWithdraw({ money: this.money, cardNo: this.bankCard })
            .then(response => {
              if (response.data.meta.code === 200) {
                // 非第一次大额提现
                if (validateNumber(response.data.data)) {
                  this.showUnionBankInput = true;
                  this.withdrawData.cnapNumber = response.data.data;
                  allowLargeWithdrawNumber++;
                  this.getRequestWithdrawData('large');
                } else {
                  if (response.data.data === 'allow_large_withdraw') {
                    this.showUnionBankInput = true;
                    this.getRequestWithdrawData('large');
                  }
                }
              } else {
                this.$notify.error({
                  title: '提示',
                  message: response.data.meta.message
                });
              }
            });
          return;
        }
        // 普通提现
        this.getRequestWithdrawData();
      },
      getRequestWithdrawData(type) {
        if (type === 'large' && !this.withdrawData.cnapNumber) {
          this.$message({
            message: '大额提现请查询联行号',
            type: 'warning'
          });
          return;
        }
        if (allowLargeWithdrawNumber === 1) return;
        this.loading = true;
        this.withdrawData.inputMoney = this.money;
        this.withdrawData.callbackUrl = this.baseUrl + '/user/home.html';
        fetchWithdraw(this.withdrawData).then(response => {
          if (response.data.meta.code === 200) {
            this.requestData = response.data.data;
          }
          this.loading = false;
        })
      },
      // 获取提现手续费
      getWithdrawCost(val) {
        if (!val) return;
        if (this.accountMoney < val) return;
        this.loading = true;
        fetchWithdrawCost({ money: this.money })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.commissionCharge = response.data.data || 0;
              console.log(this.commissionCharge);
            }
            this.loading = false;
          })
      },
      // 获取账户余额
      getAccountMoney() {
        return fetchAccountMoney()
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
      selectUnionBank(value) {
        if (value) {
          this.withdrawData.cnapNumber = value;
        }
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
    
    .back-card-wrapper {
      margin-left: 20px;
    }
  
    .form-horizontal .control-label {
      width: 120px;
    }
  }
</style>
