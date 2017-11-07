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
        component: _import('home/account/funds')
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
        component: _import('home/plan21-day/index'),
        redirect: '/plan21Day/index',
        children: [
          {
            path: 'index',
            name: '21天计划',
            component: _import('home/plan21-day/plan21day')
          },
          {
            path: 'lookRegular/:id',
            name: '查看债权',
            props: true,
            component: _import('home/plan21-day/lookRegular')
          }
        ]
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
