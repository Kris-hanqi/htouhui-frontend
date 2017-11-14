<template>
  <el-table :data="list" :border="false" style="width: 100%">
    <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
    <el-table-column prop="loanMoney" label="借款金额" width="110"></el-table-column>
    <el-table-column prop="realRaisedMoney" label="实际募捐金额" width="110"></el-table-column>
    <el-table-column prop="predictInterst" label="预计利息" width="110"></el-table-column>
    <el-table-column prop="rateCount" label="年利率" width="110"></el-table-column>
    <el-table-column prop="rateCount" label="借款期限" width="110"></el-table-column>
    <el-table-column label="已还期数/总期数" width="110">
      <template slot-scope="scope">
        {{ scope.row.repayedTerm }}/{{ scope.row.repayedTerm + scope.row.unRepayTerm }}
      </template>
    </el-table-column>
    <el-table-column prop="nextRepayMoney" label="下次还款数" width="100"></el-table-column>
    <el-table-column prop="status" label="状态" width="100"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ['list']
  }
</script>
