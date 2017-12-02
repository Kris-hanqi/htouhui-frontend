<template>
  <div class="head-top">
    <span>客服电话: 400-698-8810（工作日09:00 - 18:00）</span>
    <ul class="header-top_bar">
      <!--<li><a href="./login.html">登录</a></li>-->
      <li><a @click.stop="logout">退出</a></li>
      <!--<li><a href="./memberRegist">注册</a></li>-->
      <li><a href="/activity/information-discloture">信息披露</a></li>
      <li><a href="/education_column_list">网贷课堂</a></li>
      <li><a href="/latestActivityList">最新活动</a></li>
      <li><a href="/new-user/guide">帮助中心</a></li>
      <li>
        <i class="icon-mobile"></i>
        手机APP
        <div class="app-download">
        <i></i>
        <p>手机客户端下载</p>
      </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  .head-top {
    background-color: #7f828b;
  }
</style>