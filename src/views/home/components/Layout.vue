<template>
  <div class="index-page">
    <hth-header></hth-header>
    <!-- 个人中心 -->
    <div class="home-wrapper">
      <!-- 面包屑导航 -->
      <div class="home-wrapper__breadcrumb">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
          <el-breadcrumb-item>账户概览</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="home-wrapper__account">
        <div class="home-wrapper__account-menu">
          <p class="account">我的账户</p>
          <ul>
            <li class="nav">
              <router-link to="index" active-class="active">账户概览</router-link>
            </li>
            <li class="nav">
              <router-link to="funds" active-class="active">资金流水</router-link>
            </li>
            <li class="nav">
              <router-link to="recharge" active-class="active">我要充值</router-link>
            </li>
            <li class="nav">
              <router-link to="withdraw" active-class="active">我要提现</router-link>
            </li>
          </ul>
          <p class="investment">我的投资</p>
          <ul>
            <li class="nav">
              <router-link to="planNovice" active-class="active">新手计划</router-link>
            </li>
            <li class="nav">
              <router-link to="plan21Day" active-class="active">21天计划</router-link>
            </li>
            <li class="nav">
              <router-link to="quantify" active-class="active">升薪宝量化</router-link>
            </li>
            <li class="nav">
              <router-link to="regular" active-class="active">定期项目</router-link>
            </li>
            <li class="nav">
              <router-link to="claims" active-class="active">债权转让</router-link>
            </li>
          </ul>
          <p class="borrow-money">我的借款</p>
          <ul>
            <li class="nav">
              <router-link to="loanRecording" active-class="active">借款纪录</router-link>
            </li>
            <li class="nav">
              <router-link to="recentlyLoan" active-class="active">近期借款</router-link>
            </li>
          </ul>
          <p class="new-platform-rewards">平台奖励</p>
          <ul>
            <li class="nav">
              <router-link to="coupon" active-class="active">优惠券</router-link>
            </li>
          </ul>
          <p class="account-management">账户管理</p>
          <ul>
            <li class="nav">
              <router-link to="accountSet" active-class="active">账户设置</router-link>
            </li>
            <li class="nav">
              <router-link to="notification" active-class="active">站内通知</router-link>
            </li>
          </ul>
        </div>
        <div class="main-container">
          <div class="prompt-message">
            <span>您可以去充值投资啦，请在提现前绑定银行卡。</span>
            <el-button>去绑卡</el-button>
          </div>
          <div class="main-container__router">
          
          </div>
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
  import { getUserInfo } from '@/api/login';

  export default {
    components: {
      HthHeader,
      HthSliderBar
    },
    data() {
      return {
        operationTipsArray: [
          {
            status: 0,
            title: '您还未开通江西银行存管账户，即刻开通确保您的正常使用和资金安全。',
            url: ''
          },
          {
            status: 1,
            title: '设置交易密码可提高账号安全。',
            url: ''
          },
          {
            status: 2,
            title: '您可以去充值投资啦，请在提现前绑定银行卡。',
            url: ''
          }
        ]
      }
    },
    created() {
      getUserInfo().then(response => {
        console.log(response);
      })
    }
  };
</script>

<style lang="scss" scoped>
  .home-wrapper {
    width: 1000px;
    margin: 0 auto;
  }
  
  .home-wrapper__breadcrumb {
    margin: 20px 0;
    font-size: 16px;
    color: #274161;
  }

  .home-wrapper__account-menu {
    float: left;
    width: 152px;
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
  
      &.account:after {
        display: block;
        content: '';
        position: absolute;
        left: 16px;
        top: 13px;
        width: 18px;
        height: 18px;
        background: url(../../../assets/images/home/icon-account.png) no-repeat;
      }
      
      &.investment:after {
        content: '';
        display: block;
        position: absolute;
        left: 13px;
        top: 11px;
        width: 24px;
        height: 24px;
        background: url(../../../assets/images/home/icon-money.png) no-repeat;
      }
  
      &.borrow-money:after {
        content: '';
        display: block;
        position: absolute;
        left: 15px;
        top: 9px;
        width: 25px;
        height: 24px;
        background: url(../../../assets/images/home/icon-loan.png) no-repeat;
      }
      
      &.new-platform-rewards:after {
        content: '';
        display: block;
        position: absolute;
        left: 17px;
        top: 10px;
        width: 16px;
        height: 24px;
        background: url(../../../assets/images/home/icon-reward.png) no-repeat;
      }
      
      &.account-management:after {
        content: '';
        display: block;
        position: absolute;
        left: 15px;
        top: 12px;
        width: 22px;
        height: 22px;
        background: url(../../../assets/images/home/icon-set.png) no-repeat;
      }
    }
  
    ul {
      margin-top: 10px;
      margin-bottom: 5px;
    }
    
    .nav {
      a {
        display: block;
        height: 41px;
        line-height: 38px;
        color: #7c86a2;
        margin-left: 45px;
      }
  
      a.active {
        display: inline-block;
        width: 153px;
        background: url(../../../assets/images/home/menu-active-bg.png) no-repeat;
        margin-left: 15px;
        padding-left: 30px;
        margin-top: 0;
        color: #fff !important;
      }
    }
  }

  .main-container {
    float: right;
    width: 832px;
  
    .prompt-message {
      width: 100%;
      height: 54px;
      background-color: #fcf8e3;
      line-height: 54px;
  
      span {
        font-size: 14px;
        color: #ce9764;
        margin-left: 9px;
      }
  
      button {
        float: right;
        height: 36px;
        border-color: #ff7900;
        padding: 0 15px;
        border-radius: 100px;
        background-color: #ff7900;
        text-align: center;
        font-size: 16px;
        color: #fff;
        margin-right: 11px;
        margin-top: 10px;
      }
    }
  
    .main-container__router {
      margin-top: 8px;
    }
  }
</style>
