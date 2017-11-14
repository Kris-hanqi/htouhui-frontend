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
      {
        path: '/account',
        name: 'account',
        meta: {
          title: '我的账户'
        },
        component: Public,
        redirect: '/account/index',
        children: [
          {
            path: 'index',
            meta: {
              title: '账户概览'
            },
            name: 'accountIndex',
            component: _import('home/account/index')
          },
          {
            path: 'funds',
            meta: {
              title: '资金流水'
            },
            name: 'accountFunds',
            component: _import('home/account/funds')
          },
          {
            path: 'recharge',
            meta: {
              title: '我要充值'
            },
            name: 'accountRecharge',
            component: _import('home/account/recharge')
          },
          {
            path: 'withdraw',
            meta: {
              title: '我要提现'
            },
            name: 'accountWithdraw',
            component: _import('home/account/withdraw')
          }
        ]
      },
      {
        path: '/investment',
        meta: {
          title: '我的投资'
        },
        name: 'investment',
        component: Public,
        redirect: '/investment/plan21Day',
        children: [
          {
            path: 'planNovice',
            meta: {
              title: '新手计划'
            },
            name: 'investmentPlanNovice',
            component: _import('home/investment/PlanNovice')
          },
          {
            path: 'plan21Day',
            meta: {
              title: '21天计划'
            },
            name: 'investmentPlan21Day',
            component: Public,
            redirect: '/investment/plan21Day/index',
            children: [
              {
                path: 'index',
                name: 'investmentPlan21DayIndex',
                component: _import('home/investment/Plan21day')
              },
              {
                path: 'lookRegular/:id',
                meta: {
                  title: '查看债权'
                },
                name: 'investmentPlan21DayLookRegular',
                props: true,
                component: _import('home/investment/components/lookRegular')
              }
            ]
          },
          {
            path: 'quantify',
            component: Public,
            meta: {
              title: '升薪宝量化'
            },
            redirect: '/investment/quantify/index',
            children: [
              {
                path: 'index',
                name: 'investmentQuantify',
                component: _import('home/investment/quantify')
              },
              {
                path: 'oneKeyJoin/:id',
                name: 'investmentQuantifyOneKeyJoin',
                meta: {
                  title: '一键加入'
                },
                props: true,
                component: _import('home/investment/components/quantifyOneKeyJoin')
              },
              {
                path: 'pullOut/:id',
                name: 'investmentQuantifyPullOut',
                meta: {
                  title: '申请退出'
                },
                props: true,
                component: _import('home/investment/components/quantifyPullOut')
              },
              {
                path: 'transactionRecord/:id',
                name: 'investmentQuantifyTransactionRecord',
                meta: {
                  title: '交易记录'
                },
                props: true,
                component: _import('home/investment/components/quantifyTransactionRecord')
              },
              {
                path: 'lookTarget/:id',
                name: 'investmentQuantifyLookTarget',
                meta: {
                  title: '查看标的'
                },
                props: true,
                component: _import('home/investment/components/quantifyJoinRecord')
              },
              {
                path: 'lookRegular-joinRecord/:id',
                name: '加入记录查看债权',
                meta: {
                  title: '加入记录查看债权'
                },
                props: true,
                component: _import('home/investment/components/quantifyLookRegularJoinRecord')
              },
              {
                path: 'lookRegular-outRecord/:id',
                name: '退出记录查看债权',
                props: true,
                component: _import('home/investment/components/quantifyLookRegularOutRecord')
              }
            ]
          },
          {
            path: 'scroll21',
            component: Public,
            meta: {
              title: '升薪宝滚动21'
            },
            redirect: '/investment/scroll21/index',
            children: [
              {
                path: 'index',
                name: 'investmentScroll21',
                component: _import('home/investment/scroll21')
              },
              {
                path: 'pullOut/:id',
                meta: {
                  title: '申请退出'
                },
                props: true,
                component: _import('home/investment/components/scroll21PullOut')
              },
              {
                path: 'lookRegular-joinRecord/:id',
                meta: {
                  title: '加入记录查看债权'
                },
                props: true,
                component: _import('home/investment/components/scroll21LookRegularJoinRecord')
              },
              {
                path: 'lookRegular-outRecord/:id',
                meta: {
                  title: '退出记录查看债权'
                },
                props: true,
                component: _import('home/investment/components/scroll21LookRegularOutRecord')
              }
            ]
          },
          {
            path: 'regular',
            meta: {
              title: '定期项目'
            },
            name: 'investmentRegular',
            component: _import('home/investment/Regular')
          },
          {
            path: 'claims',
            name: 'investmentClaims',
            meta: {
              title: '债券转让'
            },
            component: _import('home/investment/claims')
          }
        ]
      },
      {
        path: '/loan',
        name: 'loan',
        meta: {
          title: '我的借款'
        },
        component: Public,
        redirect: '/loan/record',
        children: [
          {
            path: 'record',
            name: 'loanRecord',
            meta: {
              title: '借款记录'
            },
            component: _import('home/loan/record')
          },
          {
            path: 'repayment',
            name: 'loanRepayment',
            meta: {
              title: '近期还款'
            },
            component: _import('home/loan/repayment')
          }
        ]
      },
      {
        path: '/reward',
        name: 'reward',
        meta: {
          title: '平台奖励'
        },
        component: Public,
        redirect: '/reward/coupon',
        children: [
          {
            path: 'coupon',
            meta: {
              title: '优惠券'
            },
            name: 'rewardCoupon',
            component: _import('home/reward/coupon')
          }
        ]
      },
      {
        path: '/accountManage',
        name: 'accountManage',
        meta: {
          title: '账户管理'
        },
        component: Public,
        redirect: '/accountManage/set',
        children: [
          {
            path: 'set',
            component: Public,
            name: 'AMS',
            meta: {
              title: '账户设置'
            },
            redirect: '/accountManage/set/index',
            children: [
              {
                path: 'index',
                name: 'AMSIndex',
                component: _import('home/account-manage/set')
              },
              {
                path: 'updateLoginPassword',
                meta: {
                  title: '修改密码'
                },
                name: 'AMSUpdatePassword',
                component: _import('home/account-manage/components/UpdateLoginPassword')
              },
              {
                path: 'bindEmail',
                meta: {
                  title: '绑定邮箱'
                },
                name: 'AMSBindEmail',
                component: _import('home/account-manage/components/BindEmail')
              },
              {
                path: 'updateEmailStep1',
                meta: {
                  title: '验证邮箱'
                },
                name: 'AMSUpdateEmailStep1',
                component: _import('home/account-manage/components/UpdateEmailStep1')
              },
              {
                path: 'updateEmailStep2',
                meta: {
                  title: '修改邮箱'
                },
                name: 'AMSUpdateEmailStep2',
                component: _import('home/account-manage/components/UpdateEmailStep2')
              },
              {
                path: 'bindBackCard',
                meta: {
                  title: '绑定银行卡'
                },
                name: 'AMSBindBackCard',
                component: _import('home/account-manage/components/BindBackCard')
              },
              {
                path: 'transactionPassword',
                meta: {
                  title: '设置交易密码'
                },
                name: 'AMSTransactionPassword',
                component: _import('home/account-manage/components/TransactionPassword')
              },
              {
                path: 'updateMobile',
                meta: {
                  title: '修改绑定手机号'
                },
                name: 'AMSUpdateMobile',
                component: _import('home/account-manage/components/UpdateMobile')
              }
            ]
          },
          {
            path: 'notification',
            meta: {
              title: '站内通知'
            },
            name: 'AMN',
            component: _import('home/account-manage/notification')
          }
        ]
      }
    ]
  }
];

export default new Router({
  routes: constantRouterMap
});
