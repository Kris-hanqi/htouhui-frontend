<template>
  <div class="header-down">
    <div class="main-section">
      <div class="logo">
        <img src="../../../../static/images/logo.png" alt=""/>
      </div>
      <div class="logo-other">
        <img src="../../../../static/images/logo_kongzhong_jxbank.png" alt=""/>
      </div>
      <ul class="index-nav">
        <li class="nav-item">
          <a class="active" href="">首页</a>
        </li>
        <li class="nav-item">
          <a href="">我要投资</a>
        </li>
        <li class="nav-item">
          <a href="">债权转让</a>
        </li>
        <li class="nav-item">
          <a href="">风控措施</a>
        </li>
        <li class="nav-item">
          <a href="" class="information-disclosure" @click="clickFn()">信息披露</a>
        </li>
        <li class="nav-item">
          <a href="">关于我们</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HthHeaderDown',
    computed: {
      clickFn() {
        this.$router.go('/information-disclosure');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-down {
    height: 74px;
    background-color: #fff;
    line-height: 74px;
    font-size: 16px;

    .main-section {
      width: 1000px;
      margin: 0 auto;
      color: #000;

      .logo {
        display: inline-block;
        width: 148px;
        height: 74px;

        img {
          width: 100%;
        }
      }

      .logo-other {
        display: inline-block;
        width: 307px;
        height: 74px;

        img {
          width: 100%;
        }
      }

      .index-nav {
        float: right;
        height: 74px;

        .nav-item {
          float: left;
          text-align: center;

          a {
            box-sizing: border-box;
            padding: 25px 15px;

            &:hover,
            &.active {
              color: #2875d9;
              border-bottom: 4px solid #2875d9;
            }
          }
        }
      }
    }
  }
</style>
