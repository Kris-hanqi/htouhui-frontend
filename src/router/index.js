import Vue from 'vue';
import Router from 'vue-router';

/** login */
import Login from 'views/login';

/** 首页 */
import Index from 'views/index/index.vue';

/** 首页公共区域 */
import Home from 'views/home/index.vue';

export const constantRouterMap = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/index'
      },
      {
        path: '/index',
        component: Index
      }
    ]
  }
];

Vue.use(Router);

export default new Router({
  routes: constantRouterMap
});

