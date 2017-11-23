<template>
  <!-- 开户组件 -->
  <div class="guide-operational-wrapper">
    <el-dialog title="平台开户"
               width="730px"
               :before-close="handleClose"
               :visible.sync="visible">
      <el-steps :space="200" style="margin-left: 130px" :active="stepActive">
        <el-step title="注册"></el-step>
        <el-step title="开户"></el-step>
        <el-step title="交易密码"></el-step>
      </el-steps>
  
      <!-- 开户组件 -->
      <open-account @success="openAccountSuccess" v-if="stepActive === 2"></open-account>
  
      <!-- 设置交易密码组件 -->
      <transaction-password v-if="stepActive === 3"></transaction-password>
    </el-dialog>
  </div>
</template>

<script>
  import OpenAccount from './OpenAccount.vue';
  import TransactionPassword from './TransactionPassword.vue';
  
  export default {
    components: {
      OpenAccount,
      TransactionPassword
    },
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data() {
      return {
        stepActive: 2
      }
    },
    methods: {
      openAccountSuccess() {
        this.stepActive = 3
      },
      handleClose() {
        this.$emit('close');
      }
    }
  }
</script>

<style lang="scss">
  .guide-operational-wrapper {
    .form-horizontal {
      margin-left: 120px;
    }
  }
</style>
