<template>
  <div class="look-regular">
    <div class="details">
      <div class="title-box">
        <span class="title">资产详情-债权信息</span>
        <router-link to="/investment/plan21Day/index"><a href="#" class="return-prev-pages">返回上一页 ></a></router-link>
      </div>
      <div class="look-regular-main">
        <div class="look-regular-rate">
          <p class="rate">
            <span class="roboto-regular"><interest-rate :value="detailList.rate" :leftFontSize="36" :rightFontSize="24"></interest-rate></span>%
          </p>
          <p>往期年化利率</p>
        </div>
        <div class="look-regular-day">
          <p class="day"><span class="roboto-regular">{{ detailList.lockPeriod }}</span>天</p>
          <p>持有期限</p>
        </div>
        <div class="look-regular-money">
          <p class="money"><span class="roboto-regular">{{ detailList.joinMoney }}</span>元</p>
          <p>加入金额</p>
        </div>
      </div>
      <div class="look-regular-bottom">
        <p>加入时间 <span class="roboto-regular">{{ detailList.joinTime }}</span></p>
        <p>即日起免手续费 <span class="roboto-regular">{{ detailList.lockEndTime }}</span></p>
        <img v-if="detailList.status === 'matched'" class="type-message" src="../../../../assets/images/home/icon-success.png" alt=""/>
        <img v-else class="type-message" src="../../../../assets/images/home/icon-auto.png" alt=""/>
      </div>
    </div>

    <div class="message">
      <div class="title">
        <span>您购买的债权信息</span>
        <p class="title-message">目前已为您自动投标成功   <span>{{ detailList.totalInvestMoney }}元</span></p>
      </div>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="loanId" label="项目编号" width="120"></el-table-column>
        <el-table-column prop="loanMoney" label="借款金额" width="100">
          <template slot-scope="scope">
            {{ scope.row.loanMoney + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="往期年利率" width="80">
          <template slot-scope="scope">
            {{ scope.row.rate + '%' }}
          </template>
        </el-table-column>
        <el-table-column prop="perid" label="借款期限" width="80"></el-table-column>
        <el-table-column prop="investMoney" label="投资金额" width="100">
          <template slot-scope="scope">
            {{ scope.row.investMoney + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="repayTimeFormat" label="还款时间" width="80"></el-table-column>
        <el-table-column prop="earnings" label="已收本息">
          <template slot-scope="scope">
            {{ scope.row.earnings + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="uncollectedRepayMoney" label="待收本息">
          <template slot-scope="scope">
            {{ scope.row.uncollectedRepayMoney + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="50"></el-table-column>
        <el-table-column prop="contract" label="查看" width="40">
          <template slot-scope="scope">
            <a class="icon-download" type="text">合同</a>
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
  import { joinPlan } from 'api/home/getJoinInfo';
  import { queryUserInvestList } from 'api/home/queryUserJoinInvestList';
  import interestRate from 'components/interest-rate';

  export default {
    components: {
      interestRate
    },
    data() {
      return {
        list: null,
        detailList: {
          rate: ''
        },
        detailQuery: {
          joinPlanId: this.$route.params.id
        },
        listQuery: {
          joinPlanId: this.$route.params.id,
          pageNo: 1,
          pageSize: 10
        },
        total: 0,
        contractQuery: {
          investId: ''
        },
        downloadContract: ''
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.pageSize);
      }
    },
    methods: {
      getList() {
        joinPlan(this.detailQuery).then(response => {
          if (response.data.meta.code === 200) {
            this.detailList = response.data.data;
            console.log('21天计划债权' + this.detailList);
            console.log(this.detailList);
          }
        })
      },
      getPageList() {
        queryUserInvestList(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            this.total = data.data.count || 0;
            console.log('21天计划债权列表' + this.list);
            console.log(this.list);
          }
        })
      },
      query() {
        this.getPageList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getPageList();
      }
    },
    created() {
      this.getList();
      this.getPageList()
    }
  }
</script>

<style lang="scss" scoped>
  .icon-download {
    color: #0573f4;
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
      width: 27%;
      text-align: center;

      p {
        font-size: 14px;
        color: #727e90;
      }

      .rate {
        font-size: 20px;
        color: #ff4a33;

        span {
          font-size: 36px;
        }

        .small-look-regular-rate {
          font-size: 24px;
        }
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
