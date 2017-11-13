<template>
  <div class="bind-email-wrapper">
    <hth-panel title="绑定邮箱">
      <div class="amendLoginPwdMsg">
        <ul>
          <li>
            <label>{{ realName || '无' }}</label>
            <span class="amendLoginName">xiaohai</span>
          </li>
          <li class="marginTop">
            <label>邮箱</label>
            <input type="text" v-model="bindEmailData.email" placeholder="请输入邮箱">
          </li>
          <li class="marginTop">
            <label>验证码</label>
            <input type="text" v-model="bindEmailData.authCode" placeholder="请输入验证码">
            <sms-timer @run="sendCode"></sms-timer>
          </li>
        </ul>
        <p class="yzmCodeSent" v-if="showPrompt">校验码已发出，请注意查收短信，如果没有收到，你可以在60秒后要求系统重新发送</p>
        <button class="submitBtn" @click="bindEmail">提交</button>
      </div>
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
        'realName'
      ])
    },
    data() {
      return {
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
                message: '失败原因:' + data.meta.code.message,
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

    .amendLoginPwdMsg {
      li:first-child {
        margin-bottom: 20px;
      }

      li.marginTop {
        margin-top: 18px;
      }

      label {
        display: inline-block;
        vertical-align: middle;
        width: 110px;
        font-size: 16px;
        line-height: 1;
        text-align: right;
        color: #727e90;
      }

      input {
        width: 252px;
        height: 54px;
        background-color: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: solid 1px #bfc1c4;
        padding-left: 14px;
        margin-left: 10px;
      }

      input::-webkit-input-placeholder { color: #aab2c9; }

      :-moz-placeholder { color: #aab2c9; }

      ::-moz-placeholder { color: #aab2c9; }

      :-ms-input-placeholder { color: #aab2c9; }

      i.dangerousIcon {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 18px;
        margin: 10px 5px 10px 132px;
        background: url(../../../../assets/images/home/center-ico-dangerous.png) no-repeat;
      }

      span.amendLoginName {
        margin-left: 20px;
        font-size: 16px;
        color: #394b67;
      }

      span.dangerousTxt {
        font-size: 14px;
        color: #ff7900;
      }

      p.yzmCodeSent {
        font-size: 14px;
        color: #838d9d;
        margin-left: 124px;
        margin-top: 14px;
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

      .getYzmCode {
        height: 46px;
        border-radius: 100px;
        background-color: #dfe8f0;
        font-size: 16px;
        text-align: center;
        padding: 0 20px;
        color: #7c86a2;
        margin-left: 15px;
        cursor: pointer;
      }
    }
  }
</style>
