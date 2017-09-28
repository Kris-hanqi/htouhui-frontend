<template>
  <div class="shengxinbao-lianghua-box">
    <div class="shengxinbao-lianghua-title">
      <span class="title1">升薪宝量化</span>
      <span class="title2">分散投资    收益复投    灵活退出</span>
      <a class="seeMoreShengxinbaoLianghua" href="#">查看更多 <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i></a>
    </div>
    <div class="shengxinbao-lianghua" v-for="str in shengxinbaoLianghuaList" v-bind:class="{ shengxinbaoLianghuaKongzhong: str.purpose == 'kongzhong_activity'}" :key="str.index">
      <i class="icon-img"></i>
      <div class="shengxinbao-lianghua-title">{{ str.planName }}</div>
      <div class="shengxinbao-lianghua-rate-box">
        <p class="shengxinbao-lianghua-rate">
          <span class="rate-big">{{ str.minRate.substring(0, str.minRate.indexOf('.')) }}</span><span class="rate-small">{{ str.minRate.substring(str.minRate.indexOf('.')) }}</span>%
          <span class="rate-big">~{{ str.maxRate.substring(0, str.maxRate.indexOf('.')) }}</span><span class="rate-small">{{ str.maxRate.substring(str.maxRate.indexOf('.')) }}</span>%
        </p>
        <p>往期年化利率</p>
      </div>
      <div class="shengxinbao-liangehua-message">
        <el-tooltip class="tiexi-message item" v-if="str.lockPeriod != 0" effect="dark" :content="啊啊啊啊啊" placement="bottom">
          <el-button>首<span class="roboto-regular">{{ str.lockPeriod }}</span>天贴息</el-button>
        </el-tooltip>
        <div><span class="roboto-regular">1000</span>元起投</div>
        <div>随时可退</div>
        <div><p>满<span class="roboto-regular">{{ str.freeManualFeePeriod }}</span>天免手续费</p></div>
      </div>
      <a class="shengxinbao-lianghua-join" href="">立即加入</a>
    </div>
  </div>
</template>

<script>
  import { shengxinbao_lianghua } from '@/api';

  export default {
    name: 'shengxinbaoLianghua',
    data() {
      return {
        shengxinbaoLianghuaList: []
      }
    },
    methods: {
      shengxinbao_lianghua_list() {
        shengxinbao_lianghua().then(data => {
          console.log(data);
          for (let i = 0; i < data.data.data.quantizations.length; i++) {
            this.shengxinbaoLianghuaList.push(data.data.data.quantizations[i]);
          }
        })
      }
    },
    created() {
      this.shengxinbao_lianghua_list();
    }
  }
</script>

<style lang="scss" scoped>
  .shengxinbao-lianghua-box {
    position: relative;
    width: 100%;
    height: 403px;
    box-sizing: border-box;
    margin-bottom: 35px;

    .shengxinbao-lianghua-title {
      width: 100%;
      margin-bottom: 20px;

      .title1 {
        margin-right: 10px;
        font-size: 20px;
        color: #394b67;
      }

      .title2 {
        font-size: 14px;
        color: #7c86a2;
      }

      .seeMoreShengxinbaoLianghua {
        float: right;
        font-size: 14px;
        font-weight: 300;
        color: #727e90;

        i {
          vertical-align: -4%;
        }

        &:hover {
          color: #0671f0;
        }
      }
    }

    .shengxinbao-lianghua:nth-child(1) {
      left: 0;
    }

    .shengxinbao-lianghua:nth-child(2) {
      left: 338px;
    }

    .shengxinbao-lianghua:nth-child(3) {
      right: 0;
    }
  }

  .shengxinbao-lianghua {
    position: absolute;
    bottom: 0;
    width: 325px;
    height: 360px;
    box-sizing: border-box;
    padding: 25px 20px;
    background-color: #fff;
    border-top: 3px solid #0671f0;
    transition: 0.3s;

    &:hover {
      bottom: 4px;
      box-shadow: 0 2px 10px 0 #bfc1c4;
    }

    .icon-img {
      display: inline-block;
      position: absolute;
      top: -3px;
      right: 10px;
      width: 42px;
      height: 54px;
      background: url(../../assets/images/index/icon-zhiNeng.png) no-repeat center;
    }

    .shengxinbao-lianghua-title {
      width: 100%;
      text-align: center;
      font-size: 20px;
      color: #394b67;
      margin-bottom: 55px;
    }

    .shengxinbao-lianghua-rate-box {
      width: 100%;
      margin-bottom: 40px;
      text-align: center;

      p {
        font-size: 14px;
        color: #727e90;
      }

      .shengxinbao-lianghua-rate {
        font-size: 20px;
        color: #ff4a33;

        .rate-big {
          font-family: 'Roboto-Regular';
          font-size: 36px;
        }

        .rate-small {
          font-family: 'Roboto-Regular';
          font-size: 24px;
        }
      }
    }

    .shengxinbao-liangehua-message {
      width: 100%;
      margin-bottom: 15px;
      text-align: center;

      > div {
        display: inline-block;
        box-sizing: border-box;
        border-radius: 41px;
        background-color: #fff;
        border: solid 1px #d0dae5;
        padding: 3px 5px;
        margin-right: 5px;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 300;
        color: #7c86a2;
        cursor: default;
      }

      .tiexi-message {
        display: inline-block;
        box-sizing: border-box;
        border-radius: 41px;
        background-color: #fff;
        border: solid 1px #3d92f7;
        padding: 3px 5px;
        margin-right: 5px;
        font-family: "SourceHanSansCN-normal";
        font-size: 14px;
        font-weight: 300;
        color: #4296f7;

        &:hover {
          background-color: rgba(5, 114, 244, 0.75);
          box-shadow: 0 5px 7px 0 #d5e7fe;
          color: #fff;
        }
      }
    }

    .shengxinbao-lianghua-join {
      display: block;
      width: 230px;
      height: 45px;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 41px;
      border: solid 1px #0573f4;
      line-height: 45px;
      text-align: center;
      font-size: 18px;
      color: #0671f0;

      &:hover {
        border: none;
        color: #fff;
        background-color: #378ff6;
      }
    }
  }

  .shengxinbaoLianghuaKongzhong {
    background: url(../../assets/images/index/tank-bg.png) no-repeat center;

    .icon-img {
      background: url(../../assets/images/index/icon-active.png) no-repeat center;
    }
  }
</style>
