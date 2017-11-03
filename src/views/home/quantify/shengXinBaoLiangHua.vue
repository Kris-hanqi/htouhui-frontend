<template>
  <div>
    <div class="shengxinbaolianghua" v-for="str in quantifyData">
      <div class="title-box">
        <span class="title">{{ str.planName }}</span>
        <p class="firstDay" v-show="str.isTiexi">首{{ str.tiexiPeriod }}天贴息</p>
        <p>随时可退</p>
        <p>满{{ str.lockPeriod }}天免手续费</p>
        <router-link to="transactionRecord" v-if="str.joinPlan"><a href="javascript:void(0)" class="tradingParticulars-2"><i></i>交易详情</a></router-link>
        <a href="javascript:void(0)" class="tradingParticulars-1" v-else><i></i>交易详情</a>
      </div>
      <div class="shengxinbaolianghua-main">
        <div class="shengxinbaolianghua-rate">
          <p class="rate">
            <span class="roboto-regular">12</span><span class="small-shengxinbaolianghua-rate roboto-regular">.0</span>%~<span class="roboto-regular">12</span><span class="small-shengxinbaolianghua-rate roboto-regular">.0</span>%
          </p>
          <p>往期年化利率</p>
        </div>
        <div class="shengxinbaolianghua-money">
          <p class="money"><span class="roboto-regular">{{ str.startInvestMoeny }}</span>元</p>
          <p>起投金额</p>
        </div>
        <div class="shengxinbaolianghua-money">
          <p class="money"><span class="roboto-regular">{{ str.raisingMoney }}</span>元</p>
          <p>当前剩余金额</p>
        </div>
        <a class="btn-join" href="javascript:void(0)" @click="goClaimsView(str.planId)" v-if="!str.joinPlan">一键加入</a>
        <router-link to="pullOut" v-else><a class="btn-out" href="#">申请退出</a></router-link>
      </div>
      <div class="shengxinbaolianghua-bottom" v-if="str.joinPlan">
        <p>在投金额（元）<span class="roboto-regular">{{ str.investMoney }}</span></p>
        <p>累计收益（元）<span class="roboto-regular">{{ str.accumulatedEarnings }}</span></p>
        <a href="javascript:void(0)" @click="goClaimsView(str.planId)" class="seeBiao">查看标的</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { quantifyList } from '@/api/home/quantify';

  export default {
    data() {
      return {
        quantifyData: []
      }
    },
    methods: {
      getQuantifyList() {
        quantifyList().then(data => {
          this.quantifyData = data.data.data;
        })
      },
      goClaimsView(id) {
        this.$router.push('/quantify/oneKeyJoin/' + id);
      }
    },
    created() {
      this.getQuantifyList();
    }
  }
</script>

<style lang="scss" scoped>
  .shengxinbaolianghua {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    box-sizing: border-box;
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

    .tradingParticulars-1 {
      float: right;
      font-size: 14px;
      color: #727e90;
      cursor: no-drop;

      i {
        display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 30px;
        margin-right: 5px;
        background: url(../../../assets/images/home/center-ico-019.png) no-repeat center;
      }
    }

    .tradingParticulars-2 {
      float: right;
      font-size: 14px;
      color: #0573f4;

      i {
        display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 30px;
        margin-right: 5px;
        background: url(../../../assets/images/home/center-ico-019.png) no-repeat center;
      }
    }
  }

  .shengxinbaolianghua-main {
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
      margin-top: 15px;
      border-radius: 41px;
      border: solid 1px #7c86a2;
      line-height: 34px;
      text-align: center;
      font-size: 18px;
      color: #7c86a2;
    }
  }

  .shengxinbaolianghua-bottom {
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
