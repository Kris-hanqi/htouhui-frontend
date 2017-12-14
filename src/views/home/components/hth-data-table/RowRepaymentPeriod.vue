<template>
  <el-table-column width="120" :label="colConfig.label">
    <span slot-scope="scope">
      {{ scope.row[colConfig.returned] + '/' + scope.row[colConfig.total] }}
    </span>
  </el-table-column>
</template>

<script>
  export default {
    props: ['colConfig']
  }
</script>
