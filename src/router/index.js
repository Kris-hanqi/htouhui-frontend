import Vue from 'vue';
import Router from 'vue-router';

/** login */
import Login from 'views/login';

/** 首页 */
import Index from 'views/index/index.vue';

export const constantRouterMap = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/index',
    component: Index,
    name: '首页'
  }
];

Vue.use(Router);

export default new Router({
  routes: constantRouterMap
});

