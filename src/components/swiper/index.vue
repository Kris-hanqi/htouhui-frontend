<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="str in bannerList" :style="{ backgroundImage: 'url(' + str.imgUrl + ')' }"></div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import as from 'axios';
  import VueAs from '../../utils/plugin';
  import { setVue } from '../../utils/fetch';
  import { banners } from '../../api';
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  Vue.use(VueAs, as);

  setVue(Vue);

  export default {
    name: 'HthBanner',
    computed: {
      bannerList: () => banners().then(data => {
        const listImg = [];
        for (let i = 0; i < data.data.data.bannerList.length; i++) {
          listImg.push(data.data.data.bannerList[i]);
        }
        console.log(listImg);
        return listImg;
      })
    },
    mounted() {
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
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
    background-color: #1c8de0;
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
    .swiper-pagination-bullet {
      width:0.833rem;
      height: 0.833rem;
      display: inline-block;
      background: #7c5e53;
    }
  }
</style>
