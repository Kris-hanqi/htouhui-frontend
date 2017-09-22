<template>
  <div class="media-report">
    <div class="title">
      <span>媒体报道</span>
      <a href="#" class="seaMoreMedia">查看更多 <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i></a>
    </div>
    <div class="media-box">
      <a class="media-headNews" :href="mediaHeadNews.targetUrl">
        <img class="headNews-img" :src="mediaHeadNews.picUrl" alt=""/>
        <div class="headNews-txt">
          <p class="headNews-title">{{ mediaHeadNews.title }}</p>
          <p class="headNews-message">{{ mediaHeadNews.content }}</p>
        </div>
      </a>
      <a v-for="str in mediaList" :href="str.targetUrl" class="media-indexNews">
        <p class="indexNews-title">{{ str.title }}</p>
        <span class="indexNews-time roboto-regular">{{ str.createTime }}</span>
      </a>
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
    width: 505px;
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
  }

  .media-box {
    width: 100%;

    .media-headNews {
      display: block;
      height: 128px;
      margin-bottom: 20px;

      &:hover .headNews-txt .headNews-title {
        color: #0573f4;
      }

      .headNews-img {
        display: inline-block;
        width: 205px;
        height: 128px;
        margin-right: 5px;
        object-fit: contain;
      }

      .headNews-txt {
        display: inline-block;
        vertical-align: bottom;
        width: 260px;
        height: 128px;

        .headNews-title {
          margin-bottom: 15px;
          font-size: 16px;
          font-weight: 300;
          line-height: 1.31;
          color: #394b67;
        }

        .headNews-message {
          text-align: justify;
          height: 60px;
          font-size: 12px;
          line-height: 1.67;
          color: #727e90;
        }
      }
    }

    .media-indexNews {
      display: block;
      width: 100%;
      margin-bottom: 8px;
      color: #798596;

      &:hover .indexNews-title {
        color: #0573f4;
      }

      .indexNews-title {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 290px;
        white-space: nowrap;
        font-size: 14px;
        font-weight: 300;
      }

      .indexNews-time {
        float: right;
        font-size: 14px;
        font-weight: 300;
        color: #798596;
      }
    }
  }
</style>
