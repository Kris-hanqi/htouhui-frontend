<template>
  <div class="plan-novice">
    <!--未投资-->
    <div class="newUser-plan" v-if="showNovicePlanMessage">
      <div class="newUser-plan-title">
        <p>新手计划<span>1元起投，最高可投1万元 ，每人仅限1次 </span></p>
      </div>
      <div class="newUser-plan-main">
        <div class="newUser-plan-rate">
          <p class="rate"><span class="roboto-regular">12</span><span class="small-newUser-plan-rate roboto-regular">.0</span>%</p>
          <p>往期年化利率</p>
        </div>
        <div class="newUser-plan-day">
          <p class="day"><span class="roboto-regular">14</span>天</p>
          <p>持有期限</p>
        </div>
        <div class="newUser-plan-way">
          <p class="way">即投即生息</p>
          <p>计息方式</p>
        </div>
      </div>
      <div class="newUser-plan-btn">
        <span>新手专享</span>
        <span>限量发售</span>
        <a class="newUser-plan-join" href="">立即加入</a>
      </div>
    </div>
    <!--已投资-->
    <div class="newUser-plan" v-else>
      <div class="newUser-plan-title">
        <p>加入记录</p>
      </div>
      <div class="newUser-plan-main">
        <div class="newUser-plan-rate">
          <p class="rate"><span class="roboto-regular">12</span><span class="small-newUser-plan-rate roboto-regular">.0</span>%</p>
          <p>往期年化利率</p>
        </div>
        <div class="newUser-plan-day">
          <p class="day"><span class="roboto-regular">14</span>天</p>
          <p>持有期限</p>
        </div>
        <div class="newUser-plan-money">
          <p class="money"><span>100</span>元</p>
          <p>加入金额</p>
        </div>
      </div>
      <div class="newUser-plan-bottom">
        <p class="join-time">加入时间<span class="roboto-regular">2017/09/17 14:52:17</span></p>
        <p class="day-stop">持有期限截至<span class="roboto-regular">2017/10/114:52:17</span></p>
        <p class="status">状态<span>成功</span></p>
      </div>
    </div>

    <!--table-->
    <div class="message">
      <p class="title">您购买的债权信息</p>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="number" label="项目编号" width="120"></el-table-column>
        <el-table-column prop="borrowedMoney" label="借款金额" width="100"></el-table-column>
        <el-table-column prop="rate" label="往期年利率" width="70"></el-table-column>
        <el-table-column prop="timeLimit" label="借款期限" width="60"></el-table-column>
        <el-table-column prop="investMoney" label="投资金额" width="100"></el-table-column>
        <el-table-column prop="time" label="还款时间" width="80"></el-table-column>
        <el-table-column prop="incomePrincipal" label="已收本息"></el-table-column>
        <el-table-column prop="collectPrincipal" label="待收本息"></el-table-column>
        <el-table-column prop="state" label="状态" width="50"></el-table-column>
        <el-table-column prop="contract" label="合同" width="40">
          <template scope="scope">
            <el-button class="icon-download" type="text" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { planNovice } from '@/api/home/plan-novice';

  export default {
    data() {
      return {
        list: null
      }
    },
    computed: {
      ...mapGetters([
        'showNovicePlanMessage'
      ])
    },
    methods: {
      planNoviceList() {
        planNovice().then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            console.log(this.list);
          }
        })
      }
    },
    created() {
      this.planNoviceList();
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
      margin-bottom: 50px;

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
    padding-top: 20px;
    padding-left: 15px;

    p {
      display: inline-block;
      margin-right: 60px;
      font-size: 16px;
      color: #394b67;

      span {
        margin-left: 10px;
      }
    }
  }

  .icon-download {
    width: 20px;
    height: 21px;
    background: url(../../../assets/images/home/icons/icon-download.png) no-repeat center;
  }
</style>
