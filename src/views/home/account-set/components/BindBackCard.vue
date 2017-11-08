<template>
  <div class="bind-back-card-wrapper">
    <hth-panel title="绑定银行卡">
      <div>
        我是内容
      </div>
    </hth-panel>
  </div>
</template>

<script>
  import HthPanel from 'common/Panel/index.vue';
  import { fetchBindBankCard } from 'api/home/account-set';
  
  export default {
    components: {
      HthPanel
    },
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
