<template>
  <div class="pullOut">
    <p class="title">升薪宝量化xxx申请退出</p>
    <div class="canPullMoney">
      <p class="inTimeLimitMoney">锁定期内可退金额<span class="roboto-regular">1000,00</span><span>元</span></p>
      <p class="outTimeLimitMoney">锁定期外可退出金额<span class="roboto-regular">1000,00</span><span>元</span></p>
    </div>
    <div class="main">
      <span>申请退出</span>
      <input type="number" class="putOutMoney">
      <el-button type="text" @click="open4"><p class="btn-out">退出</p></el-button>
      <el-button type="text" @click="open4"><p class="btn-allOut">全部退出</p></el-button>
    </div>
    <div class="hint">
      <p class="hint-title">温馨提示</p>
      <div class="hint-txt">
        <p>1.申请退出后，T+3个工作日为您处理，实际到账时间取决于银行自动债权转让的速度；</p>
        <p>2.退出金额中属于锁定期内的金额，收取退出金额的 2%手续费，属于锁定期外的金额，免手续费，退出时系统将优先退出锁定期外金额。</p>
      </div>
    </div>
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
  .pullOut {
    width: 100%;
    height: 845px;
    box-sizing: border-box;
    padding: 20px 50px 25px 25px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    .title {
      margin-bottom: 50px;
      font-size: 20px;
      color: #274161;
    }

    .canPullMoney {
      margin-bottom: 30px;

      p {
        display: inline-block;
        font-size: 16px;
        color: #727e90;

        &:first-child {
          margin-right: 80px;
        }

        span {
          margin-left: 5px;
          font-size: 20px;
        }

        .roboto-regular {
          font-size: 30px;
        }
      }

      .inTimeLimitMoney .roboto-regular {
        color: #ff4a33;
      }
    }

    .main {
      padding-bottom: 70px;
      border-bottom: 1px dashed #aab2c9;
      margin-bottom: 2px;

      span {
        font-size: 16px;
        color: #727e90;
        margin-right: 10px;
      }

      .putOutMoney {
        width: 350px;
        height: 50px;
        box-sizing: border-box;
        background-color: #fff;
        border: solid 1px #bfc1c4;
        padding-left: 10px;
      }

      p {
        display: inline-block;
        width: 125px;
        height: 45px;
        box-sizing: border-box;
        border-radius: 100px;
        margin-left: 15px;
        line-height: 46px;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
      }

      .btn-out {
        background-color: #378ff6;
        border: 1px solid #378ff6;
        color: #fff;
      }

      .btn-allOut {
        background-color: #fff;
        border: solid 1px #979797;
        color: #9b9b9b;
      }
    }

    .hint {
      padding-top: 20px;
      border-top: 1px dashed #aab2c9;

      .hint-title {
        margin-bottom: 15px;
        font-size: 16px;
        color: #394b67;
      }

      .hint-txt {
        width: 688px;
        margin: 0 auto;

        p {
          font-size: 14px;
          line-height: 1.79;
          color: #727e90;
        }
      }
    }
  }
</style>
