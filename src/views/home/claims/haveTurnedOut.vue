<template>
  <div class="have-turned-out">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
      <el-table-column prop="time" label="投资时间" width="100"></el-table-column>
      <el-table-column prop="money" label="投资金额" width="70"></el-table-column>
      <el-table-column prop="surplusTime" label="剩余时间" width="70"></el-table-column>
      <el-table-column prop="price" label="债权价格" width="100"></el-table-column>
      <el-table-column prop="wait" label="待收本息" width="80"></el-table-column>
      <el-table-column prop="other" label="其它"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>
