<template>
  <div class="slider-bar">
    <!-- 收益计算器 -->
    <el-popover
      ref="popover1"
      placement="left"
      popper-class="gain-calculator-popover"
      :visible-arrow="false"
      width="320"
      trigger="hover">
      <gain-calculator></gain-calculator>
    </el-popover>
    
    <!--计算器-->
    <div class="count" v-popover:popover1></div>
    <!--在线客服-->
    <div class="online-service">
      <div class="slider-bar-box">
        <p>工作日</p>
        <p class="roboto-regular">（9:00-18:00）</p>
      </div>
      <i></i>
    </div>
    <!-- 回到顶部 -->
    <hth-back-top class="top" :right="14" :height="100"></hth-back-top>
  </div>
</template>

<script>
  import HthBackTop from 'common/back-top';
  import GainCalculator from '../gain-calculator';

  export default {
    name: 'SliderBar',
    components: {
      HthBackTop,
      GainCalculator
    }
  }
</script>

<style lang="scss">
  .gain-calculator-popover {
    border: 2px solid #4181dc;
    padding: 0;
  }
  
  .slider-bar {
    position: fixed;
    right: 15px;
    bottom: 133px;
    z-index: 1000;
    width: 35px;
    height: auto;

    > div {
      position: relative;
      width: 35px;
      margin-bottom: 5px;
      background: url(../../assets/images/index/icon-group.png) no-repeat;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }

    .count {
      height: 43px;
      background-position: -230px 0;

      &:hover {
        background-position: -230px -43px;
      }
    }

    .online-service {
      height: 108px;
      background-position: -300px 0;

      &:hover {
        background-position: -300px -108px;

        .slider-bar-box {
          display: block;
        }

        i {
          display: block;
        }
      }

      i {
        display: none;
        position: absolute;
        top: 48px;
        right: 35px;
        width: 7px;
        height: 13px;
        background: url(../../assets/images/components/right-arrow.png) no-repeat;
      }
    }

    .slider-bar-box {
      display: none;
      position: absolute;
      top: 25px;
      right: 40px;
      border: 1px solid #e8e8e8;
      padding: 10px;
      background: #fff;
      color: #7b7b7b;
      text-align: center;

      p {
        width: 100px;
        font-size: 14px;
        line-height: 20px;
      }
    }

    .top {
      border-radius: 2px;
      width: 35px;
      height: 43px;
      background: url(../../assets/images/index/icon-group.png) no-repeat;
      background-position: -265px 0;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-position: -265px -43px;
      }
    }
  }
</style>
