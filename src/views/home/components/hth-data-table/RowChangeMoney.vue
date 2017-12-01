<template>
  <!-- 资金流水 变动金额 -->
  <el-table-column :label="colConfig.label">
    <template slot-scope="scope">
      <span>
      {{ scope.row.type | keyToValue(fundsTypes) }}{{ scope.row.money }}
      </span>
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
