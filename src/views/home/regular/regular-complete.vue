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
      <el-table-column prop="investRate" label="年利率" width="60"></el-table-column>
      <el-table-column prop="paidPeriod" label="已还期数/总期数" width="110">
        <template scope="scope">
          {{ scope.row.paidPeriod + '/' + scope.row.repayPeriod }}
        </template>
      </el-table-column>
      <el-table-column prop="nextRepayDate" label="收益" width="90"></el-table-column>
      <el-table-column prop="award" label="结清时间" width="60"></el-table-column>
      <el-table-column prop="status" label="管理平台" width="70"></el-table-column>
      <el-table-column prop="look" label="查看" fixed="right" width="100">
        <template scope="scope">
          <el-button class="payment-details" type="text" size="small" @click="getInvestRepaysList(scope.row.investId)">收款详情</el-button>
          <el-button class="icon-interests" type="text" size="small">合同</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.size" layout="prev, pager, next" :total="total"></el-pagination>
    </div>


    <el-dialog title="收款详情" :visible.sync="dialogVisible" width="30%">
      <div class="dialog-main">
        <el-table :data="etherRewards" style="width: 100%">
          <el-table-column prop="coupon" label="优惠券" width="140"></el-table-column>
          <el-table-column prop="point" label="额外加息点数"></el-table-column>
          <el-table-column prop="ether" label="额外利息"></el-table-column>
          <el-table-column prop="time" label="还款时间"></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog title="还款计划" :visible.sync="investRepays" width="30%">
      <div class="dialog-main">
        <el-table :data="investRepaysList" style="width: 100%">
          <el-table-column prop="period" label="期数"></el-table-column>
          <el-table-column prop="corpus" label="本金">
            <template scope="corpus">
              {{ scope.row.investCash + '元' }}
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
          <el-table-column prop="status" label="状态">
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
  import { regularInvest, investRepays } from 'api/home/regularInvest';

  export default {
    data() {
      return {
        dialogVisible: false,
        investRepays: false,
        listQuery: {
          status: '',
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
        dateType: 'repaying',
        typeList: [
          { key: 'repaying', value: '还款中' },
          { key: 'bid_success', value: '投标中' },
          { key: 'complete', value: '已结清' },
          { key: 'cancel', value: '未成功' }
        ],
        statusList: [
          { key: 'complete', value: '' }
        ],
        etherRewards: [{
          coupon: '加息券无最高计息金额',
          point: '3.0%',
          ether: '0.2466',
          time: '2018-1-18',
          state: '未发放'
        }],
        investRepaysList: null
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.pageSize);
      }
    },
    methods: {
      getPageList() {
        this.listQuery.status = this.dateType;
        regularInvest(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            console.log('定期项目' + this.list);
            console.log(this.list);
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
            this.investRepaysList = data.data.data;
            console.log('还款计划' + this.investRepaysList);
            console.log(this.investRepaysList);
          }
        })
      },
      query() {
        this.getPageList();
      },
      switchDateType(type) {
        this.dateType = type;
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
  .regular {
    width: 100%;
    height: 846px;
    box-sizing: border-box;
    padding: 25px 15px;
    padding-top: 30px;
    background-color: #fff;
    margin-bottom: 20px;
  }
</style>
