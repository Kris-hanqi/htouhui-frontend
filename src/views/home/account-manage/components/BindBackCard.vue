<template>
  <div class="bind-back-card-wrapper">
    <hth-panel title="绑定银行卡" v-loading="loading" element-loading-text="银行卡绑定中...">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="control-label">用户名</label>
          <div class="input-block">
            <div class="form-control-static">{{ username }}</div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">手机号</label>
          <div class="input-block">
            <div class="form-control-static">{{ mobile }}</div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">真实姓名</label>
          <div class="input-block">
            <div class="form-control-static">{{ realName }}</div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">身份证号</label>
          <div class="input-block">
            <div class="form-control-static">{{ IDNumber }}</div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">银行卡号</label>
          <div class="input-block">
            <input style="width: 266px;" v-model="bankCard" class="form-control" type="text" placeholder="请输入银行卡号">
          </div>
        </div>
        <div class="form-group">
          <div class="input-block" style="width: 200px;">
            <button type="button" @click="bindBankCard" class="hth-btn hth-btn-primary hth-btn-lg hth-btn-block">提交</button>
          </div>
        </div>
      </form>
      <div class="split-line"></div>
      <div class="hth-tips">
        <h3>温馨提示</h3>
        <p>1、请确认银行卡为本人银行卡，此银行卡绑定成功后，将用于日后提现以及充值时使用。</p>
        <p>2、不支持信用卡绑卡。</p>
        <p>3、江西银行电子账户将采用同卡进出原则，即账户资金只能提现至已绑定银行卡内，且当您的电子账户余额与待收金额同时为0时，才可更换银行卡。</p>
      </div>
    </hth-panel>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HthPanel from 'common/Panel/index.vue';
  import { fetchBindBankCard } from 'api/home/account-set';
  
  export default {
    components: {
      HthPanel
    },
    computed: {
      ...mapGetters([
        'realName',
        'mobile',
        'username',
        'IDNumber'
      ])
    },
    data() {
      return {
        loading: false,
        bankCard: '' // 银行卡号
      }
    },
    methods: {
      bindBankCard() {
        this.loading = true;
        fetchBindBankCard(this.bankCard)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$store.commit('SET_BANK_CARD', this.bankCard);
              this.bankCard = '';
              this.$router.push('/accountSet');
              this.$message({
                message: '银行卡绑定成功！',
                type: 'success'
              });
            }
            this.loading = false;
          })
      }
    }
  }
</script>
