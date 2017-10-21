<template>
  <div class="index-page">
    <hth-header></hth-header>
    <!-- 网站首页 -->
    <div class="home-wrapper">
      <div class="home-wrapper__account-container">
        <div class="home-wrapper__account-container-menu">
          <p class="myAccount">我的账户</p>
          <ul>
            <li><router-link to="index" active-class="active">账户概览</router-link></li>
            <li><router-link to="funds" active-class="active">资金流水</router-link></li>
            <li><router-link to="recharge" active-class="active">我要充值</router-link></li>
            <li><router-link to="withdraw" active-class="active">我要提现</router-link></li>
          </ul>
          <p class="myInvestment">我的投资</p>
          <ul>
            <li><a href="#">新手计划</a></li>
            <li class="currentLi"><a href="#">21天计划</a></li>
            <li><a href="#">升薪宝量化</a></li>
            <li><a href="#">定期项目</a></li>
            <li><a href="#">债权转让</a></li>
          </ul>
          <p class="myBorrowMoney">我的借款</p>
          <ul>
            <li><a href="#">借款纪录</a></li>
            <li><a href="#">近期借款</a></li>
          </ul>
          <p class="newPlatformRewards">平台奖励</p>
          <ul>
            <li><a href="#">优惠券</a></li>
            <li><a href="#">邀请好友</a></li>
          </ul>
          <p class="accountManagement">账户管理</p>
          <ul>
            <li><a href="#">账户设置</a></li>
            <li><a href="#">站内通知</a></li>
          </ul>
        </div>
        <div class="main-container">
          我是主区域
          <router-view></router-view>
        </div>
      </div>
    </div>
    <hth-slider-bar></hth-slider-bar>
  </div>
</template>

<script>
  import HthHeader from 'components/header';
  import HthSliderBar from 'common/slider-bar';

  export default {
    components: {
      HthHeader,
      HthSliderBar
    }
  };
</script>

<style lang="scss" scoped>
  .home-wrapper {
    width: 1000px;
    margin: 0 auto;
  }

  .home-wrapper__account-container {
    margin: 30px 0;
  }

  .home-wrapper__account-container-menu {
    float: left;
    width: 152px;
    height: 846px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    p {
      position: relative;
      height: 43px;
      font-size: 16px;
      line-height: 46px;
      color: #274161;
      padding-left: 42px;
      background-color: #f6f9ff;
    }

    p.myAccount:after {
      display: block;
      content: '';
      position: absolute;
      left: 16px;
      top: 13px;
      width: 18px;
      height: 18px;
      background: url("../../assets/images/home/center-ico-01.png") no-repeat;
    }

    p.myInvestment:after {
      content: '';
      display: block;
      position: absolute;
      left: 13px;
      top: 11px;
      width: 24px;
      height: 24px;
      background: url("../../assets/images/home/center-ico-02.png") no-repeat;
    }

    p.myBorrowMoney:after {
      content: '';
      display: block;
      position: absolute;
      left: 15px;
      top: 9px;
      width: 25px;
      height: 24px;
      background: url("../../assets/images/home/center-ico-03.png") no-repeat;
    }

    p.newPlatformRewards:after {
      content: '';
      display: block;
      position: absolute;
      left: 17px;
      top: 10px;
      width: 16px;
      height: 24px;
      background: url("../../assets/images/home/center-ico-04.png") no-repeat;
    }

    p.accountManagement:after {
      content: '';
      display: block;
      position: absolute;
      left: 15px;
      top: 12px;
      width: 22px;
      height: 22px;
      background: url("../../assets/images/home/center-ico-05.png") no-repeat;
    }

    ul li {
      margin-left: 45px;
    }

    ul li a {
      font-size: 14px;
      line-height: 2.57;
      color: #7c86a2;
    }

    ul li a {
      font-size: 14px;
      line-height: 2.57;
      color: #7c86a2;
    }

    ul li:first-child {
      margin-top: 10px;
    }

    ul li:last-child {
      margin-bottom: 12px;
    }

    ul li.currentLi:first-child {
      margin-top: 5px;
    }

    ul li a.active {
      display: inline-block;
      width: 153px;
      height: 41px;
      line-height: 38px;
      background: url("../../assets/images/home/button.png") no-repeat;
      margin-left: -30px;
      padding-left: 30px;
      margin-top: 0;
      color: #fff !important;
    }
  }

  .home-wrapper__account-container-main {
    float: right;
    width: 832px;
  }

</style>
