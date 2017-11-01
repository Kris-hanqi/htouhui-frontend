<template>
  <div class="plan21day">
    <p class="title">加入记录</p>
    <div class="times-box">
      <ul class="times">
        <li>交易时间：</li>
        <li>
          <a href="javascript:void(0)" @click="switchDateType('3day')" :class="{ active: dateType === '3day'}">近三天</a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="switchDateType('1month')" :class="{ active: dateType === '1month'}">近一个月</a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="switchDateType('3month')" :class="{ active: dateType === '3month'}">近三个月</a>
        </li>
        <li>
          <a href="javascript:void(0)" class="diy-time" @click="switchDateType('other')" :class="{ active: dateType === 'other'}">自定义时间</a>
        </li>
      </ul>
      <ul class="allChooseCalendar" v-show="dateType === 'other'">
        <el-date-picker
          v-model="selectDates.startTime"
          type="date"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="selectDates.endTime"
          type="date"
          placeholder="选择结束日期">
        </el-date-picker>
      </ul>
      <button class="find-btn" @click="query">查询</button>
    </div>
    <div class="message">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="joinTime" label="加入时间" width="135"></el-table-column>
        <el-table-column prop="joinMoney" label="加入金额"></el-table-column>
        <el-table-column prop="lockPeriod" label="持有期限"></el-table-column>
        <el-table-column prop="rate" label="往期年化利率"></el-table-column>
        <el-table-column prop="lockEndTime" label="持有期限截至"></el-table-column>
        <el-table-column prop="status" label="状态" width="50"></el-table-column>
        <el-table-column prop="seeInterests" label="查看债权">
          <template scope="scope">
            <router-link to="lookRegular"><el-button class="icon-interests" type="text" size="small"></el-button></router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.size" layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import { plan21dayJoin } from '@/api/home/plan-21day';
  import { getStartAndEndTime, getDateString } from '@/utils';

  export default {
    data() {
      return {
        list: null,
        total: 0,
        listQuery: {
          planId: '',
          type: 'novice_plan',
          purpose: 'kongzhong_activity',
          startTime: '',
          endTime: '',
          pageNo: 1,
          pageSize: 10
        },
        selectDates: {
          startTime: '',
          endTime: ''
        },
        dateType: '3day'
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.size);
      }
    },
    methods: {
      // 获取我的资产数据
      getPageList() {
        let dates = null;
        if (this.dateType !== 'other') {
          dates = getStartAndEndTime(this.dateType);
          this.listQuery.startTime = dates.startTime;
          this.listQuery.endTime = dates.endTime;
        } else {
          if (this.selectDates.startTime && this.selectDates.endTime) {
            if (this.selectDates.startTime > this.selectDates.endTime) {
              this.$message({
                message: '开始时间不能大于结束时间',
                type: 'warning'
              });
              return;
            }
            this.listQuery.startTime = getDateString(this.selectDates.startTime);
            this.listQuery.endTime = getDateString(this.selectDates.endTime);
          } else {
            this.$message({
              message: '请选择时间',
              type: 'warning'
            });
            return;
          }
        }
        this.listLoading = true;
        plan21dayJoin(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            this.total = data.data.totalPage;
            console.log(this.list);
          }
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

<style lang="scss" scoped>
  .times-box {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;
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

    .allChooseCalendar {
      margin: 15px 0 15px 57px;
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
  }
</style>
