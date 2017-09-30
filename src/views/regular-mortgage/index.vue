<template>
  <div>
    <hth-header></hth-header>
    <router-view></router-view>
    <!--侧边栏-->
    <hth-slider-bar></hth-slider-bar>

    <hth-footer></hth-footer>
  </div>
</template>

<script>
  import HthHeader from 'components/header';
  import HthFooter from 'components/footer';
  import HthSliderBar from 'common/slider-bar'

  export default {
    components: {
      HthHeader,
      HthFooter,
      HthSliderBar
    }
  };
</script>
