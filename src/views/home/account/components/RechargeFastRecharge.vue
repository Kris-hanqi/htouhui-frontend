<template>
  <div class="recharge-fast-recharge">
    
    <!-- 显示银行卡 -->
    <bank-card></bank-card>
    
    <!-- 银行限额组件 -->
    <bank-limit :visible="dialogBankLimitVisible" @close="closeBankLimit"></bank-limit>
  
    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label">账户余额</label>
        <div class="input-block">
          <div class="form-control-static">{{ balance | currency('') }}元</div>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">转入金额</label>
        <div class="input-block">
          <el-col :span="11">
            <input style="width: 285px;" v-model="rechargeData.money" class="form-control" type="text" placeholder="请输入充值金额">
          </el-col>
          <el-col :span="11" style="line-height: 45px">
            <span>元</span>
            <a @click.stop="showBankLimit">(查看银行限额)</a>
          </el-col>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">支付金额</label>
        <div class="input-block">
          <div class="form-control-static">{{ (rechargeData.money || 0) | currency('') }}元</div>
        </div>
      </div>
      <div class="form-group">
        <div class="input-block">
          <el-button type="primary"
                     @click="getRequestBankData"
                     :loading="loading" round
                     style="width: 180px;">充值</el-button>
        </div>
      </div>
    </form>
    
    <div class="split-line"></div>
    <div class="warmPrompt">
      <h3>温馨提示</h3>
      <p>1、请在充值前完成江西银行开户及交易密码设置。</p>
      <p>2、为了您的资金安全，江西银行电子账户将采用同卡进出规则，您的账户资金只能提现至已绑定银行卡内，且当您电子账户余额与待收金额同时为零时，才可更换银行卡。</p>
      <p>3、只有您的海投汇注册手机号与您在发卡行预留手机号一致才可使用快捷充值，如果充值失败，建议拨打您发卡行客服电话，咨询是否已开通代收代付、无卡支付或电子支付业务。</p>
      <p>4、请查看快捷支付银行与限额，其他银行卡不支持快捷充值，但可用于提现。如您绑定其他银行卡，也可使用跨行转账或支付宝转账方式充值。</p>
      <p>5、禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。</p>
      <p>6、如果充值金额没有及时到账，请联系客服，400-698-8810。</p>
    </div>
  
    <request-bank-from :request-data="requestData"></request-bank-from>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { fetchRecharge, fetchAccountMoney } from 'api/home/account';
  import { getLocationUrl } from 'utils/index';
  import BankLimit from '../../components/BankLimit.vue';
  import BankCard from '../../components/BackCard.vue';
  import RequestBankFrom from '../../components/RequestBankFrom.vue';

  export default {
    computed: {
      ...mapGetters([
        'uuid'
      ])
    },
    components: {
      RequestBankFrom,
      BankLimit,
      BankCard
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
          callbackUrl: getLocationUrl() + '/user/home.html#/account/recharge'
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
        if (!this.rechargeData.money) return;
        if (this.rechargeData.money > this.balance) {
          this.$notify({
            title: '警告',
            message: '账户余额不足',
            type: 'error'
          });
          return;
        }
        this.loading = true;
        this.rechargeData.sessionId = this.uuid;
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
