import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'normalize.css';
import './styles/bootstrap.scss';
import './styles/base.scss';
import './common/styles/bootstrap.scss';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
