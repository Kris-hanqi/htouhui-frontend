<template>
  <!-- 页面底部组件 -->
  <div class="hth-footer">
    <div class="wrap">
      <div class="hth-footer__box clearfix">
        <div class="hth-footer__box-nav">
          <h3><a href="">关于我们</a></h3>
          <ul>
            <li><a href="" class="nav-a">公司介绍</a></li>
            <li><a href="" class="nav-a">团队介绍</a></li>
            <li><a href="" class="nav-a">联系我们</a></li>
            <li><a href="" class="nav-a">加入我们</a></li>
          </ul>
        </div>
        <div class="hth-footer__box-nav">
          <h3><a href="">法律法规</a></h3>
          <ul>
            <li><a href="" class="nav-a">法律顾问</a></li>
            <li><a href="" class="nav-a">法律协议</a></li>
            <li><a href="" class="nav-a">法律声明</a></li>
          </ul>
        </div>
        <div class="hth-footer__box-nav">
          <h3><a href="">帮助中心</a></h3>
          <ul>
            <li><a href="" class="nav-a">投资人必读</a></li>
            <li><a href="" class="nav-a">新手指引</a></li>
            <li><a href="" class="nav-a">充值提现指导</a></li>
          </ul>
        </div>
        <div class="hth-footer__box-nav hth-footer__box-contact">
          <h3><a href="">联系我们</a></h3>
          <ul>
            <li>客服电话：400-698-8810（工作日 9:00-18:00）</li>
            <li>客服邮箱：callcenter@htouhui.com</li>
            <li>公司地址：北京市朝阳区东三环北路19号中青大厦18层</li>
            <li>我要合作：bd@htouhui.com</li>
          </ul>
        </div>
        <ul class="hth-footer__qr_code">
          <li><img :src="img_app_download"/></li>
          <li class="text">市场有风险，投资需谨慎！</li>
        </ul>
      </div>
      <div class="hth-info-container">
        <hth-info></hth-info>
      </div>
    </div>
  </div>
</template>

<script>
  import img_app_download from '@/assets/images/components/app-download.jpg';
  import HthInfo from '../hth-info/index.vue';

  export default {
    name: 'HthFooter',
    data() {
      return {
        img_app_download
      }
    },
    components: {
      HthInfo
    }
  }
</script>

<style lang="scss" scoped>
  $hth-footer-bg: #3b495b;

  .clearfix:after {
    content: ".";
    clear: both;
    display: block;
    overflow: hidden;
    font-size: 0;
    height: 0;
  }

  .hth-footer {
    width: 100%;
    height: auto;
    font-size: 14px;
    background-color: $hth-footer-bg;
    color: #7d94b8;
    text-align: left;
  }

  .hth-footer__box {
    height: auto;
    padding: 38px 0;
    border-bottom: 1px solid #7d94b8;
    font-weight: bold;
  }

  .hth-footer__box-nav {
    float: left;
    width: 150px;

    ul {
      a {
        font-size: 12px;

        &:hover {
          color: #fff;
        }
      }
    }

    &.hth-footer__box-contact {
      width: auto;
    }

    ul {
      padding: 20px 0 0;
    }

    li {
      height: 30px;
    }

    h3 {
      color: #fff;
    }
  }

  .hth-footer__qr_code {
    float: right;
    text-align: center;

    .text {
      padding-top: 20px;
      font-size: 10px;
      color: #dfe8f0;
    }
  }
</style>
