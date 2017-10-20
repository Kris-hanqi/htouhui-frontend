import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';// swiper插件
import 'swiper/dist/css/swiper.min.css';
import 'normalize.css/normalize.css';
import App from './index.vue';
import '@/styles/index.scss';

Vue.use(VueAwesomeSwiper);

new Vue({
  render: h => h(App)
}).$mount('#app');
