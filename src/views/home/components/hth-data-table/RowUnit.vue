<template>
  <el-table-column :label="colConfig.label">
    <span slot-scope="scope">
      {{ scope.row[colConfig.prop] + colConfig.unit }}
    </span>
  </el-table-column>
</template>

<script>
  export default {
    props: ['colConfig']
  }
</script>
