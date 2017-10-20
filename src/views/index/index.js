import Vue from 'vue';
import 'normalize.css/normalize.css';
import App from './index.vue';
import '@/styles/index.scss';

new Vue({
  render: h => h(App)
}).$mount('#app');
