<template>
  <el-table :data="list" :border="false" style="width: 100%">
    <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
    <el-table-column prop="verifyTime" label="发布时间" width="140"></el-table-column>
    <el-table-column prop="loanMoney" label="借款金额" width="110"></el-table-column>
    <el-table-column prop="remainTime" label="剩余时间" width="110"></el-table-column>
    <el-table-column prop="process" label="进度" width="110"></el-table-column>
    <el-table-column prop="status" label="状态" width="100"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ['list']
  }
</script>
