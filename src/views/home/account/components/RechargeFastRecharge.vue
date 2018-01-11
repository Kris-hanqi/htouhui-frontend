<template>
  <div class="recharge-fast-recharge">

    <!-- 显示银行卡 -->
    <bank-card></bank-card>

    <!-- 银行限额组件 -->
    <bank-limit :visible="dialogBankLimitVisible" @close="closeBankLimit"></bank-limit>

    <!-- 网关交互组件 -->
    <request-bank-from :request-data="requestData"></request-bank-from>

    <!-- 验证用户操作组件 -->
    <operational-validate ref="validateSteps"></operational-validate>

    <!-- 充值表单 -->
    <form class="form-horizontal">
      <div class="form-group">
        <label class="col-md-2 control-label">可用余额</label>
        <div class="col-md-5">
          <p class="form-control-static">{{ balance || 0 | currency('') }}元</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">转入金额</label>
        <div class="col-md-5">
          <input type="text" v-model.number="rechargeData.money" class="form-control" placeholder="请输入充值金额">
        </div>
        <div class="col-md-4">
          <el-button type="text" @click="showBankLimit">(查看银行限额)</el-button>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">支付金额</label>
        <div class="col-md-6">
          <p class="form-control-static">{{ (rechargeData.money <= 0 ? 0 : rechargeData.money) | currency('') }}元</p>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-4">
          <el-button type="primary"
                     class="btn-block"
                     :disabled="rechargeData.money <= 0"
                     @click="getRequestBankData"
                     :loading="loading" round>充值</el-button>
        </div>
      </div>
    </form>
    <div class="split-line"></div>
    <div class="hth-tips">
      <h3>温馨提示</h3>
      <p>1、请在充值前完成江西银行开户及交易密码设置。</p>
      <p>2、为了您的资金安全，江西银行电子账户将采用同卡进出规则，您的账户资金只能提现至已绑定银行卡内，且当您电子账户余额与待收金额同时为零时，才可更换银行卡。</p>
      <p>3、只有您的海投汇注册手机号与您在发卡行预留手机号一致才可使用快捷充值，如果充值失败，建议拨打您发卡行客服电话，咨询是否已开通代收代付、无卡支付或电子支付业务。</p>
      <p>4、请查看快捷支付银行与限额，其他银行卡不支持快捷充值，但可用于提现。如您绑定其他银行卡，也可使用跨行转账或支付宝转账方式充值。</p>
      <p>5、禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。</p>
      <p>6、如果充值金额没有及时到账，请联系客服，400-698-8810。</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { validateMoney } from 'utils/validate';
  import { fetchRecharge, fetchAccountMoney } from 'api/home/account';
  import BankLimit from '../../components/BankLimit.vue';
  import BankCard from '../../components/BackCard.vue';
  import RequestBankFrom from '../../components/RequestBankFrom.vue';
  import OperationalValidate from '../../components/OperationalValidate.vue';
  import { getUuid, setUuid } from 'utils/auth';

  export default {
    computed: {
      ...mapGetters([
        'uuid',
        'baseUrl'
      ])
    },
    components: {
      RequestBankFrom,
      OperationalValidate,
      BankLimit,
      BankCard
    },
    props: {
      type: {
        type: String
      },
      loanId: {
        type: String
      }
    },
    data() {
      return {
        loading: false,
        loadText: '加载数据中...',
        dialogBankLimitVisible: false,
        balance: '',
        commissionCharge: 0,
        requestData: {},
        rechargeData: {
          money: '',
          source: 'pc',
          sessionId: '',
          callbackUrl: this.$store.getters.baseUrl
        }
      }
    },
    methods: {
      showBankLimit() {
        this.dialogBankLimitVisible = true;
      },
      closeBankLimit() {
        this.dialogBankLimitVisible = false;
      },
      getBalance() {
        fetchAccountMoney()
          .then(response => {
            if (response.data.meta.code === 200) {
              this.balance = response.data.data;
            }
          })
      },
      getRequestBankData() {
        // 充值必须 开户、设置交易密码、绑卡
        const validateSteps = ['openAccount', 'transactionPassword', 'bankCard'];
        const result = this.$refs['validateSteps'].validate(validateSteps); // eslint-disable-line
        if (!result) return;
        if (!this.rechargeData.money) {
          this.$message({
            message: '充值金额不能为空或0',
            type: 'warning'
          });
          return;
        }
        if (!validateMoney(this.rechargeData.money)) {
          this.$message({
            message: '充值金额输入不合法，请重新输入',
            type: 'warning'
          });
          return;
        }
        if (this.type && this.type === 'oneKeyJoin' && this.loanId) {
          this.rechargeData.callbackUrl = `${this.baseUrl}/user/home.html#/investment/quantify/oneKeyJoin/${this.loanId}`;
        } else {
          this.rechargeData.callbackUrl = `${this.baseUrl}/user/home.html`;
        }
        this.loading = true;
        if (!this.uuid) {
          setUuid();
          this.rechargeData.sessionId = getUuid();
        } else {
          this.rechargeData.sessionId = this.uuid;
        }
        fetchRecharge(this.rechargeData)
          .then(response => {
            this.loading = false;
            if (response.data.meta.code === 200) {
              this.requestData = response.data.data;
            }
          })
      }
    },
    created() {
      this.getBalance();
    }
  }
</script>

<style lang="scss">
  .recharge-fast-recharge {
    .back-card-wrapper {
      margin: 30px 34px;
    }

    a {
      font-size: 14px;
      color: #4990e2;
    }
  }
</style>
