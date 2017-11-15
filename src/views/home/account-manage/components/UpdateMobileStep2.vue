<template>
  <div class="update-mobile-wrapper">
    <hth-panel title="验证手机号">
      <el-form :model="mobileInfo" label-width="80px">
        <el-form-item label="用户名">
          <span>{{ username }}</span>
        </el-form-item>
        <el-form-item label="新手机号">
          <el-input style="width: 380px" v-model="mobileInfo.mobileNumber" :maxlength="11" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-col :span="8">
            <el-input v-model="mobileInfo.authCode" :maxlength="6" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="11">
            <sms-timer @run="sendCode"></sms-timer>
          </el-col>
        </el-form-item>
        <el-form-item v-if="showCodePrompt">
          <span>校验码已发出，请注意查收短信，如果没有收到，你可以在60秒后要求系统重新发送</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="bindMobile" style="width: 200px" round>提交</el-button>
        </el-form-item>
      </el-form>
      <div class="split-line"></div>
      <div class="hth-tips">
        <h3>温馨提示</h3>
        <p>为了您的账户安全，更换手机号码需填写原来绑定的手机号验证码。</p>
      </div>
    </hth-panel>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import SmsTimer from 'common/sms-timer';
  import HthPanel from 'common/Panel/index.vue';
  import { fetchSendCodeNew } from 'api/public';
  import { fetchCheckCurrentMobile } from 'api/home/account-set';
  
  export default {
    components: {
      SmsTimer,
      HthPanel
    },
    computed: {
      ...mapGetters([
        'username',
        'mobile'
      ])
    },
    data() {
      return {
        showCodePrompt: false,
        mobileInfo: {
          type: 'change_binding_mobile_number',
          mobileNumber: ''
        }
      }
    },
    methods: {
      sendCode() {
        fetchSendCodeNew(this.mobileInfo)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.showCodePrompt = true;
              this.$message({
                message: '手机验证码已发送',
                type: 'success'
              });
            }
          })
      },
      bindMobile() {
        fetchCheckCurrentMobile(this.mobileInfo)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$router.push('/accountManage/set/index');
              this.$notify({
                title: '修改成功',
                message: '手机号已修改,下次登录使用新手机号!',
                type: 'success'
              });
            }
            if (response.data.meta.code === 9999) {
              this.$notify({
                title: '绑定失败',
                message: response.data.meta.message,
                type: 'error'
              });
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  .update-mobile-wrapper {
    width: 832px;
    height: 797px;
  }
</style>
