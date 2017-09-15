<template>
  <div class="hth-info">
    <div class="hth-info__text">
      ©版权所有 北京冠城瑞富信息技术有限公司 Copyright Reserved　|　京ICP备15020986
      <span>信息安全等级保护三级：11010517098-00001</span>
    </div>

    <div class="hth-info__toggle">
      <span>版本切换：</span>
      <a href="javascript:void(0)" class="hth-info_type_pc">电脑版</a>
      <a href="javascript:void(0)" class="hth-info_type_h5">移动版</a>
    </div>
    <div class="hth-info__security">
      <a class="info_trust" href="http://www.itrust.org.cn/yz/pjwx.asp?wm=1335541052" target="_blank">
        <img :src="img_info_trust_1" alt="">
      </a>
      <a class="info_norton" href="" target="_blank">
        <img :src="img_info_norton_1" alt="">
      </a>
      <a class="info_cx" href="https://trustsealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.htouhui.com&lang=zh_cn" target="_blank">
        <img :src="img_info_cx_1" alt="">
      </a>
    </div>
  </div>
</template>

<script>
  import img_info_cx_1 from '@/assets/images/components/info_cx-1.png';
  import img_info_trust_1 from '@/assets/images/components/info_trust-1.png';
  import img_info_norton_1 from '@/assets/images/components/info_norton-1.png';

  export default {
    name: 'HthInfo',
    data() {
      return {
        img_info_cx_1,
        img_info_trust_1,
        img_info_norton_1
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hth-info {
    padding: 20px 0 0;
    text-align: left;
  }

  .hth-info__text {
    span {
      padding-left: 30px;
    }
  }

  .hth-info__toggle {
    margin-top: 15px;
  }

  .hth-info__security {
    text-align: right;
    padding-bottom: 20px;

    img {
      margin-right: 30px;
      vertical-align: middle;
    }
  }
</style>
