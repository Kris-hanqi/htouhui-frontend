<template>
  <div class="sidebar-wrapper">
    <p class="account">我的账户</p>
    <ul>
      <li class="nav">
        <router-link to="/account" active-class="active">账户概览</router-link>
      </li>
      <li class="nav">
        <router-link to="/funds" active-class="active">资金流水</router-link>
      </li>
      <li class="nav">
        <router-link to="/recharge" active-class="active">我要充值</router-link>
      </li>
      <li class="nav">
        <router-link to="/withdraw" active-class="active">我要提现</router-link>
      </li>
    </ul>
    <p class="investment">我的投资</p>
    <ul>
      <li class="nav">
        <router-link to="/planNovice" active-class="active">新手计划</router-link>
      </li>
      <li class="nav">
        <router-link to="/plan21Day" active-class="active">21天计划</router-link>
      </li>
      <li class="nav">
        <router-link to="/quantify" active-class="active">升薪宝量化</router-link>
      </li>
      <li class="nav">
        <router-link to="/regular" active-class="active">定期项目</router-link>
      </li>
      <li class="nav">
        <router-link to="/claims" active-class="active">债权转让</router-link>
      </li>
    </ul>
    <p class="borrow-money">我的借款</p>
    <ul>
      <li class="nav">
        <router-link to="/loanRecording" active-class="active">借款记录</router-link>
      </li>
      <li class="nav">
        <router-link to="/recentlyLoan" active-class="active">近期借款</router-link>
      </li>
    </ul>
    <p class="new-platform-rewards">平台奖励</p>
    <ul>
      <li class="nav">
        <router-link to="/coupon" active-class="active">优惠券</router-link>
      </li>
    </ul>
    <p class="account-management">账户管理</p>
    <ul>
      <li class="nav">
        <router-link to="/accountSet" active-class="active">账户设置</router-link>
      </li>
      <li class="nav">
        <router-link to="/notification" active-class="active">站内通知</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  .sidebar-wrapper {
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

      &:after {
        content: '';
        display: block;
        position: absolute;
      }

      &.account:after {
        left: 16px;
        top: 13px;
        width: 18px;
        height: 18px;
        background: url(../../../assets/images/home/icon-account.png) no-repeat;
      }

      &.investment:after {
        left: 13px;
        top: 11px;
        width: 24px;
        height: 24px;
        background: url(../../../assets/images/home/icon-money.png) no-repeat;
      }

      &.borrow-money:after {
        left: 15px;
        top: 9px;
        width: 25px;
        height: 24px;
        background: url(../../../assets/images/home/icon-loan.png) no-repeat;
      }

      &.new-platform-rewards:after {
        left: 17px;
        top: 10px;
        width: 16px;
        height: 24px;
        background: url(../../../assets/images/home/icon-reward.png) no-repeat;
      }

      &.account-management:after {
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
</style>
