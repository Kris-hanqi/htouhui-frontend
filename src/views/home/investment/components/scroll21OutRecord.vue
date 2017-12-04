<template>
  <div class="out-record">
    <div class="times-box">
      <ul class="times">
        <li>交易时间：</li>
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
          <a class="diy-time" @click.stop="dateType = 'other'" :class="{ active: dateType === 'other'}">自定义时间</a>
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

    <el-table :data="list" style="width: 100%">
      <!-- 无数据时显示 -->
      <no-data slot="empty"></no-data>
      <el-table-column prop="applyTime" label="申请时间" width="135"></el-table-column>
      <el-table-column prop="exitMoney" label="退出金额">
        <template slot-scope="scope">
          {{ scope.row.exitMoney | currency('') + '元' }}
        </template>
      </el-table-column>
      <el-table-column prop="appointmentExitTime" label="预期退出时间" width="150"></el-table-column>
      <el-table-column prop="successExitTime" label="退出成功时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.successExitTime || '--' }}
        </template>
      </el-table-column>
      <el-table-column prop="actualExitMoney" label="实际到账金额">
        <template slot-scope="scope">
          <p v-if="scope.row.actualExitMoney != null">{{ scope.row.actualExitMoney | currency('') + '元' }}</p>
          <p v-else>{{ '--' }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status | keyToValue(typeList) }}
        </template>
      </el-table-column>
      <el-table-column prop="lookEquity" label="查看"  width="70">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 'exited'" class="icon-interests" type="text" @click="lookOutRegular(scope.row.appointmentExitId)" size="small">查看债权</el-button>
          <p v-else>暂无债权</p>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages" v-if="list && list.length">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.size" layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import { getAppointmentExitBill } from 'api/home/rolling21day';
  import { getStartAndEndTime, formatDate } from 'utils/index';
  import NoData from '../../components/NoData.vue';

  export default {
    components: {
      NoData
    },
    data() {
      return {
        selectDates: {
          startTime: '',
          endTime: ''
        },
        list: null,
        listQuery: {
          startTime: '',
          endTime: '',
          pageNo: 1,
          pageSize: 10
        },
        total: 0,
        dateType: '3day',
        typeList: [
          { key: 'apply_exit', value: '退出处理中' },
          { key: 'exiting', value: '退出处理中' },
          { key: 'exited', value: '已退出' }
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
        getAppointmentExitBill(this.listQuery).then(response => {
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
      lookOutRegular(id) {
        this.$router.push('/investment/scroll21/lookRegular-outRecord/' + id);
      }
    },
    created() {
      this.getPageList();
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

  .out-record {
    margin-top: 20px;
  
    .el-table__empty-block {
      min-height: 260px;
    }

    .icon-interests {
      color: #0573f4;
    }
  }
</style>
