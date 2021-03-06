<template>
  <div class="funds-wrapper">
    <hth-panel title="资金流水">
      <div class="assetRunWaterSee">
        <div class="fl">
          <ul>
            <li>选择时间：</li>
            <li><a @click.stop="switchDateType('all')" :class="{ active: dateType === 'all'}">全部</a></li>
            <li><a @click.stop="switchDateType('3day')" :class="{ active: dateType === '3day'}">近三天</a></li>
            <li><a @click.stop="switchDateType('1month')" :class="{ active: dateType === '1month'}">近一个月</a></li>
            <li><a @click.stop="switchDateType('3month')" :class="{ active: dateType === '3month'}">近三个月</a></li>
            <li><a @click.stop="switchDateType('other')" :class="{ active: dateType === 'other'}">自定义时间</a></li>
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
          </ul>
          <ul>
            <li>项目类型：</li>
            <li><a @click.stop="switchProjectType('all')" :class="{ active: projectType === 'all'}">全部</a></li>
            <li><a @click.stop="switchProjectType('investRecord')" :class="{ active: projectType === 'investRecord'}">投资</a></li>
            <li><a @click.stop="switchProjectType('payRecord')" :class="{ active: projectType === 'payRecord'}">充值</a></li>
            <li><a @click.stop="switchProjectType('tixianRecord')" :class="{ active: projectType === 'tixianRecord'}">提现</a></li>
            <li><a @click.stop="switchProjectType('refundRecord')" :class="{ active: projectType === 'refundRecord'}">还款</a></li>
            <li><a @click.stop="switchProjectType('other')" :class="{ active: projectType === 'other'}">其他</a></li>
          </ul>
        </div>
        <div class="fr">
          <button @click="query" class="query-btn" v-show="dateType === 'other'">查询</button>
        </div>
      </div>
    </hth-panel>
    <div class="assetRunWaterTable">
      <el-table :data="list" :fit="true" v-loading="listLoading" element-loading-text="拼命加载中...">
        <!-- 无数据时显示 -->
        <no-data slot="empty"></no-data>
        <el-table-column prop="time" label="交易时间" width="150"></el-table-column>
        <el-table-column label="项目名称" width="150">
          <span slot-scope="scope">
            {{ scope.row.projectName ? scope.row.projectName : '--' }}
          </span>
        </el-table-column>
        <el-table-column label="类型" prop="typeinfo" width="100"></el-table-column>
        <el-table-column label="变动金额" width="100">
          <template slot-scope="scope">
            {{ scope.row.type | keyToValue(fundsTypes) }}{{ scope.row.money | currency('') + '元' }}
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="detail"></el-table-column>
      </el-table>
      
      <div class="pages" v-if="list && list.length">
        <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录
        （共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
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
  import HthPanel from 'common/Panel/index.vue';
  import NoData from '../components/NoData.vue';
  import { fetchFundsPageList } from 'api/home/account';
  import { getStartAndEndTime, getDateString } from 'utils/index';
  
  export default {
    components: {
      HthPanel,
      NoData
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          size: 10,
          startTime: '',
          endTime: '',
          type: ''
        },
        fundsTypes: [
          { key: 'ti_balance', value: '+' },
          { key: 'to_balance', value: '-' },
          { key: 'freeze', value: '-' },
          { key: 'unfreeze', value: '' },
          { key: 'to_frozen', value: '' }
        ],
        pickerOptions: {
          disabledDate(date) {
            return date > new Date();
          }
        },
        selectDates: {
          startTime: '',
          endTime: ''
        },
        dateType: 'all',
        projectType: 'all'
      };
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.size);
      }
    },
    methods: {
      // 获取资金流水分页数据
      getPageList() {
        let dates = null;
        this.listQuery.type = this.projectType;
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
        fetchFundsPageList(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data || [];
            this.total = data.data.count || 0;
          }
          this.listLoading = false
        })
      },
      query() {
        this.getPageList();
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
      switchProjectType(type) {
        this.projectType = type;
        this.listQuery.pageNo = 1;
        this.getPageList();
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
  .funds-wrapper {
    .el-table__empty-block {
      min-height: 260px;
    }
    
    .assetRunWaterSee {
      padding-bottom: 10px;
      background-color: #fff;
    
      ul {
        margin: 5px 0 15px 30px;
      
        li {
          display: inline-block;
          font-size: 14px;
          margin: 0 8px;
          color: #394b67;
        }
  
        li a {
          display: inline-block;
          padding: 5px 10px;
          line-height: 1;
          font-size: 14px;
          color: #394b67;
        }
  
        li a.active {
          border-radius: 100px;
          background-color: #0573f4;
          color: #fff;
        }
      
        li:first-child,
        li:nth-child(2) {
          margin-left: 0;
        }
      }
    
      ul.allChooseCalendar {
        width: 100%;
      
        li {
          position: relative;
        }
  
        li input.calendar {
          width: 194.8px;
          height: 35px;
          background-color: #fff;
          border: solid 1px #ced9e4;
          font-size: 16px;
          color: #7c86a2;
          padding-left: 5px;
        }
      
        li:nth-child(3) {
          margin-left: 0;
        }
      }
    
      .query-btn {
        width: 157px;
        height: 46px;
        border-radius: 100px;
        background-color: #378ff6;
        font-size: 18px;
        text-align: center;
        color: #fff;
        margin-right: 64px;
        margin-top: 30px;
        cursor: pointer;
      }
    }
  
    .assetRunWaterTable {
      height: auto;
      padding: 12px 8px 30px 10px;
      margin-top: 17px;
      background-color: #fff;
    
      .pagesTotal {
        font-size: 14px;
      }
    
      .el-table .cell,
      .el-table th > div {
        padding: 0 5px;
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
  }

  
</style>
