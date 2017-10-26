<template>
  <div class="account-asset-wrapper">
    <h1>我的资产</h1>
    <ul class="allAsset">
      <li>
        <p class="txt01">总资产</p>
        <p class="txt02"><i class="num-font">{{ data.sumCapital }}</i>元</p>
      </li>
      <li>
        <p class="txt01">累计收益</p>
        <p class="txt02"><i class="num-font">{{ data.accumulatedIncome }}</i>元</p>
      </li>
      <li>
        <p class="txt01">冻结金额</p>
        <p class="txt02"><i class="num-font">{{ data.balance }}</i>元</p>
      </li>
      <li>
        <p class="txt01">可用余额</p>
        <p class="txt02"><i class="num-font">{{ data.frozenMoney }}</i>元</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['data']
  }
</script>

<style lang="scss">
  .account-asset-wrapper {
    width: 100%;
    height: 191px;
    margin-top: 16px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    
    h1 {
      font-size: 20px;
      line-height: 1;
      color: #274161;
      padding-top: 20px;
      margin-left: 27px;
    }
    
    ul.allAsset li {
      float: left;
      width: 25%;
    }
    
    ul.allAsset li p {
      line-height: 1;
    }
    
    ul.allAsset li p.txt01 {
      font-size: 16px;
      text-align: center;
      color: #7c86a2;
      margin-top: 36px;
    }
    
    ul.allAsset li p.txt02 {
      font-size: 14px;
      color: #394b67;
      text-align: center;
      margin-top: 23px;
    }
    
    ul.allAsset li p.txt02 i {
      font-size: 26px;
      color: #ff4c35;
    }
  }
</style>
