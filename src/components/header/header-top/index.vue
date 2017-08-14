<template>
  <div class="header-top">
    <div class="main-section">
    <span class="tel-phone">
      <i class="fa fa-phone" aria-hidden="true"></i>客服电话: 400-698-8810（工作日 09:00 - 18:00）
    </span>
      <ul class="site-nav">
        <li class="nav-item">
          <a class="active" href="">立即登录</a>
        </li>
        <li class="nav-item padding-item">
          <a class="item-border">免费注册</a>
        </li>
        <li class="nav-item padding-item">
          <a class="item-border">活动中心</a>
        </li>
        <li class="nav-item padding-item">
          <a class="item-border">新手指引</a>
        </li>
        <li class="nav-item padding-item">
          <a class="item-border">网贷课堂</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HthHeaderTop'
  }
</script>

<style lang="scss" scoped>
  .header-top {
    height: 36px;
    line-height: 36px;
    font-size: 12px;

    .main-section {
      height: 100%;
      color: #fefefe;

      .tel-phone {
        float: left;
        height: 100%;
      }

      i {
        margin-right: 5px;
      }

      .site-nav {
        float: right;
      }

      .nav-item {
        float: left;
        height: 36px;
        text-align: center;
      }

      a {
        padding: 0 10px;

        &:hover,
        &:before {
          color: #7feff9;
        }

        &.active {
          color: #ffda1a;
        }
      }

      .item-border {
        border-left: 1px solid #dcdcdc;
      }
    }
  }
</style>
