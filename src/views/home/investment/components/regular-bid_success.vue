<template>
  <div class="regular-repaying">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="projectName" label="项目名称" fixed width="170"></el-table-column>
      <el-table-column prop="investTime" label="投资时间" width="80"></el-table-column>
      <el-table-column prop="investCash" label="投资金额" width="100">
        <template slot-scope="scope">
          {{ scope.row.investCash | currency('') + '元' }}
        </template>
      </el-table-column>
      <el-table-column prop="investRate" label="年利率" width="60">
        <template slot-scope="scope">
          {{ scope.row.investRate + '%' }}
        </template>
      </el-table-column>
      <el-table-column prop="paidPeriod" label="已还期数/总期数" width="110">
        <template slot-scope="scope">
          {{ scope.row.paidPeriod + '/' + scope.row.repayPeriod }}
        </template>
      </el-table-column>
      <el-table-column prop="loanTerm" label="借款期限">
        <template slot-scope="scope">
          {{ scope.row.loanTerm + scope.row.loanTermCompany | keyToValue(dataList) }}
        </template>
      </el-table-column>
      <el-table-column prop="remainingTime" label="剩余时间" width="90"></el-table-column>
      <el-table-column prop="biddingSchedule" label="投标进度">
        <template slot-scope="scope">
          {{ scope.row.biddingSchedule + '%' }}
        </template>
      </el-table-column>
      <el-table-column prop="status" fixed="right" label="投资状态">
        <template slot-scope="scope">
          {{ scope.row.status | keyToValue(typeList) }}
        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.pageSize" layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import { regularInvest } from 'api/home/regularInvest';

  export default {
    data() {
      return {
        listQuery: {
          status: 'bid_success',
          startTime: '',
          endTime: '',
          pageNo: 1,
          pageSize: 10
        },
        list: null,
        total: 0,
        typeList: [
          { key: 'repaying', value: '还款中' },
          { key: 'bid_success', value: '投标中' },
          { key: 'complete', value: '已结清' },
          { key: 'cancel', value: '未成功' }
        ],
        dataList: [
          { key: 'day', value: '天' },
          { key: 'month', value: '个月' }
        ]
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
