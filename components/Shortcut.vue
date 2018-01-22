<template>
  <section class="shortcut-container">
    <div class="hth-container">
      <div class="contacts float-left">
        <span>客服热线：400-698-8810（工作日09:00 - 18:00）</span>
      </div>
      <ul class="nav float-right">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/login">登录</nuxt-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">注册</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">网贷课堂</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">最新活动</a>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/help">帮助中心</nuxt-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">手机APP</a>
        </li>
      </ul>
    </div>
  </section>
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
  }
</style>
