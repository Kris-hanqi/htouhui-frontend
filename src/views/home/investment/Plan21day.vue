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
          <a href="javascript:void(0)" class="diy-time" @click="dateType = 'other'" :class="{ active: dateType === 'other'}">自定义时间</a>
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
        <button class="find-btn" @click="query">查询</button>
      </ul>
    </div>
    <div class="message">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="joinTime" label="加入时间" width="135"></el-table-column>
        <el-table-column prop="joinMoney" label="加入金额">
          <template scope="scope">
            {{ scope.row.joinMoney | currency('') + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="lockPeriod" label="持有期限">
          <template scope="scope">
            {{ scope.row.lockPeriod + '天' }}
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="往期年化利率">
          <template scope="scope">
            {{ scope.row.rate + '%' }}
          </template>
        </el-table-column>
        <el-table-column prop="lockEndTime" label="持有期限截至" width="135"></el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template scope="scope">
            {{ scope.row.status | keyToValue(typeList) }}
          </template>
        </el-table-column>
        <el-table-column prop="seeInterests" label="查看">
          <template scope="scope">
            <el-button class="icon-interests" @click="goClaimsView(scope.row.joinPlanId)" type="text" size="small">查看债权</el-button>
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
  import { plan21dayJoin } from 'api/home/plan-21day';
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
        dateType: '3day',
        typeList: [
          { key: 'matched', value: '全部匹配' },
          { key: 'matching', value: '匹配中' }
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
            this.total = data.data.count || 0;
          }
        })
      },
      query() {
        this.getPageList();
      },
      switchDateType(type) {
        this.dateType = type;
        this.getPageList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getPageList();
      },
      goClaimsView(id) {
        this.$router.push('/investment/plan21Day/lookRegular/' + id);
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
      width: 135px;
      height: 40px;
      box-sizing: border-box;
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
    color: #0573f4;
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