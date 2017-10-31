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
        <el-table-column prop="time" label="项目名称" width="150"></el-table-column>
        <el-table-column prop="projectName" label="放款时间" width="110"></el-table-column>
        <el-table-column prop="typeinfo" label="已还期数/总期数" width="110"></el-table-column>
        <el-table-column prop="money" label="本金" width="100"></el-table-column>
        <el-table-column prop="trusteeship" label="利息" width="140"></el-table-column>
        <el-table-column prop="canUseMoney" label="罚息" width="100"></el-table-column>
        <el-table-column prop="trusteeship" label="还款日" width="140"></el-table-column>
        <el-table-column prop="canUseMoney" label="状态" width="100"></el-table-column>
        <el-table-column prop="canUseMoney" label="管理平台" width="100"></el-table-column>
        <el-table-column prop="detail" label="操作" width="100"></el-table-column>
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
  import { fetchPageList } from '@/api/home/loan-record';
  
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
          type: 'repaying'
        },
        loanData: {
          totalUnRepayMoney: '10000.10',
          curMonthUnRepayMoney: '1000.10',
          curMonthUnRepayNum: '100',
          rsCurMonthOverdueMoney: '1000000000'
        }
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
        fetchPageList(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            this.total = data.data.totalPage;
          }
          this.listLoading = false
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
