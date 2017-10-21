import Vue from 'vue';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-default/index.css';
import { Button, Select, Table, TableColumn, Pagination, Breadcrumb, BreadcrumbItem } from 'element-ui'
import '@/styles/base.scss';
import router from '../../router/home';
import App from './App';

Vue.use(Button);
Vue.use(Select);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
