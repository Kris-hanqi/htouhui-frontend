<template>
  <div class="layout-account-container">
    <shortcut></shortcut>
    <hth-header></hth-header>
    <!-- 主区域 -->
    <div class="account-container hth-container">
      <account-breadcrumb></account-breadcrumb>
      <el-row :gutter="20">
        <el-col :span="4">
          <left-menu class="account-left-menu"></left-menu>
        </el-col>
        <el-col :span="20">
          <div class="account-main">
            <nuxt/>
          </div>
        </el-col>
      </el-row>
    </div>
    <hth-footer></hth-footer>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Shortcut from '~/components/Shortcut.vue';
  import HthHeader from '~/components/Header.vue';
  import LeftMenu from '~/components/account/LeftMenu.vue';
  import AccountBreadcrumb from '~/components/account/Breadcrumb.vue';
  import HthFooter from '~/components/Footer.vue';

  const isServer = Vue.prototype.$isServer;
  
  export default {
    components: {
      AccountBreadcrumb,
      Shortcut,
      HthHeader,
      LeftMenu,
      HthFooter
    },
    created() {
      if (!isServer) {
        console.log('加入海投汇，成为一名耐撕的前端工程师。');
        console.log('请将简历发送至 %c xingkang.wang@htouhui.com (邮件标题请以“姓名-前端工程师-来自console”命名)','color:green');
      }
    }
  }
</script>

<style lang="scss">
  .account-container {
    position: relative;
    padding-bottom: 30px;
    
    .account-main {
      padding-bottom: 100px;
      box-sizing: border-box;
    }
  }
</style>
