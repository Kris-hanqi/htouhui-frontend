<template>
  <div class="bind-back-card-wrapper">
    <hth-panel title="绑定银行卡" v-loading="loading" element-loading-text="银行卡绑定中...">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-md-2 control-label">用户名</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ username || '无' }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">手机号</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ mobile || '无' }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">真实姓名</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ realName || '无' }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">身份证号</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ IDNumber || '无' }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">银行卡号</label>
          <div class="col-md-5">
            <input type="text" v-model.number="bankCard" class="form-control" placeholder="请输入银行卡号">
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-offset-2 col-md-4">
            <el-button class="btn-block" type="primary" @click="bindBankCard" :loading="loading" round>提交</el-button>
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
              this.$store.commit('SET_BANK_CARD', response.data.data.cardNo);
              this.$store.commit('SET_IS_BANK_CARD', true);
              this.$store.commit('SET_BANK_NAME', response.data.data.bankName);
              this.$store.commit('SET_BANK_NO', response.data.data.bankNo);
              this.$store.commit('SET_STATUS', 3);
              this.bankCard = '';
              this.$router.push('/accountManage/set/index');
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
