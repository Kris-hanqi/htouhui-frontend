<template>
  <div class="look-regular">
    <div class="details">
      <div class="title-box">
        <span class="title">退出记录-债权信息</span>
        <a href="javascript:void(0)" class="return-prev-pages" @click="returnPrevPages(outPlanList.planId)">返回上一页 ></a>
      </div>
      <div class="look-regular-main">
        <div class="look-regular-money">
          <p class="money"><span class="roboto-regular">{{ outPlanList.money | currency('') }}</span>元</p>
          <p>退出金额</p>
        </div>
        <div class="look-regular-day">
          <p class="day"><span class="roboto-regular">{{ outPlanList.exitedMoney }}</span>元</p>
          <p>已退出金额</p>
        </div>
      </div>
      <div class="look-regular-bottom">
        <p>申请时间 <span class="roboto-regular">{{ outPlanList.applyTime }}</span></p>
        <img v-if="outPlanList.status == 'exited'" class="type-message" src="../../../assets/images/home/icon-success.png" alt=""/>
        <img v-else class="type-message" src="../../../assets/images/home/icon-outRecord.png" alt=""/>
      </div>
    </div>

    <div class="message">
      <div class="title">
        <span>您购买的债权信息</span>
      </div>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="loanId" label="项目编号" width="120"></el-table-column>
        <el-table-column prop="loanMoney" label="借款金额" width="100">
          <template scope="scope">
            {{ scope.row.loanMoney | currency('') + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="往期年化利率" width="100">
          <template scope="scope">
            {{ scope.row.rate + '%' }}
          </template>
        </el-table-column>
        <el-table-column prop="perid" label="借款期限" width="60">
          <template scope="scope">
            {{ scope.row.perid | currency('') + '天' }}
          </template>
        </el-table-column>
        <el-table-column prop="investMoney" label="投资金额" width="100">
          <template scope="scope">
            {{ scope.row.investMoney | currency('') + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="exitMoney" label="退出金额">
          <template scope="scope">
            {{ scope.row.earnings | currency('') + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="50">
          <template scope="scope">
            {{ scope.row.status | keyToValue(typeList) }}
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.size" layout="prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { getRollPlanExitInfo } from 'api/home/getRollPlanExitInfo';
  import { findExitPlanBill } from 'api/home/findExitPlanBill';
  import interestRate from 'components/interest-rate';

  export default {
    components: {
      interestRate
    },
    data() {
      return {
        outPlanQuery: {
          appointmentExitPlanId: this.$route.params.id
        },
        listQuery: {
          planId: this.$route.params.id,
          type: '',
          purpose: '',
          startTime: '',
          endTime: '',
          pageNo: 1,
          pageSize: 10
        },
        outPlanList: null,
        joinPlanList: {
          minRate: '',
          maxRate: ''
        },
        list: null,
        total: 0,
        typeList: [
          { key: 'complete', value: '完成' },
          { key: 'repaying', value: '还款中' }
        ]
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.pageSize);
      }
    },
    methods: {
      getOutPlanList() {
        getRollPlanExitInfo(this.outPlanQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.outPlanList = data.data;
          }
        })
      },
      getPageList() {
        this.listLoading = true;
        findExitPlanBill(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            console.log('升薪宝量化21您购买的债券信息' + this.list);
            console.log(this.list);
            this.total = data.data.count || 0;
          }
        })
      },
      query() {
        this.getPageList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getPageList();
      },
      returnPrevPages(id) {
        this.$router.push('/quantify/transactionRecord/' + id);
      }
    },
    created() {
      this.getPageList();
      this.getOutPlanList();
    }
  }
</script>

<style lang="scss" scoped>
  .icon-download {
    color: #0573f4;
  }

  .icon-downloadNo {
    color: #727e90;
  }

  .details {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 20px 50px 25px 25px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
  }

  .title-box {
    width: 100%;
    margin-bottom: 50px;

    .title {
      font-size: 20px;
      color: #274161;
      margin-right: 25px;
    }

    .return-prev-pages {
      float: right;
      font-size: 16px;
      color: #0573f4;
    }
  }

  .look-regular-main {
    width: 100%;
    margin-bottom: 40px;

    > div {
      display: inline-block;
      width: 37%;
      text-align: center;

      p {
        font-size: 14px;
        color: #727e90;
      }

      .day span {
        line-height: 1.5;
        font-size: 30px;
        color: #394b67;
      }

      .money span {
        line-height: 1.5;
        font-size: 30px;
        color: #394b67;
      }
    }

    .look-regular-day {
      margin: 0 50px;
    }
  }

  .look-regular-bottom {
    position: relative;
    width: 100%;
    height: auto;
    padding-top: 20px;
    border-top: 1px solid #dde8f3;

    p {
      display: inline-block;
      font-size: 14px;
      color: #727e90;
      margin-right: 80px;

      span {
        color: #394b67;
      }
    }

    .type-message {
      position: absolute;
      top: -60px;
      right: 5px;
      width: 110px;
      height: 108px;
    }
  }

  .message {
    width: 100%;
    height: 553px;
    box-sizing: border-box;
    padding: 20px 10px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    .title {
      height: 25px;
      line-height: 25px;
      font-size: 20px;
      color: #274161;
      padding-left: 15px;
      margin-bottom: 25px;

      .title-message {
        float: right;
        font-size: 16px;
        color: #7c86a2;
        margin-right: 40px;

        span {
          color: #274161;
        }
      }
    }
  }
</style>
