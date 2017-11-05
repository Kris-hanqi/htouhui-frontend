<template>
  <div class="regular-repaying">

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="projectName" label="项目名称" width="170"></el-table-column>
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
      <el-table-column prop="nextRepayDate" label="借款期限"></el-table-column>
      <el-table-column prop="award" label="剩余时间"></el-table-column>
      <el-table-column prop="status" label="投标进度"></el-table-column>
      <el-table-column prop="look" label="投资状态">
        <template scope="scope">
          <el-button class="icon-plan" type="text" size="small" @click="getInvestRepaysList(scope.row.investId)">还款计划</el-button>
          <el-button class="icon-interests" type="text" size="small">合同</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.size" layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import { regularInvest } from 'api/home/regularInvest';

  export default {
    data() {
      return {
        listQuery: {
          status: '',
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
      query() {
        this.getPageList();
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

