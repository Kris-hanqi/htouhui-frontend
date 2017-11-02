<template>
  <div class="regular">
    <div class="state">
      <ul>
        <li>状态：</li>
        <li>
          <a class="active" href="#">还款中</a>
        </li>
        <li>
          <a href="#">投标中</a>
        </li>
        <li>
          <a href="#">已结清</a>
        </li>
        <li>
          <a href="#">未成功</a>
        </li>
      </ul>
      <button class="find-btn">查询</button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="项目名称" fixed width="170"></el-table-column>
      <el-table-column prop="time" label="投资时间" width="80"></el-table-column>
      <el-table-column prop="money" label="投资金额" width="100"></el-table-column>
      <el-table-column prop="rate" label="年利率" width="60"></el-table-column>
      <el-table-column prop="period" label="已还期数/总期数" width="110"></el-table-column>
      <el-table-column prop="nextDay" label="下次还款日" width="90"></el-table-column>
      <el-table-column prop="award" label="额外奖励" width="60">
        <template scope="scope">
          <el-button class="icon-award" @click="dialogVisible = true" type="text" size="small"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="投资状态" width="70"></el-table-column>
      <el-table-column prop="look" label="查看" fixed="right" width="100">
        <template scope="scope">
          <el-button class="icon-plan" type="text" size="small">还款计划</el-button>
          <el-button class="icon-interests" type="text" size="small">合同</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">25</span>条记录（共<span class="roboto-regular">3</span>页）</p>
      <el-pagination layout="prev, pager, next" :total="30"></el-pagination>
    </div>


    <el-dialog title="额外奖励" :visible.sync="dialogVisible" width="30%">
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        tableData: [{
          name: '企业借款--01 2017071405',
          time: '2017-08-17 14:52:17',
          money: '1,000000.00元',
          rate: '12.0%',
          period: '3个月',
          nextDay: '2017-9-17',
          state: '成功'
        }],
        etherRewards: [{
          coupon: '加息券无最高计息金额',
          point: '3.0%',
          ether: '0.2466',
          time: '2018-1-18',
          state: '未发放'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .regular {
    width: 100%;
    height: 846px;
    box-sizing: border-box;
    padding: 25px 15px;
    background-color: #fff;
    margin-bottom: 20px;

    .state {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      padding-left: 30px;
      padding-right: 30px;
      margin-bottom: 15px;

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

      .find-btn {
        float: right;
        width: 135px;
        height: 40px;
        box-sizing: border-box;
        margin-top: -10px;
        border-radius: 100px;
        background-color: #378ff6;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
      }
    }

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
  }
</style>
