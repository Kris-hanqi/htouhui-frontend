<template>
  <div class="register-container">
    <header>
      <div class="hth-container">
        <nuxt-link to="/">
          <i class="ku-icon icon-logo"></i>
        </nuxt-link>
        <p>注册账号</p>
        <div class="login-link">
          <span>已有账号？</span>
          <nuxt-link to="/login">去登录</nuxt-link>
        </div>
      </div>
    </header>
    <div id="nav">
      <div class="nav-2">
      </div>
    </div>
    <div class="register-body hth-container">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form ref="form" label-width="100px">
            <el-form-item label="手机号">
              <el-input placeholder="可用于登录或找回密码"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input placeholder="请设置登录密码"></el-input>
            </el-form-item>
            <el-form-item label="图形验证码" class="captcha">
              <el-input placeholder="请输入图形验证码"></el-input>
              <img class="pass-verifyCode" :src="captchaImgUrl">
              <a @click="changeCaptcha">换一张</a>
            </el-form-item>
            <el-form-item label="手机验证码">
              <el-input placeholder="请输入手机验证码"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
        
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: '海投汇 - 注册'
      }
    },
    data() {
      return {
        captchaVersion: 1
      }
    },
    computed: {
      captchaImgUrl() {
        return `/api/captcha?${this.captchaVersion}` ;
      }
    },
    methods: {
      // 更换验证码
      changeCaptcha() {
        this.captchaVersion++;
      }
    }
  }
</script>

<style lang="scss">
  #nav {
    background: #fff;
  
    .nav-2 {
      height: 20px;
      background: url(../assets/img/hr.png) no-repeat center top;
    }
  }
  .register-container {
    position: relative;
    width: 100%;
    height: 100%;
  
    .el-input__inner {
      border-radius: 0;
    }
    
    header {
      position: relative;
      background: #fff;
      z-index: 2;
      height: 100px;
      line-height: 100px;
      
      p {
        display: inline-block;
        font-size: 16px;
        color: #888;
        margin-left: 10px;
        margin-top: -18px;
        vertical-align: middle;
      }
  
      .icon-logo {
        margin-top: 20px;
        font-size: 55px;
        color: #176ff0;
        display: inline-block;
        border-right: 2px solid #ebeeef;
      }
  
      .register-gyx {
        width: 186px;
        height: 83px;
        padding-left: 10px;
        color: #7f828b;
      }
      
      .login-link {
        float: right;
        color: #666;
      }
    }
    
    .register-body {
      padding-top: 50px;
  
      .captcha {
        .el-input {
          width: 165px;
          float: left;
        }
    
        img {
          width: 110px;
          height: 38px;
          border: 1px solid #DDD;
          float: left;
          margin-left: 5px;
        }
      }
  
      a {
        padding-left: 12px;
        font-size: 12px;
        text-decoration: none;
        line-height: 40px;
        color:  #2e82ff !important;
        float: left;
        cursor: pointer;
      }
    }
  }
</style>
