<template>
  <div class="account-top-wrapper">
    <hth-panel>
      <avatar size="large" icon="icon-avatar"></avatar>
      <span class="text">你好，<i class="num-font">{{ realName || username }}</i></span>
      <a @click.stop="operationAccount"
         style="margin-right: 8px;"
         :class="{ active: status }">
        <i class="iconfont icon-user"></i>
      </a>
      <a @click.stop="operationBankCard" :class="{ active: bankCard }">
        <i class="iconfont icon-bank-card"></i>
      </a>
      <el-button class="recharge-bth"
                 :round="true"
                 :plain="true"
                 @click="toRouter('account/withdraw')"
                 type="primary">提现</el-button>
      <el-button class="withdraw-btn"
                 :round="true"
                 type="primary"
                 @click="toRouter('account/recharge')">充值</el-button>
    </hth-panel>
    
    <!-- 开户组件 -->
    <guide-operational :visible="dialogOpenAccountVisible"
                  @close="closeOpenAccount"></guide-operational>
    
    <!-- 解绑银行卡 -->
    <unlock-bank-card :visible="dialogUnlockBankCardVisible"
                      @close="closeUnlockBankCard"></unlock-bank-card>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import HthPanel from 'common/Panel/index.vue';
  import Avatar from 'common/components/avatar/index';
  import GuideOperational from '../../components/GuideOperational.vue';
  import UnlockBankCard from '../../components/UnlockBankCard.vue';
  
  export default {
    components: {
      HthPanel,
      Avatar,
      GuideOperational,
      UnlockBankCard
    },
    computed: {
      ...mapGetters([
        'realName',
        'username',
        'status',
        'bankCard'
      ])
    },
    data() {
      return {
        dialogOpenAccountVisible: false,
        dialogUnlockBankCardVisible: false
      }
    },
    methods: {
      // 操作银行卡
      operationBankCard() {
        if (this.status === 0) {
          this.isOpenAccount();
          return;
        }
        if (!this.bankCard) {
          this.$router.push('/accountManage/set/bindBackCard');
        } else {
          this.dialogUnlockBankCardVisible = true;
        }
      },
      operationAccount() {
        if (this.status === 0) {
          this.dialogOpenAccountVisible = true
        }
      },
      isOpenAccount() {
        this.$alert('你尚未开户，请先开户', '提示', {
          confirmButtonText: '去开户',
          type: 'warning',
          callback: action => {
            if (action === 'confirm') {
              this.dialogOpenAccountVisible = true;
            }
          }
        });
      },
      toRouter(path) {
        if (this.status === 0) {
          this.isOpenAccount();
          return;
        }
        this.$router.push('/' + path);
      },
      closeOpenAccount() {
        this.dialogOpenAccountVisible = false;
      },
      closeUnlockBankCard() {
        this.dialogUnlockBankCardVisible = false;
      }
    }
  }
</script>

<style lang="scss">
  .account-top-wrapper {
    .hth-panel-body {
      height: 73px;
      padding-top: 0;
      padding-bottom: 0;
      line-height: 73px;
    }
    
    button.top {
      float: right;
    }
    
    .iconfont {
      font-size: 23px;
    }
    
    .active {
      color: #409eff;
    }
    
    .recharge-bth,
    .withdraw-btn {
      float: right;
      margin-top: 17px;
    }
    
    .withdraw-btn {
      margin-right: 16px;
    }
    
    span.text {
      margin-right: 20px;
      font-size: 16px;
      vertical-align: middle;
    }
    
    a {
      display: inline-block;
      vertical-align: middle;
      width: 23px;
    }
  }
</style>
