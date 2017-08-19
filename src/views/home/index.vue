<template>
  <div>
    <hth-header></hth-header>
    <router-view></router-view>
    <hth-footer></hth-footer>
  </div>
</template>

<script>
  import HthHeader from 'components/header';
  import HthFooter from 'components/footer';

  export default {
    components: {
      HthHeader,
      HthFooter
    }
  };
</script>
