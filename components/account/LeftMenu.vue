<template>
  <div class="account-left-menu">
    <el-menu :default-openeds="['1', '2', '3', '4', '5']">
      <el-submenu index="1">
        <template slot="title">
          <i class="ku-icon icon-account"></i>
          <span>我的账户</span>
        </template>
        <el-menu-item index="1-1">账户概览</el-menu-item>
        <el-menu-item index="1-2">资金流水</el-menu-item>
        <el-menu-item index="1-3">我要充值</el-menu-item>
        <el-menu-item index="1-4">我要提现</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="ku-icon icon-investment"></i>
          <span>我的投资</span>
        </template>
        <el-menu-item index="2-1">新手计划</el-menu-item>
        <el-menu-item index="2-2">升薪宝量化</el-menu-item>
        <el-menu-item index="2-3">定期项目</el-menu-item>
        <el-menu-item index="2-4">债权转让</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="ku-icon icon-loan"></i>
          <span>我的借款</span>
        </template>
        <el-menu-item index="3-1">借款记录</el-menu-item>
        <el-menu-item index="3-2">近期还款</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="ku-icon icon-reward"></i>
          <span>我的借款</span>
        </template>
        <el-menu-item index="4-1">
          <nuxt-link active-class="active" to="/account/reward/coupon">优惠券</nuxt-link>
        </el-menu-item>
        <nuxt-link active-class="active" to="/account/reward/prize">
          <el-menu-item active-class="active" index="4-2">我的奖品</el-menu-item>
        </nuxt-link>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="ku-icon icon-set"></i>
          <span>账户管理</span>
        </template>
        <el-menu-item index="5-1">
          <nuxt-link active-class="active" to="/account/manage/set">账户设置</nuxt-link>
        </el-menu-item>
        <el-menu-item index="5-2">
          <nuxt-link active-class="active" to="/account/manage/notification">站内通知</nuxt-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <ku-menu width="150px" theme="light" :open-names="['1']" accordion>
      <ku-submenu name="1">
        <template slot="title">
          <ku-icon type="account"></ku-icon>
          内容管理
        </template>
        <ku-menu-item name="1-1">文章管理</ku-menu-item>
        <ku-menu-item name="1-2">评论管理</ku-menu-item>
      </ku-submenu>
    </ku-menu>
  </div>
</template>

<script>
  import Menu from '~/components/common/components/menu';
  import Icon from '~/components/common/components/icon';
  
  export default {
    components: {
      KuMenu: Menu,
      KuSubmenu: Menu.Sub,
      KuMenuItem: Menu.Item,
      KuMenuGroup: Menu.Group,
      KuIcon: Icon
    }
  }
</script>

<style lang="scss">
  .account-left-menu {
    .ku-icon {
      left: 15px;
      font-size: 20px;
      color: #7c86a2;
    }
    
    .el-submenu__title span {
      font-size: 16px;
      line-height: 46px;
      color: #274161;
      padding-left: 12px;
    }
    
    .el-submenu__icon-arrow {
      display: none;
    }
  
    .el-menu-item {
      min-width: 100px;
      height: 41px;
      line-height: 38px;
      
      &:hover {
        background: transparent;
      }
    }
    
    a {
      color: #7c86a2;
    }
  
    .active {
      box-shadow: 0 4px 10px rgba(36,62,99,.15);
      width: 153px;
      background-color: #3793df;
      text-decoration: none;
      color: #fff;
      display: inline-block;
      
      &:hover:after {
        visibility: visible;
        opacity: 1;
      }
  
      .el-menu-item {
        color: #fff;
      }
    }
   
  }
</style>
