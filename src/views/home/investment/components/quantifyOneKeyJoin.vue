<template>
  <!-- 升薪宝量化一键加入组件 -->
  <div class="oneKeyJoin">
    <hth-panel title="一键加入">
      <div class="main-1" v-if="operationalStatus === 'initial'">
        <p>可加入额<span class="roboto-regular">{{ joinMoney | currency('') }}</span>
          <span>元</span><i class="ku-icon icon-edit" @click="operationalStatus = 'update'"></i>
        </p>
      </div>
      <div class="main-2" v-else>
        <div class="use-money">
          <p class="main-2-p-1">起投金额：<span class="roboto-regular">{{ oneKeyJoinInfo.startInvestMoney | currency('') }}</span><span class="small-font">元</span></p>
          <p>您目前还可加入<span class="roboto-regular">{{ oneKeyJoinInfo.canJoinMoney | currency('') }}</span>元</p>
        </div>
        <input type="text" class="inputMoney" v-model.number="userMoney" :placeholder="'加入金额须为'+ oneKeyJoinInfo.incrMoney +'的整数倍'">
        <div class="canUseMoney">
          <p>可用余额<span class="roboto-regular">{{ oneKeyJoinInfo.balance | currency('') }}</span>元
           <el-button type="text" @click="goRecharge">充值</el-button>
          </p>
        </div>
        <div v-if="couponsList.count == 0" class="coupons-no">暂无优惠券</div>
        <div v-else class="coupons-box">
          <div class="coupons-icon" @click="operationalCouponsListView">
            <span style="padding-left: 10px">优惠券</span>
            <i class="ku-icon" :class="showCouponsList ? 'icon-bottom' : 'icon-top'"></i>
            <div class="coupons-content" v-show="showCouponsList">
              <i></i>
              <p class="title">可用券： 当前有<span class="roboto-regular">{{ couponsList.count }}</span>张可用的优惠券</p>
              <div class="noUse">
                <el-radio v-model="radio" :label="0" name="coupons">不使用优惠券</el-radio>
              </div>
              <div class="coupons-list">
                <div class="coupon" v-for="str in couponsList.userCouponInfos">
                  <el-radio :disabled="!chooseCoupons(str.lowerLimitMoney)" v-model="radio" :label="str.userCouponId" name="coupons">
                    <div class="coupon-img" :id="str.userCouponId">{{ str.type === 'plus_coupon' ? str.rate : str.money }}{{ str.type | keyToValue(typeList) }}</div>
                    <div class="coupon-message">
                      <p>满{{ str.lowerLimitMoney | currency('') }}元可用</p>
                      <p>
                        <span v-if="str.maxInterestMoney !== null">最高计息金额：{{ str.maxInterestMoney | currency('') }}元 </span>
                        <span v-if="str.interestDeadline !== null"> 最高计息天数：{{ str.interestDeadline }}天</span>
                      </p>
                      <p>使用范围：{{ str.limitScope }}</p>
                    </div>
                  </el-radio>
                </div>
              </div>
              <div class="coupons-btn">
                <el-button type="danger" size="mini" round @click.stop="sureCoupon">确定</el-button>
                <el-button @click.stop="operationalCouponsListView" size="mini" round>取消</el-button>
              </div>
            </div>`
          </div>
          <p class="usedCoupon" v-show="showUsedCoupon">已使用{{ usedCouponText }}券</p>
        </div>
      </div>
      <div class="checkboxes">
        <el-checkbox v-model="protocolList.one" class="checkbox-p">
          <span style="color: #727e90;">我同意</span>
          <a :href="baseUrl + '/hetong/shengxinbaolhfuwuxieyi'" target="_blank">《 升薪宝量化服务协议 》</a></el-checkbox>
        <br>
        <el-checkbox v-model="protocolList.two" class="checkbox-p">
          <span style="color: #727e90;">我同意</span>
          <a :href="baseUrl + '/hetong/weituoautoshouquanshu'" target="_blank">《 委托系统自动出借及债权转让授权书 》</a></el-checkbox>
      </div>
      <el-button class="btn-join"
                 type="primary"
                 @click="joinPlanOK"
                 :disabled="!protocolList.one || !protocolList.two"
                 plain>一键加入</el-button>
    </hth-panel>
    
    <!-- 一键加入二次确认 -->
    <el-dialog
      title="确认加入"
      :visible.sync="dialogVisible"
      width="500px">
      <h3 style="text-align: center;">加入金额: {{ userMoney }}</h3>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" round>取 消</el-button>
        <el-button  style="margin-left: 20px" :loading="joinBthLoading" type="primary" @click="joinPlan" round>确 定</el-button>
      </span>
    </el-dialog>
  
    <!-- 验证用户操作组件 -->
    <operational-validate ref="validateSteps"></operational-validate>
  </div>
</template>

<script>
  import { fetchGetOneKeyJoinInfo, userCouponList } from 'api/home/investment-quantify';
  import OperationalValidate from '../../components/OperationalValidate.vue';
  import { fetchJoinPlan } from 'api/home/investment';
  import { getLocationUrl } from 'utils/index';
  import HthPanel from 'common/Panel/index.vue';

  export default {
    components: {
      HthPanel,
      OperationalValidate
    },
    data() {
      return {
        planId: '',                   // 标的Id
        operationalStatus: 'initial', // 操作状态  -- 标记是否点击修改金额(initial: 初始，update: 修改)
        showCouponsList: false,       // 是否显示优惠券
        protocolList: {               // 协议数据
          one: true,
          two: true
        },
        joinBthLoading: false,
        radio: 0,                    // 优惠券ID
        baseUrl: getLocationUrl(),
        userMoney: '',
        listQuery: {
          planId: this.$route.params.id
        },
        oneKeyJoinInfo: {
          canJoinMoney: 0,     // 可加入金额
          startInvestMoney: 0, // 起投金额
          incrMoney: 10,       // 递增金额
          balance: 0           // 用户余额
        },
        joinPlanData: {
          planId: '',
          joinMoney: '',
          userCouponId: '',
          source: 'web'
        },
        couponsList: [],       // 优惠券List
        typeList: [
          { key: 'cash', value: '元现金' },
          { key: 'lijin', value: '元礼金' },
          { key: 'plus_coupon', value: '%加息' }
        ],
        showUsedCoupon: false,
        usedCouponText: '',
        dialogVisible: false
      }
    },
    computed: {
      // 计算加入金额
      joinMoney() {
        const money = Math.min(this.oneKeyJoinInfo.canJoinMoney, this.oneKeyJoinInfo.balance);
        const joinMoney = Math.floor(money / this.oneKeyJoinInfo.incrMoney) * this.oneKeyJoinInfo.incrMoney;
        this.userMoney = joinMoney;
        return joinMoney;
      }
    },
    methods: {
      operationalCouponsListView() {
        this.showCouponsList = !this.showCouponsList;
      },
      toggleOperationalStatus() {
        this.operationalStatus = 'update'
      },
      chooseCoupons(value) {
        if (!this.userMoney) {
          return false;
        }
        if (this.userMoney >= value) {
          return true;
        } else {
          return false;
        }
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
      // 加入标的
      joinPlanOK() {
        const validateSteps = ['openAccount', 'transactionPassword', 'bankCard', 'automaticTender', 'automaticDebtTransfer'];
        const result = this.$refs['validateSteps'].validate(validateSteps); // eslint-disable-line
        if (!result) return;
        if (!this.userMoney) {
          this.$message({
            message: '可加入金额为0,不能加入！',
            type: 'error'
          });
          return;
        }
        // 加入金额不能大于账户余额以及还可加入金额
        if (this.userMoney > this.oneKeyJoinInfo.canJoinMoney) {
          this.$message({
            message: '加入金额不能大于可加入金额',
            type: 'error'
          });
          return;
        }
        // 加入金额不能大于账户余额以及还可加入金额
        if (this.userMoney > this.oneKeyJoinInfo.balance) {
          this.$message({
            message: '账户余额不足，请充值',
            type: 'error'
          });
          return;
        }
        // 判断优惠券逻辑
        if (this.radio !== 0) {
          if (this.couponsList.userCouponInfos && this.couponsList.userCouponInfos.length) {
            let coupon = null;
            this.couponsList.userCouponInfos.forEach(v => {
              if (this.radio === v.userCouponId) {
                coupon = v;
              }
            });
            if (coupon.lowerLimitMoney > this.userMoney) {
              this.$message({
                message: '加入金额与选择的优惠券不匹配',
                type: 'waring'
              });
              return;
            } else {
              this.joinPlanData.userCouponId = this.radio;
            }
          }
        }
        // 检验通过 二次确认
        this.dialogVisible = true;
      },
      joinPlan() {
        this.joinBthLoading = true;
        this.joinPlanData.planId = this.planId;
        this.joinPlanData.joinMoney = this.userMoney;
        fetchJoinPlan(this.joinPlanData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$message({
                message: '加入成功',
                type: 'success'
              });
              // 跳转加入记录页面
              this.$router.push('/investment/quantify/transactionRecord/' + this.planId);
            }
            if (response.data.meta.code === 9999) {
              this.$message({
                message: response.data.meta.message,
                type: 'error'
              });
            }
            this.joinBthLoading = false;
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
          }
        } else {
          this.showUsedCoupon = false;
        }
        this.operationalCouponsListView();
      },
      goRecharge() {
        this.$router.push({ path: '/account/recharge', query: { type: 'oneKeyJoin', id: this.planId } });
      }
    },
    created() {
      this.planId = this.$route.params.id;
      this.getOneKeyJoinInfo();
      this.getCouponsList(this.planId)
    }
  }
</script>

<style lang="scss">
  .oneKeyJoin {
    position: relative;

    .checkboxes {
      padding-left: 40px;

      .checkbox-p {
        margin-bottom: 15px;
        font-size: 14px;
        color: #727e90 !important;

        a {
          color: rgb(64, 158, 255);
        }
      }
    }

    .btn-join {
      position: absolute;
      top: 140px;
      right: 50px;
      width: 170px;
      height: 50px;
      box-sizing: border-box;
      border-radius: 40px;
      background-color: #fff;
      border: solid 1px #409eff;
      padding: 0;
      font-size: 18px;
      text-align: center;
      line-height: 50px;
    }
  }

  .oneKeyJoin .main-1 {
    width: 100%;
    box-sizing: border-box;
    padding-left: 40px;
    margin-bottom: 20px;

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

    .coupons-no {
      display: inline-block;
      border: 1px solid #aaa;
      padding: 0 10px;
      color: #aaa;
      cursor: pointer;
    }

    .coupons-box {
      display: flex;

      .coupons-icon {
        display: inline-block;
        position: relative;
        z-index: 40;
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
        width: auto;
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
    width: 420px;
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
        vertical-align: middle;
        margin-top: 5px;
        margin-left: 25px;
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
