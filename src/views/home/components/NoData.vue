<template>
  <div class="no-data-wrapper">
    <img :src="img_icon_nothing">
  </div>
</template>

<script>
  import img_icon_nothing from 'assets/images/home/icon-nothing.jpg';
  
  export default {
    data() {
      return {
        img_icon_nothing
      }
    }
  }
</script>

<style lang="scss">
  .no-data-wrapper {
    width: 100%;
    text-align: center;
    padding: 30px 0;
  }
</style>
