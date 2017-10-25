<template>
  <div class="hom-right">
    <div class="assetRunWaterSee personalCenterBoxShadow clearFix">
      <h1 class="personalCenterRightTitle">资金流水</h1>
      <div class="fl">
        <ul class="allChoose">
          <li>选择时间：</li>
          <li><a href="">近三天</a></li>
          <li><a href="">近一个月</a></li>
          <li><a href="">近三个月</a></li>
          <li><a href="" class="selectA">自定义时间</a></li>
        </ul>
        <ul class="allChoose allChooseCalendar">
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </ul>
        <ul class="allChoose">
          <li>项目类型：</li>
          <li><a href="">全部</a></li>
          <li><a href="">投资</a></li>
          <li><a href="">充值</a></li>
          <li><a href="">提现</a></li>
          <li><a href="">还款</a></li>
          <li>其他</li>
        </ul>
      </div>
      <div class="fr">
        <button class="inquireBtn">查询</button>
      </div>
    </div>
    <div class="assetRunWaterTable personalCenterBoxShadow">
      <el-table :data="runWaterTableData" style="width: 100%">
        <el-table-column prop="time" label="交易时间" width="150"></el-table-column>
        <el-table-column prop="name" label="项目名称" width="110"></el-table-column>
        <el-table-column prop="type" label="类型" width="110"></el-table-column>
        <el-table-column prop="variationMoney" label="变动金额" width="100"></el-table-column>
        <el-table-column prop="managementPlatform" label="管理平台" width="140"></el-table-column>
        <el-table-column prop="canUseMoney" label="可用余额" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" width="100"></el-table-column>
      </el-table>
      <div class="pages">
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
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        runWaterTableData: [{
          time: '2017-08-22 13:58:05',
          name: '升薪宝滚动',
          type: '投资成功',
          variationMoney: '-800.00元',
          managementPlatform: '江西存管银行',
          canUseMoney: '2900.00元',
          remark: '提现申请通过，取出提现'
        }]
      };
    }
  }
</script>

<style lang="scss">
  .hom-right {
    float: right;
    width: 832px;

    .personalCenterBoxShadow {
      -webkit-box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
      box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    }

    .personalCenterRightTitle {
      font-size: 20px;
      color: #274161;
      margin-left: 27px;
      padding-top: 20px;
    }
  }

  .assetRunWaterSee {
    padding-bottom: 10px;
    background-color: #fff;

    .allChoose {
      margin: 15px 0 15px 57px;

      li {
        display: inline-block;
        font-size: 14px;
        margin: 0 8px;
        color: #394b67;

        a {
          display: inline-block;
          padding: 5px 10px;
          line-height: 1;
          font-size: 14px;
          color: #394b67;
        }

        a.selectA {
          border-radius: 100px;
          background-color: #0573f4;
          color: #fff;
        }
      }

      li:first-child,
      li:nth-child(2) {
        margin-left: 0;
      }
    }

    .allChooseCalendar {
      width: 100%;

      li {
        position: relative;

        input.calendar {
          width: 194.8px;
          height: 35px;
          background-color: #fff;
          border: solid 1px #ced9e4;
          font-size: 16px;
          color: #7c86a2;
          padding-left: 5px;
        }

        i.calendarIcon {
          display: block;
          position: absolute;
          right: 10px;
          top: 7px;
          width: 25px;
          height: 23px;
          background: url("../../../assets/images/home/center_ico16.png") no-repeat;
        }
      }

      li:nth-child(3) {
        margin-left: 0;
      }
    }

    .inquireBtn {
      width: 157px;
      height: 46px;
      border-radius: 100px;
      background-color: #378ff6;
      font-size: 18px;
      text-align: center;
      color: #fff;
      margin-right: 64px;
      margin-top: 50px;
      cursor: pointer;
    }
  }

  .assetRunWaterTable {
    height: 561px;
    padding: 12px 8px 0 10px;
    margin-top: 17px;
    background-color: #fff;

    .pagesTotal {
      font-size: 14px;
    }

    .el-table .cell,
    .el-table th > div {
      padding: 0 5px;
    }

    .el-table .cell {
      white-space: nowrap;
    }
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
</style>
