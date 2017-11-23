<template>
  <div class="open-account">
    <hth-panel title="存管开户">
      <!-- 开户操作组件 -->
      <open-account @success="openAccountSuccess"></open-account>
      <div class="split-line"></div>
      <div class="hth-tips">
        <h3>温馨提示</h3>
        <p>1、开户需填写姓名、身份证号、银行卡号。</p>
        <p>2、请填写真实有效的身份信息与银行卡信息，一旦认证成功，您的身份信息不可更改! 请确保您填写的资料真实有效，所有资料将会严格保密。</p>
        <p>3、老用户开户，姓名与身份证号需与易宝账户实名认证信息保持一致。</p>
        <p>4、江西银行电子账户将采用同卡进出原则，即账户资金只能提现至已绑定银行卡内，且当你的电子账户余额与待收金额同时为0时，才可更换银行卡。</p>
        <p>5、不支持信用卡绑定。</p>
      </div>
    </hth-panel>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HthPanel from 'common/Panel/index.vue';
  import OpenAccount from '../../components/OpenAccount.vue';
  
  export default {
    components: {
      HthPanel,
      OpenAccount
    },
    computed: {
      ...mapGetters([
        'username',
        'baseUrl'
      ])
    },
    data() {
      return {
        protocolChecked: true
      }
    },
    methods: {
      openAccountSuccess() {
        this.$router.push('/account/index');
      }
    }
  }
</script>
