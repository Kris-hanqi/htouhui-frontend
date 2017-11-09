<template>
  <el-table :data="list" :border="false" style="width: 100%">
    <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
    <el-table-column prop="loanMoney" label="借款金额" width="110"></el-table-column>
    <el-table-column prop="repayMoney" label="还款金额" width="110"></el-table-column>
    <el-table-column prop="settleDowndTime" label="结清日期" width="110"></el-table-column>
    <el-table-column prop="status" label="状态" width="100"></el-table-column>
    <el-table-column prop="trusteeship" label="管理平台" width="100"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ['list']
  }
</script>
