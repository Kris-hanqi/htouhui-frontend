<template>
  <div class="recently-repayment-wrapper">
    <!-- 统计信息 -->
    <loan-repayment-statistics title="近期还款" :data="loanData"></loan-repayment-statistics>
  
    <hth-data-table :page-no="listQuery.pageNo"
                    :page-size="listQuery.size"
                    @page-no-change="handlePageNoChange"
                    :loading="listLoading"
                    :total="total">
      <el-table :data="list" :border="false" style="width: 100%">
        <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
        <el-table-column prop="giveTime" label="放款时间" width="140"></el-table-column>
        <el-table-column label="已还期数/总期数" width="110">
          <template slot-scope="scope">
            {{ scope.row.period }}/{{ scope.row.deadline }}
          </template>
        </el-table-column>
        <el-table-column prop="corpus" label="本金" width="100"></el-table-column>
        <el-table-column prop="interest" label="利息" width="100"></el-table-column>
        <el-table-column prop="defaultInterest" label="罚息" width="100"></el-table-column>
        <el-table-column prop="repayDay" label="还款日" width="140"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column prop="trusteeship" label="管理平台" width="100"></el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <div>
              <el-button v-if="scope.row.repayType === 1" @click="repayment(scope.row.id)" type="text">还款</el-button>
              <span v-else>--</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </hth-data-table>
  </div>
</template>

<script>
  import HthDataTable from '../components/DataTable.vue';
  import LoanRepaymentStatistics from '../components/LoanRepaymentStatistics.vue';
  import { fetchRecentlyRepaymentPageList, fetchRecentlyRepaymentStatistic, fetchRepayment } from 'api/home/loan';
  
  export default {
    components: {
      HthDataTable,
      LoanRepaymentStatistics
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          size: 10
        },
        loanData: {}
      }
    },
    methods: {
      getPageList() {
        this.listLoading = true;
        fetchRecentlyRepaymentPageList(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.recentPaymentRspDatas;
            this.total = data.data.count || 0;
          }
          this.listLoading = false
        })
      },
      getStatistic() {
        fetchRecentlyRepaymentStatistic().then(response => {
          if (response.data.meta.code === 200) {
            this.loanData = response.data.data;
          }
        })
      },
      repayment(id) {
        console.log(typeof id);
        this.$confirm('确认要还款吗?', '询问', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              fetchRepayment({ repayId: id }).then(response => {
                if (response.data.meta.code === 200) {
                  console.log(123);
                }
              })
            } else {
              done();
            }
          }
        });
      },
      handlePageNoChange(val) {
        this.listQuery.pageNo = val;
        this.getPageList();
      }
    },
    created() {
      this.getPageList();
      this.getStatistic();
    }
  }
</script>

<style lang="scss">
  .recently-repayment-wrapper {
    .recently-repayment__header {
      width: 100%;
      height: 200px;
      background-color: #fff;
      box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
      
      h1 {
        font-size: 20px;
        line-height: 1;
        color: #274161;
        padding-top: 20px;
        margin-left: 27px;
      }
    }
  }
</style>
