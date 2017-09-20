<template>
  <!-- 网站首页 -->
  <div class="main">
    <!--广告轮播-->
    <hth-banner></hth-banner>
    <!--平台公告-->
    <div class="notice">
      <div class="notice-top"></div>
      <div class="notice-down">
        <a class="notice-box" href="#">
          <div class="notice-icon notice-icon1"></div>
          <div class="txt-box">
            <p class="txt">稳健运营</p>
            <p>完善的业务闭环，</p>
            <p>历史100%兑付</p>
          </div>
        </a>
        <a class="notice-box" href="#">
          <div class="notice-icon notice-icon2"></div>
          <div class="txt-box">
            <p class="txt">江西银行资金存管</p>
            <p>平台与用户资金分离，</p>
            <p>借贷双方交易信息安全</p>
          </div>
        </a>
        <a class="notice-box" href="#">
          <div class="notice-icon notice-icon3"></div>
          <div class="txt-box">
            <p class="txt">Pre-A轮融资</p>
            <p>获战略投资方，</p>
            <p>五星资本Pre-A轮融资</p>
          </div>
        </a>
        <a class="notice-box" href="#">
          <div class="notice-icon notice-icon4"></div>
          <div class="txt-box">
            <p class="txt">多重风控保障</p>
            <p>多级风控审核，</p>
            <p>抵押信息真实透明</p>
          </div>
        </a>
      </div>
    </div>
  </div>

</template>

<script>
  import HthBanner from 'components/swiper';
  export default {
    components: {
      HthBanner
    }
  };
</script>

<style lang="scss" scoped>
  .main {
    height: 800px;
  }

  .notice {
    width: 100%;
    height: 190px;
    background-color: #fff;
  }

  .notice-top {
    height: 55px;
  }

  .notice-down {
    width: 1000px;
    height: 135px;
    box-sizing: border-box;
    margin: 0 auto;
    border-top: 1px solid #efefef;
  }

  .notice-box {
    display: inline-block;
    width: 245px;
    margin-top: 35px;

    .notice-icon {
      display: inline-block;
      margin-right: 13px;
      background-image: url(../../assets/images/index/icon-group.png);
      background-repeat: no-repeat;
    }

    .notice-icon1 {
      width: 65px;
      height: 53px;
      background-position: 0 0;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-position: 0 -53px;
      }
    }

    .notice-icon2 {
      width: 57px;
      height: 54px;
      background-position: -65px 0;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-position: -65px -54px;
      }
    }

    .notice-icon3 {
      width: 58px;
      height: 54px;
      background-position: -123px 0;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-position: -123px -55px;
      }
    }

    .notice-icon4 {
      width: 48px;
      height: 53px;
      background-position: -182px 0;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-position: -182px -55px;
      }
    }

    .txt-box {
      display: inline-block;

      p {
        font-size: 14px;
        font-weight: 300;
        line-height: 1.07;
        color: #727e90;
      }

      .txt {
        font-size: 20px;
        color: #394b67;
        margin-bottom: 10px;
      }
    }
  }
</style>
