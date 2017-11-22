<template>
  <div class="amendLoginPwd">
    <hth-panel title="修改邮箱">
      <div class="amendLoginPwdMsg">
        <ul>
          <li>
            <label>用户名</label>
            <span class="amendLoginName">{{ realName }}</span>
          </li>
          <li class="marginTop">
            <label>邮箱</label>
            <input type="text" placeholder="请输新邮箱">
          </li>
          <li>
            <i class="dangerousIcon"></i>
            <span class="dangerousTxt">新邮箱不可与原邮箱相同！</span>
          </li>
          <li>
            <label>验证码</label>
            <input type="text" placeholder="请输入验证码">
            <sms-timer :start="startSmsTimer" @countDown="startSmsTimer = false" @click.native='sendCode'></sms-timer>
          </li>
        </ul>
        <p class="yzmCodeSent">校验码已发出，请注意查收短信，如果没有收到，你可以在60秒后要求系统重新发送</p>
        <button class="submitBtn">提交</button>
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
  import SmsTimer from 'common/sms-timer';
  import HthPanel from 'common/Panel/index.vue';
  import { fetchSendEmailCode } from 'api/public';
  
  export default {
    components: {
      SmsTimer,
      HthPanel
    },
    computed: {
      ...mapGetters([
        'realName'
      ])
    },
    data() {
      return {
        startSmsTimer: false,
        showPrompt: false
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
      }
    }
  }
</script>

<style lang="scss">
  .amendLoginPwd {
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
