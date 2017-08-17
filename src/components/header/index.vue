<template>
  <div class="header-wrapper">
    <hth-header-top class="header-top-container"></hth-header-top>
    <hth-header-down class="header-down-container"></hth-header-down>
  </div>
</template>

<script>
  import HthHeaderTop from './header-top/index.vue';
  import HthHeaderDown from './header-down/index.vue';
  export default {
    name: 'HthHeader',
    components: {
      HthHeaderTop,
      HthHeaderDown
    }
  }


</script>

<style lang="scss">
  .header-wrapper {
    width: 100%;

    .header-top-container {
      margin: 0 auto;
    }

  }
</style>
