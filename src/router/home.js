import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

const Public = {
  template: '<router-view></router-view>'
};

/** layout */
import Layout from 'views/home/components/Layout';

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/account/index',
    children: [
      { // 我的账户路由定义
        path: '/account',
        name: '我的账户',
        component: Public,
        redirect: '/account/index',
        children: [
          {
            path: 'index',
            name: '账户概览',
            component: _import('home/account/index')
          },
          {
            path: 'funds',
            name: '资金流水',
            component: _import('home/account/funds')
          },
          {
            path: 'recharge',
            name: '我要充值',
            component: _import('home/account/recharge')
          },
          {
            path: 'withdraw',
            name: '我要提现',
            component: _import('home/account/withdraw')
          }
        ]
      },
      {
        path: '/planNovice',
        name: '新手计划',
        component: _import('home/investment/PlanNovice')
      },
      {
        path: '/plan21Day',
        component: Public,
        redirect: '/plan21Day/index',
        children: [
          {
            path: 'index',
            name: '21天计划',
            component: _import('home/investment/Plan21day')
          },
          {
            path: 'lookRegular/:id',
            name: '查看债权',
            props: true,
            component: _import('home/investment/components/lookRegular')
          }
        ]
      },
      {
        path: '/quantify',
        component: Public,
        redirect: '/quantify/index',
        children: [
          {
            path: 'index',
            name: '升薪宝量化',
            component: _import('home/quantify/shengXinBaoLiangHua')
          },
          {
            path: 'oneKeyJoin/:id',
            name: '一键加入',
            props: true,
            component: _import('home/quantify/oneKeyJoin')
          },
          {
            path: 'pullOut/:id',
            name: '申请退出',
            props: true,
            component: _import('home/quantify/pullOut')
          },
          {
            path: 'transactionRecord/:id',
            name: '交易记录',
            props: true,
            component: _import('home/quantify/transactionRecord')
          },
          {
            path: 'lookTarget/:id',
            name: '查看标的',
            props: true,
            component: _import('home/quantify/lookTarget')
          },
          {
            path: 'lookRegular-joinRecord/:id',
            name: '加入记录查看债权',
            props: true,
            component: _import('home/quantify/lookRegular-joinRecord')
          },
          {
            path: 'lookRegular-outRecord/:id',
            name: '退出记录查看债权',
            props: true,
            component: _import('home/quantify/lookRegular-outRecord')
          }
        ]
      },
      {
        path: '/rolling21',
        component: Public,
        redirect: 'rolling21/index',
        children: [
          {
            path: 'index',
            name: '升薪宝量化21天滚动',
            component: _import('home/rolling21/rolling21day')
          },
          {
            path: 'pullOut/:id',
            name: '申请退出',
            props: true,
            component: _import('home/rolling21/pullOut')
          },
          {
            path: 'lookRegular-joinRecord/:id',
            name: '加入记录查看债权',
            props: true,
            component: _import('home/rolling21/lookRegular-joinRecord')
          },
          {
            path: 'lookRegular-outRecord/:id',
            name: '退出记录查看债权',
            props: true,
            component: _import('home/rolling21/lookRegular-outRecord')
          }
        ]
      },
      {
        path: '/regular',
        name: '定期项目',
        component: _import('home/investment/Regular')
      },
      {
        path: '/claims',
        name: '债券转让',
        component: _import('home/claims/index')
      },
      {
        path: '/loan',
        name: '我的借款',
        component: Public,
        redirect: '/loan/record',
        children: [
          {
            path: 'record',
            name: '借款记录',
            component: _import('home/loan/LoanRecord')
          },
          {
            path: 'repayment',
            name: '近期还款',
            component: _import('home/loan/RecentlyRepayment')
          }
        ]
      },
      {
        path: '/reward',
        name: '平台奖励',
        component: Public,
        redirect: '/reward/coupon',
        children: [
          {
            path: 'coupon',
            name: '优惠券',
            component: _import('home/reward/coupon')
          }
        ]
      },
      {
        path: '/accountSet',
        component: Public,
        redirect: '/accountSet/index',
        children: [
          {
            path: 'index',
            name: '账户设置',
            component: _import('home/account-set/index')
          },
          {
            path: 'updateLoginPassword',
            name: '修改密码',
            component: _import('home/account-set/components/UpdateLoginPassword')
          },
          {
            path: 'updateMobileStep1',
            name: '验证邮箱',
            component: _import('home/account-set/components/UpdateMobileStep1')
          },
          {
            path: 'updateMobileStep2',
            name: '修改邮箱',
            component: _import('home/account-set/components/UpdateMobileStep2')
          },
          {
            path: 'bindEmail',
            name: '绑定邮箱',
            component: _import('home/account-set/components/BindEmail')
          },
          {
            path: 'bindBackCard',
            name: '绑定邮箱',
            component: _import('home/account-set/components/BindBackCard')
          },
          {
            path: 'transactionPassword',
            name: '设置交易密码',
            component: _import('home/account-set/components/TransactionPassword')
          },
          {
            path: 'updateMobile',
            name: '修改绑定手机号',
            component: _import('home/account-set/components/UpdateMobile')
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
