<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="str in bannerList" :style="{ backgroundImage: 'url(' + str.imgUrl + ')' }"></div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  import { banners } from '@/api';
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    name: 'HthBanner',
    data() {
      return {
        defaultBanner: '',
        bannerList: []
      }
    },
    methods: {
      gstBannerList() {
        banners().then(data => {
          for (let i = 0; i < data.data.data.bannerList.length; i++) {
            this.bannerList.push(data.data.data.bannerList[i]);
          }
        })
      }
    },
    created() {
      this.gstBannerList();
    },
    mounted() {
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        loop: true,
        speed: 600,
        autoplay: 4000
      });
    }
  }
</script>

<style lang="scss" scoped>
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

      img {
        width: 100%;
        height: 100%;
      }
    }

    .swiper-button-prev{
      background-image: url(../../../static/images/button-prev.png);
      background-size: 100% 100%;
      width: 45px;
      height: 95px;
      margin-top: -45px;
    }

    .swiper-button-next{
      background-image: url(../../../static/images/button-next.png);
      background-size: 100% 100%;
      width: 45px;
      height: 95px;
      margin-top: -45px;
    }

    .swiper-pagination-bullet {
      width: 12px;
      height: 5px;
      border-radius: 0;
      display: inline-block;
      background: #7c5e53;
    }

    .swiper-pagination-white .swiper-pagination-bullet-active {
      background: #2875d9;
    }
  }
</style>
