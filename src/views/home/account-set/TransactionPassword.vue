<template>
  <div class="transaction-password-wrapper">
    <h1>设置交易密码</h1>
    <el-form ref="transactionPassword" label-width="80px">
      <el-form-item label="手机号码">
        <span class="phone">{{ '1777******' }}</span>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="transactionPassword.code" placeholder="请输入验证码"></el-input>
        <sms-timer style="float: right; margin-top: -50px;" @run="sendCode"></sms-timer>
      </el-form-item>
    </el-form>
    <p class="yzmCodeSent">校验码已发出，请注意查收短信，如果没有收到，你可以在60秒后要求系统重新发送</p>
    <button class="submitBtn">下一步</button>
    <div class="splitLine"></div>
    <div class="warmPrompt">
      <h3>温馨提示</h3>
      <p>1、设置交易密码需获取手机验证码。</p>
      <p>2、提交手机验证码后会跳转至江西银行存管页面，为了保障你的资金安全，请定期更换你的密码，并确保登录设置与交易密码不同。</p>
    </div>
  </div>
</template>

<script>
  import SmsTimer from '@/common/sms-timer';
  export default {
    components: {
      SmsTimer
    },
    data() {
      return {
        transactionPassword: {
          code: '1234'
        }
      }
    },
    methods: {
      sendCode() {
        console.log('发送验证码');
      }
    }
  }
</script>

<style lang="scss">
  .transaction-password-wrapper {
    width: 832px;
    height: 797px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    h1 {
      line-height: 1;
      font-size: 20px;
      color: #274161;
      margin-left: 27px;
      padding-top: 21px;
      margin-bottom: 30px;
    }
    
    span.phone {
      padding-left: 15px;
      font-size: 16px;
      color: #394b67;
    }
    
    .el-form {
      width: 480px;
      padding-left: 40px;
      
      input {
        width: 252px;
        height: 54px;
        margin-top: -5px;
        background-color: #fff;
        box-sizing: border-box;
        border: solid 1px #bfc1c4;
        padding-left: 14px;
        margin-left: 10px;
      }
    }
    
    .el-form-item__label {
      font-size: 16px;
      color: #727e90;
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
