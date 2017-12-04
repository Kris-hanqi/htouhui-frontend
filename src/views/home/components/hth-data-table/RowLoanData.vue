<template>
  <el-table-column :label="colConfig.label">
    <template slot-scope="scope">
      {{ scope.row.loanTerm }}{{ scope.row.loanTermCompany | keyToValue(dataList) }}
    </template>
  </el-table-column>
</template>

<script>
  export default {
    props: ['colConfig'],
    data() {
      return {
        dataList: [
          { key: 'day', value: '天' },
          { key: 'month', value: '月' }
        ]
      }
    }
  }
</script>
