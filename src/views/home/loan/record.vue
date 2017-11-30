<template>
  <div class="loan-record-wrapper">
    <!-- 统计信息 -->
    <loan-repayment-statistics title="借款记录" :data="loanData"></loan-repayment-statistics>
    
    <hth-panel v-loading="listLoading" element-loading-text="拼命加载中...">
      <el-tabs v-model="listQuery.type" @tab-click="toggleType" type="card">
        <el-tab-pane label="还款中" name="repaying">
          <form class="form-inline" style="margin-bottom: 15px;">
            <div class="form-group">
              <label></label>
              <input v-model="listQuery.name" class="form-control" type="text" placeholder="请输入项目名称">
            </div>
            <div class="form-group">
              <button style="width: 100px" :disabled="!listQuery.name" @click="query" type="button" class="hth-btn hth-btn-primary">查询</button>
            </div>
          </form>
          <hth-data-table :data="list" :col-configs="repayingColConfigs">
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="openRepaymentPlan(scope.row.id)" type="text">还款计划</el-button>
                <el-button v-if="scope.row.ensignContract" @click="contractDownload(scope.row)" type="text">合同</el-button>
                <a v-else="" :href="'/contract.html?loanId=' + scope.row.id" target="_blank">合同</a>
              </template>
            </el-table-column>
          </hth-data-table>
        </el-tab-pane>
        
        <el-tab-pane label="待放款" name="rechecking">
          <form class="form-inline" style="margin-bottom: 15px;">
            <div class="form-group">
              <label></label>
              <input v-model="listQuery.name" class="form-control" type="text" placeholder="请输入项目名称">
            </div>
            <div class="form-group">
              <button style="width: 100px" :disabled="!listQuery.name" @click="query" type="button" class="hth-btn hth-btn-primary">查询</button>
            </div>
          </form>
          <hth-data-table :data="list"
                          :col-configs="recheckingColConfigs"></hth-data-table>
        </el-tab-pane>
        
        <el-tab-pane label="待发布" name="waiting">
          <form class="form-inline" style="margin-bottom: 15px;">
            <div class="form-group">
              <label></label>
              <input v-model="listQuery.name" class="form-control" type="text" placeholder="请输入项目名称">
            </div>
            <div class="form-group">
              <button style="width: 100px" :disabled="!listQuery.name" @click="query" type="button" class="hth-btn hth-btn-primary">查询</button>
            </div>
          </form>
          <hth-data-table :data="list"
                          :col-configs="waitingColConfigs"></hth-data-table>
        </el-tab-pane>
        
        <el-tab-pane label="筹集中" name="raising">
          <form class="form-inline" style="margin-bottom: 15px;">
            <div class="form-group">
              <label></label>
              <input v-model="listQuery.name" class="form-control" type="text" placeholder="请输入项目名称">
            </div>
            <div class="form-group">
              <button style="width: 100px" :disabled="!listQuery.name" @click="query" type="button" class="hth-btn hth-btn-primary">查询</button>
            </div>
          </form>
          <hth-data-table :data="list"
                          :col-configs="raisingColConfigs"></hth-data-table>
        </el-tab-pane>
        
        <el-tab-pane label="已结清" name="finished">
          <hth-data-table :data="list"
                          :col-configs="finishedColConfigs">
            <form class="form-inline" style="margin-bottom: 15px;">
              <div class="form-group">
                <label></label>
                <input v-model="listQuery.name" class="form-control" type="text" placeholder="请输入项目名称">
              </div>
              <div class="form-group">
                <button style="width: 100px" :disabled="!listQuery.name" @click="query" type="button" class="hth-btn hth-btn-primary">查询</button>
              </div>
            </form>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="openRepaymentPlan(scope.row.id)" type="text">还款计划</el-button>
                <el-button @click="contractDownload(scope.row)" type="text">合同</el-button>
              </template>
            </el-table-column>
          </hth-data-table>
        </el-tab-pane>
        
        <el-tab-pane label="流标" name="fail">
          <form class="form-inline" style="margin-bottom: 15px;">
            <div class="form-group">
              <label></label>
              <input v-model="listQuery.name" class="form-control" type="text" placeholder="请输入项目名称">
            </div>
            <div class="form-group">
              <button style="width: 100px" :disabled="!listQuery.name" @click="query" type="button" class="hth-btn hth-btn-primary">查询</button>
            </div>
          </form>
          <hth-data-table :data="list"
                          :col-configs="failColConfigs">
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="openRepaymentPlan(scope.row.id)" type="text">还款计划</el-button>
                <el-button @click="contractDownload(scope.row)" type="text">合同</el-button>
              </template>
            </el-table-column>
          </hth-data-table>
        </el-tab-pane>
      </el-tabs>
      
      <!-- 分页 -->
      <div class="pagination-view" v-if="!listLoading && list">
        <p class="total-pages">
          共计<span class="roboto-regular">{{ total }}</span>条记录
       （共<span class="roboto-regular">{{ getPageSize }}</span>页）
      </p>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.pageNo"
        :page-size="listQuery.size"
        layout="prev, pager, next" :total="total"></el-pagination>
      </div>
  
      <!-- 还款计划 -->
      <repayment-plan :visible="repaymentPlanVisible"
                      ref="repayment-plan"
                      @close="closeRepaymentPlan"></repayment-plan>
    </hth-panel>
    </div>
</template>

<script>
  import HthPanel from 'common/Panel/index.vue';
  import HthDataTable from '../components/hth-data-table/HthDataTable.vue';
  import RowProjectName from '../components/hth-data-table/RowProjectName.vue';
  import RowUnit from '../components/hth-data-table/RowUnit.vue';
  import RowRepayTotalTerm from '../components/hth-data-table/RowRepayTotalTerm.vue';
  import LoanRepaymentStatistics from '../components/LoanRepaymentStatistics.vue';
  import RepaymentPlan from './components/repaymentPlan.vue';
  import fileSaver from 'file-saver';
  import { fetchLoanRecordPageList, fetchLoanRecordStatistic, fetchContractDownload } from 'api/home/loan';

  export default {
    components: {
      HthPanel,
      HthDataTable,
      RepaymentPlan,
      LoanRepaymentStatistics
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.size);
      }
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
        repayingColConfigs: [
          { label: '项目名称', component: RowProjectName },
          { label: '放款时间', width: '140', prop: 'giveTime' },
          { label: '借款金额', width: '110', prop: 'loanMoney', component: RowUnit, unit: '元' },
          { label: '实际借款金额', width: '140', prop: 'realLoanMoney', component: RowUnit, unit: '元' },
          { label: '年利率', width: '110', prop: 'rateCount', component: RowUnit, unit: '%' },
          { label: '待还总额', width: '110', prop: 'unPaidMoney', component: RowUnit, unit: '元' },
          { label: '已还期数/总期数', width: '150', component: RowRepayTotalTerm },
          { label: '下次还款日', width: '110', prop: 'payDay' },
          { label: '下次还款数', width: '110', prop: 'nextRepayMoney' },
          { label: '状态', width: '110', prop: 'status' },
          { label: '管理平台', width: '110', prop: 'trusteeship' },
          { slot: 'opt' }
        ],
        recheckingColConfigs: [
          { label: '项目名称', component: RowProjectName },
          { label: '借款金额', width: '100', prop: 'loanMoney' },
          { label: '实际募集金额', width: '100', prop: 'realRaisedMoney' },
          { label: '预计利息', width: '100', prop: 'predictInterst' },
          { label: '年利率', width: '100', prop: 'yearRate', component: RowUnit, unit: '%' },
          { label: '借款期限', width: '100', prop: 'deadline', component: RowUnit, unit: '天' },
          { label: '状态', prop: 'status' }
        ],
        waitingColConfigs: [
          { label: '项目名称', component: RowProjectName },
          { label: '借款金额', prop: 'loanMoney' },
          { label: '预计利息', prop: 'predictInterst' },
          { label: '年利率', prop: 'yearRate', component: RowUnit, unit: '%' },
          { label: '借款期限', prop: 'deadline', component: RowUnit, unit: '天' },
          { label: '状态', prop: 'status' }
        ],
        raisingColConfigs: [
          { label: '项目名称', component: RowProjectName },
          { label: '发布时间', prop: 'verifyTime' },
          { label: '借款金额', prop: 'loanMoney' },
          { label: '剩余时间', prop: 'remainTime' },
          { label: '进度', prop: 'process' },
          { label: '状态', prop: 'status' }
        ],
        finishedColConfigs: [
          { label: '项目名称', component: RowProjectName },
          { label: '放款时间', width: '140', prop: 'giveTime' },
          { label: '借款金额', width: '100', prop: 'actualBorrowMoney' },
          { label: '还款金额', width: '100', prop: 'repayMoney' },
          { label: '结清日期', width: '140', prop: 'settleDowndTime' },
          { label: '管理平台', width: '100', prop: 'trusteeship' },
          { slot: 'opt' }
        ],
        failColConfigs: [
          { label: '项目名称', component: RowProjectName },
          { label: '发布时间', prop: 'verifyTime' },
          { label: '借款金额', prop: 'loanMoney' },
          { label: '流标时间', prop: 'cancelTime' },
          { label: '管理平台', prop: 'trusteeship' },
          { slot: 'opt' }
        ],
        loanData: {},
        repaymentPlanVisible: false
      }
    },
    methods: {
      getPageList() {
        this.list = null;
        this.total = 0;
        this.listLoading = true;
        fetchLoanRecordPageList(this.listQuery)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.list = response.data.data.data;
              this.total = response.data.data.count || 0;
            }
            this.listLoading = false
          })
      },
      query() {
        this.getPageList();
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
          this.listLoading = false;
          this.listQuery.type = tab.name;
          this.listQuery.name = '';
          this.getPageList();
        }
      },
      openRepaymentPlan(id) {
        this.loanId = id;
        this.$refs['repayment-plan'].getList(id);
        this.repaymentPlanVisible = true;
      },
      closeRepaymentPlan() {
        this.repaymentPlanVisible = false;
      },
      contractDownload(data) {
        if (data.ensignContract) { // e签宝合同类型
          fetchContractDownload(data.id)
            .then(response => {
              fileSaver.saveAs(response.data, '海投汇-合同.zip');
            });
        }
      },
      handleCurrentChange(val) {
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
    .hth-panel {
      margin-top: 20px;
    }
    
    .hth-panel-body {
      padding: 10px;
    }
    
    .el-tabs__item {
      width: 132px;
    }
  
    .pagination-view {
      width: 100%;
      margin-top: 20px;
      text-align: right;
    
      .total-pages {
        display: inline-block;
        margin-right: 10px;
        font-size: 14px;
        color: #394b67;
      }
    
      .el-pagination {
        display: inline-block;
        vertical-align: middle;
      }
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
  }
</style>
