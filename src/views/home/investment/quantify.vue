<template>
  <div class="quantify-wrapper">
    <!-- 升薪宝量化标的信息 -->
    <div class="quantify-card" v-if="quantifyData && quantifyData.length > 0" v-for="item in quantifyData" :key="item.planId">
      <!-- header -->
      <div class="quantify-card__head">
        <!-- 跳转到详情页 -->
        <a class="title" :href="baseUrl + '/plan/' + item.planId">{{ item.planName }}</a>
        <p class="firstDay" v-if="item.isTiexi">首{{ item.tiexiPeriod }}天贴息</p>
        <p>随时可退</p>
        <p>满{{ item.lockPeriod }}天免手续费</p>
        <div class="details pull-right" :class="{ disabled: !item.joinPlan }">
          <i class="ku-icon icon-details"></i>
          <el-button @click="toRouter('/investment/quantify/transactionRecord', item.planId)" :disabled="!item.joinPlan" type="text">交易详情</el-button>
        </div>
      </div>
      <!-- body -->
      <div class="quantify-card__body">
        <div class="shengxinbaolianghua-rate">
          <p class="rate">
            <span class="roboto-regular"><interest-rate :value="item.minRate + item.tiexiRate" :leftFontSize="36" :rightFontSize="24"></interest-rate></span>
            %~<span class="roboto-regular"><interest-rate :value="item.maxRate + item.tiexiRate" :leftFontSize="36" :rightFontSize="24"></interest-rate></span>%
          </p>
          <p>往期年化利率</p>
        </div>
        <div class="shengxinbaolianghua-money">
          <p class="money"><span class="roboto-regular">{{ item.startInvestMoeny | currency('') }}</span>元</p>
          <p>起投金额</p>
        </div>
        <div class="shengxinbaolianghua-money">
          <p class="money" v-if="item.raisingMoney.toString().length < 5"><span class="roboto-regular">{{ item.raisingMoney | currency('') }}</span>元</p>
          <p class="money" v-else=""><span class="roboto-regular">{{ (item.raisingMoney / 10000) | currency('') }}</span>万元</p>
          <p>当前剩余金额</p>
        </div>
        <a class="btn-join" @click.stop="oneKeyJoin(item.planId, item.raisingMoney)">{{ item.raisingMoney ? '一键加入' : '发放份额中' }}</a>
        <a class="btn-out" v-if="item.joinPlan" @click.stop="pullOut(item.planId)">申请退出</a>
      </div>
      <div class="quantify-card__footer" v-if="item.joinPlan">
        <p>在投金额（元）<span class="roboto-regular">{{ item.investMoney | currency('') }}</span></p>
        <p>累计收益（元）<span class="roboto-regular">{{ item.accumulatedEarnings | currency('') }}</span></p>
        <a @click.stop="lookTarget(item)" class="seeBiao">查看标的</a>
      </div>
    </div>
    <div class="not-data" v-show="quantifyData.length === 0">
      <no-data></no-data>
    </div>
  
    <!-- 验证用户操作组件 -->
    <operational-validate ref="validateSteps"></operational-validate>
  </div>
</template>

<script>
  import { fetchGetList } from 'api/home/investment-quantify';
  import interestRate from 'components/interest-rate';
  import NoData from '../components/NoData.vue';
  import OperationalValidate from '../components/OperationalValidate.vue';
  import { getLocationUrl } from 'utils/index';

  export default {
    components: {
      interestRate,
      OperationalValidate,
      NoData
    },
    data() {
      return {
        quantifyData: [],
        baseUrl: getLocationUrl()
      }
    },
    methods: {
      getList() {
        fetchGetList().then(data => {
          this.quantifyData = data.data.data;
        })
      },
      toRouter(path, id) {
        const str = `${path}/${id}`;
        this.$router.push(str);
      },
      oneKeyJoin(id, money) {
        const validateSteps = ['openAccount', 'transactionPassword', 'bankCard', 'automaticTender', 'automaticDebtTransfer'];
        const result = this.$refs['validateSteps'].validate(validateSteps); // eslint-disable-line
        if (!result) return;
        if (!money) return;
        this.$router.push('/investment/quantify/oneKeyJoin/' + id);
      },
      pullOut(id) {
        this.$router.push('/investment/quantify/pullOut/' + id);
      },
      lookTarget(item) {
        const queryData = {};
        queryData.lockPeriod = item.lockPeriod;
        queryData.investMoney = item.investMoney;
        queryData.planName = item.planName;
        this.$router.push({ path: '/investment/quantify/lookTarget/' + item.planId, query: queryData });
      },
      transactionRecord(id) {
        this.$router.push('/investment/quantify/transactionRecord/' + id);
      }
    },
    created() {
      this.getList();
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
  .quantify-wrapper {
    width: 100%;
    height: auto;
    
    .not-data {
      width: 100%;
      background-color: #fff;
      height: auto;
    }
  }
  
  .quantify-card {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 20px 50px 25px 25px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
  }

  .quantify-card__head {
    width: 100%;
    margin-bottom: 50px;
  
    .title {
      font-size: 20px;
      color: #274161;
      margin-right: 25px;
    }
  
    p {
      display: inline-block;
      margin-right: 8px;
      border: solid 1px #cdd8e3;
      padding: 7px 17px;
      border-radius: 41px;
      background-color: #fff;
      font-size: 14px;
      color: #727e90;
    }
  
    .firstDay {
      border: solid 1px #2281f2;
      color: #0e76f1;
    }
  
    .details {
      display: inline-block;
      border: none;
      color: #409eff;
      background: transparent;
      
      i {
        display: inline-block;
        vertical-align: baseline;
        margin-right: 10px;
        font-size: 30px;
        line-height: 1;
      }
      
      button {
        margin-top: -10px;
        margin-left: -5px;
      }
    }
  
    .details.disabled i {
      color: #b4bccc;
    }
  }

  .quantify-card__body {
    width: 100%;
    text-align: center;
    margin-bottom: 45px;

    > div {
      display: inline-block;
      width: 25%;

      p {
        font-size: 14px;
        color: #727e90;
      }
    }

    .shengxinbaolianghua-rate {
      .rate {
        font-size: 18px;
        color: #ff4a33;

        span {
          font-size: 36px;
        }

        .small-shengxinbaolianghua-rate {
          font-size: 20px;
        }
      }
    }

    .shengxinbaolianghua-money {
      .money {
        font-size: 20px;
        font-weight: 300;
        color: #394b67;

        span {
          font-size: 36px;
        }
      }
    }

    .btn-join {
      float: right;
      vertical-align: top;
      width: 122px;
      height: 34px;
      box-sizing: border-box;
      margin-top: 15px;
      border-radius: 41px;
      border: solid 1px #0573f4;
      line-height: 34px;
      text-align: center;
      font-size: 18px;
      color: #0573f4;

      &:hover {
        background-color: #378ff6;
        color: #fff;
      }
    }

    .btn-out {
      float: right;
      vertical-align: top;
      width: 122px;
      height: 34px;
      box-sizing: border-box;
      border-radius: 41px;
      border: solid 1px #7c86a2;
      line-height: 34px;
      text-align: center;
      font-size: 18px;
      color: #7c86a2;
    }
  }

  .quantify-card__footer {
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
        font-size: 20px;
        color: #394b67;
      }
    }

    .seeBiao {
      float: right;
      width: 125px;
      font-size: 14px;
      text-align: center;
      color: #0671f0;
    }
  }
</style>
