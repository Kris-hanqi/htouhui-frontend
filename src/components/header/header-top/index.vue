<template>
  <!-- 头部组件 顶部 -->
  <div class="header-top">
    <span>客服电话: 400-698-8810（工作日09:00 - 18:00）</span>
    <ul class="header-top_bar">
      <li><a @click.stop="logout">退出</a></li>
      <li><a href="/education_column_list">网贷课堂</a></li>
      <li><a href="/latestActivityList">最新活动</a></li>
      <li><a href="/new-user/guide">帮助中心</a></li>
      <li>
        <i class="ku-icon icon-phone"></i>
        手机APP
        <div class="app-download">
          <i></i>
          <img :src="img_smart_download02" alt=""/>
          <p>手机客户端下载</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import img_smart_download02 from 'assets/images/components/smart_download02.jpg';
  import { removeToken } from 'utils/auth';
  import { getLocationUrl } from 'utils/index';
  
  export default {
    name: 'HthHeaderTop',
    data() {
      return {
        img_smart_download02
      }
    },
    methods: {
      logout() {
        removeToken();
        window.location.href = getLocationUrl() + '/logout';
      }
    }
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
