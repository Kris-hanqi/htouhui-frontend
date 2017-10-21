<template>
  <div class="account-wrapper">
    <div class="account-wrapper__top">
      <i class="iconMy"></i>
      <span>你好，<i class="num-font">某某某</i></span>
      <a href="#" class="icon-user"></a>
      <a href="#" class="icon-bank-card"></a>
      <el-button :plain="true" type="primary" class="recharge-btn">充值</el-button>
      <el-button type="primary" class="withdraw-btn">提现</el-button>
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
    
    .recharge-btn {
      float: right;
      margin-top: 19px;
      margin-right: 16px;
    }
    
    .iconMy {
      display: inline-block;
      vertical-align: middle;
      width: 42px;
      height: 42px;
      margin: 0 14px 0 27px;
      background: url(../../../assets/images/icon-avatar.png) no-repeat;
    }
  
    span {
      font-size: 16px;
      vertical-align: middle;
    }
  
    button {
      width: 101px;
      border-radius: 100px;
    }
  
    .withdraw-btn {
      float: right;
      margin-top: 19px;
      background-color: #378ff6;
      color: #fff;
      margin-right: 16px;
    
      &:hover {
        background-color: #186dd1;
      }
    }
    
    a {
      display: inline-block;
      vertical-align: middle;
      width: 23px;
    }
  
    a.icon-user {
      height: 21px;
      background: url(../../../assets/images/home/index/icon-user.png) no-repeat;
      margin-left: 40px;
      
      &:hover {
        background: url(../../../assets/images/home/index/icon-user-hover.png) no-repeat;
      }
    }
  
    a.icon-bank-card {
      height: 18px;
      background: url(../../../assets/images/home/index/icon-bank-card.png) no-repeat;
      margin-left: 7px;
  
      &:hover {
        background: url(../../../assets/images/home/index/icon-bank-card-hover.png) no-repeat;
      }
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
