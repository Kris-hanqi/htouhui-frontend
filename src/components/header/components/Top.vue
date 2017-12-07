<template>
  <div class="header-top">
    <span>客服电话: 400-698-8810（工作日09:00 - 18:00）</span>
    <ul class="header-top__bar">
      <li><a @click.stop="logout">退出</a></li>
      <li><a href="/activity/information-discloture">信息披露</a></li>
      <li><a href="/education_column_list">网贷课堂</a></li>
      <li><a href="/latestActivityList">最新活动</a></li>
      <li><a href="/new-user/guide">帮助中心</a></li>
      <li class="app-download">
        <span>
          <i class="ku-icon icon-phone"></i>手机APP
        </span>
        <div class="popover">
          <i></i>
          <img :src="img_qr_code"/>
          <p>手机客户端下载</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import img_qr_code from 'assets/components/qr-code-01.jpg';
  import { removeToken } from 'utils/auth';
  import { getLocationUrl } from 'utils/index';
  
  export default {
    name: 'HthHeaderTop',
    data() {
      return {
        img_qr_code,
        showQRCode: false
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

<style lang="scss">
  $header-top-text-color: #7c86a2;
  $header-top-height: 30px;
  
  .header-top {
    height: $header-top-height;
    width: 1000px;
    margin: 0 auto;
    line-height: $header-top-height;
    color: $header-top-text-color;
    font-size: 12px;
    font-weight: bold;
  
    .header-top__bar {
      float: right;
    }
  
    ul,
    li {
      padding: 0;
      margin: 0;
    }
    
    a {
      text-decoration: none;
      color: $header-top-text-color;
      
      &:hover {
        color: #7c86a2;
      }
    }
  
    li {
      float: left;
      margin-left: 20px;
      list-style: none;
    
      &:last-child {
        position: relative;
        cursor: default;
      }
    }
  
    .app-download {
      .popover {
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
          background: url(../../../assets/components/up_arrow.png) no-repeat center;
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
        .popover {
          display: block;
        }
      }
    }
  }
</style>
