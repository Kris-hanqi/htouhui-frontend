<template>
  <div class="account-wrapper">
    <!-- 用户快捷操作工具栏 -->
    <top></top>
  
    <!-- 我的资产 -->
    <asset :data="assetData"></asset>
    
    <!-- 我的投资 -->
    <invest></invest>
    
    <!-- 还款日历 -->
    <repay-calendar></repay-calendar>
  </div>
</template>

<script>
  import { fetchAsset } from 'api/home/account';
  import Top from './components/Top.vue';
  import Asset from './components/Asset.vue';
  import Invest from './components/Invest.vue';
  import RepayCalendar from './components/RepayCalendar.vue';
  
  export default {
    components: {
      Top,
      Asset,
      Invest,
      RepayCalendar
    },
    data() {
      return {
        assetData: {}
      }
    },
    methods: {
      // 获取我的资产数据
      getAsset() {
        fetchAsset().then(response => {
          if (response.data.meta.code === 200) {
            this.assetData = response.data.data;
          }
        })
      }
    },
    created() {
      this.getAsset();
    }
  }
</script>
