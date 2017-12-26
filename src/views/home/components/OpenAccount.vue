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
          <input type="text" v-model="openAccountData.cardNo"  class="form-control" placeholder="请输入银行卡号">
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">验证码</label>
        <div class="col-md-5">
          <input class="form-control"
                 type="text"
                 v-model="openAccountData.smsCode"
                 maxlength="6" placeholder="请输入短信验证码">
        </div>
        <div class="col-md-5">
          <sms-timer :start="startSmsTimer" :second="90" @countDown="startSmsTimer = false" @click.native='sendCode'></sms-timer>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-5">
          <el-checkbox v-model="protocolChecked"
                       :class="{ shake: showAnimate }"
                       class="animated">
            同意<a :href="baseUrl + '/hetong/20161108105926'" target="_blank">《江西银行存管协议》</a>
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
  import SmsTimer from 'common/sms-timer';
  import { validateIdCard, validateChinese } from 'utils/validate';
  import { fetchOpenAccount } from 'api/home/account-set';
  import { fetchUpdateUserStatus } from 'api/home/public';
  import { fetchSendCodeNew } from 'api/public';
  
  export default {
    components: {
      SmsTimer
    },
    computed: {
      ...mapGetters([
        'username',
        'baseUrl'
      ])
    },
    data() {
      return {
        startSmsTimer: false,
        showAnimate: false,
        loading: false,
        protocolChecked: true,
        openAccountData: {
          realName: '',
          idCard: '',
          cardNo: '',
          smsCode: ''
        }
      }
    },
    methods: {
      sendCode() {
        this.startSmsTimer = true;
        fetchSendCodeNew({ type: 'accountOpenPlus' })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$message({
                message: '验证码发送成功!',
                type: 'success'
              });
            }
          })
      },
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
        if (!validateChinese(this.openAccountData.realName)) {
          this.$message({
            message: '真实姓名只能为中文字符',
            type: 'warning'
          });
          return;
        }
        // 校验身份证号
        if (!this.openAccountData.idCard) {
          this.$message({
            message: '身份证号不能为空',
            type: 'warning'
          });
          return;
        }
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
        // 校验验证码
        if (!this.openAccountData.smsCode) {
          this.$message({
            message: '验证码不能为空',
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
              this.$store.commit('SET_ID_NUMBER', response.data.data.idCard);
              this.$store.commit('SET_ACCOUNT_ID', response.data.data.accountId);
              this.$store.commit('SET_BANK_CARD', response.data.data.cardNo);
              this.$store.commit('SET_BANK_NO', response.data.data.bankNo);
              this.$store.commit('SET_IS_OPEN_ACCOUNT', true);
              this.$store.commit('SET_IS_BANK_CARD', true);
              this.$store.commit('SET_NOVICE_PLAN_STATUS', 1);
              this.$emit('success');
              // 请求刷新用户状态
              fetchUpdateUserStatus();
              this.$message({
                message: '恭喜，开户成功!',
                type: 'success'
              });
            }
            if (response.data.meta.code === 9999) {
              this.$notify.error({
                title: '开户失败',
                message: response.data.meta.message
              });
            }
            if (response.data.meta.code === 1020) {
              this.$notify.error({
                title: '开户失败',
                message: response.data.meta.message
              });
              this.startSmsTimer = false;
            }
            this.loading = false;
          })
      }
    }
  }
</script>
