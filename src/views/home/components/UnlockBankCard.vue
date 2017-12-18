<template>
  <!-- 解绑银行卡组件 -->
  <div class="unlock-bank-card-wrapper">
    <el-dialog title="解绑银行卡"
               width="500px"
               :before-close="handleClose"
               :visible.sync="visible">
      <div style="text-align: center">
        <div>
          <i style="font-size: 60px;color: #ff4a33;" class="ku-icon icon-prompt"></i>
        </div>
        <br>
        <div class="text">是否确认解绑银行卡？</div>
        <br><br>
        <div slot="footer">
        <el-button :round="true" @click="handleClose">取 消</el-button>
        <el-button :round="true" type="primary"
                   :loading="unlockBankCardLoading"
                   @click="unlockBankCard">确 定</el-button>
      </div>
      </div>
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
            // 更新全局状态
            this.$store.commit('SET_BANK_NAME', '');
            this.$store.commit('SET_BANK_CARD', '');
            // 判断是否已设置交易密码
            if (!this.$store.getters.isTransactionPassword) {
              this.$store.commit('SET_STATUS', 1);
            } else {
              this.$store.commit('SET_STATUS', 2);
            }
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
          this.$emit('close');
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
    .text {
      font-size: 20px;
      color: #727e90;
    }
  }
</style>
