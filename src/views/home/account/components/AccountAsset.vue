<template>
  <div class="account-asset-wrapper">
    <hth-panel title="我的资产">
      <div class="list">
        <div class="item">
          <p class="title">总资产</p>
          <p><i class="num-font">{{ (data.sumCapital || 0) | currency('') }}</i>元</p>
        </div>
        <div class="item">
          <p class="title">累计收益</p>
          <p><i class="num-font">{{ (data.accumulatedIncome || 0) | currency('') }}</i>元</p>
        </div>
        <div class="item">
          <p class="title">冻结金额</p>
          <p><i class="num-font">{{ (data.balance || 0) | currency('') }}</i>元</p>
        </div>
        <div class="item">
          <p class="title">可用余额</p>
          <p><i class="num-font">{{ (data.frozenMoney || 0) | currency('') }}</i>元</p>
        </div>
      </div>
    </hth-panel>
  </div>
</template>

<script>
  import HthPanel from 'common/Panel/index.vue';
  
  export default {
    components: {
      HthPanel
    },
    props: ['data']
  }
</script>

<style lang="scss">
  .account-asset-wrapper {
    .list {
      height: 100%;
      padding-bottom: 25px;
  
      .item {
        display: inline-block;
        width: 24%;
      }
    }
    
    p {
      line-height: 1;
      text-align: center;
      font-size: 14px;
      color: #394b67;
      margin-top: 23px;
  
      i {
        font-size: 26px;
        color: #ff4c35;
      }
      
      &.title {
        font-size: 16px;
        color: #7c86a2;
      }
    }
  }
</style>
