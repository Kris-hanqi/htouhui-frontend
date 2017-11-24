<template>
  <div class="open-account">
    <form class="form-horizontal">
      <div class="form-group">
        <label class="col-md-2 control-label">手机号码</label>
        <div class="col-md-5">
          <p class="form-control-static">{{ mobile || '无' }}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-2 control-label">验证码</label>
        <div class="col-md-5">
          <input class="form-control"
                 type="text"
                 v-model="transactionPassword.authCode"
                 maxlength="6" placeholder="请输入短信验证码">
        </div>
        <div class="col-md-5">
          <sms-timer :start="startSmsTimer" @countDown="startSmsTimer = false" @click.native='sendCode'></sms-timer>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-5">
          <el-button type="primary" @click="setTransactionPassword" :loading="loading" round>提交</el-button>
        </div>
      </div>
    </form>
  
    <!-- 网关交互组件 -->
    <request-bank-from :request-data="requestBankData"></request-bank-from>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { fetchSetTransactionPassword } from 'api/home/account-set';
  import { fetchSendCode } from 'api/public';
  import SmsTimer from 'common/sms-timer';
  import RequestBankFrom from './RequestBankFrom.vue';
  
  export default {
    components: {
      SmsTimer,
      RequestBankFrom
    },
    computed: {
      ...mapGetters([
        'mobile',
        'baseUrl',
        'uuid'
      ])
    },
    data() {
      return {
        loading: false,
        startSmsTimer: false,
        requestBankData: {},
        transactionPassword: {
          source: 'pc',
          authCode: '',
          sessionId: '',
          callbackUrl: ''
        }
      }
    },
    methods: {
      sendCode() {
        fetchSendCode({ authType: 'set' })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.startSmsTimer = true;
              this.$message({
                message: '验证码发送成功!',
                type: 'success'
              });
            }
          })
      },
      setTransactionPassword() {
        if (!this.transactionPassword.authCode) return;
        this.transactionPassword.sessionId = this.uuid;
        this.transactionPassword.callbackUrl = `${this.baseUrl}/user/home.html#/accountManage/set`;
        fetchSetTransactionPassword(this.transactionPassword)
          .then(response => {
            const data = response.data;
            if (data.meta.code === 200) {
              this.requestBankData = data.data;
            }
            if (data.meta.code !== 500 && data.meta.code !== 600) {
              this.$notify({
                title: '操作失败',
                message: data.meta.message,
                type: 'error'
              });
            }
          });
      }
    }
  }
</script>
