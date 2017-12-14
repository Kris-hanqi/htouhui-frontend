<template>
  <el-table-column :label="colConfig.label">
    <span slot-scope="scope">
     {{ (scope.row.investCash + scope.row.cashCoupon) | currency('') + '元' }}
    </span>
  </el-table-column>
</template>

<script>
  export default {
    props: ['colConfig']
  }
</script>
