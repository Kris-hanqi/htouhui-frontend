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
              <a class="fr" v-on:click="switchLoginType">
                {{loginType === 0 ? '手机动态密码登录' : '普通登录'}}
            </a>
            </div>
            <div class="login-from__content">
              <form ref="form">
                <div class="from-item">
                  <div class="item-box" v-show="loginType === 0">
                    <input type="text" placeholder="请输入用户名/用户名">
                  </div>
                </div>
                <div class="item-box" v-show="loginType === 0">
                  <input type="password" placeholder="请输入密码">
                </div>
                <div class="item-box" v-show="loginType === 1">
                  <input type="text" placeholder="请输入用户名/用户名">
                </div>
                <div class="item-box" v-show="loginType === 1">
                  <input type="text" placeholder="请输入验证码">
                </div>
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
  import img_logo from '@/assets/images/logo.png';
  export default {
    data() {
      return {
        img_logo,
        loginType: 0,
        loginData: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      switchLoginType() {
        if (this.loginType) {
          this.loginType = 0;
        } else {
          this.loginType = 1;
        }
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
      }
    }
    
    .login-from__content {
      padding-top: 30px;
      
      .form-item {
        position: relative;
        z-index: 12;
      }
  
      .item-box {
        padding-top: 10px;
        border-bottom: 1px solid rgb(184, 184, 184);
      }
  
      input {
        width: 340px;
        height: 40px;
        font-size: 14px;
        box-sizing: border-box;
        border: none;
      }
    }
  }
  
  .login-wrapper__footer {
    padding: 20px 0;
    background: #f5f5f5;
    text-align: center;
  }
</style>
