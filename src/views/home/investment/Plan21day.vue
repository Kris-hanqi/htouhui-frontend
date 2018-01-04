<template>
  <div class="plan21day">
    <p class="title">加入记录</p>
    <div class="times-box">
      <ul class="times">
        <li>交易时间：</li>
        <li>
          <a @click.stop="switchDateType('all')" :class="{ active: dateType === 'all'}">全部</a>
        </li>
        <li>
          <a @click.stop="switchDateType('3day')" :class="{ active: dateType === '3day'}">近三天</a>
        </li>
        <li>
          <a @click.stop="switchDateType('1month')" :class="{ active: dateType === '1month'}">近一个月</a>
        </li>
        <li>
          <a @click.stop="switchDateType('3month')" :class="{ active: dateType === '3month'}">近三个月</a>
        </li>
        <li>
          <a @click.stop="switchDateType('other')" class="diy-time" :class="{ active: dateType === 'other'}">自定义时间</a>
        </li>
      </ul>
      <ul class="allChooseCalendar" v-show="dateType === 'other'">
        <el-date-picker
          v-model="selectDates.startTime"
          :picker-options="pickerOptions"
          type="datetime"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="selectDates.endTime"
          :picker-options="pickerOptions"
          type="datetime"
          placeholder="选择结束日期">
        </el-date-picker>
        <button class="find-btn" @click="query">查询</button>
      </ul>
    </div>
    <div class="plan21day-message">
      <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中...">
        <!-- 无数据时显示 -->
        <no-data slot="empty"></no-data>
        <el-table-column label="加入时间" prop="joinTime" width="140"></el-table-column>
        <el-table-column label="加入金额" width="100">
          <template slot-scope="scope">
            {{ scope.row.joinMoney + '元' }}
          </template>
        </el-table-column>
        <el-table-column label="持有期限" prop="lockPeriod" width="100">
          <template slot-scope="scope">
            {{ scope.row.lockPeriod + '天' }}
          </template>
        </el-table-column>
        <el-table-column label="往期年化利率" width="120">
          <template slot-scope="scope">
            {{ scope.row.rate + '%' }}
          </template>
        </el-table-column>
        <el-table-column label="持有期限截至" prop="lockEndTime" :formatter="exitTimeFormatter" width="140"></el-table-column>
        <el-table-column label="状态" prop="detail" width="100">
          <template slot-scope="scope">
            {{ scope.row.status | keyToValue(typeList) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.haveInvest"
                       @click="goClaimsView(scope.row.joinPlanId)" type="text">查看债权</el-button>
            <span style="font-size: 13px;" v-else>暂无债权</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages" v-if="list && list.length">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录
      （共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.pageNo"
                     :page-size="listQuery.size"
                     layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import { plan21dayJoin } from 'api/home/plan-21day';
  import { getStartAndEndTime, formatDate } from 'utils/index';
  import NoData from '../components/NoData.vue';

  export default {
    components: {
      NoData
    },
    data() {
      return {
        list: null,
        listLoading: false,
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
        pickerOptions: {
          disabledDate(date) {
            return date > new Date();
          }
        },
        dateType: 'all',
        typeList: [
          { key: 'matched', value: '成功' },
          { key: 'matching', value: '自动投标中' }
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
          if (this.dateType === 'all') {
            this.listQuery.startTime = '2000-01-01 11:28:34';
            this.listQuery.endTime = '2200-01-01 11:28:34';
          } else {
            dates = getStartAndEndTime(this.dateType);
            this.listQuery.startTime = dates.startTime;
            this.listQuery.endTime = dates.endTime;
          }
        } else {
          if (this.selectDates.startTime && this.selectDates.endTime) {
            if (this.selectDates.startTime > this.selectDates.endTime) {
              this.$message({
                message: '开始时间不能大于结束时间',
                type: 'warning'
              });
              return;
            }
            this.listQuery.startTime = formatDate(this.selectDates.startTime);
            this.listQuery.endTime = formatDate(this.selectDates.endTime);
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
          this.listLoading = false;
        })
      },
      query() {
        this.getPageList();
      },
      exitTimeFormatter(row, column, cellValue) {
        const dates = cellValue.split(' ');
        return dates[0];
      },
      switchDateType(type) {
        this.dateType = type;
        this.listQuery.pageNo = 1;
        this.total = 0;
        if (this.dateType !== 'other') {
          this.getPageList();
        } else {
          this.list = null;
        }
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
      if (this.$route.query.message) {
        this.$message({
          message: '加入成功',
          type: 'success'
        });
      }
    }
  }
</script>

<style lang="scss">
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
    height: auto;
    box-sizing: border-box;
    padding: 20px 15px;
    background-color: #fff;
  
    .el-table__empty-block {
      min-height: 260px;
    }

    .title {
      margin-bottom: 20px;
      font-size: 20px;
      color: #274161;
    }
  }
</style>
