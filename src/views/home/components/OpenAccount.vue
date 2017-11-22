<template>
  <!-- 开户组件 -->
  <div class="open-account-wrapper">
    <el-dialog title="平台开户"
               width="730px"
               :before-close="handleClose"
               :visible.sync="visible">
      <el-steps :space="200" style="margin-left: 130px" :active="stepActive">
        <el-step title="注册"></el-step>
        <el-step title="开户"></el-step>
        <el-step title="交易密码"></el-step>
      </el-steps>
      <el-form class="open-account"
               style="margin-left: 100px"
               label-position="right"
               label-width="90px"
               v-if="stepActive === 2">
        <el-form-item label="姓名">
          <el-input v-model="openAccountData.realName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="openAccountData.idCard"></el-input>
        </el-form-item>
        <el-form-item label="绑定银行卡">
          <el-input v-model="openAccountData.cardNo"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="checked">江西银行存管协议</el-checkbox>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :loading="openAccountButLoading" @click="openAccount">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form label-position="right"
               style="margin-left: 130px; margin-top: 40px;"
               label-width="90px"
               v-if="stepActive === 3">
        <el-form-item class="mobile" label="手机号码">
          <p style="margin-top: -10px">{{ mobile }}</p>
        </el-form-item>
        <el-form-item class="sms-code" label="验证码">
          <el-col :span="11">
            <el-input v-model="transactionPasswordData.authCode"></el-input>
          </el-col>
          <el-col :span="11">
            <sms-timer @click.native.stop="sendCode" :start="startSmsTimer"></sms-timer>
          </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary next"
                     :loading="openAccountButLoading"
                     @click="setTransactionPassword">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  
    <!-- 网关交互组件 -->
    <request-bank-from :request-data="requestData"></request-bank-from>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import SmsTimer from 'common/sms-timer/index.vue';
  import RequestBankFrom from './RequestBankFrom.vue';
  import { fetchOpenAccount, fetchSetTransactionPassword } from 'api/home/account-set';
  import { fetchSendCode } from 'api/public';
  import { getLocationUrl } from 'utils/index';
  
  export default {
    components: {
      SmsTimer,
      RequestBankFrom
    },
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    computed: {
      ...mapGetters([
        'mobile',
        'uuid'
      ])
    },
    data() {
      return {
        checked: true,
        startSmsTimer: false,
        openAccountButLoading: false,
        dialogOpenAccountVisible: false,
        stepActive: 2,
        openAccountData: {
          realName: '',
          idCard: '',
          cardNo: ''
        },
        requestData: {},
        transactionPasswordData: {
          authCode: '',
          source: 'pc',
          sessionId: '',
          callbackUrl: getLocationUrl() + '/user/home.html'
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
      handleClose() {
        this.$emit('close');
      },
      setTransactionPassword() {
        this.transactionPasswordData.sessionId = this.uuid;
        fetchSetTransactionPassword(this.transactionPasswordData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.requestData = response.data.data;
            }
          })
      },
      openAccount() { // 开户操作
        this.openAccountButLoading = true;
        fetchOpenAccount(this.openAccountData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$message({
                message: '恭喜，开户成功!',
                type: 'success'
              });
              this.$store.commit('SET_STATUS', 1);
              this.stepActive = 3;
            } else {
              this.$message({
                message: '开户失败:' + response.data.meta.message + ',状态码: ' + response.data.meta.code,
                type: 'error'
              });
            }
            this.openAccountButLoading = false;
          })
      }
    }
  }
</script>

<style lang="scss">
  .open-account-wrapper {
    .open-account {
      input {
        width: 320px;
      }
    }
    
    .mobile {
      .el-form-item__content {
        padding-top: 10px;
      }
    }
  }
</style>
