<template>
  <el-table-column width="150" :show-overflow-tooltip="true" :label="colConfig.label">
    <span slot-scope="scope">
      <a :href="scope.row.targetUrl" style="color: #409eff;" target="_blank">{{ scope.row.name }}</a>
    </span>
  </el-table-column>
</template>

<script>
  import { mapGetters } from 'vuex';
  
  export default {
    props: ['colConfig'],
    computed: {
      ...mapGetters([
        'baseUrl'
      ])
    }
  }
</script>
