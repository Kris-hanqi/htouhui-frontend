import Vue from 'vue';
import Router from 'vue-router';

/** login */
import Login from 'views/login';

/** 首页 */
import Index from 'views/index/index.vue';

/** 首页公共区域 */
import Home from 'views/home/index.vue';

/** 定期抵押 */
import RegularMortgage from 'views/regular-mortgage/index.vue';

/** 信息披露 **/
import InformationDisclosure from 'views/information-disclosure/index.vue';

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
  },
  {
    path: '/regular-mortgage',
    component: RegularMortgage
  },
  {
    path: '/information-disclosure',
    component: InformationDisclosure
  }
];

Vue.use(Router);

export default new Router({
  routes: constantRouterMap
});

