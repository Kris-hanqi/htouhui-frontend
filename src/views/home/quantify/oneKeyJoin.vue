<template>
  <div class="oneKeyJoin">
    <p class="title">一键加入</p>
    <div class="main-1" v-if="show">
        <p>可加入额<span class="roboto-regular">1000</span><span>元</span><i @click="isShow"></i></p>
    </div>
    <div class="main-2" v-else>
      <div class="use-money">
        <p class="main-2-p-1">起投金额：<span class="roboto-regular">1000</span><span class="small-font">元</span></p>
        <p>您目前还可加入<span class="roboto-regular">263,500</span>元</p>
      </div>
      <input type="number" class="inputMoney" placeholder="加入金额须为1000.00的整数倍">
      <div class="canUseMoney">
        <p>可用余额<span class="roboto-regular">5,390,00</span>元<router-link to="/recharge"><span>充值</span></router-link></p>
      </div>
      <div class="coupons-box">
        <div class="coupons-icon" @click="isUp">
          优惠券
          <i class="fa fa-lg" :class="coupons ? 'fa-angle-down' : 'fa-angle-up'" aria-hidden="true"></i>
          <div class="coupons-content" :style="{display: coupons ? 'none' : 'block'}">
            <i></i>
            <p class="title">可用券： 当前有<span class="roboto-regular">2</span>张可用的优惠券</p>
            <div class="noUse"><input type="radio" name="coupons" checked>不使用优惠券</div>
            <div class="coupons-list">
              <div class="coupon">
                <input type="radio" name="coupons">
                <div class="coupon-img">1%加息</div>
                <div class="coupon-message">
                  <p>满100元可用</p>
                  <p><span>最高计息金额：1,000元 </span><span> 最高计息天数：10天</span></p>
                </div>
              </div>
            </div>
            <div class="coupons-btn">
              <p class="sure">确定</p>
              <p class="cancel" @click.stop="isDown">取消</p>
            </div>
          </div>
        </div>
        <p class="usedCoupon">已使用1%加息券</p>
      </div>
    </div>
    <div class="checkboxes">
      <p><input id="checkOne" type="checkbox" v-model="checked.one"><label for="checkOne">我同意<a href="#" target="_blank">《 升薪宝量化服务协议 》</a></label></p>
      <p><input id="checkTwo" type="checkbox" v-model="checked.two"><label for="checkTwo">我同意<a href="#" target="_blank">《 委托系统自动出借及债权转让授权书 》</a></label></p>
    </div>
    <button class="btn-join" :class="{ 'btn-join-default': checked.one && checked.two }">一键加入</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: {
          one: false,
          two: false
        },
        show: true,
        coupons: true
      }
    },
    methods: {
      isShow() {
        this.show = false
      },
      isUp() {
        this.coupons = false
      },
      isDown() {
        this.coupons = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .oneKeyJoin {
    position: relative;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px 50px 25px 25px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    .title {
      margin-bottom: 40px;
      font-size: 20px;
      color: #274161;
    }

    .checkboxes {
      padding-left: 40px;

      p {
        margin-bottom: 15px;
        font-size: 14px;
        color: #727e90;
      }

      input {
        width: 17px;
        height: 17px;
        margin-right: 12px;
        background-color: #fff;
        border: solid 1px #aab2c9;
        border-radius: 0;
        padding: 0;
      }
    }

    .btn-join {
      position: absolute;
      top: 150px;
      right: 55px;
      width: 170px;
      height: 50px;
      box-sizing: border-box;
      border-radius: 40px;
      background-color: #fff;
      border: solid 1px #7c86a2;
      padding: 0;
      font-size: 18px;
      text-align: center;
      line-height: 50px;
      color: #7c86a2;
      cursor: no-drop;
    }

    .btn-join-default {
      border: solid 1px #0573f4;
      color: #0573f4;
      cursor: pointer;
    }
  }

  .oneKeyJoin .main-1 {
    width: 100%;
    box-sizing: border-box;
    padding-left: 40px;
    margin-bottom: 40px;

    p {
      font-size: 18px;
      color: #727e90;
    }

    span {
      color: #ff4a33;
      font-size: 20px;
    }

    .roboto-regular {
      margin-left: 15px;
      font-size: 36px;
    }

    i {
      display: inline-block;
      width: 25px;
      height: 25px;
      margin-left: 30px;
      background: url(../../../assets/images/home/icon-reform.png) no-repeat center;
      cursor: pointer;
    }
  }

  .oneKeyJoin .main-2 {
    width: 100%;
    box-sizing: border-box;
    padding-left: 40px;
    margin-bottom: 25px;

    .use-money {
      margin-bottom: 30px;

      p {
        display: inline-block;
        margin-right: 50px;
        font-size: 18px;
        color: #727e90;
      }

      p.main-2-p-1 span {
        color: #ff4a33;
      }

      p.main-2-p-1 span.small-font {
        font-size: 20px;
      }

      span {
        font-size: 30px;
        color: #394b67;
      }
    }

    .inputMoney {
      width: 510px;
      height: 55px;
      margin-bottom: 20px;
      box-sizing: border-box;
      background-color: #fff;
      border: solid 1px #ced9e4;
      padding-left: 10px;
      font-size: 18px;

      &::-webkit-input-placeholder {
        color: #aab2c9;
      }

      &::-moz-placeholder {
        color: #aab2c9;
      }
    }

    .canUseMoney {
      margin-bottom: 15px;

      p {
        font-size: 16px;
        color: #727e90;

        span {
          margin-left: 30px;
          color: #0671f0;
        }

        .roboto-regular {
          margin-left: 10px;
          color: #ff5f4b;
        }
      }
    }

    .coupons-box {
      .coupons-icon {
        display: inline-block;
        position: relative;
        width: 83px;
        height: 26px;
        box-sizing: border-box;
        line-height: 26px;
        background: url(../../../assets/images/home/icon-quan.png) no-repeat center;
        text-align: center;
        font-size: 14px;
        color: #ff4a33;
        cursor: pointer;

        i {
          margin-left: 5px;
        }
      }

      .usedCoupon {
        display: inline-block;
        width: 120px;
        height: 25px;
        box-sizing: border-box;
        background-color: #f8fafb;
        border: solid 1px #bfc1c4;
        margin-left: 10px;
        line-height: 25px;
        font-size: 14px;
        text-align: center;
        color: #727e90;
      }
    }
  }

  .oneKeyJoin .main-2 .coupons-box .coupons-content {
    position: absolute;
    top: 40px;
    width: 390px;
    max-height: 312px;
    box-sizing: border-box;
    background-color: #fff;
    border: solid 1px #ff4e37;
    padding: 15px;
    text-align: left;
    cursor: default;

    i {
      display: block;
      position: absolute;
      top: -7px;
      left: 25px;
      width: 12px;
      height: 7px;
      background: url(../../../assets/images/home/icon-arrow-red.png) no-repeat center;
    }

    .title {
      width: 100%;
      margin-bottom: 10px;
      border-bottom: solid 1px #ced9e4;
      padding-bottom: 5px;
      font-size: 14px;
      color: #394b67;

      span {
        color: #ff4e37;
      }
    }

    .noUse {
      margin-bottom: 10px;
      padding-left: 1px;
      font-size: 14px;
      color: #394b67;

      input {
        margin-right: 8px;
      }
    }

    .coupons-list {
      overflow: auto;
      max-height: 155px;

      > div {
        margin-bottom: 10px;
        padding-left: 1px;
      }

      .coupon-img {
        display: inline-block;
        width: 80px;
        height: 25px;
        box-sizing: border-box;
        border: 1px dotted #fff;
        line-height: 25px;
        background-color: #ff4e37;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }

      .coupon-message {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        color: #727e90;

        p {
          line-height: 1.1;
        }
      }

      input {
        vertical-align: text-top;
      }
    }

    .coupons-btn {
      width: 100%;
      text-align: center;
      margin-top: 15px;

      p {
        display: inline-block;
        width: 75px;
        height: 30px;
        box-sizing: border-box;
        line-height: 30px;
        border-radius: 40px;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
      }

      .sure {
        background-color: #ff4e37;
        color: #fff;
      }

      .cancel {
        border: solid 1px #c5c5c5;
        background-color: #fff;
        color: #727e90;
      }
    }
  }
</style>
