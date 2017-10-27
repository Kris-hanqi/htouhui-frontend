<template>
  <div class="hom-right">
    <div class="assetRunWaterSee personalCenterBoxShadow clearFix">
      <h1 class="personalCenterRightTitle">资金流水</h1>
      <div class="fl">
        <ul class="allChoose">
          <li>选择时间：</li>
          <li><a href="javascript:void(0)" @click="switchDateType('3day')" :class="{ active: dateType === '3day'}">近三天</a></li>
          <li><a href="javascript:void(0)" @click="switchDateType('1month')" :class="{ active: dateType === '1month'}">近一个月</a></li>
          <li><a href="javascript:void(0)" @click="switchDateType('3month')" :class="{ active: dateType === '3month'}">近三个月</a></li>
          <li><a href="javascript:void(0)" @click="switchDateType('other')" :class="{ active: dateType === 'other'}">自定义时间</a></li>
        </ul>
        <ul class="allChoose allChooseCalendar" v-show="dateType === 'other'">
          <el-date-picker
            type="daterange"
            align="right"
            placeholder="选择日期范围">
          </el-date-picker>
        </ul>
        <ul class="allChoose">
          <li>项目类型：</li>
          <li><a href="javascript:void(0)" @click="switchProjectType('all')" :class="{ active: projectType === 'all'}">全部</a></li>
          <li><a href="javascript:void(0)" @click="switchProjectType('investRecord')" :class="{ active: projectType === 'investRecord'}">投资</a></li>
          <li><a href="javascript:void(0)" @click="switchProjectType('payRecord')" :class="{ active: projectType === 'payRecord'}">充值</a></li>
          <li><a href="javascript:void(0)" @click="switchProjectType('tixianRecord')" :class="{ active: projectType === 'tixianRecord'}">提现</a></li>
          <li><a href="javascript:void(0)" @click="switchProjectType('refundRecord')" :class="{ active: projectType === 'refundRecord'}">还款</a></li>
          <li><a href="javascript:void(0)" @click="switchProjectType('other')" :class="{ active: projectType === 'other'}">其他</a></li>
        </ul>
      </div>
      <div class="fr">
        <button @click="query" class="inquireBtn">查询</button>
      </div>
    </div>
    <div class="assetRunWaterTable personalCenterBoxShadow">
      <el-table :data="list"
                v-loading="listLoading"
                element-loading-text="拼命加载中..."
                :border="false"
                style="width: 100%">
        <el-table-column prop="time" label="交易时间" width="150"></el-table-column>
        <el-table-column prop="name" label="项目名称" width="110"></el-table-column>
        <el-table-column prop="type" label="类型" width="110"></el-table-column>
        <el-table-column prop="variationMoney" label="变动金额" width="100"></el-table-column>
        <el-table-column prop="managementPlatform" label="管理平台" width="140"></el-table-column>
        <el-table-column prop="canUseMoney" label="可用余额" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" width="100"></el-table-column>
      </el-table>
      <div class="pages" v-show="!listLoading">
        <p class="total-pages">共计<span class="roboto-regular">25</span>条记录（共<span class="roboto-regular">3</span>页）</p>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.pageNo"
          :page-size="listQuery.size"
          layout="prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { fetchPageList } from '@/api/funds';
  import { getStartAndEndTime } from '@/utils';
  
  export default {
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          size: 10,
          beginTime: '',
          endTime: '',
          type: ''
        },
        dateType: '3day',
        projectType: 'all'
      };
    },
    methods: {
      // 获取资金流水分页数据
      getPageList() {
        let dates = null;
        this.listLoading = true;
        this.listQuery.type = this.projectType;
        if (this.dateType !== 'other') {
          dates = getStartAndEndTime(this.dateType);
          console.log(dates);
        }
        if (dates) {
          this.listQuery.beginTime = dates.startTime;
          this.listQuery.endTime = dates.endTime;
        }
        fetchPageList(this.listQuery).then(response => {
          if (response.data.status === 200) {
            const data = response.data.data;
            this.list = data.list;
            this.total = data.total;
          }
          this.listLoading = false
        })
      },
      query() {
        this.getPageList();
      },
      switchDateType(type) {
        this.dateType = type;
      },
      switchProjectType(type) {
        this.projectType = type;
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

        a.active {
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
          background: url(../../../assets/images/home/center_ico16.png) no-repeat;
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
