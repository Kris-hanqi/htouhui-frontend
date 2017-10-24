<template>
  <div class="amendLoginPwd">
    <h1 class="personalCenterRightTitle">我要提现</h1>
    <div class="amendLoginPwdMsg">
      <ul>
        <li>
          <label>用户名</label>
          <span>xiaohai</span>
        </li>
        <li>
          <label>原密码</label>
          <input type="text" placeholder="请输入原登录密码">
        </li>
        <li>
          <label>新密码</label>
          <input type="text" placeholder="6-16位字母与数字组合">
        </li>
        <li>
          <label>确认密码</label>
          <input type="text" placeholder="再次输入您的新密码">
        </li>
      </ul>
      <button class="submitBtn">提交</button>
    </div>
    <div class="splitLine"></div>
    <div class="warmPrompt">
      <h3>温馨提示</h3>
      <p>请定期更换密码，并确保登录密码的设置与交易密码不同。</p>
    </div>
  </div>
</template>

<style lang="scss">
  .amendLoginPwd {
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

    .amendLoginPwdMsg {
      label {
        display: inline-block;
        width: 110px;
        font-size: 16px;
        line-height: 2.44;
        text-align: right;
        color: #727e90;
      }

      .submitBtn {
        width: 203px;
        height: 46px;
        border-radius: 100px;
        background-color: #378ff6;
        color: #fff;
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
