<template>
  <el-table :data="list" :border="false" style="width: 100%">
    <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
    <el-table-column prop="loanMoney" label="借款金额" width="110"></el-table-column>
    <el-table-column prop="predictInterst" label="预计利息" width="110">
      <template slot-scope="scope">
        {{ scope.row.predictInterst + '%' }}
      </template>
    </el-table-column>
    <el-table-column label="年利率" width="110">
      <template slot-scope="scope">
        {{ scope.row.yearRate + '%' }}
      </template>
    </el-table-column>
    <el-table-column prop="deadline" label="借款期限" width="140"></el-table-column>
    <el-table-column prop="status" label="状态"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ['list']
  }
</script>
