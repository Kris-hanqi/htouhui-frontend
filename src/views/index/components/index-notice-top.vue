<template>
  <div class="notice-top-box">
    <div class="notice-notice">
      <i class="icon-sound"></i>
      <span>最新公告</span>
      <p v-for="str in noticeList" :key="str.index" @click.native="getNoticeUrl(str.targetUrl)">
        [<span class="notice-time roboto-regular">{{ str.createTime }}</span>]
        <span class="notice-message">{{ str.title }}</span>
      </p>
      <a href="#" class="seeMoreNotice">查看更多 <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i></a>
    </div>
    <p class="notice-hintMessage">市场有风险，投资需谨慎</p>
  </div>
</template>

<script>
  import { notice } from '@/api';

  export default {
    name: 'NoticeTopBox',
    data() {
      return {
        noticeList: []
      }
    },
    methods: {
      getNoticeList() {
        notice().then(data => {
          for (let i = 0; i < data.data.data.plateformNotice.length; i++) {
            this.noticeList.push(data.data.data.plateformNotice[i]);
          }
        })
      },
      getNoticeUrl(item) {
        window.open(item);
      }
    },
    created() {
      this.getNoticeList();
    }
  }
</script>

<style lang="scss" scoped>
  .notice-top-box {
    width: 1000px;
    margin: 0 auto;

    .notice-hintMessage {
      float: right;
      font-size: 14px;
      color: #727e90;
    }

    .notice-notice {
      display: inline-block;

      .icon-sound {
        display: inline-block;
        vertical-align: middle;
        width: 23px;
        height: 23px;
        margin-right: 5px;
        background: url(../../../assets/images/index/icon-sound.png) no-repeat center;
      }

      > span {
        margin-right: 10px;
        font-size: 16px;
        color: #394b67;
      }

      p {
        display: inline-block;
        font-size: 14px;
        color: #7c86a2;
        cursor: pointer;

        &:hover {
          color: #0573f4;
        }
      }

      .seeMoreNotice {
        margin-left: 50px;
        font-size: 14px;
        font-weight: 300;
        color: #727e90;

        i {
          vertical-align: 0;
        }

        &:hover {
          color: #0671f0;
        }
      }
    }
  }
</style>
