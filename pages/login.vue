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
          登录表单
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
    
    .page-login-footer {
      font-size: 12px;
      color: #666;
      padding-top: 30px;
    }
  }
</style>
