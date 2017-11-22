<template>
  <div class="update-mobile-step1">
    <hth-panel title="修改邮箱">
      <el-form :model="emailData" label-width="80px">
        <el-form-item label="用户名">
          <span>{{ username }}</span>
        </el-form-item>
        <el-form-item label="原邮箱">
          <span>{{ email }}</span>
        </el-form-item>
        <el-form-item label="验证码">
          <el-col :span="8">
            <el-input v-model="emailData.authCode" :maxlength="6" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="11">
            <sms-timer :start="startSmsTimer" @countDown="startSmsTimer = false" @click.native='sendCode'></sms-timer>
          </el-col>
        </el-form-item>
        <el-form-item v-if="showPrompt">
          <span>校验码已发出，请注意查看邮箱，如果没有收到，你可以在60秒后要求系统重新发送</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkCurrentEmail" style="width: 200px" round>提交</el-button>
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
        startSmsTimer: false,
        showPrompt: false,
        emailData: {
          authCode: ''
        }
      }
    },
    methods: {
      sendCode() {
        if (!this.email) return;
        fetchSendEmailCode({ email: this.email })
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
      checkCurrentEmail() {
        console.log(123);
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
