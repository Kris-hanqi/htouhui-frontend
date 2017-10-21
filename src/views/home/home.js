import Vue from 'vue';
import 'normalize.css/normalize.css';
import '@/styles/base.scss';
import router from '../../router/home';
import App from './App';

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
