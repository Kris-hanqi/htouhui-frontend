<template>
  <el-table-column :label="colConfig.label" :width="colConfig.width">
    <span slot-scope="scope">
      {{ scope.row[colConfig.prop] + '' }}
    </span>
  </el-table-column>
</template>

<script>
  export default {
    props: ['colConfig']
  }
</script>
