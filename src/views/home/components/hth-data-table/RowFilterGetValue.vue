<template>
  <el-table-column :label="colConfig.label">
    <template slot-scope="scope">
      {{ scope.row[colConfig.prop] | keyToValue(colConfig.listData) }}
    </template>
  </el-table-column>
</template>

<script>
  export default {
    props: ['colConfig'],
    data() {
      return {
        fundsTypes: [
          { key: 'ti_balance', value: '+' },
          { key: 'to_balance', value: '-' },
          { key: 'freeze', value: '-' },
          { key: 'unfreeze', value: '' },
          { key: 'to_frozen', value: '' }
        ]
      }
    }
  }
</script>
