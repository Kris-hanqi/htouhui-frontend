<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
  import Vue from 'vue';
  const isServer = Vue.prototype.$isServer;
  
  export default {
    created() {
      if (!isServer) {
        console.log('加入海投汇，成为一名耐撕的前端工程师。');
        console.log('请将简历发送至 %c xingkang.wang@htouhui.com (邮件标题请以“姓名-前端工程师-来自console”命名)','color:green');
      }
    }
  }
</script>
