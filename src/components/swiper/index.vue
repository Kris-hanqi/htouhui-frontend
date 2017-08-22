<!--<template>-->
  <!--<div class="swiper-container">-->
    <!--<div class="swiper-wrapper">-->
      <!--<div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }"></div>-->
    <!--</div>-->
    <!--<div class="swiper-pagination swiper-pagination-white"></div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--//  import Swiper from 'swiper';-->
<!--//  import 'swiper/dist/css/swiper.min.css';-->
  <!--export default {-->
    <!--name: 'HthBanner',-->
    <!--data: {-->
      <!--listImg: []-->
    <!--},-->
    <!--mounted() {-->
      <!--this.$ajax({-->
        <!--url: 'http://192.168.1.196:21000/web-api/bannerList/index',-->
        <!--method: 'get'-->
      <!--})-->
      <!--.then(data => {-->
        <!--console.log(data);-->
        <!--this.listImg = data.bannerList.imgUrl-->
      <!--})-->

<!--//      new Swiper('.swiper-container', {-->
<!--//        pagination: '.swiper-pagination',-->
<!--//        paginationClickable: true,-->
<!--//        loop: true,-->
<!--//        speed: 600,-->
<!--//        autoplay: 4000-->
<!--//      });-->
    <!--}-->
  <!--}-->
<!--</script>-->

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
    .swiper-pagination-bullet {
      width:0.833rem;
      height: 0.833rem;
      display: inline-block;
      background: #7c5e53;
    }
  }
</style>
