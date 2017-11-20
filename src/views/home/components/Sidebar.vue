<template>
  <div class="sidebar-wrapper">
    <p class="account">
      <i class="iconfont icon-account"></i>我的账户
    </p>
    <ul>
      <li class="nav">
        <router-link to="/account/index" active-class="active">账户概览</router-link>
      </li>
      <li class="nav">
        <router-link to="/account/funds" active-class="active">资金流水</router-link>
      </li>
      <li class="nav">
        <router-link to="/account/recharge" active-class="active">我要充值</router-link>
      </li>
      <li class="nav">
        <router-link to="/account/withdraw" active-class="active">我要提现</router-link>
      </li>
    </ul>
    <p class="investment">
      <i class="iconfont icon-investment"></i>我的投资
    </p>
    <ul>
      <li class="nav" v-if="showNovicePlan">
        <router-link to="/investment/planNovice" active-class="active">新手计划</router-link>
      </li>
      <li class="nav">
        <router-link to="/investment/plan21Day" active-class="active">我的计划</router-link>
      </li>
      <li class="nav">
        <router-link to="/investment/scroll21" active-class="active">升薪宝滚动21</router-link>
      </li>
      <li class="nav">
        <router-link to="/investment/quantify" active-class="active">升薪宝量化</router-link>
      </li>
      <li class="nav">
        <router-link to="/investment/regular" active-class="active">定期项目</router-link>
      </li>
      <li class="nav">
        <router-link to="/investment/claims" active-class="active">债权转让</router-link>
      </li>
    </ul>
    <p class="borrow-money" v-if="showLoan">
      <i class="iconfont icon-loan"></i>我的借款
    </p>
    <ul v-if="showLoan">
      <li class="nav">
        <router-link to="/loan/record" active-class="active">借款记录</router-link>
      </li>
      <li class="nav">
        <router-link to="/loan/repayment" active-class="active">近期还款</router-link>
      </li>
    </ul>
    <p class="new-platform-rewards">
      <i class="iconfont icon-reward"></i>平台奖励
    </p>
    <ul>
      <li class="nav">
        <router-link to="/reward/coupon" active-class="active">优惠券</router-link>
      </li>
    </ul>
    <p class="account-management">
      <i class="iconfont icon-set"></i>账户管理
    </p>
    <ul>
      <li class="nav">
        <router-link to="/accountManage/set/index" active-class="active">账户设置</router-link>
      </li>
      <li class="nav">
        <router-link to="/accountManage/notification" active-class="active">站内通知</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      showNovicePlan: { // 是否显示新手计划
        type: Boolean,
        default: false,
        required: true
      },
      showLoan: { // 是否显示我的借款
        type: Boolean,
        default: false,
        required: true
      }
    },
    data() {
      return { }
    }
  }
</script>

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

      i {
        position: absolute;
        left: 15px;
        font-size: 24px;
        color: #7c86a2;
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
