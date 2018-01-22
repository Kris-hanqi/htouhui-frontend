<template>
  <section class="activity-container">
    <shortcut></shortcut>
    <hth-header></hth-header>
    活动中心
  </section>
</template>

<script>
  import Shortcut from '~/components/Shortcut.vue';
  import HthHeader from '~/components/Header.vue';
  
  export default {
    components: {
      Shortcut,
      HthHeader
    }
  }
</script>
