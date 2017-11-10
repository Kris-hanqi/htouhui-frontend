<template>
  <div class="regular-repaying">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="projectName" label="项目名称" fixed width="170"></el-table-column>
      <el-table-column prop="investTime" label="投资时间"></el-table-column>
      <el-table-column prop="investCash" label="投资金额">
        <template scope="scope">
          {{ scope.row.investCash | currency('') + '元' }}
        </template>
      </el-table-column>
      <el-table-column prop="investRate" label="年利率">
        <template scope="scope">
          {{ scope.row.investRate + '%' }}
        </template>
      </el-table-column>
      <el-table-column prop="paidPeriod" label="已还期数/总期数" width="110">
        <template scope="scope">
          {{ scope.row.paidPeriod + '/' + scope.row.repayPeriod }}
        </template>
      </el-table-column>
      <el-table-column prop="profit" label="收益">
        <template scope="scope">
          {{ scope.row.profit | currency('') + '元' }}
        </template>
      </el-table-column>
      <el-table-column prop="settlementTime" label="结清时间"></el-table-column>
      <el-table-column prop="managementPlatform" label="管理平台">
        <template scope="scope">
          {{ scope.row.managementPlatform | keyToValue(typeList) }}
        </template>
      </el-table-column>
      <el-table-column prop="look" label="查看" fixed="right" width="100">
        <template scope="scope">
          <el-button class="payment-details" type="text" size="small" @click="getPaymentDetails(scope.row.investId)">收款详情</el-button>
          <el-button class="icon-interests" type="text" size="small">合同</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.pageSize" layout="prev, pager, next" :total="total"></el-pagination>
    </div>


    <el-dialog title="收款详情" :visible.sync="paymentDetail" width="30%">
      <div class="dialog-main">
        <el-table :data="paymentDetailList" style="width: 100%">
          <el-table-column prop="period" label="期数" fixed width="30"></el-table-column>
          <el-table-column prop="corpus" label="本金">
            <template scope="scope">
              {{ scope.row.corpus | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="interest" label="利息">
            <template scope="scope">
              {{ scope.row.interest | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="tiexiMoney" label="贴息">
            <template scope="scope">
              {{ scope.row.tiexiMoney | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="defaultInterest" label="罚息">
            <template scope="scope">
              {{ scope.row.defaultInterest | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="fee" label="手续费">
            <template scope="scope">
              {{ scope.row.fee | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="loanUserFee" label="总额">
            <template scope="scope">
              {{ scope.row.loanUserFee | currency('') + '元' }}
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
  import { regularInvest, investRepays } from 'api/home/regularInvest';

  export default {
    data() {
      return {
        paymentDetail: false,
        listQuery: {
          status: 'complete',
          startTime: '',
          endTime: '',
          pageNo: 1,
          pageSize: 10
        },
        paymentDetailQuery: {
          investId: ''
        },
        list: null,
        total: 0,
        typeList: [
          { key: 'yeepay', value: '易宝支付' },
          { key: 'jixin', value: '江西银行' }
        ],
        statusList: [
          { key: 'complete', value: '完成' },
          { key: 'overdue', value: '逾期的' },
          { key: 'repaying', value: '还款中' },
          { key: 'waiting_transfer', value: '-' },
          { key: 'wait_transfer_confirm', value: '-' }
        ],
        paymentDetailList: null
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
      getPaymentDetails(id) {
        this.paymentDetail = true;
        this.paymentDetailQuery.investId = id;
        investRepays(this.paymentDetailQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.paymentDetailList = data.data.data;
            console.log('收款详情' + this.paymentDetailList);
            console.log(this.paymentDetailList);
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

  .payment-details {
    color: #0573f4;
  }

  .icon-interests {
    color: #0573f4;
  }

</style>
