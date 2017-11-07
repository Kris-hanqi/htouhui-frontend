<template>
  <div class="shortcutRecharge">
    <!--未绑卡-->
    <div class="noBankCardMsg" v-if="!bankCard">
      <span class="addBankCard"></span>
      <p class="noBankCardTxt">您暂未绑定银行卡</p>
    </div>

    <!--已绑卡-->
    <div class="bankCardMsg" v-else>
      <p class="bankName">兴业银行</p>
      <p class="roboto-regular bankNum">{{ bankCard }}</p>
    </div>

    <!-- 银行限额组件 -->
    <bank-limit :visible="dialogBankLimitVisible" @close="closeBankLimit"></bank-limit>

    <ul class="withdrawMsgBox">
      <li>
        <span>账户余额：</span>
        <span><i class="remainingSumColor">{{ balance | currency('') }}</i>元</span>
      </li>
      <li>
        <span>转入金额：</span>
        <input @blur="getBalanceCost" v-model="rechargeData.money" type="text">
        <span>元</span>
        <a @click.stop="showBankLimit">(查看银行限额)</a>
      </li>
      <li>
        <p class="remainingSumColor">中信银行每笔限额单笔5万，单日5万<br />大额充值请选择跨行转账或支付宝转账</p>
      </li>
      <li>
        <span>充值费用：</span>
        <span>0.00元</span>
      </li>
      <li>
        <span>支付金额：</span>
        <span>0.00元</span>
      </li>
      <li class="withdrawBtn">
        <button @click="getRequestBankData">充值</button>
      </li>
    </ul>
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
  import { fetchRecharge, fetchBalance, fetchBalanceCost } from 'api/home/account';
  import BankLimit from '../../components/BankLimit.vue';
  import RequestBankFrom from '../../components/RequestBankFrom.vue';

  export default {
    computed: {
      ...mapGetters([
        'bankCard',
        'uuid'
      ])
    },
    components: {
      RequestBankFrom,
      BankLimit
    },
    data() {
      return {
        dialogBankLimitVisible: false,
        balance: '',
        requestData: {},
        rechargeData: {
          money: '',
          source: 'pc',
          sessionId: '',
          callbackUrl: 'http://localhost:9600/home.html#/recharge'
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
        fetchBalance()
          .then(response => {
            if (response.data.meta.code === 200) {
              this.balance = response.data.data;
            }
          })
      },
      getBalanceCost() {
        if (!this.rechargeData.money) return;
        fetchBalanceCost({ rechargeMoney: this.rechargeData.money })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.balance = response.data.data;
            }
          })
      },
      getRequestBankData() {
        if (!this.rechargeData.money) return;
        this.rechargeData.sessionId = this.uuid;
        fetchRecharge(this.rechargeData)
          .then(response => {
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
