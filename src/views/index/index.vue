<template>
  <div class="main">
    <hth-banner></hth-banner>
    <div>我是首页</div>
  </div>

</template>

<script>
  import HthBanner from 'components/swiper';
  export default {
    components: {
      HthBanner
    }
  };
</script>

<style lang="scss" scoped>
  .main{
    height: 800px;
  }
</style>
