<template>
  <div class="loan-record-wrapper">
    <!-- 统计信息 -->
    <loan-repayment-statistics title="借款记录" :data="loanData"></loan-repayment-statistics>
    
    <div class="loan-record-wrapper__body">
      <el-tabs v-model="listQuery.type" @tab-click="toggleType">
        <el-tab-pane label="还款中" name="repaying"></el-tab-pane>
        <el-tab-pane label="待放款" name="rechecking"></el-tab-pane>
        <el-tab-pane label="待发布" name="waiting"></el-tab-pane>
        <el-tab-pane label="筹集中" name="raising"></el-tab-pane>
        <el-tab-pane label="已结清" name="finished"></el-tab-pane>
        <el-tab-pane label="流标" name="fail"></el-tab-pane>
      </el-tabs>
      <el-table :data="list"
                v-loading="listLoading"
                element-loading-text="拼命加载中..."
                :border="false"
                style="width: 100%">
        <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
        <el-table-column prop="giveTime" label="放款时间" width="140"></el-table-column>
        <el-table-column prop="loanMoney" label="借款金额" width="110"></el-table-column>
        <el-table-column prop="realLoanMoney" label="实际借款金额" width="110"></el-table-column>
        <el-table-column prop="rateCount" label="年利率" width="110"></el-table-column>
        <el-table-column prop="unPaidMoney" label="待还总额" width="110"></el-table-column>
        <el-table-column label="已还期数/总期数" width="110">
          <template scope="scope">
            {{ scope.row.repayedTerm }}/{{ scope.row.repayedTerm + scope.row.unRepayTerm }}
          </template>
        </el-table-column>
        <el-table-column prop="payDay" label="下次还款日" width="140"></el-table-column>
        <el-table-column prop="nextRepayMoney" label="下次还款数" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column prop="trusteeship" label="管理平台" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template scope="scope">
            <el-button type="text">还款计划</el-button>
            <el-button type="text">合同</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages" v-show="!listLoading">
        <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.pageNo"
          :page-size="listQuery.size"
          layout="prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import LoanRepaymentStatistics from '../components/LoanRepaymentStatistics.vue';
  import { fetchLoanRecordPageList, fetchLoanRecordStatistic } from 'api/home/loan';
  
  export default {
    components: {
      LoanRepaymentStatistics
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          size: 10,
          type: 'repaying',
          name: ''
        },
        loanData: {}
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.size);
      }
    },
    methods: {
      getPageList() {
        this.listLoading = true;
        fetchLoanRecordPageList(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            this.total = data.data.totalPage;
          }
          this.listLoading = false
        })
      },
      getStatistic() {
        fetchLoanRecordStatistic().then(response => {
          if (response.data.meta.code === 200) {
            this.loanData = response.data.data;
          }
        })
      },
      toggleType(tab) {
        console.log(tab);
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
      }
    },
    created() {
      this.getPageList();
      this.getStatistic();
    }
  }
</script>

<style lang="scss">
  .loan-record-wrapper {
    .el-tabs__item {
      width: 132px;
    }
    
    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      display: none;
    }
  
    .el-tabs__nav-wrap.is-scrollable {
      padding: 0;
    }
    
    .loan-record-wrapper__header {
      width: 100%;
      height: 200px;
      margin-top: 16px;
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
    
    .loan-record-wrapper__body {
      margin-top: 13px;
      padding: 17px 20px;
      background-color: #fff;
    }
  }
</style>
