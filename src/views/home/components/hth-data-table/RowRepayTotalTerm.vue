<template>
  <el-table-column :label="colConfig.label">
    <span slot-scope="scope">
      {{ scope.row.repayedTerm }}/{{ scope.row.totalTerms }}
    </span>
  </el-table-column>
</template>

<script>
  export default {
    props: ['colConfig']
  }
</script>
