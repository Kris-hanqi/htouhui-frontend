import Vue from 'vue';
import 'normalize.css/normalize.css';
import '@/styles/base.scss';
import App from './index.vue';
import Icon from '@/common/Icon/index.vue';
import Mint from 'mint-ui'; // UI库
import 'mint-ui/lib/style.css';
import '@/icons/index.js'
// import '@/mock';

Vue.use(Mint);

Vue.component('icon', Icon);

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
