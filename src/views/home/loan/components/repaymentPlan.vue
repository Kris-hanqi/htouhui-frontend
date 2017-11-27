<template>
  <div class="repayment-plan-wrapper">
    <el-dialog title="还款计划"
               width="880px"
               :before-close="handleClose"
               :visible.sync="visible">
      <div v-loading="listLoading">
        <el-table :data="list">
          <el-table-column property="period" label="期数" width="40"></el-table-column>
          <el-table-column property="corpus" label="本金" width="80"></el-table-column>
          <el-table-column property="iint" label="利息" width="80"></el-table-column>
          <el-table-column property="defaultInterest" label="罚息" width="80"></el-table-column>
          <el-table-column property="fee" label="手续费" width="80"></el-table-column>
          <el-table-column property="totalMoney" label="总额" width="80"></el-table-column>
          <el-table-column property="repayDay" label="还款日" width="80"></el-table-column>
          <el-table-column property="repayTime" label="还款时间" width="80"></el-table-column>
          <el-table-column property="status" label="状态" width="80"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button @click="repayment(scope.row.repayId)" v-if="scope.row.manual === 1 && this.recordType !== 'finished'" type="text">还款</el-button>
                <span v-else>--</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
  
        <div class="overview">
          <span>本金: {{ corpus }}</span>
          <span>手续费: {{ repayFee }}</span>
          <span>罚息: {{ publishFee }}</span>
          <span>利息: {{ interst }}</span>
          <el-button size="small"
                     v-if="canAdvance === 1 && this.recordType !== 'finished'"
                     @click="advanceRepayment"
                     type="primary" round>提前还款</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { feachgRepaymentPlan, fetchAdvanceRepayment, fetchRepayment } from 'api/home/loan';
  
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true
      },
      recordType: {
        type: String
      }
    },
    data() {
      return {
        listLoading: false,
        canAdvance: 0,
        corpus: 0,
        repayFee: 0,
        publishFee: 0,
        interst: 0,
        loanId: '',
        list: null
      }
    },
    methods: {
      getList(id) {
        this.loanId = id;
        this.listLoading = true;
        feachgRepaymentPlan({ loanId: id })
          .then(response => {
            const data = response.data;
            if (data.meta.code === 200) {
              this.list = data.data.data;
              this.corpus = data.data.corpus;
              this.repayFee = data.data.repayFee;
              this.publishFee = data.data.publishFee;
              this.interst = data.data.interst;
              this.canAdvance = data.data.canAdvance;
            }
            this.listLoading = false;
          });
      },
      repayment(id) {
        this.$confirm('确认要还款吗?', '询问', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              fetchRepayment({ repayId: id }).then(response => {
                if (response.data.meta.code === 200) {
                  this.$notify({
                    title: '还款成功',
                    message: '描述:' + response.data.meta.message,
                    type: 'success',
                    position: 'top-left'
                  });
                  this.getPageList();
                } else {
                  this.$notify({
                    title: '还款失败',
                    message: '描述:' + response.data.meta.message,
                    type: 'error',
                    position: 'top-left'
                  });
                }
              })
            }
            done();
          }
        });
      },
      advanceRepayment() {
        this.$confirm('确认要提前还款吗?', '询问', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              fetchAdvanceRepayment(this.loanId)
                .then(response => {
                  if (response.data.meta.code === 200) {
                    this.$message({
                      message: '提前还款成功!',
                      type: 'success'
                    });
                  }
                  if (response.data.meta.code !== 500) {
                    this.$message({
                      message: response.data.meta.message,
                      type: 'error'
                    });
                  }
                })
            }
            done();
          }
        });
      },
      handleClose() {
        this.$emit('close');
      }
    }
  }
</script>

<style lang="scss">
  .repayment-plan-wrapper {
    .overview {
      margin-top: 20px;
      font-size: 14px;
      color: #0671f0;
    }
  }
</style>
