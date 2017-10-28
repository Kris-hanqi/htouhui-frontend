<template>
  <el-dialog title="平台开户"
             :before-close="handleClose"
             :visible.sync="visible">
    <el-steps :space="200" :active="1">
      <el-step title="注册"></el-step>
      <el-step title="开户"></el-step>
      <el-step title="交易密码"></el-step>
    </el-steps>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data() {
      return {}
    },
    methods: {
      handleClose() {
        this.$parent.dialogBankLimitVisible = false;
      }
    }
  }
</script>

<style lang="scss">

</style>
