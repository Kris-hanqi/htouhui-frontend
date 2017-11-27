<!-- 显示银行卡 -->
<template>
  <div class="back-card-wrapper">
    <div class="card" :class="classes" v-if="bankCard">
      <p>{{ bankCard }}</p>
    </div>
    <div class="no-bank-card" v-else="">
      <i class="iconfont icon-add"></i>
      <p>您暂未绑定银行卡</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters([
        'bankNo',
        'bankCard'
      ]),
      classes() {
        return [
          `card-${this.bankNo}`
        ];
      }
    }
  }
</script>

<style lang="scss">
  $back-card-list: ABC, BCCB, BF, BOC, BOCO, BRCB, CBHB, CCB, CEB, CIB, CITIC, CMBC, CMBCHINA, CZB, ECITIC, ECPSS, GDB, HXB, ICBC, NCCBANK, NJCB, PAB, POST, SDB, SPDB, undefined, WYZX;
  
  .back-card-wrapper {
    .no-bank-card {
      width: 300px;
      height: 170px;
      border-radius: 11px;
      background-color: #f6f9fe;
      padding-top: 38px;
      
      i {
        display: block;
        font-size: 64px;
        width: 62px;
        height: 62px;
        margin: 0 auto;
        color: #c0cee5;
      }
  
      p {
        font-size: 16px;
        color: #5c6b82;
        text-align: center;
        margin-top: 15px;
      }
    }
    
    .card {
      width: 300px;
      height: 163px;
  
      p {
        font-size: 26px;
        padding-top: 75px;
        margin-left: 20px;
        color: #fff;
      }
    }
  
    /* stylelint-disable-next-line */
    @each $bg in $back-card-list {
      .card-#{$bg} {
        background: url('../../../assets/images/backCards/#{$bg}.png') no-repeat;
      }
    }
  }
</style>
