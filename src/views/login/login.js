import Vue from 'vue';
import 'normalize.css/normalize.css';
import '@/styles/base.scss';
import App from './index.vue';

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
