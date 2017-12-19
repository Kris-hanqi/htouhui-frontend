<template>
  <div class="update-mobile-wrapper">
    <hth-panel title="修改手机号">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-md-2 control-label">用户名</label>
          <div class="col-md-5">
            <p class="form-control-static">{{ username || '无' }}</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-2 control-label">新手机号</label>
          <div class="col-md-5">
            <input class="form-control"
                   type="text"
                   v-model="mobileInfo.mobileNumber"
                   maxlength="11" placeholder="请输入新手机号">
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
            <el-button type="primary" @click="bindMobile" :loading="loading" round>提交</el-button>
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
  import { validateMobile } from 'utils/validate';
  import SmsTimer from 'common/sms-timer';
  import HthPanel from 'common/Panel/index.vue';
  import { fetchSendCodeNew } from 'api/public';
  import { fetchUpdateBindMobile } from 'api/home/account-set';

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
        mobileInfo: {
          type: 'change_binding_mobile_number',
          mobile: '',
          mobileNumber: '',
          authCode: ''
        }
      }
    },
    methods: {
      sendCode() {
        if (!this.mobileInfo.mobileNumber) {
          this.$message({
            message: '请输入手机号',
            type: 'warning'
          });
          return;
        }
        if (!validateMobile(this.mobileInfo.mobileNumber)) {
          this.$message({
            message: '手机号不合法，请重新输入',
            type: 'warning'
          });
          return;
        }
        this.startSmsTimer = true;
        fetchSendCodeNew(this.mobileInfo)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$message({
                message: '手机验证码已发送',
                type: 'success'
              });
            }
            if (response.data.meta.code === 9999) {
              this.$notify({
                title: '提示',
                message: response.data.meta.message,
                type: 'error'
              });
              this.startSmsTimer = false;
            }
          })
      },
      bindMobile() {
        if (!validateMobile(this.mobileInfo.mobileNumber)) {
          this.$message({
            message: '手机号不合法，请重新输入',
            type: 'warning'
          });
          return;
        }
        if (!this.mobileInfo.authCode) {
          this.$message({
            message: '请输入验证码',
            type: 'warning'
          });
          return;
        }
        this.loading = true;
        this.mobileInfo.mobile = this.mobileInfo.mobileNumber;
        fetchUpdateBindMobile(this.mobileInfo)
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
