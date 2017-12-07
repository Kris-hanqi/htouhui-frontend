<template>
  <div class="app-wrapper">
    <hth-header></hth-header>
    <breadcrumb></breadcrumb>
    <div class="main-container">
      idebar
    </div>
  </div>
</template>

<script>
  import HthHeader from 'components/header';
  import { Breadcrumb, Sidebar } from 'views/layout/components'
  
  export default {
    components: {
      HthHeader,
      Breadcrumb,
      Sidebar
    }
  };
</script>

<style lang="scss" scoped>
  .home-wrapper {
    width: 100%;
    margin: 0 auto;
  }
  
  .home-wrapper__breadcrumb {
    margin: 20px 0;
    font-size: 16px;
    color: #274161;
  }
  
  .home-wrapper__account-menu {
    float: left;
  }
  
  .main-container {
    float: right;
    width: 832px;
    
    .prompt-message {
      width: 100%;
      height: 54px;
      margin-bottom: 15px;
      background-color: #fcf8e3;
      line-height: 54px;
      
      span {
        font-size: 14px;
        color: #ce9764;
        margin-left: 9px;
      }
      
      button {
        float: right;
        height: 36px;
        border-color: #ff7900;
        padding: 0 15px;
        border-radius: 100px;
        background-color: #ff7900;
        text-align: center;
        font-size: 16px;
        color: #fff;
        margin-right: 11px;
        margin-top: 10px;
      }
    }
    
    .prompt-ad {
      overflow: hidden;
      width: 832px;
      height: 54px;
      cursor: pointer;
      margin-bottom: 15px;
    }
  }
</style>
