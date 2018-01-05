<template>
  <div class="regular">
    <el-tabs v-model="activeName"
             v-loading="listLoading"
             element-loading-text="拼命加载中..."
             @tab-click="toggleType" type="card">
      <br>
      <div class="times-box">
        <ul class="times">
          <li>交易时间：</li>
          <li>
            <a @click.stop="switchDateType('all')" :class="{ active: dateType === 'all'}">全部</a>
          </li>
          <li>
            <a @click.stop="switchDateType('3day')" :class="{ active: dateType === '3day'}">近三天</a>
          </li>
          <li>
            <a @click.stop="switchDateType('1month')" :class="{ active: dateType === '1month'}">近一个月</a>
          </li>
          <li>
            <a @click.stop="switchDateType('3month')" :class="{ active: dateType === '3month'}">近三个月</a>
          </li>
          <li>
            <a @click.stop="switchDateType('other')" class="diy-time" :class="{ active: dateType === 'other'}">自定义时间</a>
          </li>
        </ul>
        <ul class="allChooseCalendar" v-show="dateType === 'other'">
          <el-date-picker
            v-model="selectDates.startTime"
            :picker-options="pickerOptions"
            type="datetime"
            placeholder="选择开始日期">
          </el-date-picker>
          <el-date-picker
            v-model="selectDates.endTime"
            :picker-options="pickerOptions"
            type="datetime"
            placeholder="选择结束日期">
          </el-date-picker>
          <button class="find-btn" @click="query">查询</button>
        </ul>
      </div>
      <el-tab-pane label="还款中" name="repaying">
        <hth-data-table :data="list"
                        :col-configs="firstColConfigs">
          <el-table-column slot="opt0" width="100" label="额外奖励">
            <template slot-scope="scope">
              <el-button @click="getExtendEarn(scope.row)" v-if="scope.row.jiaxi === '1'" type="text">
                <i class="ku-icon icon-money-bag" style="font-size: 25px"></i>
              </el-button>
              <span v-else=""><i class="ku-icon icon-money-bag ku-icon-disabled" style="font-size: 25px"></i></span>
            </template>
          </el-table-column>
          <el-table-column slot="opt" fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="getInvestRepays(scope.row.investId)">还款计划</el-button>
              <el-button type="text" v-if="scope.row.contract === '1'" @click="downLoadContract(scope.row.investId)">下载合同</el-button>
              <a v-else="" style="color: #409EFF;" :href="'/user/contract.html?loanId=' + scope.row.loanId" target="_blank">下载合同</a>
            </template>
          </el-table-column>
        </hth-data-table>
      </el-tab-pane>
      <el-tab-pane label="投标中" name="bid_success">
        <hth-data-table :data="list"
                        :col-configs="secondColConfigs"></hth-data-table>
      </el-tab-pane>
      <el-tab-pane label="已结清" name="complete">
        <hth-data-table :data="list"
                        :col-configs="completeColConfigs">
          <el-table-column slot="opt" fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="getInvestRepays(scope.row.investId)">还款计划</el-button>
              <el-button type="text" v-if="scope.row.contract === '1'" @click="downLoadContract(scope.row.investId)">下载合同</el-button>
              <a v-else="" style="color: #409EFF;" :href="'/user/contract.html?loanId=' + scope.row.loanId" target="_blank">下载合同</a>
            </template>
          </el-table-column>
        </hth-data-table>
      </el-tab-pane>
      <el-tab-pane label="未成功" name="cancel">
        <hth-data-table :data="list"
                        :col-configs="cancelColConfigs"></hth-data-table>
      </el-tab-pane>
    </el-tabs>

    <div class="pages" v-if="list && list.length && !listLoading">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录
      （共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.pageNo"
                     :page-size="listQuery.pageSize"
                     layout="prev, pager, next" :total="total"></el-pagination>
    </div>

    <el-dialog title="额外奖励"
               :visible.sync="dialogVisible"
               width="700px">
      <div class="dialog-main">
        <el-table :data="extendEarnList" style="width: 100%">
          <el-table-column prop="name" label="优惠券" width="140"></el-table-column>
          <el-table-column prop="rate" label="额外加息点数">
            <template slot-scope="scope">
              {{ scope.row.rate + '%' }}
            </template>
          </el-table-column>
          <el-table-column prop="money" label="额外利息">
            <template slot-scope="scope">
              {{ scope.row.money | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="repayTime" label="还款时间" width="140"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{ scope.row.status | keyToValue(extendEarnListStatus) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog title="还款计划"
               :visible.sync="investRepaysDialogVisible"
               width="830px">
      <div class="dialog-main">
        <el-table :data="investRepaysList" style="width: 100%">
          <el-table-column prop="period" label="期数" width="50"></el-table-column>
          <el-table-column prop="corpus" label="本金">
            <template slot-scope="scope">
              {{ scope.row.corpus | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="interest" label="利息">
            <template slot-scope="scope">
              {{ scope.row.interest | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="tiexiMoney" label="贴息">
            <template slot-scope="scope">
              {{ scope.row.tiexiMoney | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="defaultInterest" label="罚息">
            <template slot-scope="scope">
              {{ scope.row.defaultInterest | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="fee" label="手续费">
            <template slot-scope="scope">
              {{ scope.row.fee | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="loanUserFee" label="总额">
            <template slot-scope="scope">
              {{ scope.row.loanUserFee | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="repayDay" label="还款日"></el-table-column>
          <el-table-column label="还款时间">
            <template slot-scope="scope">
              {{ scope.row.time || '--'  }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{ scope.row.status | keyToValue(statusList) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import HthDataTable from '../components/hth-data-table/HthDataTable.vue';
  import RowUnit from '../components/hth-data-table/RowUnit.vue';
  import RowRegularProjectName from '../components/hth-data-table/RowRegularProjectName.vue';
  import RowRepaymentPeriod from '../components/hth-data-table/RowRepaymentPeriod.vue';
  import RowRegularInvestCash from '../components/hth-data-table/RowRegularInvestCash.vue';
  import RowFilterGetValue from '../components/hth-data-table/RowFilterGetValue.vue';
  import RowLoanData from '../components/hth-data-table/RowLoanData.vue';
  import { fetchGetPageList, feachExtendEarn, fetchInvestRepays } from 'api/home/investment-regular';
  import { feachDownLoadClaimsContract } from 'api/home/investment';
  import { getStartAndEndTime, formatDate } from 'utils/index';

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
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.pageSize);
      }
    },
    data() {
      return {
        list: null,
        listLoading: false,
        selectDates: {
          startTime: '',
          endTime: ''
        },
        listQuery: {
          startTime: '',
          endTime: '',
          status: 'repaying',
          pageNo: 1,
          pageSize: 10
        },
        pickerOptions: {
          disabledDate(date) {
            return date > new Date();
          }
        },
        dateType: 'all',
        activeName: 'repaying',
        firstColConfigs: [
          { label: '项目名称', component: RowRegularProjectName },
          { label: '投资时间', width: '150', prop: 'investTime' },
          { label: '投资金额', width: '140', prop: 'investCash', component: RowRegularInvestCash },
          { label: '年利率', width: '100', prop: 'investRate', component: RowUnit, unit: '%' },
          { label: '已还期数/总期数', width: '140', component: RowRepaymentPeriod, returned: 'paidPeriod', total: 'repayPeriod' },
          { label: '下次还款日', width: '140', prop: 'nextRepayDate' },
          { label: '额外奖励', slot: 'opt0' },
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
        ],
        extendEarnList: null,
        dialogVisible: false,
        extendEarnListStatus: [
          { key: 'not_opened', value: '未发放' },
          { key: 'wait_repay', value: '未发放' },
          { key: 'success', value: '已发放' },
          { key: 'fail', value: '未发放' }
        ],
        investRepaysList: null,
        investRepaysDialogVisible: false,
        statusList: [
          { key: 'complete', value: '完成' },
          { key: 'overdue', value: '逾期的' },
          { key: 'repaying', value: '还款中' },
          { key: 'waiting_transfer', value: '-' },
          { key: 'wait_transfer_confirm', value: '-' }
        ]
      }
    },
    methods: {
      getPageList() {
        let dates = null;
        if (this.dateType !== 'other') {
          if (this.dateType === 'all') {
            this.listQuery.startTime = '2000-01-01 11:28:34';
            this.listQuery.endTime = '2200-01-01 11:28:34';
          } else {
            dates = getStartAndEndTime(this.dateType);
            this.listQuery.startTime = dates.startTime;
            this.listQuery.endTime = dates.endTime;
          }
        } else {
          if (this.selectDates.startTime && this.selectDates.endTime) {
            if (this.selectDates.startTime > this.selectDates.endTime) {
              this.$message({
                message: '开始时间不能大于结束时间',
                type: 'warning'
              });
              return;
            }
            this.listQuery.startTime = formatDate(this.selectDates.startTime);
            this.listQuery.endTime = formatDate(this.selectDates.endTime);
          } else {
            this.$message({
              message: '请选择时间',
              type: 'warning'
            });
            return;
          }
        }
        this.list = null;
        this.total = 0;
        this.listLoading = true;
        fetchGetPageList(this.listQuery)
          .then(response => {
            const data = response.data;
            if (data.meta.code === 200) {
              this.list = data.data.data;
              this.total = data.data.count || 0;
            }
            this.listLoading = false;
          })
      },
      query() {
        this.listQuery.pageNo = 1;
        this.total = 0;
        this.list = null;
        this.getPageList();
      },
      switchDateType(type) {
        this.dateType = type;
        this.listQuery.pageNo = 1;
        this.total = 0;
        if (this.dateType !== 'other') {
          this.getPageList();
        } else {
          this.list = null;
        }
      },
      toggleType(tab) {
        if (tab && tab.name) {
          this.dateType = 'all';
          this.listLoading = false;
          this.list = null;
          this.total = 0;
          this.listQuery.pageNo = 1;
          this.listQuery.status = tab.name;
          this.getPageList();
        }
      },
      getExtendEarn(data) {
        if (data.jiaxi !== '1') return;
        this.extendEarnList = null;
        this.dialogVisible = true;
        feachExtendEarn({ investId: data.investId })
          .then(response => {
            const data = response.data;
            if (data.meta.code === 200) {
              this.extendEarnList = data.data;
            }
          })
      },
      getInvestRepays(id) {
        this.investRepaysList = null;
        this.investRepaysDialogVisible = true;
        fetchInvestRepays({ investId: id })
          .then(response => {
            const data = response.data;
            if (data.meta.code === 200) {
              this.investRepaysList = data.data;
            }
          })
      },
      downLoadContract(id) {
        feachDownLoadClaimsContract(id)
          .then(response => {
            if (response.data.meta.code === 200) {
              document.getElementById('ifile').src = response.data.data;
            }
            if (response.data.meta.code === 9999) {
              this.$notify.error({
                title: '合同下载失败',
                message: response.data.meta.message
              });
            }
          })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getPageList();
      }
    },
    created() {
      if (this.$route.query.tagName && this.$route.query.tagName === 'second') {
        this.activeName = 'bid_success';
        this.listQuery.status = 'bid_success';
      }
      if (this.$route.query.message) {
        this.$message({
          message: '投资请求已受理!请稍候',
          type: 'success'
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
  
    .times-box {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      padding-left: 30px;
      padding-right: 30px;
      margin-bottom: 25px;
    
      ul {
        float: left;
      }
    
      li {
        float: left;
        margin-right: 10px;
        font-size: 16px;
        color: #274161;
      
        a {
          display: inline-block;
          padding: 4px 10px;
          text-align: center;
          margin-top: -5px;
        }
      
        a.active {
          border-radius: 100px;
          background-color: #0671f0;
          color: #fff;
        }
      }
    
      .allChooseCalendar {
        margin: 15px 0 15px 57px;
      }
    
      .find-btn {
        width: 135px;
        height: 40px;
        box-sizing: border-box;
        border-radius: 100px;
        background-color: #378ff6;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
      }
    }
    
    .ku-icon-disabled {
      color: #d0cdcd;
    }
  }
</style>
