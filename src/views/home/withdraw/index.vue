<template>
  <div class="iNeedWithdrawBox fr">
    <h1 class="personalCenterRightTitle">我要提现</h1>
    <div class="bankCardMsg">
      <p class="bankName">{{ bankName || '无' }}</p>
      <p class="roboto-regular bankNum">{{ bankCard || '无' }}</p>
    </div>
    <ul class="withdrawMsgBox">
      <li>
        <span>账户余额：</span>
        <span><i class="remainingSumColor">5,390,00</i>元</span>
      </li>
      <li>
        <span>提现金额：</span>
        <input v-model="withdrawData.inputMoney" type="text">
        <span>元</span>
        <a href="javascript:void(0)" @click="showBankLimit">(查看银行限额)</a>
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
        <button @click="withdraw">提现</button>
      </li>
    </ul>
    <div class="splitLine"></div>
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
  
    <bank-limit :visible="dialogBankLimitVisible" @close="closeBankLimit"></bank-limit>
  
    <request-bank-from :request-data="requestData"></request-bank-from>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import BankLimit from '../components/BankLimit.vue';
  import RequestBankFrom from '../components/RequestBankFrom.vue';
  import { fetchWithdraw } from 'api/home/account';
  
  export default {
    components: {
      BankLimit,
      RequestBankFrom
    },
    computed: {
      ...mapGetters([
        'bankCard',
        'bankName'
      ])
    },
    data() {
      return {
        dialogBankLimitVisible: false,
        requestData: {},
        withdrawData: {
          inputMoney: '',
          source: 'pc',
          cnapNumber: '',
          cardNo: '',
          sessionId: 'YDADAVDAVDJAVDJAVJ001212'
        }
      }
    },
    methods: {
      withdraw() {
        this.withdrawData.cardNo = this.bankCard;
        fetchWithdraw(this.withdrawData).then(response => {
          if (response.data.meta.code === 200) {
            this.requestData = response.data.data;
          }
        })
      },
      showBankLimit() {
        this.dialogBankLimitVisible = true;
      },
      closeBankLimit() {
        this.dialogBankLimitVisible = false;
      }
    }
  }
</script>

<style lang="scss">
  .iNeedWithdrawBox {
    width: 832px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    .personalCenterRightTitle {
      line-height: 1;
      font-size: 20px;
      color: #274161;
      margin-left: 27px;
      padding-top: 20px;
    }

    .bankCardMsg {
      width: 300px;
      height: 163px;
      background: url(../../../assets/images/home/group-4.png) no-repeat;
      margin-top: 45px;
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

    .splitLine {
      width: 759px;
      height: 3px;
      border-top: dashed 1px #aab2c9;
      border-bottom: dashed 1px #aab2c9;
      margin-left: 39px;
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
