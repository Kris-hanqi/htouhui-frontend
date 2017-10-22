import Vue from 'vue';
import 'normalize.css/normalize.css';
import '@/styles/base.scss';
import App from './index.vue';

new Vue({
  render: h => h(App)
}).$mount('#app');
