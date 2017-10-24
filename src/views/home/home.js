import Vue from 'vue';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-default/index.css';
import { Button, Select, Table, TableColumn, Pagination, Breadcrumb, BreadcrumbItem, DatePicker } from 'element-ui'
import '@/styles/base.scss';
import '@/styles/element-ui.scss';
import router from '@/router/home';
import store from '@/store';
import App from './App';
import '@/mock';

Vue.use(Button);
Vue.use(Select);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(DatePicker);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
