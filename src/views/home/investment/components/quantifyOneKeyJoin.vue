<template>
  <!-- 升薪宝量化一键加入组件 -->
  <div class="oneKeyJoin">
    <hth-panel title="一键加入">
      <div class="main-1" v-if="show">
        <p>可加入额<span class="roboto-regular">{{ joinMoney | currency('') }}</span>
          <span>元</span><i class="iconfont icon-update" @click="isShow"></i>
        </p>
      </div>
      <div class="main-2" v-else>
        <div class="use-money">
          <p class="main-2-p-1">起投金额：<span class="roboto-regular">{{ oneKeyJoinInfo.startInvestMoney | currency('') }}</span><span class="small-font">元</span></p>
          <p>您目前还可加入<span class="roboto-regular">{{ oneKeyJoinInfo.canJoinMoney | currency('') }}</span>元</p>
        </div>
        <input type="number" class="inputMoney" v-model="userMoney" :placeholder="'加入金额须为'+ oneKeyJoinInfo.incrMoney +'的整数倍'">
        <div class="canUseMoney">
          <p>可用余额<span class="roboto-regular">{{ oneKeyJoinInfo.balance | currency('') }}</span>元<router-link to="/recharge"><span>充值</span></router-link></p>
        </div>
        <div class="coupons-box">
          <div class="coupons-icon" @click="isUp">
            优惠券
            <i class="iconfont" :class="coupons ? 'icon-bottom' : 'icon-top'"></i>
            <div class="coupons-content" v-if="coupons">
              <i></i>
              <p class="title">可用券： 当前有<span class="roboto-regular">{{ couponsList.count }}</span>张可用的优惠券</p>
              <div class="noUse">
                <el-radio v-model="radio" :label="0" name="coupons">不使用优惠券</el-radio>
              </div>
              <div class="coupons-list">
                <div class="coupon" v-for="str in couponsList.userCouponInfos">
                  <el-radio :disabled="!chooseCoupons(str.lowerLimitMoney)" v-model="radio" :label="str.userCouponId" name="coupons">
                    <div class="coupon-img" :id="str.userCouponId">{{ str.type == 'plus_coupon' ? str.rate : str.money }}{{ str.type | keyToValue(typeList) }}</div>
                    <div class="coupon-message">
                      <p>满{{ str.lowerLimitMoney | currency('') }}元可用</p>
                      <p><span v-if="str.maxInterestMoney != null">最高计息金额：{{ str.maxInterestMoney | currency('') }}元 </span><span v-if="str.interestDeadline != null"> 最高计息天数：{{ str.interestDeadline }}天</span></p>
                    </div>
                  </el-radio>
                </div>
              </div>
              <div class="coupons-btn">
                <p class="sure" @click="sureCoupon">确定</p>
                <p class="cancel" @click.stop="isDown">取消</p>
              </div>
            </div>
          </div>
          <p class="usedCoupon" v-show="showUsedCoupon">已使用{{ usedCouponText }}券</p>
        </div>
      </div>
      <div class="checkboxes">
        <el-checkbox v-model="checked.one">我同意<a :href="baseUrl + '/hetong/shengxinbaolhfuwuxieyi'" target="_blank">《 升薪宝量化服务协议 》</a></el-checkbox>
        <br>
        <el-checkbox v-model="checked.two">我同意<a :href="baseUrl + '/hetong/weituoautoshouquanshu'" target="_blank">《 委托系统自动出借及债权转让授权书 》</a></el-checkbox>
      </div>
      <button class="btn-join" :class="{ 'btn-join-default': checked.one && checked.two }">一键加入</button>
    </hth-panel>
  </div>
</template>

<script>
  import { fetchGetOneKeyJoinInfo, userCouponList } from 'api/home/investment-quantify';
  import { getLocationUrl } from 'utils/index';
  import HthPanel from 'common/Panel/index.vue';

  export default {
    components: {
      HthPanel
    },
    data() {
      return {
        checked: {
          one: true,
          two: true
        },
        radio: 0,
        baseUrl: getLocationUrl(),
        show: true,
        coupons: false,
        userMoney: '',
        listQuery: {
          planId: this.$route.params.id
        },
        oneKeyJoinInfo: {
          canJoinMoney: 0, // 可加入金额
          startInvestMoney: 0, // 起投金额
          incrMoney: 10, // 递增金额
          balance: 0 // 用户余额
        },
        couponsList: [],
        typeList: [
          { key: 'cash', value: '元现金' },
          { key: 'lijin', value: '元礼金' },
          { key: 'plus_coupon', value: '%加息' }
        ],
        showUsedCoupon: false,
        usedCouponText: ''
      }
    },
    computed: {
      // 及时可加入金额
      joinMoney() {
        const money = Math.min(this.oneKeyJoinInfo.canJoinMoney, this.oneKeyJoinInfo.balance);
        const joinMoney = Math.floor(money / this.oneKeyJoinInfo.incrMoney) * this.oneKeyJoinInfo.incrMoney;
        this.userMoney = joinMoney;
        return joinMoney;
      }
    },
    methods: {
      isShow() {
        this.show = false;
      },
      isUp() {
        this.coupons = true;
      },
      chooseCoupons(value) {
        if (!this.userMoney) {
          return false;
        } else {
          if (this.userMoney > value) {
            return true;
          } else {
            return false;
          }
        }
      },
      isDown() {
        this.coupons = false;
      },
      // 获取一键加入所需信息
      getOneKeyJoinInfo() {
        fetchGetOneKeyJoinInfo(this.listQuery)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.messageList = response.data.data;
              this.oneKeyJoinInfo = response.data.data;
            } else {
              console.log('信息获取失败');
            }
          })
      },
      getCouponsList(id) {
        userCouponList(id).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.couponsList = data.data;
          }
        })
      },
      sureCoupon() {
        if (this.radio !== 0) {
          let obj = '';
          this.couponsList.userCouponInfos.forEach(v => {
            if (v.userCouponId === this.radio) {
              obj = v;
            }
          });
          if (obj) {
            this.usedCouponText = document.getElementById(this.radio).innerHTML;
            this.showUsedCoupon = true;
            this.coupons = false;
          }
        }
      }
    },
    created() {
      this.getOneKeyJoinInfo();
      this.getCouponsList(this.$route.params.id)
    }
  }
</script>

<style lang="scss">
  .oneKeyJoin {
    .checkboxes {
      padding-left: 40px;

      p {
        margin-bottom: 15px;
        font-size: 14px;
        color: #727e90;
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
      float: right;
      position: static;
      margin-top: -90px;
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
      font-size: 25px;
      margin-left: 30px;
      color: #0573f4;
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
        background: url(../../../../assets/images/home/icon-quan.png) no-repeat center;
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
      background: url(../../../../assets/images/home/icon-arrow-red.png) no-repeat center;
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
