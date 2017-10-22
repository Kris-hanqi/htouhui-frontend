<template>
  <div class="header-top">
    <span>
      客服电话: <span class="roboto-regular">400-698-8810</span>（工作日 <span class="roboto-regular">09:00 - 18:00</span>）
    </span>
    <ul class="header-top_bar">
      <li><a href="./login.html">登录</a></li>
      <li><a href="">注册</a></li>
      <li><a href="">信息披露</a></li>
      <li><a href="">网贷课堂</a></li>
      <li><a href="">网贷课堂</a></li>
      <li><a href="">最新活动</a></li>
      <li><a href="">帮助中心</a></li>
      <li>
        <i class="icon-mobile"></i>
        手机APP
        <div class="app-download">
          <i></i>
          <img src="../../../assets/images/components/smart_download02.jpg" alt=""/>
          <p>手机客户端下载</p>
        </div>
      </li>
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
  $hth-header-top-height: 30px;

  .header-top {
    height: $hth-header-top-height;
    line-height: $hth-header-top-height;
    color: $hth-header-top-text-color;
    font-size: 12px;
    font-weight: bold;
  }

  .header-top_bar {
    float: right;
  }

  .header-top_bar li {
    float: left;
    margin-left: 20px;

    &:last-child {
      position: relative;
      cursor: default;

      .icon-mobile {
        display: inline-block;
        vertical-align: middle;
        width: 13px;
        height: 19px;
        background: url(../../../assets/images/index-ico-phone.png) no-repeat center;
        margin-right: 5px;
      }

      .app-download {
        display: none;
        position: absolute;
        z-index: 3;
        top: 37px;
        left: 50%;
        margin-left: -72px;
        text-align: center;
        width: 145px;
        height: 155px;
        border: 1px solid #e8e8e8;
        background-color: #fff;

        i {
          display: inline-block;
          position: absolute;
          top: -8px;
          left: 50%;
          margin-left: -6px;
          width: 13px;
          height: 8px;
          background: url(../../../assets/images/components/up_arrow.png) no-repeat center;
        }

        img {
          width: 125px;
          height: 125px;
          margin-top: 8px;
        }

        p {
          margin-top: -18px;
        }
      }

      &:hover {
        .app-download {
          display: block;
        }
      }
    }

    a {
      &.active {
        color: #507dfb;
      }

      &:hover,
      &:before {
        color: #507dfb;
      }
    }
  }
</style>
