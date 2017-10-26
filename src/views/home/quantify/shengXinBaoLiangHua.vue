<template>
  <div>
    <div class="shengxinbaolianghua">
      <div class="title-box">
        <span class="title">升薪宝量化某某</span>
        <p class="firstDay">首30天贴息</p>
        <p>随时可退</p>
        <p>满某某天免手续费</p>
        <a href="#" class="tradingParticulars"><i></i>交易详情</a>
      </div>
      <div class="shengxinbaolianghua-main">
        <div class="shengxinbaolianghua-rate">
          <p class="rate">
            <span class="roboto-regular">12</span><span class="small-shengxinbaolianghua-rate roboto-regular">.0</span>% ~
            <span class="roboto-regular">12</span><span class="small-shengxinbaolianghua-rate roboto-regular">.0</span>%
          </p>
          <p>往期年化利率</p>
        </div>
        <div class="shengxinbaolianghua-money">
          <p class="money"><span class="roboto-regular">100</span>元</p>
          <p>起投金额</p>
        </div>
        <div class="shengxinbaolianghua-money">
          <p class="money"><span class="roboto-regular">152.06</span>元</p>
          <p>当前剩余金额</p>
        </div>
        <router-link to="oneKeyJoin"><a class="shengxinbaolianghua-btn" href="#">一键加入</a></router-link>
      </div>
      <div class="shengxinbaolianghua-bottom">
        <p>在投金额（元）<span class="roboto-regular">209000</span></p>
        <p>累计收益（元）<span class="roboto-regular">307.51</span></p>
        <a href="#" class="seeBiao">查看标的</a>
      </div>
    </div>

    <!--退出金额-->
    <el-button type="text" @click="open4">退出金额弹框</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      open4() {
        const h = this.$createElement;
        this.$msgbox({
          title: '退出金额中',
          message: h('div', null, [
            h('div', { style: 'display: inline-block;text-align: center;margin-left: 70px;' }, [
              h('p', { style: 'color: #394b67;' }, [
                h('span', { style: 'font-size: 30px;' }, '900'),
                h('span', { style: 'font-size: 18px;' }, '元')
              ]),
              h('p', { style: 'color: #7c86a2;font-size: 16px;' }, '退出金额')
            ]),
            h('div', { style: 'display: inline-block;text-align: center;margin-left: 70px;' }, [
              h('p', { style: 'color: #394b67;' }, [
                h('span', { style: 'font-size: 30px;' }, '18.00'),
                h('span', { style: 'font-size: 18px;' }, '元')
              ]),
              h('p', { style: 'color: #7c86a2;font-size: 16px;' }, '退出手续费')
            ]),
            h('div', { style: 'margin-top: 35px;color: #ff4a33;text-align: center;font-size: 18px;' }, [
              h('p', null, '圣上！不要退出！'),
              h('p', null, [
                h('span', null, '放在里面可以继续'),
                h('span', { style: 'font-size: 30px;' }, '钱滚钱'),
                h('span', null, '啊！')
              ])
            ])
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .shengxinbaolianghua {
    width: 100%;
    height: auto;
    box-sizing: border-box;
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

    p {
      display: inline-block;
      margin-right: 8px;
      border: solid 1px #cdd8e3;
      padding: 7px 17px;
      border-radius: 41px;
      background-color: #fff;
      font-size: 14px;
      color: #727e90;
    }

    .firstDay {
      border: solid 1px #2281f2;
      color: #0e76f1;
    }

    .tradingParticulars {
      float: right;
      font-size: 14px;
      color: #727e90;

      i {
        display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 30px;
        margin-right: 5px;
        background: url(../../../assets/images/home/center-ico-019.png) no-repeat center;
      }
    }
  }

  .shengxinbaolianghua-main {
    width: 100%;
    text-align: center;
    margin-bottom: 45px;

    > div {
      display: inline-block;
      width: 23%;

      p {
        font-size: 14px;
        color: #727e90;
      }
    }

    .shengxinbaolianghua-rate {
      .rate {
        font-size: 18px;
        color: #ff4a33;

        span {
          font-size: 36px;
        }

        .small-shengxinbaolianghua-rate {
          font-size: 20px;
        }
      }
    }

    .shengxinbaolianghua-money {
      .money {
        font-size: 20px;
        font-weight: 300;
        color: #394b67;

        span {
          font-size: 36px;
        }
      }
    }

    .shengxinbaolianghua-btn {
      float: right;
      vertical-align: top;
      width: 122px;
      height: 34px;
      margin-top: 15px;
      border-radius: 41px;
      border: solid 1px #0573f4;
      line-height: 34px;
      text-align: center;
      font-size: 18px;
      font-weight: 300;
      color: #0573f4;

      &:hover {
        background-color: #378ff6;
        color: #fff;
      }
    }
  }

  .shengxinbaolianghua-bottom {
    width: 100%;
    height: auto;
    padding-top: 20px;
    border-top: 1px solid #dde8f3;

    p {
      display: inline-block;
      font-size: 14px;
      font-weight: 300;
      color: #727e90;
      margin-right: 80px;

      span {
        font-size: 20px;
        color: #394b67;
      }
    }

    .seeBiao {
      float: right;
      width: 125px;
      font-size: 14px;
      text-align: center;
      font-weight: 300;
      color: #0671f0;
    }
  }
</style>
