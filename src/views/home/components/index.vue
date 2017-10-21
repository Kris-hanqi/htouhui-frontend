<template>
  <div class="account-wrapper">
    <div class="account-wrapper__top">
      <i class="iconMy"></i>
      <span>你好，<i class="num-font">某某某</i></span>
      <a href="#" class="iconSmall01"></a>
      <a href="#" class="iconSmall02"></a>
      <button class="withdrawBtn fr">提现</button>
      <button class="rechargeBtn fr">充值</button>
    </div>
  
    <div class="account-wrapper__asset">
      <h1>我的资产</h1>
      <ul class="allAsset">
        <li>
          <p class="txt01">总资产</p>
          <p class="txt02"><i class="num-font">122,390,00</i>元</p>
        </li>
        <li>
          <p class="txt01">累计收益</p>
          <p class="txt02"><i class="num-font">5,390,00</i>元</p>
        </li>
        <li>
          <p class="txt01">冻结金额</p>
          <p class="txt02"><i class="num-font">3,390,00</i>元</p>
        </li>
        <li>
          <p class="txt01">可用余额</p>
          <p class="txt02"><i class="num-font">1,390,00</i>元</p>
        </li>
      </ul>
    </div>
    
    <div>
      
    </div>
   
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: {}
      }
    }
  }
</script>

<style lang="scss">
  .account-wrapper__top {
    width: 100%;
    height: 73px;
    line-height: 73px;
    margin-top: 8px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    
    .iconMy {
      display: inline-block;
      vertical-align: middle;
      width: 42px;
      height: 42px;
      margin: 0 14px 0 27px;
      background: url(../../../assets/images/home/center-ico-06.png) no-repeat;
    }
  
    span {
      font-size: 16px;
      vertical-align: middle;
      color: #394b67;
    }
  
    a.iconSmall01 {
      display: inline-block;
      vertical-align: middle;
      width: 23px;
      height: 21px;
      background: url(../../../assets/images/home/center-ico-07.png) no-repeat;
      margin-left: 40px;
    }
  
    a.iconSmall01:hover {
      background: url(../../../assets/images/home/center-ico-07-hover.png) no-repeat;
    }
  
    a.iconSmall02 {
      display: inline-block;
      vertical-align: middle;
      width: 23px;
      height: 18px;
      background: url(../../../assets/images/home/center-ico-08.png) no-repeat;
      margin-left: 7px;
    }
  
    a.iconSmall02:hover {
      background: url(../../../assets/images/home/center-ico-08-hover.png) no-repeat;
    }
    
    button {
      width: 101px;
      height: 36px;
      border-radius: 100px;
      font-size: 16px;
      box-sizing: border-box;
      margin-top: 19px;
    }
  
    .withdrawBtn {
      background-color: #fff;
      border: solid 1px #378ff6;
      color: #0671f0;
      margin-right: 19px;
    }
  
    .rechargeBtn {
      background-color: #378ff6;
      color: #fff;
      margin-right: 16px;
    }
  }
  
  .account-wrapper__asset {
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
