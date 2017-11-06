<template>
  <div class="regular-repaying">

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="projectName" label="项目名称" fixed width="170"></el-table-column>
      <el-table-column prop="investTime" label="投资时间" width="80"></el-table-column>
      <el-table-column prop="investCash" label="投资金额" width="100">
        <template scope="scope">
          {{ scope.row.investCash + '元' }}
        </template>
      </el-table-column>
      <el-table-column prop="investRate" label="年利率" width="60">
        <template scope="scope">
          {{ scope.row.investRate + '%' }}
        </template>
      </el-table-column>
      <el-table-column prop="paidPeriod" label="已还期数/总期数" width="110">
        <template scope="scope">
          {{ scope.row.paidPeriod + '/' + scope.row.repayPeriod }}
        </template>
      </el-table-column>
      <el-table-column prop="nextRepayDate" label="下次还款日" width="90"></el-table-column>
      <el-table-column prop="award" label="额外奖励" width="60">
        <template scope="scope">
          <el-button class="icon-award" @click="getExtendEarn(scope.row.investId)" type="text" size="small"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="投资状态" width="70">
        <template scope="scope">
          {{ scope.row.status | keyToValue(typeList) }}
        </template>
      </el-table-column>
      <el-table-column prop="look" label="查看" fixed="right" width="100">
        <template scope="scope">
          <el-button class="icon-plan" type="text" size="small" @click="getInvestRepaysList(scope.row.investId)">还款计划</el-button>
          <el-button class="icon-interests" type="text" size="small">合同</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.pageSize" layout="prev, pager, next" :total="total"></el-pagination>
    </div>


    <el-dialog title="额外奖励" :visible.sync="dialogVisible" width="30%">
      <div class="dialog-main">
        <el-table :data="extendEarnList" style="width: 100%">
          <el-table-column prop="name" label="优惠券" width="140"></el-table-column>
          <el-table-column prop="rate" label="额外加息点数">
            <template scope="scope">
              {{ scope.row.rate + '%' }}
            </template>
          </el-table-column>
          <el-table-column prop="money" label="额外利息">
            <template scope="scope">
              {{ scope.row.money + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="repayTime" label="还款时间"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template scope="scope">
             {{ scope.row.status | keyToValue(extendEarnListStatus) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog title="还款计划" :visible.sync="investRepays" width="30%">
      <div class="dialog-main">
        <el-table :data="investRepaysList" style="width: 100%">
          <el-table-column prop="period" label="期数" fixed width="30"></el-table-column>
          <el-table-column prop="corpus" label="本金">
            <template scope="scope">
              {{ scope.row.corpus + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="interest" label="利息">
            <template scope="scope">
              {{ scope.row.interest + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="tiexiMoney" label="贴息">
            <template scope="scope">
              {{ scope.row.tiexiMoney + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="defaultInterest" label="罚息">
            <template scope="scope">
              {{ scope.row.defaultInterest + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="fee" label="手续费">
            <template scope="scope">
              {{ scope.row.fee + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="loanUserFee" label="总额">
            <template scope="scope">
              {{ scope.row.loanUserFee + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="repayDay" label="还款日"></el-table-column>
          <el-table-column prop="time" label="还款时间"></el-table-column>
          <el-table-column prop="status" label="状态" fixed="right">
            <template scope="scope">
              {{ scope.row.status | keyToValue(statusList) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { regularInvest, investRepays, extendEarn } from 'api/home/regularInvest';

  export default {
    data() {
      return {
        dialogVisible: false,
        investRepays: false,
        listQuery: {
          status: 'repaying',
          startTime: '',
          endTime: '',
          pageNo: 1,
          pageSize: 10
        },
        investRepaysQuery: {
          investId: ''
        },
        list: null,
        total: 0,
        typeList: [
          { key: 'repaying', value: '还款中' },
          { key: 'bid_success', value: '投标中' },
          { key: 'complete', value: '已结清' },
          { key: 'cancel', value: '未成功' }
        ],
        extendEarnListStatus: [
          { key: 'not_opened', value: '未开户' },
          { key: 'wait_repay', value: '等待代偿' },
          { key: 'success', value: '成功' },
          { key: 'fail', value: '失败' }
        ],
        statusList: [
          { key: 'complete', value: '完成' },
          { key: 'overdue', value: '逾期的' },
          { key: 'repaying', value: '还款中' },
          { key: 'waiting_transfer', value: '-' },
          { key: 'wait_transfer_confirm', value: '-' }
        ],
        investRepaysList: null,
        extendEarnList: null
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.pageSize);
      }
    },
    methods: {
      getPageList() {
        regularInvest(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            this.total = data.data.count || 0;
          }
        })
      },
      getInvestRepaysList(id) {
        this.investRepays = true;
        this.investRepaysQuery.investId = id;
        investRepays(this.investRepaysQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.investRepaysList = data.data;
            console.log('还款计划' + this.investRepaysList);
            console.log(this.investRepaysList);
          }
        })
      },
      getExtendEarn(id) {
        this.dialogVisible = true;
        this.investRepaysQuery.investId = id;
        extendEarn(this.investRepaysQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.extendEarnList = data.data;
            console.log('额外奖励' + this.extendEarnList);
            console.log(this.extendEarnList);
          }
        })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getPageList();
      }
    },
    created() {
      this.getPageList();
    }
  }
</script>

<style lang="scss" scoped>

  .icon-award {
    width: 24px;
    height: 24px;
    background: url(../../../assets/images/home/icon-award.png) no-repeat center;
  }

  .icon-plan {
    color: #0573f4;
  }

  .icon-interests {
    color: #0573f4;
  }

</style>
