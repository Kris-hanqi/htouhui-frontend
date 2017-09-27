<template>
  <div class="plan-21day-box">
    <div class="plan-21day">
      <i class="icon-zhiNeng"></i>
      <div class="plan-21day-title">
        <p>21天计划<span>到期后自动返还本息</span></p>
      </div>
      <div class="plan-21day-main">
        <div class="plan-21day-rate">
          <p class="rate"><span class="roboto-regular">7</span><span class="small-plan-21day-rate roboto-regular">.0</span>%</p>
          <p>往期年化利率</p>
        </div>
        <div class="plan-21day-day">
          <p class="day"><span class="roboto-regular">21</span>天</p>
          <p>周期 </p>
        </div>
        <div class="plan-21day-way">
          <p class="way">即投即生息</p>
          <p>计息方式</p>
        </div>
      </div>
      <div class="plan-21day-btn">
        <span>1000元起投</span>
        <span>无手续费</span>
        <a class="plan-21day-join" href="">立即加入</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'plan21day'
  }
</script>

<style lang="scss" scoped>
  .plan-21day-box {
    display: inline-block;
    position: relative;
    width: 635px;
    height: 245px;
    margin-top: 30px;
  }

  .plan-21day {
    display: inline-block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 245px;
    margin-bottom: 30px;
    box-sizing: border-box;
    border-top: 3px solid #0671f0;
    padding: 20px 15px;
    background-color: #fff;
    transition: 0.3s;

    &:hover {
      bottom: 4px;
      box-shadow: 0 2px 10px 0 #bfc1c4;
    }

    .icon-zhiNeng {
      display: block;
      position: absolute;
      right: 10px;
      top: -3px;
      width: 42px;
      height: 54px;
      background: url(../../assets/images/index/icon-zhiNeng.png) no-repeat center;
    }

    .plan-21day-title {
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

  .plan-21day-main {
    width: 100%;
    margin-bottom: 40px;

    > div {
      display: inline-block;
      width: 32%;
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

        .small-plan-21day-rate {
          font-size: 24px;
        }
      }

      .day {
        font-size: 20px;
        color: #394b67;

        span {
          font-size: 36px;
        }
      }

      .way {
        line-height: 1.5;
        font-size: 24px;
        color: #394b67;
      }
    }
  }

  .plan-21day-btn {
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

    .plan-21day-join {
      float: right;
      margin-top: -15px;
      border-radius: 41px;
      border: solid 1px #0573f4;
      padding: 13px 34px;
      font-size: 18px;
      font-weight: 300;
      color: #0573f4;

      &:hover {
        border: none;
        background-color: #378ff6;
        color: #fff;
      }
    }
  }
</style>
