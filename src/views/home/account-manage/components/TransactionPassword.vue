<template>
  <div class="transaction-password-wrapper">
    <hth-panel title="设置交易密码">
      <transaction-password @success="setSuccess"></transaction-password>
      <div class="split-line"></div>
      <div class="hth-tips">
        <h3>温馨提示</h3>
        <p>1、设置交易密码需获取手机验证码。</p>
        <p>2、提交手机验证码后会跳转至江西银行存管页面，为了保障你的资金安全，请定期更换你的密码，并确保登录设置与交易密码不同。</p>
      </div>
    </hth-panel>
  </div>
</template>

<script>
  import HthPanel from 'common/Panel/index.vue';
  import TransactionPassword from '../../components/TransactionPassword.vue';
  
  export default {
    components: {
      TransactionPassword,
      HthPanel
    },
    data() {
      return {}
    },
    methods: {
      setSuccess() {
        console.log('数据请求成功!');
      }
    }
  }
</script>

<style lang="scss">
  .transaction-password-wrapper {
    width: 832px;
    height: auto;
  }
</style>
