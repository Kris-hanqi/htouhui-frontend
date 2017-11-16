<!-- 显示银行卡 -->
<template>
  <div class="back-card-wrapper">
  
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'realName',
        'username',
        'status',
        'bankCard'
      ])
    }
  }
</script>

<style lang="scss">
  .back-card-wrapper {
    .no-bank-card {
      width: 300px;
      height: 125px;
      border-radius: 11px;
      background-color: #f6f9fe;
      margin-top: 44px;
      margin-left: 54px;
      padding-top: 38px;

      span {
        display: block;
        width: 62px;
        height: 62px;
        margin: 0 auto;
        background: url(../../../assets/images/home/center-recharge-addBankCard.png) no-repeat;
      }
  
      p {
        font-size: 16px;
        color: #5c6b82;
        text-align: center;
        margin-top: 15px;
      }
    }
  }
</style>
