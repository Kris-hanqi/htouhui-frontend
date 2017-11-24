<template>
  <div class="update-mobile-wrapper">
    <hth-panel title="验证手机号">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-md-2 control-label">用户名</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ username || '无' }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">手机号</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ mobile || '无' }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">验证码</label>
          <div class="col-md-3">
            <input class="form-control"
                   type="text"
                   v-model="mobileInfo.authCode"
                   maxlength="6" placeholder="请输入短信验证码">
          </div>
          <div class="col-md-5">
            <sms-timer :start="startSmsTimer" @countDown="startSmsTimer = false" @click.native='sendCode'></sms-timer>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-offset-2 col-md-5">
            <el-button type="primary" @click="checkCurrentMobile" :loading="loading" round>提交</el-button>
          </div>
        </div>
      </form>
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
  import { fetchSendCode } from 'api/public';
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
        loading: false,
        startSmsTimer: false,
        showCodePrompt: false,
        mobileInfo: {
          authCode: ''
        }
      }
    },
    methods: {
      sendCode() {
        fetchSendCode({ authType: 'change_binding_mobile_number' })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.startSmsTimer = true;
              this.showCodePrompt = true;
              this.$message({
                message: '手机验证码已发送',
                type: 'success'
              });
            }
          })
      },
      checkCurrentMobile() {
        if (!this.mobileInfo.authCode) return;
        this.loading = true;
        fetchCheckCurrentMobile(this.mobileInfo)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$router.push('/accountManage/set/updateMobileStep2');
            }
            if (response.data.meta.code === 9999) {
              this.$notify({
                title: '验证失败',
                message: response.data.meta.message,
                type: 'error'
              });
            }
            this.loading = false;
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
