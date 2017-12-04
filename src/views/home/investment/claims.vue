<template>
  <div class="claims">
    <p class="title">债权转让</p>
    <el-tabs v-model="activeName"
             @tab-click="toggleType"
             type="card">
      <el-tab-pane label="已转入的债权" name="into">
        <hth-data-table v-loading="listLoading"
                        element-loading-text="拼命加载中..."
                        :data="list"
                        :col-configs="hasColConfigs">
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button v-if="scope.row.hasDetTransferCompact" type="text">债转合同</el-button>
              <el-button v-else-if="scope.row.hasCompact" type="text">合同</el-button>
            </template>
          </el-table-column>
        </hth-data-table>
      </el-tab-pane>
      <el-tab-pane label="已转出的债权" name="out">
        <hth-data-table v-loading="listLoading"
                        element-loading-text="拼命加载中..."
                        :data="list"
                        :col-configs="haveColConfigs"></hth-data-table>
      </el-tab-pane>
    </el-tabs>
  
    <!-- 分页 -->
    <div class="pagination-view" v-if="list && list.length">
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
  </div>
</template>

<script>
  import HthDataTable from '../components/hth-data-table/HthDataTable.vue';
  import RowClaimsProjectName from '../components/hth-data-table/RowClaimsProjectName.vue';
  import RowUnit from '../components/hth-data-table/RowUnit.vue';
  import RowMoney from '../components/hth-data-table/RowMoney.vue';
  import { fetchClaimsTurnInto, fetchClaimsTurnOut } from 'api/home/investment-claims';
  
  export default {
    components: {
      HthDataTable
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.size);
      }
    },
    data() {
      return {
        activeName: 'into',
        listQuery: {
          pageNo: 1,
          size: 10
        },
        total: 0,
        list: null,
        listLoading: false,
        hasColConfigs: [
          { label: '项目名称', component: RowClaimsProjectName },
          { label: '投资时间', width: '140', prop: 'time' },
          { label: '投资金额', width: '110', prop: 'money', component: RowUnit, unit: '元' },
          { label: '剩余时间', width: '140', prop: 'repayPeriod', component: RowUnit, unit: '天' },
          { label: '债权价格', width: '110', prop: 'debtPrice', component: RowMoney },
          { label: '待收本息', width: '110', prop: 'unPaidMoney', component: RowUnit, unit: '元' },
          { slot: 'opt' }
        ],
        haveColConfigs: [
          { label: '项目名称', component: RowClaimsProjectName },
          { label: '发起时间', width: '150', prop: 'applyTime' },
          { label: '到期时间', width: '150', prop: 'endTime' },
          { label: '转让本金', width: '150', prop: 'corpus', component: RowMoney },
          { label: '折让金', width: '', prop: 'premium', component: RowMoney }
        ]
      };
    },
    methods: {
      getIntoPageList() {
        this.listLoading = true;
        fetchClaimsTurnInto(this.listQuery)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.list = response.data.data.data;
              this.total = response.data.data.count || 0;
            }
            this.listLoading = false;
          })
      },
      getOutPageList() {
        this.listLoading = true;
        fetchClaimsTurnOut(this.listQuery)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.list = response.data.data.data;
              this.total = response.data.data.count || 0;
            }
            this.listLoading = false;
          })
      },
      toggleType(tab) {
        if (tab && tab.name) {
          this.listLoading = false;
          this.list = null;
          this.total = 0;
          this.listQuery.pageNo = 1;
          if (tab.name === 'into') {
            this.getIntoPageList();
          }
          if (tab.name === 'out') {
            this.getOutPageList();
          }
        }
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        if (this.activeName === 'into') {
          this.getIntoPageList();
        }
        if (this.activeName === 'out') {
          this.getOutPageList();
        }
      }
    },
    created() {
      this.getIntoPageList();
    }
  };
</script>

<style lang="scss">
  .claims {
    width: 100%;
    height: 846px;
    box-sizing: border-box;
    padding: 20px 15px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    
    .title {
      margin-bottom: 25px;
      font-size: 20px;
      color: #274161;
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
  }
</style>
