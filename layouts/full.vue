<template>
  <div class="full-container">
    <shortcut></shortcut>
    <hth-header></hth-header>
    <nuxt/>
    <hth-footer></hth-footer>
  </div>
</template>

<script>
  import Shortcut from '~/components/Shortcut.vue';
  import HthHeader from '~/components/Header.vue';
  import HthFooter from '~/components/Footer.vue';
  
  export default {
    components: {
      Shortcut,
      HthHeader,
      HthFooter
    }
  }
</script>
