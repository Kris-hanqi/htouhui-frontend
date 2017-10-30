<template>
  <div class="coupon-wrapper">
    <div class="coupon-wrapper__top">
      <p>优惠券</p>
      <el-button type="text">优惠券使用说明</el-button>
      <el-button :plain="true" type="info">兑换优惠券</el-button>
    </div>
    <div class="coupon-wrapper__body">
      <el-tabs v-model="activeName" @tab-click="handleTabClick" type="card">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="现金券" name="cash"></el-tab-pane>
        <el-tab-pane label="加息券" name="plus_coupon"></el-tab-pane>
        <el-tab-pane label="礼金券" name="lijin"></el-tab-pane>
      </el-tabs>
      
      <div class="coupon-wrapper__menu">
        <a href="javascript:void(0)" @click="switchStatus('unused')" :class="{ active: status === 'unused'}">未使用</a>
        <a href="javascript:void(0)" @click="switchStatus('used')" :class="{ active: status === 'used'}">已使用</a>
        <a href="javascript:void(0)" @click="switchStatus('expire')" :class="{ active: status === 'expire'}">已过期</a>
      </div>
  
      <div class="coupon-wrapper__list">
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
   
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'all',
        status: 'unused'
      }
    },
    methods: {
      handleTabClick(tab) {
        console.log(tab);
      },
      switchStatus(data) {
        this.status = data;
      }
    }
  }
</script>

<style lang="scss">
  .coupon-wrapper {
    width: 100%;
    height: 846px;
    box-sizing: border-box;
    padding: 20px 15px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  
  .coupon-wrapper__top {
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
  
    .el-button--info {
      float: right;
      border-radius: 100px;
      margin-right: 10px;
    }
  
    .el-button--text {
      float: right;
    }
  }

  .coupon-wrapper__menu {
    padding-left: 30px;
    
    a {
      margin-right: 20px;
      color: #394b67;
    }
  
    a.active {
      height: 26px;
      padding: 4px 15px;
      line-height: 26px;
      color: #fff;
      border-radius: 100px;
      background-color: #0671f0;
    }
  }
  
  .coupon-wrapper__list {
    width: 100%;
    box-sizing: border-box;
    margin-top: 20px;
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
        background: url(../../../assets/images/home/icons/icon-new.png) no-repeat center;
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
