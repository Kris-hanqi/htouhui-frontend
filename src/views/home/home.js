import Vue from 'vue';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-default/index.css';
import { Button, Select, Table, TableColumn, Pagination, Breadcrumb, BreadcrumbItem, DatePicker, Dialog, MessageBox, Tabs } from 'element-ui'
import '@/styles/base.scss';
import '@/styles/element-ui.scss';
import router from '@/router/home';
import store from '@/store';
import App from './App';
import '@/mock';

Vue.use(Button);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Tabs)
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(DatePicker);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
