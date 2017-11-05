<template>
  <div class="amendLoginPwd">
    <h1 class="personalCenterRightTitle">修改绑定手机号</h1>
    <div class="amendLoginPwdMsg">
      <ul>
        <li>
          <label>用户名</label>
          <span class="amendLoginName">{{ realName }}</span>
        </li>
        <li>
          <label>手机号</label>
          <span class="amendLoginName">{{ mobile }}</span>
        </li>
        <li class="marginTop">
          <label>验证码</label>
          <input type="text" placeholder="请输入验证码">
          <sms-timer @run="sendCode"></sms-timer>
        </li>
      </ul>
      <p class="yzmCodeSent">校验码已发出，请注意查收短信，如果没有收到，你可以在60秒后要求系统重新发送</p>
      <button class="submitBtn">提交</button>
    </div>
    <div class="splitLine"></div>
    <div class="warmPrompt">
      <h3>温馨提示</h3>
      <p>为了您的账户安全，更换手机号码需填写原来绑定的手机号验证码。</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { fetchSendCode } from 'api/public';
  import { fetchCheckCurrentMobile } from 'api/home/account-set';
  import SmsTimer from 'common/sms-timer';
  
  export default {
    components: {
      SmsTimer
    },
    computed: {
      ...mapGetters([
        'realName',
        'mobile'
      ])
    },
    data() {
      return {}
    },
    methods: {
      sendCode() {
        fetchSendCode({ authType: 'change_binding_mobile_number' })
          .then(response => {
            console.log(response);
          })
      },
      checkCurrentMobile() {
        fetchCheckCurrentMobile()
          .then(response => {
            console.log(response);
          })
      }
    }
  }
</script>

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

      li.marginTop {
        margin-top: 18px;
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
        background: url(../../../../assets/images/home/center-ico-dangerous.png) no-repeat;
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

      p.yzmCodeSent {
        font-size: 14px;
        color: #838d9d;
        margin-left: 124px;
        margin-top: 14px;
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

      .getYzmCode {
        height: 46px;
        border-radius: 100px;
        background-color: #dfe8f0;
        font-size: 16px;
        text-align: center;
        padding: 0 20px;
        color: #7c86a2;
        margin-left: 15px;
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
