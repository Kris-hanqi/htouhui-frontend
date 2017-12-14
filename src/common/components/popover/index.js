import KuPopover from './src/popover.vue';

KuPopover.install = function () {
  Vue.component(KuPopover.name, KuPopover);
};

export default KuPopover;
