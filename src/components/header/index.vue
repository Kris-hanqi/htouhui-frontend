<template>
  <div class="header-wrapper">
    <div class="header-top-container">
      <hth-header-top class="wrap"></hth-header-top>
    </div>

    <hth-header-down></hth-header-down>
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
  $hth-header-top-bg-color: #f6f6f6;

  .header-wrapper {
    width: 100%;
    background-color: #fff;
  }

  .header-top-container {
    background: $hth-header-top-bg-color;
  }
</style>
