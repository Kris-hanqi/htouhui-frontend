import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

/** layout */
import Layout from 'views/home/components/Layout';

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/account',
    children: [
      {
        path: '/account',
        name: '账户概览',
        component: _import('home/account/index')
      },
      {
        path: '/funds',
        name: '资金流水',
        component: _import('home/funds/index')
      },
      {
        path: '/recharge',
        name: '我要充值',
        component: _import('home/recharge/index')
      },
      {
        path: '/withdraw',
        name: '我要提现',
        component: _import('home/withdraw/index')
      },
      {
        path: '/planNovice',
        name: '新手计划',
        component: _import('home/plan-novice/index')
      },
      {
        path: '/plan21Day',
        name: '21天计划',
        component: _import('home/plan21-day/index')
      },
      {
        path: '/quantify',
        component: _import('home/quantify/index'),
        redirect: '/quantify/index',
        children: [
          {
            path: 'index',
            name: '升薪宝量化',
            component: _import('home/quantify/shengXinBaoLiangHua')
          },
          {
            path: 'oneKeyJoin',
            name: '一键加入',
            component: _import('home/quantify/oneKeyJoin')
          },
          {
            path: 'pullOut',
            name: '申请退出',
            component: _import('home/quantify/pullOut')
          },
          {
            path: 'transactionRecord',
            name: '交易记录',
            component: _import('home/quantify/transactionRecord')
          },
          {
            path: 'lookTarget',
            name: '查看标的',
            component: _import('home/quantify/lookTarget')
          },
          {
            path: 'lookRegular',
            name: '查看债权',
            component: _import('home/quantify/lookRegular')
          }
        ]
      },
      {
        path: '/regular',
        name: '定期项目',
        component: _import('home/regular/index')
      },
      {
        path: '/claims',
        name: '债券转让',
        component: _import('home/claims/index')
      },
      {
        path: '/loanRecord',
        name: '借款记录',
        component: _import('home/loan-record/index')
      },
      {
        path: '/recentlyRepayment',
        name: '最近借款',
        component: _import('home/recently-repayment/index')
      },
      {
        path: '/coupon',
        name: '优惠券',
        component: _import('home/coupon/index')
      },
      {
        path: '/accountSet',
        component: _import('home/account-set/index'),
        redirect: '/accountSet/index',
        children: [
          {
            path: 'index',
            name: '账户设置',
            component: _import('home/account-set/accountSet')
          },
          {
            path: 'amendLoginPassword',
            name: '修改密码',
            component: _import('home/account-set/amendLoginPassword')
          },
          {
            path: 'amendLoginEmail01',
            name: '修改邮箱',
            component: _import('home/account-set/amendLoginEmail01')
          },
          {
            path: 'amendLoginEmailBind',
            name: '绑定邮箱',
            component: _import('home/account-set/amendLoginEmailBind')
          },
          {
            path: 'transactionPassword',
            name: '设置交易密码',
            component: _import('home/account-set/TransactionPassword')
          },
          {
            path: 'updateMobile',
            name: '修改绑定手机号',
            component: _import('home/account-set/UpdateMobile')
          }
        ]
      },
      {
        path: '/notification',
        name: '站内通知',
        component: _import('home/notification/index')
      }
    ]
  }
];

export default new Router({
  routes: constantRouterMap
});
