<template>
  <div class="login-wrapper">
    <header class="login-wrapper__header">
      <div class="main-section">
        <a class="logo" href="./index.html">
          <img :src="img_logo" alt="logo海投汇官网">
        </a>
        <div class="register-link fr">
          <span>没有账号？</span>
          <a href="./register.html">免费注册</a>
        </div>
      </div>
    </header>
    <div class="login-wrapper__main-content">
    
    </div>
    <footer class="login-wrapper__footer">
       <span>版权所有 © 北京冠城瑞富信息技术有限公司 Copyright Reserved　|　京ICP备15020986</span>
    </footer>
  </div>
</template>

<script>
  import img_logo from '@/assets/images/logo.png';
  export default {
    data() {
      return {
        img_logo
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
    line-height: 70px;
    background: #fff;
    
    .logo {
      display: inline-block;
      width: 149px;
      height: 41px;
      margin-top: 15px;
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
    height: 500px;
    padding-bottom: 0;
    background: url(../../assets/images/login/bg.png) no-repeat center top;
  }
  
  .login-wrapper__footer {
    padding: 20px 0;
    background: #f5f5f5;
    text-align: center;
  }
</style>
