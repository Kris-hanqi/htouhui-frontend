<template>
  <div class="plan-novice">
    <div class="newUser-plan">
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
    <div class="message">
      <p class="title">您购买的债权信息</p>
    </div>
  </div>
</template>

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
      }

      .rate {
        font-size: 20px;
        color: #ff4a33;

        span {
          font-size: 36px;
        }

        .small-newUser-plan-rate {
          font-size: 24px;
        }
      }

      .newUser-plan-day {
        margin: 0 50px;
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
      font-weight: 300;
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
    padding: 20px 10px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    .title {
      font-size: 20px;
      color: #274161;
      padding-left: 15px;
      margin-bottom: 25px;
    }
  }
</style>
