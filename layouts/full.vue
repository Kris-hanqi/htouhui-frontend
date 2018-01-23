<template>
  <div class="full-container">
    <shortcut></shortcut>
    <hth-header></hth-header>
    <nuxt/>
  </div>
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
