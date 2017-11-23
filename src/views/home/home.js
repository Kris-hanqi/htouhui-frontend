import Vue from 'vue';
import 'normalize.css/normalize.css';
import {
  Button,
  Table,
  TableColumn,
  Pagination,
  Breadcrumb,
  BreadcrumbItem,
  DatePicker,
  Dialog,
  MessageBox,
  Tabs,
  Tooltip,
  Loading,
  TabPane,
  Message,
  Form,
  FormItem,
  Input,
  Steps,
  Step,
  Select,
  Option,
  Radio,
  Col,
  Checkbox,
  Notification
} from 'element-ui'
import VueClipboard from 'vue-clipboard2';
import '@/styles/bootstrap.scss';
import '@/styles/base.scss';
import '@/styles/index.scss';
import '@/styles/element-ui.scss';
import 'animate.css';
import Vue2Filters from 'vue2-filters';
import * as filters from '@/filters' // 全局filter
import router from '@/router/home';
import store from '@/store';
import { setUuid, getUuid } from '@/utils/auth';
import App from './App';
// import '@/mock';

const uuidCode = getUuid();

// 设置uuid
if (!uuidCode) {
  setUuid();
}

Vue.use(Button);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(Tooltip);
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
Vue.use(Col);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(VueClipboard);
Vue.use(Vue2Filters);

router.afterEach(to => {
  if (store.getters.username && !store.getters.isOpenAccount && to.path !== '/accountManage/set/openAccount') {
    MessageBox.alert('尚未开户', '提示', {
      confirmButtonText: '确认',
      type: 'warning',
      callback: action => {
        if (action === 'confirm') {
          router.push('/accountManage/set/openAccount');
        }
      }
    });
  }
});

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
