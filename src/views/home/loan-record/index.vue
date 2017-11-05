<template>
  <div class="loan-record-wrapper">
    <!-- 统计信息 -->
    <loan-repayment-statistics title="借款记录" :data="loanData"></loan-repayment-statistics>
    
    <div class="loan-record-wrapper__body">
      <el-tabs v-model="listQuery.type" @tab-click="toggleType" type="card">
        <el-tab-pane label="还款中" name="repaying"></el-tab-pane>
        <el-tab-pane label="待放款" name="rechecking"></el-tab-pane>
        <el-tab-pane label="待发布" name="waiting"></el-tab-pane>
        <el-tab-pane label="筹集中" name="raising"></el-tab-pane>
        <el-tab-pane label="已结清" name="finished"></el-tab-pane>
        <el-tab-pane label="流标" name="fail"></el-tab-pane>
      </el-tabs>
  
      <repaying :load="listLoading" :list="list" v-if="listQuery.type === 'repaying'"></repaying>
      <rechecking :load="listLoading" :list="list" v-if="listQuery.type === 'rechecking'"></rechecking>
      <waiting :load="listLoading" :list="list" v-if="listQuery.type === 'waiting'"></waiting>
      <raising :load="listLoading" :list="list" v-if="listQuery.type === 'raising'"></raising>
      <finished :load="listLoading" :list="list" v-if="listQuery.type === 'finished'"></finished>
      <fail :load="listLoading" :list="list" v-if="listQuery.type === 'fail'"></fail>
      
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
  import Repaying from './components/repaying.vue';
  import Rechecking from './components/rechecking.vue';
  import Waiting from './components/waiting.vue';
  import Raising from './components/raising.vue';
  import Finished from './components/finished.vue';
  import Fail from './components/fail.vue';
  import { fetchLoanRecordPageList, fetchLoanRecordStatistic } from 'api/home/loan';
  
  export default {
    components: {
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
        if (tab && tab.name) {
          this.list = null;
          this.listQuery.type = tab.name;
          this.getPageList();
        }
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
