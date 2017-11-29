<template>
  <!-- 新手计划组件 -->
  <div class="plan-novice">
    <!-- 未投资 显示标的信息 -->
    <div class="newUser-plan" v-if="novicePlanStatus === 1">
      <div class="newUser-plan-title">
        <p>{{ novicePlanInfo.planName }}<span>{{ novicePlanInfo.startInvestMoney }}元起投，最高可投1万元 ，每人仅限1次 </span></p>
      </div>
      <div class="newUser-plan-main">
        <div class="newUser-plan-rate">
          <p class="rate">
            <span class="roboto-regular">
              <interest-rate :value="novicePlanInfo.rate"
                             :leftFontSize="36"
                             :rightFontSize="24"></interest-rate>
            </span>%
          </p>
          <p>往期年化利率</p>
        </div>
        <div class="newUser-plan-day">
          <p class="day"><span class="roboto-regular">{{ novicePlanInfo.lockPeriod }}</span>天</p>
          <p>到期自动退出</p>
        </div>
        <div class="newUser-plan-way">
          <p class="way">即投即生息</p>
          <p>计息方式</p>
        </div>
      </div>
      <div class="newUser-plan-btn">
        <span>新手专享</span>
        <span>限量发售</span>
        <a class="newUser-plan-join" @click.stop="toNovicePlanPage">立即加入</a>
      </div>
    </div>
    <!-- 老用户&&参加过新手计划 -->
    <div v-else>
      <div class="newUser-plan">
        <div class="newUser-plan-title">
          <p>加入记录</p>
        </div>
        <div class="newUser-plan-main">
          <div class="newUser-plan-rate">
            <p class="rate">
            <span class="roboto-regular">
              <interest-rate :value="joinDetails.rate"
                             :leftFontSize="36"
                             :rightFontSize="24"></interest-rate>
            </span>%
          </p>
            <p>往期年化利率</p>
          </div>
          <div class="newUser-plan-day">
            <p class="day">
              <span class="roboto-regular">{{ joinDetails.lockPeriod }}</span>
              {{ joinDetails.lockUnit === 'month' ? '月' : '天' }}
            </p>
            <p>到期自动退出</p>
          </div>
          <div class="newUser-plan-money">
            <p class="money"><span>{{ joinDetails.joinMoney | currency('') }}</span>元</p>
            <p>加入金额</p>
          </div>
        </div>
        <div class="newUser-plan-bottom row">
          <p class="join-time col-md-4">加入时间<span class="roboto-regular">{{ joinDetails.joinTime }}</span></p>
          <p class="day-stop col-md-5">持有期限截至<span class="roboto-regular">{{ joinDetails.lockEndTime }}</span></p>
          <p class="status col-md-3">状态<span>{{ joinDetails.status === 'matched' ? '成功' : '自动投标中' }}</span></p>
        </div>
      </div>

      <!--table-->
      <div class="message">
        <p class="title">您购买的债权信息</p>
        <el-table :data="claimsList" style="width: 100%">
          <el-table-column prop="loanId" label="项目编号" width="120">
            <template slot-scope="scope">
              <a :href="scope.row.loanTargetUrl" target="_blank">{{ scope.row.loanId }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="loanMoney" label="借款金额" width="100">
            <template slot-scope="scope">
              {{ scope.row.loanMoney | currency('') + '元' }}
          </template>
          </el-table-column>
          <el-table-column prop="rate" label="往期年利率" width="80">
            <template slot-scope="scope">
              {{ scope.row.rate + '%' }}
          </template>
          </el-table-column>
          <el-table-column prop="period" label="借款期限" width="70"></el-table-column>
          <el-table-column prop="investMoney" label="投资金额" width="100">
            <template slot-scope="scope">
              {{ scope.row.investMoney | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column label="还款时间" width="80">
            <template slot-scope="scope">
              {{ scope.row.repayTimeFormat || '--' }}
            </template>
          </el-table-column>
          <el-table-column prop="earnings" label="已收本息">
            <template slot-scope="scope">
              {{ scope.row.earnings | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="uncollectedRepayMoney" label="待收本息">
            <template slot-scope="scope">
              {{ scope.row.uncollectedRepayMoney | currency('') + '元' }}
          </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="60"></el-table-column>
          <el-table-column prop="contract" label="操作" width="40">
            <template slot-scope="scope">
              <el-button v-if="scope.row.showContract" class="ico-download" type="text" size="small">下载合同</el-button>
              <p v-else class="ico-download-hui"></p>
            </template>
          </el-table-column>
        </el-table>

        <div class="pages">
          <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>
            条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
          <el-pagination @current-change="handleCurrentChange"
                         :current-page.sync="claimsQuery.pageNo"
                         :page-size="claimsQuery.size"
                         layout="prev, pager, next"
                         :total="total"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getLocationUrl } from 'utils/index';
  import { fetchNovicePlanInfo, fetchJoinPlanBill, feachJoinInvestClaims } from 'api/home/investment';
  import interestRate from 'components/interest-rate';

  export default {
    components: {
      interestRate
    },
    data() {
      return {
        novicePlanInfo: {
          planId: '',
          rate: '',
          lockPeriod: '',
          startInvestMoney: ''
        },
        joinDetails: {
          rate: '',
          joinMoney: '',
          lockPeriod: '',
          lockUnit: '',
          lockEndTime: '',
          joinTime: '',
          status: ''
        },
        claimsList: null,
        joinDetailsQuery: {
          type: 'novice_plan',
          pageNo: 1,
          pageSize: 1
        },
        claimsQuery: {
          joinPlanId: '',
          pageNo: 1,
          pageSize: 10
        },
        total: 0
      }
    },
    computed: {
      ...mapGetters([
        'novicePlanStatus'
      ]),
      getPageSize() {
        return Math.ceil(this.total / this.claimsQuery.pageSize);
      }
    },
    methods: {
      getNovicePlanInfo() {
        fetchNovicePlanInfo().then(data => {
          if (data.data.meta.code === 200) {
            this.novicePlanInfo = data.data.data;
          }
        })
      },
      toNovicePlanPage() {
        if (!this.novicePlanInfo.planId) return;
        window.location.href = getLocationUrl() + '/plan/' + this.novicePlanInfo.planId;
      },
      joinPlanNoviceList() {
        fetchJoinPlanBill(this.joinDetailsQuery).then(response => {
          if (response.data.meta.code === 200) {
            this.joinDetails = response.data.data.data[0];
            this.claimsQuery.joinPlanId = this.joinDetails.joinPlanId;
            this.getClaimsList();
          }
        })
      },
      getClaimsList() {
        feachJoinInvestClaims(this.claimsQuery).then(response => {
          if (response.data.meta.code === 200) {
            this.claimsList = response.data.data.data;
            this.total = response.data.data.count || 0;
          }
        })
      },
      handleCurrentChange() {
        this.getPageList();
      }
    },
    created() {
      if (this.novicePlanStatus === 1) {
        this.getNovicePlanInfo();
      } else {
        this.joinPlanNoviceList();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .newUser-plan {
    width: 100%;
    height: 245px;
    box-sizing: border-box;
    padding: 20px 15px;
    background-color: #fff;
    margin-bottom: 20px;

    .newUser-plan-title {
      width: 100%;
      margin-bottom: 25px;

      p {
        font-size: 20px;
        color: #274161;

        span {
          margin-left: 12px;
          font-size: 14px;
          color: #7c86a2;
        }
      }
    }
  }

  .newUser-plan-main {
    width: 100%;
    margin-bottom: 40px;

    > div {
      display: inline-block;
      width: 27%;
      text-align: center;

      p {
        font-size: 14px;
        color: #727e90;

        span {
          font-size: 36px;
        }
      }

      .rate {
        font-size: 20px;
        color: #ff4a33;

        .small-newUser-plan-rate {
          font-size: 24px;
        }
      }

      .day {
        font-size: 20px;
        color: #394b67;
      }

      .way {
        line-height: 1.5;
        font-size: 30px;
        color: #394b67;
      }

      .money {
        font-size: 20px;
        color: #394b67;
      }
    }

    .newUser-plan-day {
      margin: 0 50px;
    }
  }

  .newUser-plan-btn {
    width: 100%;
    box-sizing: border-box;
    padding-right: 75px;

    span {
      margin-left: 5px;
      border-radius: 40px;
      background-color: #fff;
      border: solid 1px #ced9e4;
      padding: 7px 17px;
      font-size: 14px;
      color: #727e90;
    }

    .newUser-plan-join {
      float: right;
      margin-top: -15px;
      border-radius: 41px;
      border: solid 1px #0573f4;
      padding: 13px 34px;
      font-size: 18px;
      color: #0573f4;

      &:hover {
        border: none;
        background-color: #378ff6;
        color: #fff;
      }
    }
  }

  .message {
    width: 100%;
    height: 553px;
    box-sizing: border-box;
    padding: 20px 5px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    .title {
      font-size: 20px;
      color: #274161;
      padding-left: 15px;
      margin-bottom: 25px;
    }
  }

  .newUser-plan-bottom {
    width: 100%;
    height: auto;
    border-top: solid 1px #dfe8f0;
    padding: 15px;

    p {
      font-size: 16px;
      color: #394b67;

      span {
        margin-left: 10px;
      }
    }
  }

  .ico-download {
    color: #0573f4;
  }

  .ico-download-hui {
    width: 20px;
    height: 21px;
    margin: 0 auto;
    background: url(../../../assets/images/home/icons/icon-downloadhui.png) no-repeat center;
  }
</style>
