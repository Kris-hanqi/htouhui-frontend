<template>
  <div class="login-container">
    <header>
      <div class="hth-container">
        <nuxt-link to="/">
          <i class="ku-icon icon-logo"></i>
        </nuxt-link>
        <div class="logo-gyx">
          <img src="../assets/img/login/subtitle.png">
        </div>
      </div>
    </header>
    <section class="page-login-body">
      <div class="hth-container">
        <el-card class="login-panel">
          <div class="login-form-head">
            <p class="text">{{ loginTypeTextMap[loginType] }}</p>
          </div>
          <div class="login-form-body">
            <el-form ref="form" label-width="0px">
              <el-form-item>
                <el-input placeholder="手机/用户名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item class="captcha">
                <el-input placeholder="验证码"></el-input>
                <img class="pass-verifyCode" :src="captchaImgUrl">
                <a class="login-link" @click="changeCaptcha">换一张</a>
              </el-form-item>
              <el-form-item style="margin-bottom: 0;" class="login-button">
                <el-button @click="login" type="primary">登录</el-button>
              </el-form-item>
              <div>
                <nuxt-link class="login-link" style="padding-left: 0;" to="/forgotPassword">忘记密码？</nuxt-link>
                <a @click="changeLoginType('sms')" class="login-link float-right">短信快捷登录</a>
              </div>
            </el-form>
          </div>
          <div class="login-form-footer">
            <el-button type="text float-right">
              <nuxt-link to="/register">立即注册</nuxt-link>
            </el-button>
          </div>
        </el-card>
      </div>
    </section>
    <footer class="page-login-footer">
      <div class="hth-container">
        <div class="text-center">市场有风险，投资需谨慎</div>
        <div class="text-center">版权所有 © 北京冠城瑞富信息技术有限公司 Copyright Reserved&nbsp;&nbsp;|&nbsp;&nbsp;京ICP证B2-20171701号</div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: '海投汇 - 用户登录'
      }
    },
    data() {
      return {
        loginType: 'username', // 登录方式: 用户名密码(username)、短信快捷方式(sms)、扫码方式(verifyCode)
        loginTypeTextMap: {
          username: '用户名密码登录',
          sms: '短信快捷登录',
          verifyCode: '扫码登录'
        },
        user: {
        
        },
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
      },
      // 切换登录类型
      changeLoginType(type) {
        if (!type) return;
        this.loginType = type;
        console.log(this.loginType);
      },
      login() {
        this.$store.dispatch('LoginByMobile', this.user)
          .then(data => {
            console.log(data);
          })
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    header {
      background: #fff;
      position: relative;
      z-index: 2;
      height: 100px;
      line-height: 100px;
      font-size: 0;
    }
    
    .icon-logo {
      float: left;
      margin-top: 20px;
      font-size: 55px;
      color: #176ff0;
      border-right: 2px solid #ebeeef;
    }
  
    .logo-gyx {
      width: 186px;
      height: 83px;
      float: left;
      padding-left: 10px;
    }
  
    .page-login-body {
      height: 480px;
      background: url(../assets/img/login/login-bg.jpg) center no-repeat;
      position: relative;
      -webkit-font-smoothing: subpixel-antialiased;
  
      .login-panel {
        position: absolute;
        border-radius: 0;
        min-height: 330px;
        background: #fff;
        width: 350px;
        top: 60px;
        right: 60px;
      }
    }
  
    .el-card__body {
      padding: 0;
    }
  
    .el-input__inner {
      border-radius: 0;
    }
    
    .login-form-head {
      font-size: 16px;
      padding: 0 20px;
      height: 46px;
      color: #000;
      
      p.text {
        padding: 20px 0 10px 0;
      }
    }
    
    .captcha {
      .el-input {
        width: 130px;
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
  
    a.login-link {
      padding-left: 12px;
      font-size: 12px;
      text-decoration: none;
      line-height: 40px;
      color:  #2e82ff !important;
      float: left;
      cursor: pointer;
    }
    
    .login-form-body {
      padding: 20px;
      
      .login-button button {
        width: 100%;
        border-radius: 0;
      }
    }
    
    .login-form-footer {
      position: relative;
      color: #2e82ff;
      margin-top: 30px;
      height: 50px;
      line-height: 50px;
      background: #f0f6ff;
      padding: 0 20px;
      
      button {
        margin-top: 5px;
      }
    }
    
    .page-login-footer {
      font-size: 12px;
      color: #666;
      padding-top: 30px;
    }
  }
</style>
