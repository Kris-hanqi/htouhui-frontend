import KuBreadcrumb from './src/breadcrumb.vue';

KuBreadcrumb.install = function () {
  Vue.component(KuBreadcrumb.name, KuBreadcrumb);
};

export default KuBreadcrumb;
