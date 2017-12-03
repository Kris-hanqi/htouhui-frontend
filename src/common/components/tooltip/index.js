import KuTooltip from './src/tooltip.vue';

KuTooltip.install = function () {
  Vue.component(KuTooltip.name, KuTooltip);
};

export default KuTooltip;
