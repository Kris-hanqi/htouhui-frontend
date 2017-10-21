<template>
  <div class="iNeedRechargeBox fr">
    <h1 class="personalCenterRightTitle">我要充值</h1>
    <ul class="tabChangeUl clearFix">
      <li><a class="activeLi">快捷充值</a></li>
      <li><a>跨行转账</a></li>
      <li><a>支付宝转账</a></li>
    </ul>
    <div class="bankCardMsg">
      <p class="bankName">兴业银行</p>
      <p class="roboto-regular bankNum">6229 **** **** 3126</p>
    </div>
    <ul class="withdrawMsgBox">
      <li>
        <span>账户余额：</span>
        <span><i class="remainingSumColor">5,390,00</i>元</span>
      </li>
      <li>
        <span>提现金额：</span>
        <input type="text">
        <span>元</span>
        <a href="#">(查看银行限额)</a>
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
        <button>查询</button>
      </li>
    </ul>
    <div class="splitLine"></div>
    <div class="warmPrompt">
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
  }
</style>
