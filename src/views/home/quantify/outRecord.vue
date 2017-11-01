<template>
  <div class="out-record">
    <trading-hour></trading-hour>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="time" label="申请时间" width="135"></el-table-column>
      <el-table-column prop="outMoney" label="退出金额"></el-table-column>
      <el-table-column prop="tipMoney" label="退出手续费"></el-table-column>
      <el-table-column prop="limit" label="持有期限"  width="60"></el-table-column>
      <el-table-column prop="successOutTime" label="成功退出时间" width="135"></el-table-column>
      <el-table-column prop="actualMoney" label="实际到账金额"></el-table-column>
      <el-table-column prop="state" label="状态" width="80"></el-table-column>
      <el-table-column prop="lookEquity" label="查看债权"  width="70">
        <template scope="scope">
          <el-button class="icon-interests" type="text" size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">25</span>条记录（共<span class="roboto-regular">3</span>页）</p>
      <el-pagination layout="prev, pager, next" :total="30"></el-pagination>
    </div>
  </div>
</template>

<script>
  import tradingHour from '../homeComponent/tradingHour.vue';

  export default {
    components: {
      tradingHour
    },
    data() {
      return {
        tableData: [{
          time: '2017-08-17 14:52:17',
          outMoney: '10,00000.00元',
          tipMoney: '10,00000.00元',
          limit: '90天',
          successOutTime: '2017-08-17 14:52:17',
          actualMoney: '10,00000.00元',
          state: '退出处理中'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .out-record {
    margin-top: 20px;

    .icon-interests {
      width: 17px;
      height: 23px;
      background: url(../../../assets/images/home/icons/icon-interest.png) no-repeat center;
    }
  }
</style>
