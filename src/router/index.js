import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV);

// 个人中心布局组件
import Layout from '../views/layout/Layout'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      component: Layout,
      redirect: 'dashboard',
      children: [{ // 我的账户
        path: 'dashboard',
        component: _import('dashboard/index'),
        name: 'dashboard',
        meta: { title: '账户概览' }
      }]
    }
  ]
})
