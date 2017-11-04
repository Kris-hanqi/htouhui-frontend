<template>
  <div class="account-top__wrapper">
    <div class="hth-panel">
      <i class="icon-avatar"></i>
      <!-- 优先显示用户真实姓名 -->
      <span>你好，<i class="num-font">{{ realName || username }}</i></span>
      <a href="javascript:void(0)" class="icon-user" @click="operationAccount" :class="{ 'icon-user-active': status }"></a>
      <a href="javascript:void(0)" class="icon-bank-card" @click="operationBankCard" :class="{ 'icon-bank-card-active': bankCard }"></a>
      <el-button :plain="true" @click="toRouter('recharge')" type="primary" class="recharge-btn">充值</el-button>
      <el-button type="primary" @click="toRouter('withdraw')" class="withdraw-btn">提现</el-button>
    </div>
    
    <!-- 开户组件 -->
    <open-account :visible="dialogOpenAccountVisible" @close="closeOpenAccount"></open-account>
    
    <!-- 银行卡解绑提示 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
      <span style="font-size: 20px; color: #ee5544">确认解绑银行卡？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="unlockBankCard">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import OpenAccount from '../components/OpenAccount.vue';
  import { fetchUnlockBankCard } from 'api/home/account-set';
  
  export default {
    components: {
      OpenAccount
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
        dialogVisible: false
      }
    },
    methods: {
      // 操作银行卡
      operationBankCard() {
        if (!this.bankCard) {
          cosole.log('跳转绑卡页面');
        } else {
          this.dialogVisible = true;
        }
      },
      operationAccount() {
        if (this.status === 0) {
          this.dialogOpenAccountVisible = true
        }
      },
      unlockBankCard() {
        fetchUnlockBankCard().then(response => {
          if (response.data.meta.code === 200) {
            this.$store.commit('SET_BANK_NAME', '');
            this.$store.commit('SET_BANK_CARD', '');
            this.$store.commit('SET_STATUS', 2);
            this.dialogVisible = false;
            this.$message({
              message: '银行卡解绑成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: '银行卡解绑失败: ' + response.data.meta.message,
              type: 'error'
            });
          }
        })
      },
      toRouter(path) {
        this.$router.push('/' + path);
      },
      closeOpenAccount() {
        this.dialogOpenAccountVisible = false;
      }
    }
  }
</script>

<style lang="scss">
  .account-top__wrapper {
    .hth-panel {
      width: 100%;
      height: 73px;
      padding: 0;
      line-height: 73px;
    }
    
    .recharge-btn {
      float: right;
      margin-top: 19px;
      margin-right: 16px;
    }
    
    .icon-avatar {
      display: inline-block;
      vertical-align: middle;
      width: 42px;
      height: 42px;
      margin: 0 14px 0 27px;
      background: url(../../../assets/images/icon-avatar.png) no-repeat;
    }
    
    span {
      font-size: 16px;
      vertical-align: middle;
    }
    
    button {
      width: 101px;
      border-radius: 100px;
    }
    
    .withdraw-btn {
      float: right;
      margin-top: 19px;
      background-color: #378ff6;
      color: #fff;
      margin-right: 16px;
      
      &:hover {
        background-color: #186dd1;
      }
    }
    
    a {
      display: inline-block;
      vertical-align: middle;
      width: 23px;
    }
    
    a.icon-user {
      height: 21px;
      background: url(../../../assets/images/home/account/icon-user.png) no-repeat;
      margin-left: 40px;
    }
    
    a.icon-user-active {
      background: url(../../../assets/images/home/account/icon-user-hover.png) no-repeat !important;
    }
    
    a.icon-bank-card {
      height: 18px;
      background: url(../../../assets/images/home/account/icon-bank-card.png) no-repeat;
      margin-left: 7px;
    }
    
    a.icon-bank-card-active {
      background: url(../../../assets/images/home/account/icon-bank-card-hover.png) no-repeat;
    }
  }
</style>
