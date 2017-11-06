import Vue from 'vue';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-default/index.css';
import {
  Button,
  Select,
  Table,
  TableColumn,
  Pagination,
  Breadcrumb,
  BreadcrumbItem,
  DatePicker,
  Dialog,
  MessageBox,
  Tabs,
  Loading,
  TabPane,
  Message,
  Form,
  FormItem,
  Input,
  Steps,
  Step,
  Radio,
  Checkbox
} from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import '@/styles/base.scss';
import '@/styles/element-ui.scss';
import * as filters from '@/filters' // 全局filter
import router from '@/router/home';
import store from '@/store';
import uuid from '@/utils/uuid';
import { setUuid, getUuid } from '@/utils/auth';
import App from './App';
// import '@/mock';

const uuidCode = getUuid();

// 设置uuid
if (!uuidCode) {
  setUuid(uuid());
}


Vue.use(Button);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Radio);
Vue.use(Checkbox);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

Vue.use(VueClipboard);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
