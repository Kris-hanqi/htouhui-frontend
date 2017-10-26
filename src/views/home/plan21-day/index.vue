<template>
  <div class="plan21day">
    <p class="title">加入记录</p>
    <div class="times-box">
      <ul class="times">
        <li>交易时间：</li>
        <li>
          <a class="active" href="#">近三天</a>
        </li>
        <li>
          <a href="#">近一个月</a>
        </li>
        <li>
          <a href="#">近三个月</a>
        </li>
        <li>
          <a href="#" class="diy-time">自定义时间</a>
        </li>
      </ul>
      <button class="find-btn">查询</button>
    </div>

    <div class="message">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="joinTime" label="加入时间" width="130"></el-table-column>
        <el-table-column prop="joinMoney" label="加入金额"></el-table-column>
        <el-table-column prop="limit" label="持有期限"></el-table-column>
        <el-table-column prop="rate" label="往期年化利率"></el-table-column>
        <el-table-column prop="limitStop" label="持有期限截至"></el-table-column>
        <el-table-column prop="state" label="状态" width="40"></el-table-column>
        <el-table-column prop="seeInterests" label="查看债权">
          <template scope="scope">
            <el-button class="icon-interests" type="text" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">25</span>条记录（共<span class="roboto-regular">3</span>页）</p>
      <el-pagination layout="prev, pager, next" :total="30"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          joinTime: '2017-08-17 14:52:17',
          joinMoney: '10,00000.00元',
          limit: '21天',
          rate: '12.0%',
          limitStop: '2017-9-17',
          state: '成功'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
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

  .plan21day {
    width: 100%;
    height: 846px;
    box-sizing: border-box;
    padding: 20px 15px;
    background-color: #fff;

    .title {
      margin-bottom: 20px;
      font-size: 20px;
      color: #274161;
    }

    .times-box {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      padding-left: 45px;
      margin-bottom: 25px;

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
          padding: 4px 8px;
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
  }
</style>
