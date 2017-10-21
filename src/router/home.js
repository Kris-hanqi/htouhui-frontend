import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

/** layout */
import Layout from 'views/home/Layout';

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: '账户概览',
        component: _import('home/components/index')
      },
      {
        path: 'funds',
        name: '资金流水',
        component: _import('home/components/funds')
      },
      {
        path: 'recharge',
        name: '我要充值',
        component: _import('home/components/recharge')
      },
      {
        path: 'withdraw',
        name: '我要提现',
        component: _import('home/components/withdraw')
      },
      {
        path: 'planNovice',
        name: '新手计划',
        component: _import('home/components/PlanNovice')
      },
      {
        path: 'plan21Day',
        name: '21天计划',
        component: _import('home/components/Plan21Day')
      },
      {
        path: 'quantify',
        name: '升薪宝量化',
        component: _import('home/components/quantify')
      },
      {
        path: 'regular',
        name: '定期项目',
        component: _import('home/components/regular')
      },
      {
        path: 'claims',
        name: '债券转让',
        component: _import('home/components/claims')
      },
      {
        path: 'loanRecording',
        name: '借款记录',
        component: _import('home/components/LoanRecording')
      },
      {
        path: 'recentlyLoan',
        name: '最近借款',
        component: _import('home/components/RecentlyLoan')
      },
      {
        path: 'coupon',
        name: '优惠券',
        component: _import('home/components/coupon')
      },
      {
        path: 'accountSet',
        name: '账户设置',
        component: _import('home/components/AccountSet')
      },
      {
        path: 'stationNotification',
        name: '站内通知',
        component: _import('home/components/StationNotification')
      }
    ]
  }
];

export default new Router({
  routes: constantRouterMap
});
