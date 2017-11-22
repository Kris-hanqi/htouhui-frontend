<template>
  <div class="bind-email-wrapper">
    <hth-panel title="绑定邮箱">
      <el-form :model="bindEmailData" label-width="80px">
        <el-form-item label="用户名">
          <span>{{ username }}</span>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input style="width: 360px;" v-model="bindEmailData.email" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-col :span="8">
            <el-input v-model="bindEmailData.authCode" :maxlength="6" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="11">
            <sms-timer :start="startSmsTimer" @countDown="startSmsTimer = false" @click.native='sendCode'></sms-timer>
          </el-col>
        </el-form-item>
        <el-form-item v-if="showPrompt">
          <span>校验码已发出，请注意查看邮箱，如果没有收到，你可以在60秒后要求系统重新发送</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="bindEmail" style="width: 200px" round>提交</el-button>
        </el-form-item>
      </el-form>
      <div class="split-line"></div>
      <div class="hth-tips">
        <h3>温馨提示</h3>
        <p>请填写真实有效的邮箱地址，以保证及时收到邮件信息。</p>
      </div>
    </hth-panel>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HthPanel from 'common/Panel/index.vue';
  import SmsTimer from 'common/sms-timer';
  import { fetchSendEmailCode } from 'api/public';
  import { fetchBindEmail } from 'api/home/account-set';
  
  export default {
    components: {
      HthPanel,
      SmsTimer
    },
    computed: {
      ...mapGetters([
        'username'
      ])
    },
    data() {
      return {
        startSmsTimer: false,
        bindEmailData: {
          email: '',
          authCode: ''
        },
        showPrompt: false
      }
    },
    methods: {
      sendCode() {
        fetchSendEmailCode({ email: this.bindEmailData.email })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.startSmsTimer = true;
              this.showPrompt = true;
              this.$message({
                message: '邮箱验证码已发送',
                type: 'success'
              });
            }
          });
      },
      bindEmail() {
        fetchBindEmail(this.bindEmailData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.showPrompt = false;
              this.$store.commit('SET_EMAIL', this.bindEmailData.email);
              this.$message({
                message: '邮箱绑定成功！',
                type: 'success'
              });
              this.$router.push('/accountManage/set/index')
            } else {
              this.$notify({
                title: '错误',
                message: '失败原因:' + response.data.meta.message,
                type: 'error',
                duration: 0
              });
            }
          });
      }
    }
  }
</script>

<style lang="scss">
  .bind-email-wrapper {
    width: 832px;
    height: 797px;
  }
</style>
