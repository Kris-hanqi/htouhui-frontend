import Vue from 'vue';
import 'normalize.css/normalize.css';
import '@/styles/base.scss';
import router from '../../router/home';
import App from './index.vue';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
