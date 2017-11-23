<template>
  <el-table :data="list" :border="false" style="width: 100%">
    <el-table-column prop="name" label="项目名称" width="150">
      <template slot-scope="scope">
        <a :href="base + '/loan/' + scope.row.id" target="_blank">{{ scope.row.name }}</a>
      </template>
    </el-table-column>
    <el-table-column prop="loanMoney" label="借款金额" width="110"></el-table-column>
    <el-table-column prop="predictInterst" label="预计利息" width="110"></el-table-column>
    <el-table-column label="年利率" width="110">
      <template slot-scope="scope">
        {{ scope.row.yearRate + '%' }}
      </template>
    </el-table-column>
    <el-table-column label="借款期限" width="140">
      <template slot-scope="scope">
        {{ scope.row.deadline + '月' }}
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态"></el-table-column>
  </el-table>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    props: ['list'],
    computed: {
      ...mapGetters([
        'baseUrl'
      ])
    }
  }
</script>
