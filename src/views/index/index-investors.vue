<template>
  <div class="investors">
    <div class="title">
      <span>投资人风采</span>
      <a href="#" class="seaMoreMedia">查看更多 <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i></a>
    </div>
    <div class="investors-message">
      <swiper :options="swiperOption">
        <swiper-slide class="investors-box" v-for="str in investorSaid" :key="str.index">
          <div class="investors-img">
            <img :src="str.headPicUrl" alt=""/>
            <p class="investors-name">{{ str.nickName }}</p>
            <p class="investors-job">{{ str.work }}</p>
          </div>
          <div class="investors-txt">
            <p>{{ str.leaveMsg }}</p>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { investors } from '@/api';

  export default {
    name: 'Investors',
    data() {
      return {
        investorSaid: [],
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
      getInvestorsList() {
        investors().then(data => {
          console.log(data);
          for (let i = 0; i < data.data.data.investorSaid.length; i++) {
            this.investorSaid.push(data.data.data.investorSaid[i]);
          }
        })
      }
    },
    created() {
      this.getInvestorsList();
    }
  }
</script>

<style lang="scss" scoped>
  .investors {
    float: right;
    display: inline-block;
    width: 475px;
    height: 325px;
    box-sizing: border-box;
    padding: 15px;
    background-color: #fff;

    .title {
      width: 100%;
      height: 20px;
      margin-bottom: 25px;
      line-height: 20px;

      span {
        font-size: 18px;
        color: #394b67;
      }

      .seaMoreMedia {
        display: inline-block;
        float: right;
        font-size: 14px;
        font-weight: 300;
        color: #727e90;

        i {
          vertical-align: -4%;
        }
      }
    }

    .investors-message {
      position: relative;
      width: 100%;
      min-height: 220px;

      .swiper-wrapper {
        width: 100%;
        height: 100%;
      }

      .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
      }
    }
  }

  .investors-box {
    width: 90%;
    margin: 0 auto;

    .investors-img {
      display: inline-block;
      width: 95px;

      img {
        width: 95px;
        height: 95px;
      }
    }
  }
</style>
