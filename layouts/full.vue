<template>
  <div class="full-container">
    <shortcut></shortcut>
    <hth-header></hth-header>
    <nuxt/>
    <hth-footer></hth-footer>
  </div>
</template>

<script>
  import Shortcut from '~/components/Shortcut.vue';
  import HthHeader from '~/components/Header.vue';
  import HthFooter from '~/components/Footer.vue';
  
  export default {
    components: {
      Shortcut,
      HthHeader,
      HthFooter
    },
    created() {
      console.log('加入海投汇，成为一名耐撕的前端工程师。');
      console.log('请将简历发送至 %c xingkang.wang@htouhui.com (邮件标题请以“姓名-前端工程师-来自console”命名)','color:green');
    }
  }
</script>
