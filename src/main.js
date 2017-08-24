import 'es6-promise/auto';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui'; // UI库
import VueI18n from 'vue-i18n'; // 多语言库
import VueAwesomeSwiper from 'vue-awesome-swiper';// swiper插件
import 'swiper/dist/css/swiper.min.css';
import 'element-ui/lib/theme-default/index.css';
import 'normalize.css';
import './styles/index.scss';
import as from 'axios';
import VueAs from './utils/plugin';
import { setVue } from './utils/fetch';

Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.use(VueAs, as);
Vue.use(VueAwesomeSwiper);

setVue(Vue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
