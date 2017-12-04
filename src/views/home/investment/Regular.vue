<template>
  <div class="regular">
    <el-tabs v-model="activeName"
             @tab-click="toggleType" type="card">
      <el-tab-pane label="还款中" name="repaying">
        <hth-data-table v-loading="listLoading"
                        element-loading-text="拼命加载中..."
                        :data="list"
                        :col-configs="firstColConfigs">
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text">还款计划</el-button>
              <el-button type="text">合同</el-button>
            </template>
          </el-table-column>
        </hth-data-table>
      </el-tab-pane>
      <el-tab-pane label="投标中" name="bid_success">
        <hth-data-table v-loading="listLoading"
                        element-loading-text="拼命加载中..."
                        :data="list"
                        :col-configs="secondColConfigs"></hth-data-table>
      </el-tab-pane>
      <el-tab-pane label="已结清" name="complete">
        <hth-data-table v-loading="listLoading"
                        element-loading-text="拼命加载中..."
                        :data="list"
                        :col-configs="completeColConfigs">
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text">还款计划</el-button>
              <el-button type="text">合同</el-button>
            </template>
          </el-table-column>
        </hth-data-table>
      </el-tab-pane>
      <el-tab-pane label="未成功" name="cancel">
        <hth-data-table v-loading="listLoading"
                        element-loading-text="拼命加载中..."
                        :data="list"
                        :col-configs="cancelColConfigs"></hth-data-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import HthDataTable from '../components/hth-data-table/HthDataTable.vue';
  import RowUnit from '../components/hth-data-table/RowUnit.vue';
  import RowRegularProjectName from '../components/hth-data-table/RowRegularProjectName.vue';
  import RowRepaymentPeriod from '../components/hth-data-table/RowRepaymentPeriod.vue';
  import RowRegularInvestCash from '../components/hth-data-table/RowRegularInvestCash.vue';
  import RowAdditionalRewards from '../components/hth-data-table/RowAdditionalRewards.vue';
  import RowFilterGetValue from '../components/hth-data-table/RowFilterGetValue.vue';
  import RowLoanData from '../components/hth-data-table/RowLoanData.vue';
  import { fetchGetPageList } from 'api/home/investment-regular';
  
  const typeList = [
    { key: 'repaying', value: '还款中' },
    { key: 'bid_success', value: '投标中' },
    { key: 'complete', value: '已结清' },
    { key: 'cancel', value: '未成功' }
  ];

  const platformList = [
    { key: 'yeepay', value: '易宝支付' },
    { key: 'jixin', value: '江西银行' }
  ];
  
  export default {
    components: {
      HthDataTable
    },
    data() {
      return {
        list: null,
        listLoading: false,
        listQuery: {
          status: 'repaying',
          pageNo: 1,
          pageSize: 10
        },
        activeName: 'repaying',
        firstColConfigs: [
          { label: '项目名称', component: RowRegularProjectName },
          { label: '投资时间', width: '140', prop: 'investTime' },
          { label: '投资金额', width: '100', prop: 'investCash', component: RowRegularInvestCash },
          { label: '年利率', width: '100', prop: 'investRate', component: RowUnit, unit: '%' },
          { label: '已还期数/总期数', width: '140', component: RowRepaymentPeriod, returned: 'paidPeriod', total: 'repayPeriod' },
          { label: '下次还款日', width: '140', prop: 'nextRepayDate' },
          { label: '额外奖励', width: '140', component: RowAdditionalRewards },
          { label: '投资状态', width: '140', prop: 'status', component: RowFilterGetValue, listData: typeList },
          { slot: 'opt' }
        ],
        secondColConfigs: [
          { label: '项目名称', component: RowRegularProjectName },
          { label: '投资时间', width: '140', prop: 'investTime' },
          { label: '投资金额', width: '100', prop: 'investCash', component: RowRegularInvestCash },
          { label: '年利率', width: '100', prop: 'investRate', component: RowUnit, unit: '%' },
          { label: '借款期限', width: '100', component: RowLoanData },
          { label: '剩余时间', width: '100', prop: 'remainingTime' },
          { label: '投标进度', width: '90', prop: 'biddingSchedule', component: RowUnit, unit: '%' },
          { label: '投资状态', width: '100', prop: 'status', component: RowFilterGetValue, listData: typeList }
        ],
        completeColConfigs: [
          { label: '项目名称', component: RowRegularProjectName },
          { label: '投资时间', width: '140', prop: 'investTime' },
          { label: '投资金额', width: '100', prop: 'investCash', component: RowRegularInvestCash },
          { label: '年利率', width: '100', prop: 'investRate', component: RowUnit, unit: '%' },
          { label: '已还期数/总期数', width: '140', component: RowRepaymentPeriod, returned: 'paidPeriod', total: 'repayPeriod' },
          { label: '收益', width: '100', prop: 'profit', component: RowUnit, unit: '元' },
          { label: '结清时间', width: '140', prop: 'settlementTime' },
          { label: '管理平台', width: '90', prop: 'managementPlatform', component: RowFilterGetValue, listData: platformList },
          { slot: 'opt' }
        ],
        cancelColConfigs: [
          { label: '项目名称', component: RowRegularProjectName },
          { label: '投资时间', width: '140', prop: 'investTime' },
          { label: '投资金额', width: '100', prop: 'investCash', component: RowRegularInvestCash },
          { label: '年利率', width: '100', prop: 'investRate', component: RowUnit, unit: '%' },
          { label: '剩余时间', width: '100', prop: 'remainingTime' },
          { label: '投标进度', width: '90', prop: 'biddingSchedule', component: RowUnit, unit: '%' },
          { label: '投资状态', width: '100', prop: 'status', component: RowFilterGetValue, listData: typeList }
        ]
      }
    },
    methods: {
      getPageList() {
        fetchGetPageList(this.listQuery)
          .then(response => {
            const data = response.data;
            if (data.meta.code === 200) {
              this.list = data.data.data;
              this.total = data.data.count || 0;
            }
          })
      },
      toggleType(tab) {
        if (tab && tab.name) {
          this.listLoading = false;
          this.list = null;
          this.total = 0;
          this.listQuery.pageNo = 1;
          this.listQuery.status = tab.name;
          this.getPageList();
        }
      }
    },
    created() {
      if (this.$route.query.tagName) {
        this.activeName = this.$route.query.tagName;
      }
      if (this.$route.query.message) {
        this.$notify.info({
          title: '提示',
          message: '加入成功'
        });
      }
      this.getPageList();
    }
  }
</script>

<style lang="scss" scoped>
  .regular {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 30px 15px;
    background-color: #fff;
    margin-bottom: 20px;
  }
</style>
