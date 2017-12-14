<template>
  <el-table-column width="150" :show-overflow-tooltip="true" :label="colConfig.label">
    <template slot-scope="scope">
      <a :href="baseUrl + '/loan/' + scope.row.loanId" v-if="!scope.row.projectNameId" style="color: #409eff;" target="_blank">{{ scope.row.projectName }}</a>
      <a :href="baseUrl + '/loan/' + scope.row.loanId" v-else="" style="color: #409eff;" target="_blank">{{ scope.row.projectName + '--' + scope.row.projectNameId }}</a>
    </template>
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
