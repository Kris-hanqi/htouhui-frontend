<template>
  <div class="tab-TieXie">
    <div class="message">
      <div>
        <p>加入金额：<span class="roboto-regular">1,000000.00</span><span>元</span></p>
        <p>加入时间：<span class="roboto-regular">2017-08-25 16:47:20</span></p>
      </div>
      <div>
        <p>贴息到期时间：<span class="roboto-regular">2017-08-25 16:47:20</span></p>
        <p class="color-txt">贴息金额：<span class="roboto-regular">20</span><span>元</span></p>
      </div>
    </div>
    <div class="message-list">
      <p class="title">贴息流水</p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="money" label="在投金额"></el-table-column>
        <el-table-column prop="rate" label="贴息利率"></el-table-column>
        <el-table-column prop="tieXiMoney" label="贴息金额"></el-table-column>
      </el-table>
      <div class="pages small">
        <p class="total-pages">共计<span class="roboto-regular">25</span>条记录（共<span class="roboto-regular">3</span>页）</p>
        <el-pagination layout="prev, pager, next" :total="30"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          time: '2017-08-17 14:52:17',
          money: '10,00000.00元',
          rate: '12.0%',
          tieXiMoney: '0.32元'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tab-TieXie {
    width: 100%;
    margin-top: 15px;
  }

  .tab-TieXie .message {
    width: 100%;

    > div {
      display: inline-block;
      width: 48%;

      p {
        margin-bottom: 20px;
        font-size: 14px;
        color: #7c86a2;

        span {
          font-size: 14px;
          color: #394b67;
        }
      }

      .color-txt span {
        color: #ff4a33;
      }
    }
  }

  .tab-TieXie .message-list {
    width: 100%;
    padding-top: 15px;
    border-top: 1px dashed #aab2c9;

    .title {
      margin-bottom: 15px;
      font-size: 16px;
      color: #4e5e77;
    }
  }
</style>
