<template>
  <el-dialog class="bank-limit-wrapper" title="支持快捷支付的银行与限额参考表"
             :before-close="handleClose"
             :visible.sync="visible">
    <el-table :data="list">
      <el-table-column property="name" label="支持银行" width="150"></el-table-column>
      <el-table-column label="交易限额">
        <el-table-column
          prop="singleLimit"
          label="单笔限额"
          width="120">
        </el-table-column>
        <el-table-column
          label="单日限额"
          prop="dayLimit"
          width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column property="remarks" label="备注" width="320"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import { fetchBankLimit } from '@/api/home/public';
  
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data() {
      return {
        list: null
      }
    },
    methods: {
      getList() {
        fetchBankLimit().then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data;
          }
        });
      },
      handleClose() {
        this.$emit('close');
      }
    },
    created() {
      this.getList();
    }
  }
</script>

<style lang="scss">
  .bank-limit-wrapper {
    .el-dialog--small {
      width: 750px;
    }
  
    .el-table td {
      height: 29px;
    }
  }
</style>
