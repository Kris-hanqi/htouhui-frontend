<template>
  <div class="join-record">
    <trading-hour></trading-hour>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="joinTime" label="加入时间" width="135"></el-table-column>
      <el-table-column prop="joinMoney" label="加入金额"></el-table-column>
      <el-table-column prop="limit" label="持有期限"></el-table-column>
      <el-table-column prop="rate" label="往期年化利率"></el-table-column>
      <el-table-column prop="free" label="即日起免手续费"></el-table-column>
      <el-table-column prop="award" label="平台奖励">
        <template scope="scope">
          <el-button class="icon-award" type="text" size="small"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="40"></el-table-column>
      <el-table-column prop="doing" label="操作">
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
          joinTime: '2017-08-17 14:52:17',
          joinMoney: '10,00000.00元',
          limit: '21天',
          rate: '12.0%',
          free: '2017-9-17',
          state: '成功'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .join-record {
    margin-top: 20px;

    .icon-award {
      width: 24px;
      height: 24px;
      background: url(../../../assets/images/home/icon-award.png) no-repeat center;
    }

    .icon-interests {
      width: 17px;
      height: 23px;
      background: url(../../../assets/images/home/icons/icon-interest.png) no-repeat center;
    }

    .pages {
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
