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
  
    <!-- 验证用户操作组件 需开户 -->
    <operational-validate ref="validateSteps"></operational-validate>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { fetchSetTransactionPassword } from 'api/home/account-set';
  import { fetchSendCode } from 'api/public';
  import SmsTimer from 'common/sms-timer';
  import RequestBankFrom from './RequestBankFrom.vue';
  import OperationalValidate from './OperationalValidate.vue';
  
  const labelName = 'setPasswordTime';
  
  export default {
    components: {
      SmsTimer,
      RequestBankFrom,
      OperationalValidate
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
        // 校验是否可以发送设置交易密码 五分钟锁定
        const result = this.validateTime();
        if (!result) return;
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
      validateTime() {
        let result = true;
        const data = localStorage.getItem(labelName);
        let setTime = null;
        let username = null;
        if (data) {
          setTime = data.split('_')[1];
          username = data.split('_')[0];
        }
        // 判断是否是同一用户
        if (username && setTime && this.$store.getters.username === username) {
          const timeStamp = new Date().getTime();
          if ((timeStamp - setTime) <= 5 * 60 * 1000) {
            const time = parseInt((5 * 60 * 1000 - (timeStamp - setTime)) / (1000 * 60));
            this.$message({
              message: `设置交易密码银行正在审核中，请${time}分钟后重试!`,
              type: 'warning'
            });
            result = false;
          }
        }
        return result;
      },
      setTransactionPassword() {
        // 设置交易密码前必须开户
        const validateSteps = ['openAccount'];
        const result = this.$refs['validateSteps'].validate(validateSteps); // eslint-disable-line
        if (!result) return;
        // 校验是否可以发送设置交易密码 五分钟锁定
        const validateResult = this.validateTime();
        if (!validateResult) return;
        // 验证码不能为空
        if (!this.transactionPassword.authCode) {
          this.$message({
            message: '验证码不能为空!',
            type: 'warning'
          });
          return;
        }
        this.transactionPassword.sessionId = this.uuid;
        this.transactionPassword.callbackUrl = `${this.baseUrl}/user/home.html#/accountManage/set`;
        fetchSetTransactionPassword(this.transactionPassword)
          .then(response => {
            const data = response.data;
            if (data.meta.code === 200) {
              // 数据请求成功 - 设置请求时间
              const timeStamp = new Date().getTime();
              if (this.$store.getters.username) {
                localStorage.setItem(labelName, this.$store.getters.username + '_' + timeStamp);
              }
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
