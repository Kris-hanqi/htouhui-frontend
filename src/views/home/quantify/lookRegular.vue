<template>
  <div class="look-regular">
    <div class="details">
      <div class="title-box">
        <span class="title">资产详情-债权信息</span>
        <router-link to="transactionRecord"><a href="#" class="return-prev-pages">返回上一页 ></a></router-link>
      </div>
      <div class="look-regular-main">
        <div class="look-regular-rate">
          <p class="rate">
            <span class="roboto-regular">12</span><span class="small-look-regular-rate roboto-regular">.0</span>% ~
            <span class="roboto-regular">12</span><span class="small-look-regular-rate roboto-regular">.0</span>%
          </p>
          <p>往期年化利率</p>
        </div>
        <div class="look-regular-day">
          <p class="day"><span class="roboto-regular">15</span>天</p>
          <p>持有期限</p>
        </div>
        <div class="look-regular-money">
          <p class="money"><span class="roboto-regular">152.06</span>元</p>
          <p>加入金额</p>
        </div>
      </div>
      <div class="look-regular-bottom">
        <p>加入时间 <span class="roboto-regular">2017/10/11 17:30:26</span></p>
        <p>即日起免手续费 <span class="roboto-regular">2017/10/11 </span></p>
        <img class="type-message" src="../../../assets/images/home/ico.png" alt=""/>
      </div>
    </div>
    <div class="message">
      <div class="title">
        <span>您购买的债权信息</span>
        <p class="title-message">目前已为您自动投标成功   <span>100元</span></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
