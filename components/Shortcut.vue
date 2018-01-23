<template>
  <div class="shortcut-container">
    <div class="hth-container">
      <div class="contacts float-left">
        <span>客服热线：400-698-8810（工作日09:00 - 18:00）</span>
      </div>
      <div class="float-right">
        <ul class="nav">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/login">登录</nuxt-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">注册</a>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/education">网贷课堂</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/activity">最新活动</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/help">帮助中心</nuxt-link>
          </li>
          <el-popover
            ref="popover1"
            placement="bottom"
            title=""
            width="135px"
            trigger="hover">
            <img src="../assets/img/components/qr_code_download.jpg" alt="">
            <p style="text-align: center; margin-bottom: 0;">客户端下载</p>
          </el-popover>
          <li class="nav-item" v-popover:popover1>
            <i class="ku-icon icon-phone"></i>手机APP
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .shortcut-container {
    height: 30px;
    line-height: 30px;
    width: 100%;
    background-color: #f6f6f6;
    color: #727e90;
    font-size: 13px;
  
    .nav-link {
      padding: 0 10px;
    }
  
    .nav-item a {
      text-decoration: none;
      color: #7c86a2;
      
      &:hover,
      .active {
        color: #507dfb;
      }
    }
  }
</style>
