<template>
  <div>
    绑卡
  </div>
</template>

<script>
  import { fetchBindBankCard } from 'api/home/account-set';
  
  export default {
    data() {
      return {
        bankCard: '' // 银行卡号
      }
    },
    methods: {
      bindBankCard() {
        fetchBindBankCard(this.bankCard).then(response => {
          console.log(response);
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
