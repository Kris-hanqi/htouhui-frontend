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
  Popover,
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
  Notification,
  upload
} from 'element-ui'
import VueClipboard from 'vue-clipboard2';
import '@/styles/bootstrap.scss';
import '@/styles/base.scss';
import '@/styles/index.scss';
import '@/styles/element-ui.scss';
import 'animate.css';
import 'hth-icon-font/css/ku-icon.css';
import Vue2Filters from 'vue2-filters';
import * as filters from '@/filters' // 全局filter
import router from '@/router/home';
import store from '@/store';
import { setUuid, getUuid, getToken, setToken } from '@/utils/auth';
import { fetchUpdateServeToken } from '@/api/home/public';
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
Vue.use(Popover);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Radio);
Vue.use(Col);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(upload);

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
  setToken(getToken());
  fetchUpdateServeToken();
  if (to.path.indexOf('investment') === -1) {
    if (store.getters.username && !store.getters.isOpenAccount && to.path !== '/accountManage/set/openAccount') {
      MessageBox.alert('尚未开户', '提示', {
        confirmButtonText: '确认',
        type: 'warning',
        showClose: false,
        callback: action => {
          if (action === 'confirm') {
            if (store.getters.thirdPartyName === 'KONG_ZHONG') {
              if (!store.getters.mobile) {
                window.location.href = store.getters.baseUrl + '/jixin/addNewUserMoblie';
                return;
              }
              window.location.href = store.getters.baseUrl + '/jixin/open-account';
            } else {
              router.push('/accountManage/set/openAccount');
            }
          }
        }
      });
    }
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
