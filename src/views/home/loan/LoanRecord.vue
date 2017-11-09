<template>
  <div class="loan-record-wrapper">
    <!-- 统计信息 -->
    <loan-repayment-statistics title="借款记录" :data="loanData"></loan-repayment-statistics>
    
    <hth-data-table :page-no="listQuery.pageNo"
                    :page-size="listQuery.size"
                    @page-no-change="handlePageNoChange"
                    :loading="listLoading"
                    :total="total">
      <el-tabs v-model="listQuery.type" @tab-click="toggleType" type="card">
        <el-tab-pane label="还款中" name="repaying"></el-tab-pane>
        <el-tab-pane label="待放款" name="rechecking"></el-tab-pane>
        <el-tab-pane label="待发布" name="waiting"></el-tab-pane>
        <el-tab-pane label="筹集中" name="raising"></el-tab-pane>
        <el-tab-pane label="已结清" name="finished"></el-tab-pane>
        <el-tab-pane label="流标" name="fail"></el-tab-pane>
      </el-tabs>
  
      <form class="form-horizontal">
        <div class="form-group">
          <div class="input-block">
            <input style="width: 266px;" class="form-control" type="text" placeholder="请输入项目名称">
            <button style="width: 90px" type="button" class="hth-btn hth-btn-primary">查询</button>
          </div>
        </div>
      </form>
      
      <repaying :list="list" v-if="listQuery.type === 'repaying'"></repaying>
      <rechecking :list="list" v-if="listQuery.type === 'rechecking'"></rechecking>
      <waiting :list="list" v-if="listQuery.type === 'waiting'"></waiting>
      <raising :list="list" v-if="listQuery.type === 'raising'"></raising>
      <finished :list="list" v-if="listQuery.type === 'finished'"></finished>
      <fail :list="list" v-if="listQuery.type === 'fail'"></fail>
    </hth-data-table>
    </div>
</template>

<script>
  import HthDataTable from '../components/DataTable.vue';
  import LoanRepaymentStatistics from '../components/LoanRepaymentStatistics.vue';
  import Repaying from './components/LoanRecordRepaying.vue';
  import Rechecking from './components/LoanRecordRechecking.vue';
  import Waiting from './components/LoanRecordWaiting.vue';
  import Raising from './components/LoanRecordRaising.vue';
  import Finished from './components/LoanRecordFinished.vue';
  import Fail from './components/LoanRecordFail.vue';
  import { fetchLoanRecordPageList, fetchLoanRecordStatistic } from 'api/home/loan';
  
  export default {
    components: {
      HthDataTable,
      LoanRepaymentStatistics,
      Repaying,
      Rechecking,
      Waiting,
      Raising,
      Finished,
      Fail
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
            this.total = data.data.total;
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
        if (tab && tab.name) {
          this.listLoading = true;
          this.list = null;
          this.listQuery.type = tab.name;
          this.total = 0;
          this.listQuery.pageNo = 1;
          this.getPageList();
        }
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
  
    .form-horizontal .input-block {
      margin-left: 0;
    }
  
    .form-horizontal .form-control {
      display: inline-block;
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
  }
</style>
