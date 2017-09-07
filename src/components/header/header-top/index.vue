<template>
  <div class="header-top">
    <span>
      客服电话: <span>400-698-8810</span>（工作日 <span>09:00 - 18:00</span>）
    </span>
    <ul class="header-top__bar">
      <li><a class="active" href="">登录</a></li>
      <li><a href="">注册</a></li>
      <li><a href="">信息披露</a></li>
      <li><a href="">网贷课堂</a></li>
      <li><a href="">网贷课堂</a></li>
      <li><a href="">最新活动</a></li>
      <li><a href="">帮助中心</a></li>
      <li><i class="fa fa-mobile" aria-hidden="true"></i>手机APP</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HthHeaderTop'
  }
</script>

<style lang="scss" scoped>
  $hth-header-top-text-color: #929ba9;
  $hth-header-top-height: 34px;

  .header-top {
    height: $hth-header-top-height;
    line-height: $hth-header-top-height;
    color: $hth-header-top-text-color;
    font-size: 12px;
    font-weight: bold;
  }

  .header-top__bar {
    float: right;
  }

  .header-top__bar li {
    float: left;
    margin-left: 20px;

    i {
      float: left;
      margin-top: 9px;
      font-size: 18px;
      padding-right: 5px;
    }

    a {
      &.active {
        color: #7594fa;
      }

      &:hover,
      &:before {
        color: #7594fa;
      }
    }
  }
</style>
