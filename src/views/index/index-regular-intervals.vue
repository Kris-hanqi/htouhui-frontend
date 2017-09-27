<template>
  <div class="regular-intervals">
    <div class="title">
      <span class="title1">精选定期</span>
      <span class="title2">定期投资  严格风控</span>
      <a href="#" class="seaMoreLoans">查看更多 <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i></a>
    </div>
    <a v-for="str in loansList" :href="str.targetUrl" v-bind:class="{ loansBoxRepaying: str.status != 'raising'}" class="loans-box" :key="str.index">
      <div class="loans-title">
        <div class="loans-name roboto-regular">{{ str.name }}</div>
        <div class="loans-id roboto-regular">{{ str.id }}</div>
      </div>
      <div class="loans-main">
        <div class="loans-rate-box">
          <p class="loans-rate"><span class="roboto-regular">{{ str.rate.substring(0, str.rate.indexOf('.')) }}</span><span class="small-loans-rate roboto-regular">{{ str.rate.substring(str.rate.indexOf('.')) }}</span>%</p>
          <p>往期年化利率</p>
        </div>
        <div class="loans-repayPeriod-box">
          <p class="loans-repayPeriod"><span class="roboto-regular">{{ str.repayPeriod }}</span>{{ str.repayUnit }}</p>
          <p>期限</p>
        </div>
      </div>
      <div class="loans-introduce">
        <el-tooltip v-if="str.tiexiInfo.totalTiexiRate != 0" class="tiexi-message item" effect="dark" :content="str.tiexiInfo.description" placement="bottom">
          <el-button  class="tiexi">贴息{{ str.tiexiInfo.totalTiexiRatePercent }}%</el-button>
        </el-tooltip>
        <div>T+1生息</div>
        <div>{{ str.type }}</div>
      </div>
      <div class="loans-process">
        <span class="loans-process-state">投资进度</span>
        <el-progress :percentage="str.process"></el-progress>
        <div class="loans-process-message">
          <span class="state" v-if="str.status == 'raising'">剩余金额</span>
          <span class="state" v-else>融资完成</span>
          <span class="money" v-if="str.status == 'raising'">{{ str.moneyNeedRaised }}元</span>
          <span class="money" v-else>{{ str.money }}万</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
  import { regularIntervals } from '@/api';

  export default {
    name: 'regularIntervals',
    data() {
      return {
        loansList: []
      }
    },
    methods: {
      regularIntervalsList() {
        regularIntervals().then(data => {
          for (let i = 0; i < data.data.data.loans.length; i++) {
            this.loansList.push(data.data.data.loans[i]);
          }
        })
      }
    },
    created() {
      this.regularIntervalsList();
    }
  }
</script>

<style lang="scss" scoped>
  .el-tooltip__popper.is-dark {
    background: #fde993;
    color: #64420a;
  }

  .el-progress-bar__inner {
    background-color: #0573f4;
  }

  .el-progress__text {
    margin-left: 15px;
    margin-bottom: 25px;
  }

  .regular-intervals {
    position: relative;
    width: 100%;
    height: 340px;
    margin-bottom: 45px;

    .loans-box:nth-child(1) {
      left: 0;
    }

    .loans-box:nth-child(2) {
      left: 253px;
    }

    .loans-box:nth-child(3) {
      right: 253px;
    }

    .loans-box:nth-child(4) {
      right: 0;
    }

    .title {
      width: 100%;

      .title1 {
        font-size: 20px;
        color: #394b67;
      }

      .title2 {
        font-size: 14px;
        color: #7c86a2;
      }

      .seaMoreLoans {
        float: right;
        font-size: 14px;
        color: #727e90;

        i {
          vertical-align: -4%;
        }

        &:hover {
          color: #0671f0;
        }
      }
    }
  }

  .loans-box {
    display: inline-block;
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 240px;
    height: 294px;
    padding: 12px 13px;
    background-color: #fff;
    border-top: 3px solid #0671f0;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      bottom: 4px;
      box-shadow: 0 2px 10px 0 #bfc1c4;
    }

    .loans-title {
      width: 100%;
      margin-bottom: 25px;
      text-align: center;

      .loans-name {
        margin-bottom: 5px;
        font-size: 20px;
        line-height: 1;
        color: #394b67;
      }

      .loans-id {
        font-size: 14px;
        line-height: 1.43;
        color: #727e90;
      }
    }

    .loans-rate-box {
      display: inline-block;
      width: 49%;
      margin-bottom: 30px;
      text-align: center;

      p {
        font-size: 14px;
        font-weight: 300;
        color: #7c86a2;
      }

      .loans-rate {
        font-size: 20px;
        color: #ff4a33;

        span {
          font-size: 36px;
        }

        .small-loans-rate {
          font-size: 24px;
        }
      }
    }

    .loans-repayPeriod-box {
      display: inline-block;
      width: 49%;
      margin-bottom: 30px;
      text-align: center;

      p {
        font-size: 14px;
        font-weight: 300;
        color: #8e97af;
      }

      .loans-repayPeriod {
        font-size: 20px;
        color: #394b67;

        span {
          font-size: 36px;
          font-weight: 300;
        }
      }
    }

    .loans-introduce {
      width: 100%;
      margin-bottom: 25px;
      text-align: center;

      > div {
        display: inline-block;
        box-sizing: border-box;
        border-radius: 41px;
        background-color: #fff;
        border: solid 1px #d0dae5;
        padding: 3px 5px;
        margin-right: 5px;
        font-size: 12px;
        font-weight: 300;
        color: #7c86a2;
        cursor: default;
      }

      .tiexi {
        display: inline-block;
        box-sizing: border-box;
        border-radius: 41px;
        background-color: #fff;
        border: solid 1px #3d92f7;
        padding: 3px 5px;
        margin-right: 5px;
        font-family: "SourceHanSansCN-normal";
        font-size: 12px;
        font-weight: 300;
        color: #4296f7;
      }
    }

    .loans-process {
      width: 100%;

      .loans-process-state {
        font-size: 12px;
        color: #7c86a2;
      }

      .loans-process-message {
        font-size: 12px;
        color: #7c86a2;

        .money {
          float: right;
        }
      }
    }
  }

  .loansBoxRepaying {
    border-top: 3px solid #727e90;
  }
</style>
