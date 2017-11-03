<template>
  <div class="regular">
    <div class="state">
      <ul>
        <li>状态：</li>
        <li>
          <a href="javascript:void(0)" @click="switchDateType('repaying')" :class="{ active: dateType === 'repaying'}">还款中</a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="switchDateType('bidSuccess')" :class="{ active: dateType === 'bidSuccess'}">投标中</a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="switchDateType('complete')" :class="{ active: dateType === 'complete'}">已结清</a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="switchDateType('cancel')" :class="{ active: dateType === 'cancel'}">未成功</a>
        </li>
      </ul>
      <button class="find-btn" @click="query">查询</button>
    </div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="projectName" label="项目名称" fixed width="170"></el-table-column>
      <el-table-column prop="investTime" label="投资时间" width="80"></el-table-column>
      <el-table-column prop="investCash" label="投资金额" width="100">
        <template scope="scope">
          {{ scope.row.investCash + '元' }}
        </template>
      </el-table-column>
      <el-table-column prop="investRate" label="年利率" width="60"></el-table-column>
      <el-table-column prop="paidPeriod" label="已还期数/总期数" width="110">
        <template scope="scope">
          {{ scope.row.paidPeriod + '/' + scope.row.repayPeriod }}
        </template>
      </el-table-column>
      <el-table-column prop="nextRepayDate" label="下次还款日" width="90"></el-table-column>
      <el-table-column prop="award" label="额外奖励" width="60">
        <template scope="scope">
          <el-button class="icon-award" @click="dialogVisible = true" type="text" size="small"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="投资状态" width="70">
        <template scope="scope">
          {{ scope.row.status | keyToValue(typeList) }}
        </template>
      </el-table-column>
      <el-table-column prop="look" label="查看" fixed="right" width="100">
        <template scope="scope">
          <el-button class="icon-plan" type="text" size="small">还款计划</el-button>
          <el-button class="icon-interests" type="text" size="small">合同</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.size" layout="prev, pager, next" :total="total"></el-pagination>
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
  import { getUserQuantizationInfo } from 'api/home/regularInvest';

  export default {
    data() {
      return {
        dialogVisible: false,
        listQuery: {
          status: '',
          startTime: '',
          endTime: '',
          pageNo: 1,
          pageSize: 10
        },
        list: null,
        total: 0,
        dateType: 'repaying',
        typeList: [
          { key: 'repaying', value: '还款中' },
          { key: 'bid_success', value: '投标中' },
          { key: 'complete', value: '已结清' },
          { key: 'cancel', value: '未成功' }
        ],
        etherRewards: [{
          coupon: '加息券无最高计息金额',
          point: '3.0%',
          ether: '0.2466',
          time: '2018-1-18',
          state: '未发放'
        }]
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.pageSize);
      }
    },
    methods: {
      getPageList() {
        this.listLoading = true;
        this.listQuery.status = this.dateType;
        getUserQuantizationInfo(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            console.log('定期项目' + this.list);
            console.log(this.list);
            this.total = data.data.count || 0;
          }
        })
      },
      query() {
        this.getPageList();
      },
      switchDateType(type) {
        this.dateType = type;
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
