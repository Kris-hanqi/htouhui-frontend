<template>
  <div class="account-wrapper">
    <!-- 用户快捷操作工具栏 -->
    <account-top></account-top>
  
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
      <repay-calendar></repay-calendar>
    </div>
  </div>
</template>

<script>
  import { fetchAsset } from '@/api/home/account';
  import AccountTop from './AccountTop.vue';
  import AccountAsset from './AccountAsset.vue';
  import AccountInvest from './AccountInvest.vue';
  import RepayCalendar from './RepayCalendar.vue';
  import 'flatpickr/dist/l10n/zh.js';
  
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

<style lang="scss">
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
