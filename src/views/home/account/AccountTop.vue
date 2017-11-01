<template>
  <div>
    <div class="account-top__wrapper">
      <i class="icon-avatar"></i>
      <span>你好，<i class="num-font">{{ name }}</i></span>
      <a href="javascript:void(0)" class="icon-user" @click="operationAccount" :class="{ 'icon-user-active': status }"></a>
      <a href="javascript:void(0)" class="icon-bank-card" @click="operationBankCard" :class="{ 'icon-bank-card-active': bankCard }"></a>
      <el-button :plain="true" @click="toRouter('recharge')" type="primary" class="recharge-btn">充值</el-button>
      <el-button type="primary" @click="toRouter('withdraw')" class="withdraw-btn">提现</el-button>
    </div>
    
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
  import { fetchUnlockBankCard } from '@/api/home/account-set';
  
  export default {
    data() {
      return {
        dialogVisible: false
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'status',
        'bankCard'
      ])
    },
    methods: {
      operationBankCard() {
        if (!this.bankCard) {
          cosole.log('跳转绑卡页面');
        } else {
          this.dialogVisible = true;
        }
      },
      operationAccount() {
        if (this.status === 0) {
          console.log('跳转开户页面');
        }
      },
      unlockBankCard() {
        fetchUnlockBankCard().then()
      },
      toRouter(path) {
        this.$router.push('/' + path);
      }
    }
  }
</script>

<style lang="scss">
  .account-top__wrapper {
    width: 100%;
    height: 73px;
    line-height: 73px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    
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
