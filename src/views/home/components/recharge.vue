<template>
  <div class="iNeedRechargeBox fr">
    <h1 class="personalCenterRightTitle">我要充值</h1>
    <ul class="tabChangeUl clearFix">
      <li><a class="activeLi">快捷充值</a></li>
      <li><a>跨行转账</a></li>
      <li><a>支付宝转账</a></li>
    </ul>

    <!--快捷充值-->
    <div class="shortcutRecharge">
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

      <!--弹窗-->
      <div class="shortcutRechargeMask" style="display: none;">
        <div class="shortcutRechargeMoneyRule">
          <h1>支持快捷支付的银行与限额参考表</h1>
          <p>充值限额可参考上表，具体的额度以发卡银行为准。<br />如果您在发卡银行设置的支付额度低于此表额度，以您的设置为准。</p>
        </div>
      </div>
    </div>

    <!--支付宝转账-->
    <div class="alipayTransfer" style="display: none;">
      <div class="alipayStep">
          <p class="step01-txt">步骤一： 点击转账</p>
          <img class="step01-img" src="../../../assets/images/home/center-alipay-step1.png" alt="">
          <p class="step02-txt">步骤二：完成转账</p>
          <img class="step02-img" src="../../../assets/images/home/center-alipay-step1.png" alt="">
          <p class="step03-txt">您可以使用您的银行卡，通过支付宝转账的方式将资金充值到您的江西银行存管帐户（支付宝APP更方便）</p>
      </div>
      <div class="splitLine"></div>
      <div class="transferNeedMsg">
        <p>转账时所需信息如下</p>
        <div class="transferNeedUl clearFix">
          <ul class="transferNeedMsgLeft fl">
            <li>
              <span>收款方姓名</span>
            </li>
            <li>
              <span>收款方帐号</span>
            </li>
            <li>
              <span>收款方开户行</span>
            </li>
          </ul>
          <ul class="transferNeedMsgRight fl">
            <li>
              <span>小海</span>
            </li>
            <li>
              <span>6212461320000006546</span>
              <button class="copyBtn">复制</button>
            </li>
            <li>
              <span>江西银行</span>
              <button class="copyBtn">复制</button>
            </li>
          </ul>
        </div>
        <table class="transferNeedMsgTable" border="0" cellpadding="0" cellspacing="0">
          我是一个table啊
        </table>
      </div>
      <div class="splitLine"></div>
      <div class="warmPrompt">
        <h3>温馨提示</h3>
        <p>1、严禁信用卡充值、套现等行为；</p>
        <p>2、选择支付宝、网银转账方式充值后请在个人中心手动刷新余额；</p>
        <p>3、线下充值流水请在账户概览中的资金查询中查看；</p>
        <p>4、在向电子账户转账过程中，若无法查找到“江西银行”，您可换查“南昌银行”，由于在2015年底中国银监会批复南昌银行吸收合并景德镇市商业银行，更名为江西银行。</p>
        <p>5、在向电子账户转账时，必须为银行借记卡，平台暂不支持存折、信用卡转账。</p>
        <p>6、根据银行收费标准，在转账过程可能会收取费用。平台目前不收取任何手续费。</p>
      </div>
    </div>

    <!--跨行转账-->
    <div class="interBankTransfer" style="display: none;">
      <div class="alipayStep">
        <p class="step01-txt">操作流程（以招商银行为例）</p>
        <img class="step01-img" src="../../../assets/images/home/center-interBank-step.png" alt="">
        <p class="step03-txt">您可以使用您的银行卡，通过支付宝转账的方式将资金充值到您的江西银行存管帐户（支付宝APP更方便）</p>
      </div>
      <div class="splitLine"></div>
      <div class="transferNeedMsg">
        <p>转账时所需信息如下</p>
        <div class="transferNeedUl clearFix">
          <ul class="transferNeedMsgLeft fl">
            <li>
              <span>收款方姓名</span>
            </li>
            <li>
              <span>收款方帐号</span>
            </li>
            <li>
              <span>收款方银行选择</span>
            </li>
            <li>
              <span>收款方开户地</span>
            </li>
            <li>
              <span>收款方开户行</span>
            </li>
          </ul>
          <ul class="transferNeedMsgRight fl">
            <li>
              <span>用户姓名</span>
            </li>
            <li>
              <span>6212461320000256288</span>
              <button class="copyBtn">复制</button>
            </li>
            <li>
              <span>江西银行或城市商业银行</span>
            </li>
            <li>
              <span>江西省南昌市</span>
            </li>
            <li>
              <span>江西银行股份有限公司总行营业部</span>
              <button class="copyBtn">复制</button>
            </li>
          </ul>
        </div>
        <table class="transferNeedMsgTable" border="0" cellpadding="0" cellspacing="0">
          我是一个table啊
        </table>
      </div>
      <div class="splitLine"></div>
      <div class="warmPrompt">
        <h3>温馨提示</h3>
        <p>1、严禁信用卡充值、套现等行为；</p>
        <p>2、选择支付宝、网银转账方式充值后请在个人中心手动刷新余额；</p>
        <p>3、线下充值流水请在账户概览中的资金查询中查看；</p>
        <p>4、在向电子账户转账过程中，若无法查找到“江西银行”，您可换查“南昌银行”，由于在2015年底中国银监会批复南昌银行吸收合并景德镇市商业银行，更名为江西银行。</p>
        <p>5、在向电子账户转账时，必须为银行借记卡，平台暂不支持存折、信用卡转账。</p>
        <p>6、根据银行收费标准，在转账过程可能会收取费用。平台目前不收取任何手续费。</p>
      </div>
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
