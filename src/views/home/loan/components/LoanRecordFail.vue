<template>
  <el-table :data="list" :border="false" style="width: 100%">
    <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
    <el-table-column prop="verifyTime" label="发布时间" width="140"></el-table-column>
    <el-table-column prop="loanMoney" label="借款金额" width="110"></el-table-column>
    <el-table-column prop="cancelTime" label="流标时间" width="150"></el-table-column>
    <el-table-column prop="trusteeship" label="管理平台" width="100"></el-table-column>
    <el-table-column label="备注">
      <template slot-scope="scope">
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
