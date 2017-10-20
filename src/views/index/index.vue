<template>
  <!-- 网站首页 -->
  <div class="main">
    <!--广告轮播-->
    <hth-banner></hth-banner>
    <!--平台公告-->
    <div class="notice">
      <div class="notice-top">
        <notice-top-box></notice-top-box>
      </div>
      <div class="notice-down">
        <a class="notice-box notice-box1" href="#">
          <div class="notice-icon"></div>
          <div class="txt-box">
            <p class="txt">稳健运营</p>
            <p>完善的业务闭环，</p>
            <p>历史100%兑付</p>
          </div>
        </a>
        <a class="notice-box notice-box2" href="#">
          <div class="notice-icon"></div>
          <div class="txt-box">
            <p class="txt">江西银行资金存管</p>
            <p>平台与用户资金分离，</p>
            <p>借贷双方交易信息安全</p>
          </div>
        </a>
        <a class="notice-box notice-box3" href="#">
          <div class="notice-icon"></div>
          <div class="txt-box">
            <p class="txt">Pre-A轮融资</p>
            <p>获战略投资方，</p>
            <p>五星资本Pre-A轮融资</p>
          </div>
        </a>
        <a class="notice-box notice-box4" href="#">
          <div class="notice-icon"></div>
          <div class="txt-box">
            <p class="txt">多重风控保障</p>
            <p>多级风控审核，</p>
            <p>抵押信息真实透明</p>
          </div>
        </a>
      </div>
    </div>
    <div class="main-main">
      <!--新手计划-->
      <new-user-plan></new-user-plan>
      <!--广告位-->
      <advertising-board></advertising-board>
      <!--21天计划-->
      <plan21-day></plan21-day>
      <!--APP下载-->
      <app-download></app-download>
      <!--升薪宝量化-->
      <shengxinbao-lianghua></shengxinbao-lianghua>
      <!--精选定期-->
      <regular-intervals></regular-intervals>
      <!--平台数据播报-->
      <platform-data></platform-data>
      <!--媒体报道-->
      <media-report></media-report>
      <!--投资人风采-->
      <investors></investors>
    </div>
  </div>

</template>

<script>
  import HthBanner from 'components/swiper'; // 轮播
  import NoticeTopBox from './components/index-notice-top.vue'; // 最新公告
  import NewUserPlan from './components/index-newUser-plan.vue'; // 新手计划
  import AdvertisingBoard from './components/index-advertising-borad.vue'; //  广告位
  import Plan21Day from './components/index-plan21day.vue'; // 21天计划
  import AppDownload from './components/index-appDownload.vue'; // APP下载
  import ShengxinbaoLianghua from './components/index-shengxinbao-lianghua.vue'; // 升薪宝量化
  import RegularIntervals from './components/index-regular-intervals.vue'; // 精选定期
  import PlatformData from './components/index-platformData.vue'; // 安心投资
  import MediaReport from './components/index-media-report.vue'; // 媒体报道
  import Investors from './components/index-investors.vue'; // 投资人风采
  
  export default {
    components: {
      HthBanner,
      NoticeTopBox,
      NewUserPlan,
      AdvertisingBoard,
      Plan21Day,
      AppDownload,
      ShengxinbaoLianghua,
      RegularIntervals,
      PlatformData,
      MediaReport,
      Investors
    }
  };
</script>

<style lang="scss" scoped>
  .main {
    min-height: 800px;
  }
  
  .main-main {
    width: 1000px;
    margin: 0 auto;
    margin-bottom: 35px;
  }
  
  .notice {
    width: 100%;
    height: 190px;
    margin-bottom: 30px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 2px 4px 1px rgba(114, 155, 198, 0.14);
  }
  
  .notice-top {
    height: 55px;
    line-height: 55px;
  }
  
  .notice-down {
    width: 1000px;
    height: 135px;
    box-sizing: border-box;
    margin: 0 auto;
    border-top: 1px solid #efefef;
    text-align: center;
  }
  
  .notice-box {
    display: inline-block;
    width: 245px;
    margin-top: 35px;
    
    .notice-icon {
      display: inline-block;
      margin-right: 13px;
      background: url(../../assets/images/index/icon-group.png) no-repeat;
      transition: all 0.2s ease-in-out;
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
  
  .notice-box1 {
    .notice-icon {
      width: 65px;
      height: 53px;
      background-position: 0 0;
    }
    
    &:hover {
      .notice-icon {
        background-position: 0 -53px;
      }
      
      .txt {
        color: #0671f0;
      }
    }
  }
  
  .notice-box2 {
    .notice-icon {
      width: 57px;
      height: 54px;
      background-position: -65px 0;
    }
    
    &:hover {
      .notice-icon {
        background-position: -65px -54px;
      }
      
      .txt {
        color: #0671f0;
      }
    }
  }
  
  .notice-box3 {
    .notice-icon {
      width: 58px;
      height: 54px;
      background-position: -123px 0;
    }
    
    &:hover {
      .notice-icon {
        background-position: -123px -55px;
      }
      
      .txt {
        color: #0671f0;
      }
    }
  }
  
  .notice-box4 {
    .notice-icon {
      width: 48px;
      height: 53px;
      background-position: -182px 0;
    }
    
    &:hover {
      .notice-icon {
        background-position: -182px -55px;
      }
      
      .txt {
        color: #0671f0;
      }
    }
  }
</style>
