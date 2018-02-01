<template>
  <div class="header-container">
    <div class="hth-container">
      <div class="logo">
        <nuxt-link to="/">
          <i class="ku-icon icon-logo"></i>
        </nuxt-link>
      </div>
      <ul class="nav float-right">
        <li class="nav-item">
          <nuxt-link to="/">首页</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/">升薪宝量化</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/">升薪宝定期</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/mortgage">定期抵押</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/">信息披露</nuxt-link>
        </li>
        <li style="margin-left: 40px">
          <nuxt-link to="/account">
            <ku-avatar icon="avatar"></ku-avatar>
            我的账户
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import KuAvatar from './common/avatar';
  
  export default {
    components: {
      KuAvatar
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  .header-container {
    display: inline-block;
    width: 100%;
    height: 70px;
    line-height: 70px;
    background-color: hsla(0,0%,100%,.8);
    font-size: 16px;
    
    .logo i {
      float: left;
      display: inline-block;
      margin-top: 7px;
      font-size: 55px;
      color: #176ff0;
    }
  
    .nav-item {
      display: block;
      padding: 0 15px;
      line-height: 60px;
      border-top: 3px solid transparent;
      
      &:hover {
        border-top: 3px solid #0671f0;
        
        a {
          color: #0671f0;
        }
      }
    }
    
    .nav-item a {
      text-decoration: none;
      color: #1d2b41;
    }
  }
</style>
