<template>
  <div class="bind-email-wrapper">
    <hth-panel title="绑定邮箱">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-md-2 control-label">用户名</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ username || '无' }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">邮箱</label>
          <div class="col-md-5">
            <input type="text" class="form-control" v-model="bindEmailData.email" placeholder="请输入电子邮箱">
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">验证码</label>
          <div class="col-md-3">
            <input class="form-control"
                   type="text"
                   v-model="bindEmailData.authCode"
                   maxlength="6" placeholder="请输入邮箱验证码">
          </div>
          <div class="col-md-5">
            <sms-timer :start="startSmsTimer" @countDown="startSmsTimer = false" @click.native='sendCode'></sms-timer>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-offset-2 col-md-5">
            <el-button type="primary" @click="bindEmail" :loading="loading" round>提交</el-button>
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
  import { validateEmail } from 'utils/validate';
  import { fetchSendEmailCode } from 'api/public';
  import { fetchBindEmail } from 'api/home/account-set';
  import HthPanel from 'common/Panel/index.vue';
  import SmsTimer from 'common/sms-timer';
  
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
        loading: false,
        startSmsTimer: false,
        bindEmailData: {
          email: '',
          type: 'binding_email',
          authCode: ''
        }
      }
    },
    methods: {
      sendCode() {
        if (!this.bindEmailData.email) {
          this.$message({
            message: '请输入邮箱',
            type: 'warning'
          });
          return;
        }
        if (!validateEmail(this.bindEmailData.email)) {
          this.$message({
            message: '邮箱不合法，请重新输入',
            type: 'warning'
          });
          return;
        }
        fetchSendEmailCode(this.bindEmailData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.startSmsTimer = true;
              this.$message({
                message: '邮箱验证码已发送,请前往邮箱查看',
                type: 'success'
              });
            }
          });
      },
      bindEmail() {
        if (!this.bindEmailData.email) {
          this.$message({
            message: '请输入邮箱',
            type: 'warning'
          });
          return;
        }
        if (!validateEmail(this.bindEmailData.email)) {
          this.$message({
            message: '邮箱不合法，请重新输入',
            type: 'warning'
          });
          return;
        }
        if (!this.bindEmailData.authCode) {
          this.$message({
            message: '请输入验证码',
            type: 'warning'
          });
          return;
        }
        this.loading = true;
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
                title: '提示',
                message: '操作失败:' + response.data.meta.message,
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
  .bind-email-wrapper {
    width: 832px;
    height: 797px;
  }
</style>
