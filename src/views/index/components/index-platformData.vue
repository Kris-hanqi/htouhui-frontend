<template>
  <div class="platformData">
    <div class="platformData-img">
      <img src="../../../assets/images/index/icon-platform.png" alt=""/>
    </div>
    <div class="platformData-title">
      <p>安心投资</p>
      <p class="txt">更多信息尽在<a href="#">信息披露</a></p>
    </div>
    <div class="platformData-message">
      <p>平台累计成交额</p>
      <p><span class="roboto-regular">{{ platform.allInvestSum }}</span>元</p>
    </div>
    <div class="platformData-message">
      <p>用户累计收益</p>
      <p><span class="roboto-regular">{{ platform.allUserInterestSum }}</span>元</p>
    </div>
    <div class="platformData-message">
      <p>平台用户</p>
      <p><span class="roboto-regular">{{ platform.userCount }}</span>元</p>
    </div>
  </div>
</template>

<script>
  import { platform } from '@/api';

  export default {
    name: 'platformData',
    data() {
      return {
        platform: {}
      }
    },
    methods: {
      platformList() {
        platform().then(data => {
          this.platform = data.data.data;
        })
      }
    },
    created() {
      this.platformList();
    }
  }
</script>

<style lang="scss" scoped>
  .platformData {
    width: 100%;
    height: 135px;
    box-sizing: border-box;
    margin: 0 auto;
    margin-bottom: 35px;
    background-color: #fff;
    padding: 15px 20px;

    .platformData-img {
      display: inline-block;
      width: 130px;
      height: 100px;

      img {
        width: 100%;
      }
    }

    .platformData-title {
      display: inline-block;
      vertical-align: top;
      width: 140px;
      margin-top: 22px;
      text-align: center;

      p {
        font-size: 24px;
        color: #394b67;
      }

      .txt {
        font-size: 14px;
        font-weight: 300;
        color: #4a4a4a;
        margin-top: 15px;

        a {
          color: #4990e2;
        }
      }
    }

    .platformData-message {
      display: inline-block;
      vertical-align: top;
      margin-left: 50px;
      margin-top: 15px;

      p {
        font-size: 14px;
        line-height: 2.57;
        color: #727e90;

        span {
          font-size: 28px;
          line-height: 1.29;
          color: #ff4a33;
        }
      }
    }
  }
</style>
