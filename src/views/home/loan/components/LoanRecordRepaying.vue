<template>
  <el-table :data="list" :border="false" style="width: 100%">
    <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
    <el-table-column prop="giveTime" label="放款时间" width="140"></el-table-column>
    <el-table-column prop="loanMoney" label="借款金额" width="110"></el-table-column>
    <el-table-column prop="realLoanMoney" label="实际借款金额" width="110"></el-table-column>
    <el-table-column prop="rateCount" label="年利率" width="110"></el-table-column>
    <el-table-column prop="unPaidMoney" label="待还总额" width="110"></el-table-column>
    <el-table-column label="已还期数/总期数" width="110">
      <template scope="scope">
        {{ scope.row.repayedTerm }}/{{ scope.row.repayedTerm + scope.row.unRepayTerm }}
      </template>
    </el-table-column>
    <el-table-column prop="payDay" label="下次还款日" width="140"></el-table-column>
    <el-table-column prop="nextRepayMoney" label="下次还款数" width="100"></el-table-column>
    <el-table-column prop="status" label="状态" width="100"></el-table-column>
    <el-table-column prop="trusteeship" label="管理平台" width="100"></el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template scope="scope">
        <el-button type="text">还款计划</el-button>
        <el-button type="text">合同</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ['list']
  }
</script>
