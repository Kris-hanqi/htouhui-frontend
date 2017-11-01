<template>
  <div class="amendLoginPwd">
    <h1 class="personalCenterRightTitle">修改登录密码</h1>
    <div class="amendLoginPwdMsg">
      <ul>
        <li>
          <label>用户名</label>
          <span class="amendLoginName">xiaohai</span>
        </li>
        <li>
          <label>原密码</label>
          <input type="text" placeholder="请输入原登录密码">
        </li>
        <li>
          <i class="dangerousIcon"></i>
          <span class="dangerousTxt">密码不可以为空</span>
        </li>
        <li>
          <label>新密码</label>
          <input type="text" placeholder="6-16位字母与数字组合">
        </li>
        <li>
          <i class="dangerousIcon"></i>
          <span class="dangerousTxt">新密码不可以为空</span>
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
    height: 797px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    -moz-box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    .personalCenterRightTitle {
      line-height: 1;
      font-size: 20px;
      color: #274161;
      margin-left: 27px;
      padding-top: 21px;
      margin-bottom: 30px;
    }

    .amendLoginPwdMsg {
      li:first-child {
        margin-bottom: 20px;
      }

      label {
        display: inline-block;
        vertical-align: middle;
        width: 110px;
        font-size: 16px;
        line-height: 1;
        text-align: right;
        color: #727e90;
      }

      input {
        width: 252px;
        height: 54px;
        background-color: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: solid 1px #bfc1c4;
        padding-left: 14px;
        margin-left: 10px;
      }

      input::-webkit-input-placeholder { color: #aab2c9; }

      :-moz-placeholder { color: #aab2c9; }

      ::-moz-placeholder { color: #aab2c9; }

      :-ms-input-placeholder { color: #aab2c9; }

      i.dangerousIcon {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 18px;
        margin: 10px 5px 10px 132px;
        background: url("../../../assets/images/home/center-ico-dangerous.png") no-repeat;
      }

      span.amendLoginName {
        margin-left: 20px;
        font-size: 16px;
        color: #394b67;
      }

      span.dangerousTxt {
        font-size: 14px;
        color: #ff7900;
      }

      .submitBtn {
        width: 203px;
        height: 46px;
        border-radius: 100px;
        background-color: #378ff6;
        color: #fff;
        margin-left: 152px;
        margin-top: 33px;
        margin-bottom: 39px;
        font-size: 18px;
        cursor: pointer;
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
