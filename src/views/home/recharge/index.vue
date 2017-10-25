<template>
  <div class="iNeedRechargeBox fr">
    <h1 class="personalCenterRightTitle">我要充值</h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="快捷充值" name="one">
        <fast-recharge></fast-recharge>
      </el-tab-pane>
      <el-tab-pane label="跨行转账" name="two">
        <alipay-transfer></alipay-transfer>
      </el-tab-pane>
      <el-tab-pane label="支付宝转账" name="there">
        <inter-bank-transfer></inter-bank-transfer>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import FastRecharge from './FastRecharge.vue';
  import AlipayTransfer from './AlipayTransfer1.vue';
  import InterBankTransfer from './InterBankTransfer.vue';
  
  export default {
    components: {
      FastRecharge,
      AlipayTransfer,
      InterBankTransfer
    },
    data() {
      return {
        activeName: 'one'
      };
    }
  }
</script>

<style lang="scss">
  .iNeedRechargeBox {
    width: 832px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    -moz-box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    .personalCenterRightTitle {
      line-height: 1;
      font-size: 20px;
      color: #274161;
      margin-left: 27px;
      padding-top: 20px;
    }

    .tabChangeUl {
      display: block;
      width: 784px;
      height: 51px;
      line-height: 51px;
      background-color: #f6f9fe;
      margin-top: 24px;
      margin-left: 28px;

      li {
        float: left;
        height: 51px;

        a {
          font-size: 18px;
          padding: 0 50px;
          color: #394b67;
        }
      }

      a.activeLi {
        display: inline-block;
        height: 51px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 45px;
        border-top: 3px solid #0573f4;
        color: #0573f4;
        background-color: #fff;
      }
    }

    .noBankCardMsg {
      width: 300px;
      height: 125px;
      border-radius: 11px;
      background-color: #f6f9fe;
      margin-top: 44px;
      margin-left: 54px;
      padding-top: 38px;

      span.addBankCard {
        display: block;
        width: 62px;
        height: 62px;
        margin: 0 auto;
        background: url("../../../assets/images/home/center-recharge-addBankCard.png") no-repeat;
      }

      p.noBankCardTxt {
        font-size: 16px;
        color: #5c6b82;
        text-align: center;
        margin-top: 15px;
      }
    }

    .bankCardMsg {
      width: 300px;
      height: 163px;
      background: url("../../../assets/images/home/group-4.png") no-repeat;
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

        p.remainingSumColor {
          font-size: 14px;
          margin-left: 85px;
        }

        .remainingSumColor {
          color: #ff5f4b;
        }
      }

      li.withdrawBtn {
        margin-top: 20px;
        margin-left: 129px;
        margin-bottom: 43px;

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

    .shortcutRechargeMask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.37);

      .shortcutRechargeMoneyRule {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -365px;
        width: 730px;
        border-radius: 9px;
        background-color: #fff;
        box-shadow: 0 4px 14px 0 #61687b;
        padding-top: 22px;
        padding-bottom: 25px;

        h1 {
          height: 31px;
          line-height: 31px;
          font-size: 22px;
          color: #394b67;
          border-left: 10px solid #0573f4;
          padding-left: 15px;
        }

        p {
          font-size: 14px;
          line-height: 1.29;
          color: #ff4a33;
          margin-left: 24px;
          margin-top: 10px;
        }
      }

      .shortcutRechargeMoneyRule:after {
        display: block;
        content: '';
        position: absolute;
        top: 18px;
        right: 22px;
        width: 40px;
        height: 40px;
        background: url("../../../assets/images/home/shortcut-recharge-closeIcon.png") no-repeat;
      }
    }

    .alipayStep,
    .transferNeedMsg {
      margin-left: 47px;

      p {
        line-height: 1;
        font-size: 16px;
        color: #394b67;
      }

      .transferNeedUl {
        margin-top: 14px;
        margin-bottom: 55px;

        span {
          font-size: 16px;
          line-height: 2.88;
          color: #7c86a2;
        }

        .copyBtn {
          width: 80px;
          height: 32px;
          border: solid 1px #0671f0;
          border-radius: 100px;
          font-size: 14px;
          text-align: center;
          color: #0671f0;
          background-color: #fff;
        }

        .copyBtn:hover {
          background-color: #0671f0;
          color: #fff;
        }
      }

      ul.transferNeedMsgLeft {
        width: 145px;
        text-align: right;
        margin-right: 35px;
      }
    }

    .alipayStep {
      p.step01-txt {
        margin-top: 28px;
      }

      img.step01-img {
        margin-top: 17px;
      }

      p.step02-txt {
        margin-top: 22px;
      }

      img.step02-img {
        margin-top: 11px;
      }

      img {
        margin-left: 34px;
      }

      p.step03-txt {
        margin-top: 15px;
        margin-bottom: 33px;
      }
    }

    .transferNeedMsg {
      p {
        margin-top: 34px;
      }
    }
  }
</style>
