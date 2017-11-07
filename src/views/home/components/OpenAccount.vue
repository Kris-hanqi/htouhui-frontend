<template>
  <!-- 开户组件 -->
  <div class="open-account-wrapper">
    <el-dialog title="平台开户"
               :before-close="handleClose"
               :visible.sync="visible">
      <el-steps :space="200" :active="stepActive">
        <el-step title="注册"></el-step>
        <el-step title="开户"></el-step>
        <el-step title="交易密码"></el-step>
      </el-steps>
      <el-form class="hth-from open-account"
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
          <el-button type="primary" @click="openAccount">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form class="hth-from"
               label-position="right"
               label-width="90px"
               v-if="stepActive === 3">
        <el-form-item class="mobile" label="手机号码">
          <span>{{ mobile }}</span>
        </el-form-item>
        <el-form-item class="sms-code" label="验证码">
          <el-col :span="11">
            <el-input></el-input>
          </el-col>
          <el-col :span="11">
            <sms-timer style="margin-top: 5px;" @run="sendCode"></sms-timer>
          </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary next"
                     :loading="openAccountButLoading"
                     @click="openAccount">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import SmsTimer from 'common/sms-timer/index.vue';
  import { fetchOpenAccount } from 'api/home/account-set';
  import { fetchSendCode } from 'api/public';
  
  export default {
    components: {
      SmsTimer
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
        'mobile'
      ])
    },
    data() {
      return {
        checked: true,
        openAccountButLoading: false,
        dialogOpenAccountVisible: false,
        stepActive: 2,
        openAccountData: {
          realName: '',
          idCard: '',
          cardNo: ''
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
      handleClose() {
        this.$emit('close');
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
              this.stepActive = 3;
            } else {
              this.$message({
                message: '开户失败:' + response.data.meta.message,
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
    .el-dialog__body {
      padding-left: 85px;
    }
    
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
   
    button.next {
      width: 310px;
      height: 48px;
      border-radius: 100px;
      background-color: #0671f0;
      
      span {
        width: 48px;
        height: 16px;
        font-size: 16px;
        color: #fff;
      }
    }
  }
</style>
