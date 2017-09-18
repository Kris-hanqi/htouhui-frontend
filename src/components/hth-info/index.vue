<template>
  <div class="hth-info">
    <div class="hth-info__text">
      ©版权所有 北京冠城瑞富信息技术有限公司 Copyright Reserved　|　京ICP备15020986
      <span>信息安全等级保护三级：11010517098-00001</span>
    </div>

    <div class="hth-info__security">
      <a class="info_trust" href="http://www.itrust.org.cn/yz/pjwx.asp?wm=1335541052" target="_blank">
        <info-img-src></info-img-src>
      </a>
    </div>

    <div class="hth-info__toggle">
      <span>版本切换：</span>
      <a href="javascript:void(0)" class="hth-info_type_pc">电脑版</a>
      <a href="javascript:void(0)" class="hth-info_type_h5">移动版</a>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import img_info_cx_1 from '@/assets/images/components/info_cx-1.png';
  import img_info_trust_1 from '@/assets/images/components/info_trust-1.png';
  import img_info_norton_1 from '@/assets/images/components/info_norton-1.png';
  import img_info_cx from '@/assets/images/components/info_cx.png';
  import img_info_trust from '@/assets/images/components/info_trust.png';
  import img_info_norton from '@/assets/images/components/info_norton.png';
  import infoImgSrc from './info-imgSrc.vue';

  export default {
    name: 'HthInfo',
    data() {
      return {
        info_trust: {
          notHover: img_info_trust_1,
          hover: img_info_trust,
          status: false
        },
        info_norton: {
          notHover: img_info_norton_1,
          hover: img_info_norton
        },
        info_cx: {
          notHover: img_info_cx_1,
          hover: img_info_cx
        },
        status: true
      }
    },
    components: {
      infoImgSrc
    }
  }
</script>

<style lang="scss" scoped>
  .hth-info {
    padding: 20px 0 0;
    text-align: left;
  }

  .hth-info__text {
    float: left;
    font-size: 12px;
    line-height: 0.75;
    margin-bottom: 15px;

    span {
      padding-left: 30px;
    }
  }

  .hth-info__toggle {
    font-size: 12px;
    line-height: 0.75;
  }

  .hth-info__security {
    float: right;
    text-align: right;
    padding-bottom: 20px;

    img {
      margin-left: 10px;
      vertical-align: middle;
    }
  }
</style>
