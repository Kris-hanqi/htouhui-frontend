<template>
  <div class="header-wrapper">
    <hth-header-top class="header-top-container"></hth-header-top>
  </div>
</template>

<script>
  import HthHeaderTop from './header-top/index.vue';
  export default {
    name: 'HthHeader',
    components: {
      HthHeaderTop
    }
  }
</script>

<style lang="scss">
  .header-wrapper {
    width: 100%;
    height: 32px;
    background: #2875d9;

    .header-top-container {
      width: 1080px;
      margin: 0 auto;
    }

  }
</style>
