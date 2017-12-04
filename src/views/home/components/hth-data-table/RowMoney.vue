<template>
  <el-table-column :label="colConfig.label">
    <tempalte slot-scope="scope">
      <span v-if="scope.row[colConfig.prop]"> {{ scope.row[colConfig.prop] | currency('') + '元' }}</span>
      <span v-else="">--</span>
    </tempalte>
  </el-table-column>
</template>

<script>
  export default {
    props: ['colConfig']
  }
</script>
