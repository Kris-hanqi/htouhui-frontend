<template>
  <div class="index-page">
    <hth-header></hth-header>
    <!-- 网站首页 -->
    <div class="main">
      个人中心
    </div>
    <hth-slider-bar></hth-slider-bar>
    <hth-footer></hth-footer>
  </div>
</template>

<script>
  import HthHeader from 'components/header';
  import HthFooter from 'components/footer';
  import HthSliderBar from 'common/slider-bar';
  
  export default {
    components: {
      HthHeader,
      HthFooter,
      HthSliderBar
    }
  };
</script>

<style lang="scss" scoped>

</style>
