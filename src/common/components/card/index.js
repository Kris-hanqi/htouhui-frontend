import KuCard from './src/card.vue';

KuCard.install = function() {
  Vue.component(KuCard.name, KuCard);
};

export default KuCard;
