<template>
  <div class="media-report">
    <div class="title">
      <span>媒体报道</span>
      <a href="#" class="seaMoreMedia">查看更多 <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i></a>
    </div>
    <div class="media-box">
      <div class="media-headNews">
        <img class="headNews-img" src="" alt=""/>
        <div class="headNews-txt">
          <p class="headNews-title"></p>
          <p class="headNews-message"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { media_report } from '@/api';

  export default {
    name: 'MediaReport',
    data() {
      return {
        mediaList: [],
        mediaHeadNews: {}
      }
    },
    methods: {
      getMediaList() {
        media_report().then(data => {
          console.log(data);
          for (let i = 0; i < data.data.data.indexNews.length; i++) {
            this.mediaList.push(data.data.data.indexNews[i]);
          }
          this.mediaHeadNews = data.data.data.headNews;
        })
      }
    },
    created() {
      this.getMediaList()
    }
  }
</script>

<style lang="scss" scoped>
  .media-report {
    display: inline-block;
    width: 510px;
    height: 315px;
    padding: 15px;
    margin-right: 14px;
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
  }

  .media-box {
    width: 100%;

    .media-headNews {
      height: 128px;

      .headNews-img {
        display: inline-block;
        width: 205px;
        height: 128px;
        margin-right: 10px;
        object-fit: contain;
      }

      .headNews-txt {
        display: inline-block;

        .headNews-title {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.31;
          color: #394b67;
        }

        .headNews-message {
          height: 60px;
          font-size: 12px;
          line-height: 1.67;
          color: #727e90;
        }
      }
    }
  }
</style>
