<template>
  <div class="app-wrapper">
    <hth-header></hth-header>
    <div class="main-container">
      <!--<breadcrumb></breadcrumb>-->
      <sidebar class="pull-left" :show-novice-plan="true" :show-loan="true"></sidebar>
      <div class="pull-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import HthHeader from 'components/header';
  import { Sidebar } from 'views/layout/components'
  
  export default {
    components: {
      HthHeader,
      Sidebar
    }
  };
</script>

<style lang="scss">
  .app-wrapper {
    width: 100%;
    margin: 0 auto;
  }
  
  .main-container {
    width: 1000px;
    margin: 0 auto;
    
    .pull-right {
      width: 832px;
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
