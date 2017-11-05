<template>
  <div class="account-wrapper">
    <!-- 用户快捷操作工具栏 -->
    <account-top></account-top>
  
    <!-- 我的资产 -->
    <account-asset :data="assetData"></account-asset>
    
    <!-- 我的投资 -->
    <account-invest></account-invest>
    
    <!-- 还款日历 -->
    <repay-calendar></repay-calendar>
  </div>
</template>

<script>
  import { fetchAsset } from 'api/home/account';
  import AccountTop from './components/AccountTop.vue';
  import AccountAsset from './components/AccountAsset.vue';
  import AccountInvest from './components/AccountInvest.vue';
  import RepayCalendar from './components/RepayCalendar.vue';
  
  export default {
    components: {
      AccountTop,
      AccountAsset,
      AccountInvest,
      RepayCalendar
    },
    data() {
      return {
        dialogVisible: false,
        assetData: { }
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
