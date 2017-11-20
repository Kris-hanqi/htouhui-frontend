<template>
  <el-dialog class="bank-limit-wrapper"
             title="还款计划"
             width="750px"
             :before-close="handleClose"
             :visible.sync="visible">
    <el-table :data="list">
      <el-table-column property="period" label="期数" width="100"></el-table-column>
      <el-table-column property="corpus" label="本金" width="100"></el-table-column>
      <el-table-column property="iint" label="利息" width="100"></el-table-column>
      <el-table-column property="corpus" label="贴息" width="100"></el-table-column>
      <el-table-column property="defaultInterest" label="罚息" width="100"></el-table-column>
      <el-table-column property="fee" label="手续费" width="100"></el-table-column>
      <el-table-column property="totalMoney" label="总额" width="100"></el-table-column>
      <el-table-column property="repayDay" label="还款日" width="100"></el-table-column>
      <el-table-column property="repayTime" label="还款时间" width="100"></el-table-column>
      <el-table-column property="status" label="状态" width="320"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import { feachgRepaymentPlan } from 'api/home/loan';
  
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true
      },
      loanId: {
        type: String,
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
        feachgRepaymentPlan({ loanId: this.loanId })
          .then(response => {
            const data = response.data;
            if (data.meta.code === 200) {
              console.log(data);
            }
          });
      },
      handleClose() {
        this.$emit('close');
      }
    }
  }
</script>
