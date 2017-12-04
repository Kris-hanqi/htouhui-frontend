<template>
  <div class="header-down">
    <div class="contain">
      <div class="header-down__logo">
        <i class="ku-icon icon-logo"></i>
      </div>
      <ul class="header-down__bar">
        <li><a href="/" active-class="active">首页</a></li>
        <li><a href="/plans">升薪宝量化</a></li>
        <li><a href="/shengxinbaos">升薪宝定期</a></li>
        <li><a href="/normalLoans">定期抵押</a></li>
        <li><a href="/st_page/safe">风控措施</a></li>
        <li><a href="">关于我们</a></li>
        <li class="header-down__account">
          <a href="./home.html">
            <avatar :src="headImg" icon="icon-avatar"></avatar>
            <span>我的账户</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Avatar from 'common/components/avatar/index';
  import img_logo from 'assets/images/logo.png';
  
  export default {
    components: {
      Avatar
    },
    computed: {
      ...mapGetters([
        'headImg'
      ])
    },
    data() {
      return {
        img_logo
      }
    }
  }
</script>

<style lang="scss">
  $hth-header-down-height: 70px;

  .header-down {
    display: inline-block;
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
    
    ul {
      margin-bottom: 0;
    }
  }

  .header-down__logo {
    display: inline-block;
    
    i {
      margin-top: 7px;
      font-size: 55px;
      color: #176ff0;
    }
  }

  .header-down__bar {
    float: right;
    height: $hth-header-down-height;

    li {
      float: left;
      text-align: center;
      height: $hth-header-down-height;

      a.active {
        border-top: 5px solid #2875d9;
        color: #2875d9;
      }
    }

    a {
      display: block;
      padding: 0 15px;
      line-height: $hth-header-down-height - 10;
      border-top: 5px solid transparent;

      &:hover {
        color: #2875d9;
      }
    }
  }
</style>
