<template>
  <div class="recharge-wrapper">
    <hth-panel title="我要充值">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="快捷充值" name="one">
          <fast-recharge :type="type" :loan-id="loanId"></fast-recharge>
        </el-tab-pane>
        <el-tab-pane label="跨行转账" name="two">
          <inter-bank-transfer :account-data="{ realName: realName, accountId: accountId }"></inter-bank-transfer>
        </el-tab-pane>
        <el-tab-pane label="支付宝转账" name="there">
          <alipay-transfer :account-data="{ realName: realName, accountId: accountId }"></alipay-transfer>
        </el-tab-pane>
      </el-tabs>
    </hth-panel>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HthPanel from 'common/Panel/index.vue';
  import FastRecharge from './components/RechargeFastRecharge.vue';
  import AlipayTransfer from './components/RechargeAlipayTransfer.vue';
  import InterBankTransfer from './components/RechargeInterBankTransfer.vue';

  export default {
    components: {
      HthPanel,
      FastRecharge,
      AlipayTransfer,
      InterBankTransfer
    },
    computed: {
      ...mapGetters([
        'realName',
        'accountId'
      ])
    },
    data() {
      return {
        type: '',
        loanId: '',
        accountData: {
          name: this.name,
          accountId: this.accountId
        },
        activeName: 'one'
      };
    },
    created() {
      if (this.$route.query.type) {
        this.type = this.$route.query.type;
        this.loanId = this.$route.query.id;
      }
    }
  }
</script>

<style lang="scss">
  .recharge-wrapper {
    .recharge-wrapper__steps {
      p {
        margin-top: 24px;
        color: #394b67;
      }

      img {
        margin-top: 15px;
        margin-left: 34px;
      }
    }

    .warmPrompt {
      margin-top: 25px;
      padding-bottom: 40px;

      h3 {
        font-size: 16px;
        line-height: 1;
        color: #394b67;
        margin-left: 59px;
        margin-bottom: 15px;
      }

      p {
        font-size: 14px;
        line-height: 1.79;
        color: #727e90;
        margin-left: 76px;
        margin-right: 68px;
      }
    }

    .shortcutRechargeMask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.37);
    }

    .transferNeedMsg {
      margin-left: 47px;

      p {
        line-height: 1;
        font-size: 16px;
        color: #394b67;
      }

      .transferNeedUl {
        margin-top: 14px;
        margin-bottom: 55px;

        span {
          font-size: 16px;
          line-height: 2.88;
          color: #7c86a2;
        }

        .copyBtn {
          width: 80px;
          height: 32px;
          border: solid 1px #0671f0;
          border-radius: 100px;
          font-size: 14px;
          text-align: center;
          color: #0671f0;
          background-color: #fff;
        }

        .copyBtn:hover {
          background-color: #0671f0;
          color: #fff;
        }
      }

      ul.transferNeedMsgLeft {
        width: 145px;
        text-align: right;
        margin-right: 35px;
      }
    }

    .transferNeedMsg {
      p {
        margin-top: 34px;
      }
    }
  }
</style>
