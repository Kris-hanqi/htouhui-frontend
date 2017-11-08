<template>
  <div class="transaction-password-wrapper">
    <hth-panel title="设置交易密码">
      <el-form ref="transactionPassword" label-width="80px">
        <el-form-item label="手机号码">
          <span class="phone">{{ mobile || '无' }}</span>
        </el-form-item>
        <el-form-item label="验证码">
          <el-col :span="11">
            <el-input v-model="transactionPassword.authCode" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="11">
            <sms-timer @run="sendCode"></sms-timer>
          </el-col>
        </el-form-item>
      </el-form>
      <p class="yzmCodeSent">校验码已发出，请注意查收短信，如果没有收到，你可以在60秒后要求系统重新发送</p>
      <button class="submitBtn" @click="setPwd">下一步</button>
      <div class="split-line"></div>
      <div class="hth-tips">
        <h3>温馨提示</h3>
        <p>1、设置交易密码需获取手机验证码。</p>
        <p>2、提交手机验证码后会跳转至江西银行存管页面，为了保障你的资金安全，请定期更换你的密码，并确保登录设置与交易密码不同。</p>
      </div>
    </hth-panel>
    <request-bank-from :request-data="requestBankData"></request-bank-from>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import SmsTimer from 'common/sms-timer';
  import HthPanel from 'common/Panel/index.vue';
  import RequestBankFrom from '../../components/RequestBankFrom.vue';
  import { fetchSendCode } from 'api/public';
  import { fetchSetTransactionPassword, fetchResetTransactionPassword } from 'api/home/account-set';
  
  export default {
    components: {
      SmsTimer,
      HthPanel,
      RequestBankFrom
    },
    computed: {
      ...mapGetters([
        'mobile',
        'uuid',
        'transactionPasswordStatus'
      ])
    },
    data() {
      return {
        htmlStr: '',
        authType: 'set',
        requestBankData: {},
        transactionPassword: {
          source: 'pc',
          authCode: '',
          sessionId: '',
          callbackUrl: 'www.baidu.com'
        }
      }
    },
    methods: {
      sendCode() {
        fetchSendCode({ authType: 'set' })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$message({
                message: '验证码发送成功!',
                type: 'success'
              });
            }
          })
      },
      setPwd() {
        this.transactionPassword.sessionId = this.uuid;
        if (!this.transactionPasswordStatus) {
          fetchSetTransactionPassword(this.transactionPassword).then(response => {
            const data = response.data;
            if (data.meta.code === 200) {
              this.requestBankData = data.data;
            }
          });
        } else {
          fetchResetTransactionPassword(this.transactionPassword).then(response => {
            const data = response.data;
            if (data.meta.code === 200) {
              this.requestBankData = data.data;
            }
          });
        }
      }
    },
    created() {
      if (this.transactionPasswordStatus) {
        this.authType = 'reset';
      }
    }
  }
</script>

<style lang="scss">
  .transaction-password-wrapper {
    width: 832px;
    height: 797px;
    
    span.phone {
      padding-left: 15px;
      font-size: 16px;
      color: #394b67;
    }
    
    .el-form {
      padding-left: 40px;
      
      input {
        width: 252px;
        height: 54px;
        margin-top: -5px;
        background-color: #fff;
        box-sizing: border-box;
        border: solid 1px #bfc1c4;
        padding-left: 14px;
        margin-left: 10px;
      }
    }
    
    .el-form-item__label {
      font-size: 16px;
      color: #727e90;
    }
  
    p.yzmCodeSent {
      font-size: 14px;
      color: #838d9d;
      margin-left: 124px;
      margin-top: 14px;
    }
    
    .sms-timer {
      float: right;
      position: absolute;
      top: -1px;
      left: 260px;
    }
  
    .submitBtn {
      width: 203px;
      height: 46px;
      border-radius: 100px;
      background-color: #378ff6;
      color: #fff;
      margin-left: 152px;
      margin-top: 33px;
      margin-bottom: 39px;
      font-size: 18px;
      cursor: pointer;
    }
  }
</style>
