<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="快捷充值" name="one">
      121212
    </el-tab-pane>
    <el-tab-pane label="跨行转账" name="two">
      12122
    </el-tab-pane>
    <el-tab-pane label="支付宝转账" name="there">
      12333
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'one'
      }
    }
  }
</script>
