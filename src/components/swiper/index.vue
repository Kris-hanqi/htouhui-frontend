<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="str in bannerList" :key="str.index" @click.native="getUrl(str.targetUrl)" :style="{ backgroundImage: 'url(' + str.imgUrl + ')' }"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <div class="land-box">
      <div class="land">
        <p class="land-title">往期年化利率</p>
        <p class="land-rate roboto-regular">8<span>%</span>-12<span>%</span></p>
        <a class="land-button" href="">注册领<span class="roboto-regular">300</span>元红包</a>
        <a class="land-has-account" href="">已有账号登录</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { banners } from '@/api';

  export default {
    name: 'HthBanner',
    data() {
      return {
        defaultBanner: '',
        bannerList: [],
        swiperOption: {
          initialSlide: 1,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplayDisableOnInteraction: false,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          loop: true,
          speed: 600,
          autoplay: 5000,
          observer: true,
          observeParents: true
        }
      }
    },
    methods: {
      getBannerList() {
        banners().then(data => {
          for (let i = 0; i < data.data.data.bannerList.length; i++) {
            this.bannerList.push(data.data.data.bannerList[i]);
          }
        })
      },
      getUrl(item) {
        window.open(item);
      }
    },
    created() {
      this.getBannerList();
    }
  }
</script>

<style lang="scss" scoped>
  .banner{
    position: relative;

    .swiper-container {
      width: 100%;
      height: 362px;

      .swiper-wrapper {
        width: 100%;
        height: 100%;
      }

      .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .swiper-button-prev {
        background-image: url(../../../static/images/button-prev.png);
        background-size: 100% 100%;
        width: 45px;
        height: 95px;
        left: 50%;
        margin-left: -555px;
        margin-top: -45px;
      }

      .swiper-button-next {
        background-image: url(../../../static/images/button-next.png);
        background-size: 100% 100%;
        width: 45px;
        height: 95px;
        right: 50%;
        margin-right: -555px;
        margin-top: -45px;
      }

      .swiper-pagination-bullet {
        background: #7c5e53;
      }

      .swiper-pagination-bullet-active {
        background: #2875d9;
      }
    }

    .land-box {
      width: 1000px;
      height: auto;
      margin: 0 auto;
      position: relative;
      top: -360px;

      .land {
        width: 270px;
        height: 270px;
        position: absolute;
        z-index: 2;
        top: 45px;
        right: 0;
        font-size: 14px;
        background-color: rgba(0,0,0,0.4);
        text-align: center;
        color: #fff;

        .land-title {
          padding-top: 23px;
          padding-left: 32px;
          line-height: 50px;
          font-weight: bold;
          font-size: 18px;
          text-align: left;
        }

        .land-rate {
          font-size: 50px;
          color: #ffda1a;
          margin-bottom: 15px;

          span {
            font-size: 23px;
          }
        }

        .land-button {
          display: block;
          width: 236px;
          height: 40px;
          margin: 0 auto;
          line-height: 40px;
          font-size: 20px;
          background: #ee5544;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;

          &:hover {
            background: #ff5544;
          }
        }

        .land-has-account {
          display: block;
          font-size: 14px;
          text-align: right;
          line-height: 42px;
          padding-right: 40px;
          text-decoration: underline;
          font-weight: bold;

          &:hover {
            text-decoration: none;
            color: #ee5544;
          }
        }
      }
    }
  }

</style>
