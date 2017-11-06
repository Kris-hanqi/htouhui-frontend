<template>
  <div id="app">
    <div class="login-wrapper">
      <header class="login-wrapper__header">
        <div class="main-section">
          <div class="logo">
            <a href="./index.html">
              <img :src="img_logo" alt="logo海投汇官网">
            </a>
          </div>
          <div class="register-link fr">
            <span>没有账号？</span>
            <a href="./register.html">免费注册</a>
          </div>
        </div>
      </header>
      <div class="login-wrapper__main-content">
        <div class="main-section">
          <div class="login-from fr">
            <div class="login-from__header">
              <span class="title fl">欢迎登录</span>
              <a class="fr" @click="switchLoginType">
                {{loginType === 0 ? '手机动态密码登录' : '普通登录'}}
            </a>
            </div>
            <div class="login-from__content">
              <form ref="form">
                <div class="from-item">
                  <div class="item-box" v-show="loginType === 0">
                    <i class="icon icon-phone"></i>
                    <input type="text" v-model="loginData.username" placeholder="请输入手机号/用户名">
                  </div>
                </div>
                <div class="from-item">
                  <div class="item-box" v-show="loginType === 0">
                    <i class="icon icon-pwd"></i>
                    <input type="text" v-model="loginData.password" placeholder="请输入密码">
                  </div>
                </div>
                <div class="from-item">
                  <div class="item-box" v-show="loginType === 1">
                    <i class="icon icon-phone"></i>
                    <input type="text" placeholder="请输入手机号">
                  </div>
                </div>
                <div class="from-item">
                  <div class="item-box" v-show="loginType === 1">
                    <i class="icon icon-captcha"></i>
                    <input type="text" class="captcha_input" placeholder="请输入验证码">
                    <button type="button" class="get-captcha-btn">获取验证码</button>
                  </div>
                </div>
                <button type="button" @click="login" class="login-btn">立即登录</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer class="login-wrapper__footer">
        <span>版权所有 © 北京冠城瑞富信息技术有限公司 Copyright Reserved　|　京ICP备15020986</span>
      </footer>
    </div>
  </div>
</template>

<script>
  import { fetchLogin } from 'api/login';
  import { Base64 } from 'js-base64';
  import { setToken } from 'utils/auth';
  import img_logo from 'assets/images/logo.png';
  export default {
    data() {
      return {
        img_logo,
        loginType: 0,
        loginData: {
          username: 'h8982670515',
          password: '123abc'
        }
      }
    },
    methods: {
      // 切换登录方式
      switchLoginType() {
        if (this.loginType) {
          this.loginType = 0;
        } else {
          this.loginType = 1;
        }
      },
      // 用户登录
      login() {
        const data = {};
        data.userPhone = Base64.encode(this.loginData.username);
        data.userPassword = Base64.encode(this.loginData.password);
        fetchLogin(data).then(response => {
          if (response.data.meta.code === 200) {
            setToken(response.data.data.token);
            window.location.href = 'home.html';
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  body {
    background: #f1f1f1;
  }

  .login-wrapper__header {
    position: relative;
    height: 70px;
    background: #fff;
    
    .logo {
      display: inline-block;
      height: 41px;
      margin-top: 15px;
      line-height: 70px;
    }
    
    .register-link {
      height: 70px;
      line-height: 70px;
  
      a {
        color: #2577e3;
        text-decoration: none;
      }
    }
  }
  
  .login-wrapper__main-content {
    position: relative;
    width: 100%;
    height: 550px;
    padding-bottom: 0;
    background-color: #6290f5;
    
    /* background: url(../../assets/images/login/bg.png) no-repeat center top; */
    
    .main-section {
      padding-top: 70px;
    }
    
    .login-from {
      width: 400px;
      padding: 20px;
      background: #fff;
    }
    
    .login-from__header {
      padding: 5px 0;
      
      span {
        font-size: 18px;
      }
      
      a {
        padding-top: 2px;
        font-size: 15px;
        color: #5a5454;
        
        &:hover {
          color: #2577e3;
        }
      }
    }
    
    .login-from__content {
      padding: 30px 0;
      
      .form-item {
        position: relative;
        z-index: 12;
      }
  
      .item-box {
        padding-top: 25px;
        border-bottom: 1px solid rgb(184, 184, 184);
      }
      
      .icon {
        display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 40px;
      }
  
      .icon-phone {
        background: url(../../assets/images/login/icon-phone.png) no-repeat center;
      }
  
      .icon-pwd {
        background: url(../../assets/images/login/icon-pwd.png) no-repeat center;
      }
      
      .icon-captcha {
        background: url(../../assets/images/login/icon-captcha.png) no-repeat center;
      }
  
      .captcha_input {
        width: 250px;
      }
      
      .get-captcha-btn {
        display: inline-block;
        vertical-align: middle;
        width: 112px;
        height: 40px;
        border: none;
        padding: 0;
        background-color: #f0f0f0;
        font-size: 14px;
        color: #606060;
        cursor: pointer;
      }
  
      input {
        width: 365px;
        height: 40px;
        font-size: 14px;
        box-sizing: border-box;
        border: none;
      }
  
      .login-btn {
        display: block;
        width: 100%;
        height: 45px;
        margin-top: 30px;
        background-color: #2875d9;
        border: none;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        cursor: default;
        
        &:hover {
          background-color: #1c64d9;
        }
      }
    }
  }
  
  .login-wrapper__footer {
    padding: 20px 0;
    background: #f5f5f5;
    text-align: center;
  }
</style>
