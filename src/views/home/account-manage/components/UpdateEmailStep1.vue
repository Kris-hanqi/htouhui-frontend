<template>
  <div class="update-mobile-step1">
    <hth-panel title="验证邮箱">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-md-2 control-label">用户名</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ username || '无' }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">原邮箱</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ email || '无' }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">验证码</label>
          <div class="col-md-3">
            <input class="form-control"
                   type="text"
                   v-model="emailData.authCode"
                   maxlength="6" placeholder="请输入邮箱验证码">
          </div>
          <div class="col-md-5">
            <sms-timer :start="startSmsTimer" @countDown="startSmsTimer = false" @click.native='sendCode'></sms-timer>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-offset-2 col-md-5">
            <el-button type="primary" @click="checkCurrentEmail" :loading="loading" round>提交</el-button>
          </div>
        </div>
      </form>
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
  import { fetchCheckCurrentEmail } from 'api/home/account-set';

  export default {
    components: {
      HthPanel,
      SmsTimer
    },
    computed: {
      ...mapGetters([
        'username',
        'email'
      ])
    },
    data() {
      return {
        loading: false,
        startSmsTimer: false,
        emailData: {
          authCode: ''
        }
      }
    },
    methods: {
      sendCode() {
        if (!this.email) return;
        this.startSmsTimer = true;
        fetchSendEmailCode({ email: this.email, type: 'change_binding_email' })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.startSmsTimer = true;
              this.$message({
                message: '邮箱验证码已发送',
                type: 'success'
              });
            } else {
              this.startSmsTimer = false;
            }
          });
      },
      checkCurrentEmail() {
        if (!this.emailData.authCode) {
          this.$message({
            message: '验证码不能为空',
            type: 'warning'
          });
          return;
        }
        this.loading = true;
        fetchCheckCurrentEmail(this.emailData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$router.push('/accountManage/set/updateEmailStep2');
            }
            if (response.data.meta.code === 9999) {
              this.$notify({
                title: '验证失败',
                message: response.data.meta.message,
                type: 'error'
              });
            }
            this.loading = false;
          });
      }
    }
  }
</script>

<style lang="scss">
  .update-mobile-step1 {
    width: 832px;
    height: 797px;
  }
</style>
