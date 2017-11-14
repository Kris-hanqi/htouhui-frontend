<template>
  <div class="unlock-bank-card-wrapper">
    <el-dialog title="提示"
               width="30%"
               :before-close="handleClose"
               :visible.sync="visible">
      <span class="text">确认解绑银行卡？</span>
      <span slot="footer">
        <el-button :round="true" @click="handleClose">取 消</el-button>
        <el-button :round="true" type="primary"
                   :loading="unlockBankCardLoading"
                   @click="unlockBankCard">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchUnlockBankCard } from 'api/home/account-set';
  
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data() {
      return {
        unlockBankCardLoading: false
      }
    },
    methods: {
      unlockBankCard() {
        this.unlockBankCardLoading = true;
        fetchUnlockBankCard().then(response => {
          if (response.data.meta.code === 200) {
            this.$store.commit('SET_BANK_NAME', '');
            this.$store.commit('SET_BANK_CARD', '');
            this.$store.commit('SET_STATUS', 2);
            this.$message({
              message: '银行卡解绑成功',
              type: 'success'
            });
            this.$emit('close');
          } else {
            this.$message({
              message: '银行卡解绑失败: ' + response.data.meta.message,
              type: 'error'
            });
          }
          this.unlockBankCardLoading = false;
          this.dialogUnlockBankCardVisible = false;
        })
      },
      handleClose() {
        this.$emit('close');
      }
    }
  }
</script>

<style lang="scss">
  .unlock-bank-card-wrapper {
    span.text {
      font-size: 20px;
      color: #e54;
    }
  }
</style>
