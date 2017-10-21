import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: '账户概览',
        component: _import('home/components/index')
      }
    ]
  }
];

export default new Router({
  routes: constantRouterMap
});
