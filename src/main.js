import promise from 'es6-promise';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui'; // UI库
import VueI18n from 'vue-i18n'; // 多语言库
import 'element-ui/lib/theme-default/index.css';
import 'normalize.css';
import './styles/index.scss';
import axios from 'axios';
Vue.prototype.$ajax = axios;

promise.polyfill();

Vue.use(ElementUI);
Vue.use(VueI18n);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
