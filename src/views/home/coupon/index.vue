<template>
  <div class="you-hui-quan">
    <div class="title-box">
      <p>优惠券</p>
      <span>优惠券使用说明</span>
      <a href="#">兑换优惠券</a>
    </div>
    <ul class="tab">
      <li class="active">全部</li>
      <li>现金券</li>
      <li>加息券</li>
      <li>礼金券</li>
    </ul>
    <ul class="type">
      <li class="active">未使用</li>
      <li>已使用</li>
      <li>已过期</li>
    </ul>
    <div class="quan-list">
      <div class="quan-box">
        <div class="nowOpen">
          <a class="nowOpen-btn" href="#">立即开户激活</a>
        </div>
        <div class="box-top">
          <i class="icon-new"></i>
          <p class="title"><span class="roboto-regular">30</span>元</p>
          <p class="detail">现金券<span>［满100可用］</span></p>
          <p class="time">2017.07.01-2017.7.30</p>
        </div>
        <div class="box-bottom">
          <p class="money">计息金额：<span class="roboto-regular">1,000</span>元</p>
          <p class="message">使用说明：投资1,000元可用</p>
          <a class="newUse" href="#">立即使用</a>
        </div>
      </div>
      <div class="quan-box">
        <div class="nowOpen">
          <a class="nowOpen-btn" href="#">立即开户激活</a>
        </div>
        <div class="box-top">
          <i class="icon-new"></i>
          <p class="title"><span class="roboto-regular">30</span>元</p>
          <p class="detail">现金券<span>［满100可用］</span></p>
          <p class="time">2017.07.01-2017.7.30</p>
        </div>
        <div class="box-bottom">
          <p class="money">计息金额：<span class="roboto-regular">1,000</span>元</p>
          <p class="message">使用说明：投资1,000元可用</p>
          <a class="newUse" href="#">立即使用</a>
        </div>
      </div>
      <div class="quan-box">
        <div class="nowOpen">
          <a class="nowOpen-btn" href="#">立即开户激活</a>
        </div>
        <div class="box-top">
          <i class="icon-new"></i>
          <p class="title"><span class="roboto-regular">30</span>元</p>
          <p class="detail">现金券<span>［满100可用］</span></p>
          <p class="time">2017.07.01-2017.7.30</p>
        </div>
        <div class="box-bottom">
          <p class="money">计息金额：<span class="roboto-regular">1,000</span>元</p>
          <p class="message">使用说明：投资1,000元可用</p>
          <img class="pass" src="../../../assets/images/home/ico-used.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .you-hui-quan {
    width: 100%;
    height: 846px;
    box-sizing: border-box;
    padding: 20px 15px;
    background-color: #fff;
    margin-bottom: 20px;

    .title-box {
      width: 100%;
      height: 30px;
      margin-bottom: 15px;
      line-height: 30px;
      padding-left: 5px;

      p {
        display: inline-block;
        font-size: 20px;
        color: #274161;
      }

      a {
        float: right;
        display: inline-block;
        width: 86px;
        height: 30px;
        margin-right: 15px;
        box-sizing: border-box;
        border-radius: 100px;
        background-color: #fff;
        border: solid 1px #0671f0;
        line-height: 30px;
        text-align: center;
        color: #0671f0;
        font-size: 14px;

        &:hover {
          color: #fff;
          background-color: #0671f0;
        }
      }

      span {
        float: right;
        font-size: 14px;
        color: #0671f0;
        cursor: pointer;
      }
    }

    .tab {
      width: 100%;
      height: 50px;
      margin-bottom: 20px;
      background-color: #f6f9fe;
      line-height: 50px;

      li {
        float: left;
        width: 170px;
        box-sizing: border-box;
        text-align: center;
        font-size: 18px;
        color: #394b67;
        cursor: pointer;
      }

      li.active {
        background-color: #fff;
        color: #0573f4;
        border-top: 2px solid #0573f4;
        box-shadow: 5px 0 5px -5px rgba(0, 0, 0, 0.5), -5px 0 5px -5px rgba(0, 0, 0, 0.5);
      }
    }

    .type {
      width: 100%;
      height: 25px;
      box-sizing: border-box;
      padding-left: 35px;
      margin-bottom: 25px;

      li {
        float: left;
        width: 73px;
        height: 25px;
        margin-right: 20px;
        box-sizing: border-box;
        line-height: 25px;
        text-align: center;
        font-size: 16px;
        color: #394b67;
        cursor: pointer;
      }

      li.active {
        border-radius: 100px;
        background-color: #0671f0;
        color: #fff;
      }
    }
  }

  .quan-list {
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
  }

  .quan-box {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 230px;
    height: 272px;
    margin-right: 20px;

    .nowOpen {
      display: block;
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      background: url(../../../assets/images/home/quan-3.png) no-repeat center;

      .nowOpen-btn {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 185px;
        height: 46px;
        box-sizing: border-box;
        margin: 0 auto;
        margin-left: -92px;
        margin-top: -23px;
        border-radius: 100px;
        border: solid 1px #fff;
        line-height: 46px;
        font-size: 18px;
        text-align: center;
        color: #fff;
      }
    }

    .box-top {
      width: 230px;
      height: 133px;
      box-sizing: border-box;
      padding-top: 20px;
      background: url(../../../assets/images/home/quan-1.png) no-repeat center;

      .icon-new {
        display: block;
        position: absolute;
        top: 0;
        left: 12px;
        width: 19px;
        height: 39px;
        background: url(../../../assets/images/home/icon-new.png) no-repeat center;
      }

      .title {
        text-align: center;
        font-size: 20px;
        color: #fff;

        span {
          font-size: 50px;
        }
      }

      .detail {
        font-size: 12px;
        text-align: center;
        color: #7d1010;
        margin-bottom: 20px;

        span {
          color: #fff;
        }
      }

      .time {
        font-size: 12px;
        text-align: center;
        color: #7d1010;
      }
    }

    .box-bottom {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding: 20px 15px;
      background-color: #f9f9f9;

      p {
        margin-bottom: 10px;
        font-size: 12px;
        color: #727e90;
      }

      .newUse {
        display: block;
        width: 111px;
        height: 30px;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top: 30px;
        border-radius: 100px;
        border: solid 1px #eb5145;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        color: #eb5145;
      }

      .pass {
        display: block;
        position: absolute;
        right: 20px;
        width: 63px;
        height: 64px;
      }
    }
  }
</style>
