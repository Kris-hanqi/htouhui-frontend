<template>
  <div class="header-down">
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
</template>

<script>
  import img_logo from '@/assets/images/logo.png';
  export default {
    name: 'HthHeaderDown',
    data() {
      return {
        img_logo
      }
    },
    methods: {
      clickFn() {
        this.$router.push({ path: '/information-disclosure' });
      }
    }
  }
</script>

<style lang="scss" scoped>
  $hth-header-down-height: 70px;

  .header-down {
    height: $hth-header-down-height;
    line-height: $hth-header-down-height;
    background-color: #fff;
    font-size: 16px;
  }

  .header-down__logo {
    display: inline-block;
    width: 148px;
    height: $hth-header-down-height;

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
        border-top: 2px solid #2875d9;

        a {
          color: #2875d9;
          margin-top: -3px;
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
