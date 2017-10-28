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
          <el-button class="icon-award" @click="dialogVisible = true" type="text" size="small"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="50"></el-table-column>
      <el-table-column prop="doing" label="操作">
        <template scope="scope">
          <router-link to="lookRegular"><el-button class="icon-interests" type="text" size="small"></el-button></router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">25</span>条记录（共<span class="roboto-regular">3</span>页）</p>
      <el-pagination layout="prev, pager, next" :total="30"></el-pagination>
    </div>

    <el-dialog title="平台奖励" :visible.sync="dialogVisible" width="30%">
      <div class="dialog-main">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="贴息" name="first">
            <tab-tie-xi></tab-tie-xi>
          </el-tab-pane>
          <el-tab-pane label="优惠券" name="second">
            <tab-coupons></tab-coupons>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import tradingHour from '../homeComponent/tradingHour.vue';
  import tabTieXi from './tab-TieXi.vue';
  import tabCoupons from './tab-coupons.vue';

  export default {
    components: {
      tradingHour,
      tabTieXi,
      tabCoupons
    },
    data() {
      return {
        dialogVisible: false,
        activeName: 'first',
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
  }
</style>
