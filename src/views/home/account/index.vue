<template>
  <div class="account-wrapper">
    <!-- 用户快捷操作工具栏 -->
    <div class="account-wrapper__top">
      <account-top></account-top>
    </div>
  
    <!-- 我的资产 -->
    <div class="account-wrapper__asset">
      <account-asset :data="assetData"></account-asset>
    </div>
    
    <!-- 我的投资 -->
    <div class="account-wrapper__invest">
      <account-invest></account-invest>
    </div>
    
    <!-- 还款日历 -->
    <div class="account-wrapper__repayment-calendar">
      <repayment-calendar></repayment-calendar>
    </div>
  </div>
</template>

<script>
  import { fetchAsset } from '@/api/account';
  import AccountTop from './AccountTop.vue';
  import AccountAsset from './AccountAsset.vue';
  import AccountInvest from './AccountInvest.vue';
  import RepaymentCalendar from './RepaymentCalendar.vue';
  
  export default {
    components: {
      AccountTop,
      AccountAsset,
      AccountInvest,
      RepaymentCalendar
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

<style lang="scss">
  .account-wrapper__top {
    margin-top: 8px;
  }
  
  .account-wrapper__asset {
    margin-top: 16px;
  }

  .account-wrapper__invest {
    margin-top: 16px;
  }
  
  .account-wrapper__repayment-calendar {
    margin-top: 19px;
    margin-bottom: 32px;
  }
</style>
