<template>
  <div class="header-container">
    <div class="hth-container">
      <div class="logo">
        <nuxt-link to="/">
          <i class="ku-icon icon-logo"></i>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .header-container {
    display: inline-block;
    width: 100%;
    height: 70px;
    line-height: 70px;
    background-color: hsla(0,0%,100%,.8);
    font-size: 16px;
    
    .logo i {
      margin-top: 7px;
      font-size: 55px;
      color: #176ff0;
    }
  }
  
</style>
