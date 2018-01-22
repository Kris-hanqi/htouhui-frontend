<template>
  <section class="index-container">
    <shortcut></shortcut>
    <hth-header></hth-header>
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
