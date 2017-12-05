<template>
  <div class="plan21day">
    <p class="title">加入记录</p>
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
          <a @click.stop="dateType = 'other'" class="diy-time" :class="{ active: dateType === 'other'}">自定义时间</a>
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

      <hth-data-table :data="list"
                      v-loading="listLoading"
                      element-loading-text="拼命加载中..."
                      :col-configs="colConfigs">
        <el-table-column slot="opt" label="操作" width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 'matched'"
                       @click="goClaimsView(scope.row.joinPlanId)" type="text">查看债权</el-button>
            <p v-else>暂无债权</p>
          </template>
        </el-table-column>
      </hth-data-table>
    </div>
    <div class="pages" v-if="list && list.length">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.size" layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import { plan21dayJoin } from 'api/home/plan-21day';
  import { getStartAndEndTime, formatDate } from 'utils/index';
  import HthDataTable from '../components/hth-data-table/HthDataTable.vue';
  import RowUnit from '../components/hth-data-table/RowUnit.vue';
  import RowFilterGetValue from '../components/hth-data-table/RowFilterGetValue.vue';

  const typeList = [
    { key: 'matched', value: '成功' },
    { key: 'matching', value: '自动投标中' }
  ];

  export default {
    components: {
      HthDataTable
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
        dateType: '3day',
        typeList: [
          { key: 'matched', value: '成功' },
          { key: 'matching', value: '自动投标中' }
        ],
        colConfigs: [
          { label: '加入时间', width: '140', prop: 'joinTime' },
          { label: '加入金额', width: '100', prop: 'joinMoney', component: RowUnit, unit: '元' },
          { label: '持有期限', width: '100', prop: 'lockPeriod', component: RowUnit, unit: '天' },
          { label: '往期年化利率', width: '140', prop: 'rate', component: RowUnit, unit: '%' },
          { label: '持有期限截至', width: '140', prop: 'lockEndTime' },
          { label: '状态', width: '100', prop: 'status', component: RowFilterGetValue, listData: typeList },
          { slot: 'opt' }
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
