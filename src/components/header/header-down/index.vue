<template>
  <div class="header-down">
    <div class="contain">
      <div class="header-down__logo">
        <img :src="img_logo" alt="海投汇"/>
      </div>
      <ul class="header-down__bar">
        <li class="active"><a href="">首页</a></li>
        <li><a href="">升薪宝量化</a></li>
        <li><a href="">升薪宝定期</a></li>
        <li><a href="">定期抵押</a></li>
        <li><router-link to="'/information-disclosure'">风控措施</router-link></li>
        <li><a href="">关于我们</a></li>
        <li class="header-down__account">
          <router-link to="'/information-disclosure'">
            <div class="portrait">
              <i class="fa fa-user-o" aria-hidden="true"></i>
            </div>
            <span>我的账户</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import img_logo from '@/assets/images/logo.png';
  export default {
    name: 'HthHeaderDown',
    data() {
      return {
        img_logo
      }
    }
  }
</script>

<style lang="scss" scoped>
  $hth-header-down-height: 70px;

  .header-down {
    width: 100%;
    height: $hth-header-down-height;
    line-height: $hth-header-down-height;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 16px;

    .contain {
      width: 1000px;
      height: $hth-header-down-height;
      margin: 0 auto;
    }
  }

  .header-down__logo {
    display: inline-block;
    width: 149px;
    height: 41px;
    margin-top: 15px;

    img {
      width: 100%;
    }
  }

  .header-down__bar {
    float: right;
    height: $hth-header-down-height;

    li {
      float: left;
      text-align: center;

      &.active {
        border-top: 5px solid #2875d9;

        a {
          color: #2875d9;
          margin-top: -5px;
        }
      }
    }

    a {
      display: block;
      padding: 0 15px;

      &:hover,
      &.active {
        color: #2875d9;
      }
    }
  }

  .header-down__account {
    .portrait {
      display: inline-block;
      position: relative;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      line-height: 30px;
      background: #eef2fe;

      i {
        color: #8b93ad;
      }
    }
  }
</style>
