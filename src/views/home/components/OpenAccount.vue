<template>
  <div class="open-account">
    <form class="form-horizontal">
      <div class="form-group">
        <label class="col-md-2 control-label">用户名</label>
        <div class="col-md-5">
          <p class="form-control-static">{{ username || '无' }}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">真实姓名</label>
        <div class="col-md-5">
          <input type="text" v-model="openAccountData.realName" class="form-control" placeholder="请输入真实姓名">
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">身份证号</label>
        <div class="col-md-5">
          <input type="text" v-model="openAccountData.idCard" class="form-control" placeholder="请输入身份证号">
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">银行卡号</label>
        <div class="col-md-5">
          <input type="text" v-model.number="openAccountData.cardNo"  class="form-control" placeholder="请输入银行卡号">
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-5">
          <el-checkbox v-model="protocolChecked"
                       :class="{ shake: showAnimate }"
                       class="animated">
            同意<a :href="baseUrl + '/hetong/20161102021037'" target="_blank">《江西银行存管协议》</a>
          </el-checkbox>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-5">
          <el-button type="primary" @click="openAccount" :loading="loading" round>提交</el-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { validateIdCard } from 'utils/validate';
  import { fetchOpenAccount } from 'api/home/account-set';
  
  export default {
    computed: {
      ...mapGetters([
        'username',
        'baseUrl'
      ])
    },
    data() {
      return {
        showAnimate: false,
        loading: false,
        protocolChecked: true,
        openAccountData: {
          realName: '',
          idCard: '',
          cardNo: ''
        }
      }
    },
    methods: {
      openAccount() { // 开户操作
        // 校验是否勾选协议
        if (!this.protocolChecked) {
          this.showAnimate = true;
          setTimeout(() => {
            this.showAnimate = false;
          }, 2000);
          return;
        }
        // 校验用户姓名
        if (!this.openAccountData.realName) {
          this.$message({
            message: '真实姓名不能为空',
            type: 'warning'
          });
          return;
        }
        // 校验身份证号
        if (!validateIdCard(this.openAccountData.idCard)) {
          this.$message({
            message: '身份证号不合法',
            type: 'warning'
          });
          return;
        }
        // 校验银行卡号
        if (!this.openAccountData.cardNo) {
          this.$message({
            message: '银行卡号不能为空',
            type: 'warning'
          });
          return;
        }
        this.loading = true;
        fetchOpenAccount(this.openAccountData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$store.commit('SET_STATUS', 1);
              this.$store.commit('SET_REAL_NAME', response.data.data.realName);
              this.$store.commit('SET_ACCOUNT_ID', response.data.data.accountId);
              this.$store.commit('SET_BANK_CARD', response.data.data.cardNo);
              this.$store.commit('SET_BANK_NO', response.data.data.bankNo);
              this.$store.commit('SET_IS_OPEN_ACCOUNT', true);
              this.$store.commit('SET_IS_BANK_CARD', true);
              this.$emit('success');
              this.$message({
                message: '恭喜，开户成功!',
                type: 'success'
              });
            }
            this.loading = false;
          })
      }
    }
  }
</script>
