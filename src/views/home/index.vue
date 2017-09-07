<template>
  <div>
    <hth-header></hth-header>
    <router-view></router-view>
    <!--侧边栏-->

    <!-- 回到顶部 -->
    <hth-back-top :right="0" :height="100"></hth-back-top>
    <hth-footer></hth-footer>
  </div>
</template>

<script>
  import HthHeader from 'components/header';
  import HthFooter from 'components/footer';
  import HthBackTop from 'common/back-top';

  export default {
    components: {
      HthHeader,
      HthFooter,
      HthBackTop
    }
  };
</script>
