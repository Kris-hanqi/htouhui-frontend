<template>
  <div class="header-wrapper">
    <div class="header-top-container">
      <header-top></header-top>
    </div>
    <div class="header-down-container">
      <header-down></header-down>
    </div>
  </div>
</template>

<script>
  import { HeaderTop, HeaderDown } from './components';
  
  export default {
    name: 'HthHeader',
    components: {
      HeaderTop,
      HeaderDown
    }
  }
</script>

<style lang="scss">
  $header-top-bg: #f6f6f6;
  $header-down-bg: #f6f6f6;

  .header-wrapper {
    width: 100%;
    background-color: #fff;
    
    .header-top-container {
      background-color: $header-top-bg;
    }
    
    .header-down-container {
      background-color: $header-down-bg;
    }
  }
</style>
