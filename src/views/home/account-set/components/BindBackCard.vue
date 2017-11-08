<template>
  <div class="bind-back-card-wrapper">
    <hth-panel title="绑定银行卡">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="control-label">用户名</label>
          <div class="input-block">
            <div class="form-control-static">xiaohai</div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">手机号</label>
          <div class="input-block">
            <div class="form-control-static">xiaohai</div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">真实姓名</label>
          <div class="input-block">
            <div class="form-control-static">xiaohai</div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">身份证号</label>
          <div class="input-block">
            <div class="form-control-static">xiaohai</div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">银行卡号</label>
          <div class="input-block">
            <input style="width: 266px;" class="form-control" type="text" placeholder="请输入标题">
          </div>
        </div>
      </form>
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
