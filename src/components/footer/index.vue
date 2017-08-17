<template>
  <div class="footer-wrapper">
    <div class="footer-top">
      <div class="logo">
        <a href=""><img src="../../../static/images/logo02.png" alt=""/></a>
        <p class="txt1">客服热线(工作时间<span class="roboto-regular">09:00-18:00</span>)</p>
        <p class="txt2 roboto-regular">400-698-8810</p>
      </div>
      <div class="footer-nav-box">
        <ul>
          <li><a href="">关于我们</a></li>
          <li><a href="" class="nav-a">企业介绍</a></li>
          <li><a href="" class="nav-a">管理团队</a></li>
          <li><a href="" class="nav-a">合作伙伴</a></li>
          <li><a href="" class="nav-a">联系我们</a></li>
          <li><a href="" class="nav-a">加入我们</a></li>
        </ul>
        <ul>
          <li><a href="">法律法规</a></li>
          <li><a href="" class="nav-a">法律顾问</a></li>
          <li><a href="" class="nav-a">法律协议</a></li>
          <li><a href="" class="nav-a">法律声明</a></li>
        </ul>
        <ul>
          <li><a href="">帮助中心</a></li>
          <li><a href="" class="nav-a">投资人必读</a></li>
          <li><a href="" class="nav-a">充值提现必读</a></li>
          <li><a href="" class="nav-a">怎样债权转让</a></li>
        </ul>
        <ul>
          <li>扫二维码下载<span class="roboto-regular">APP</span></li>
          <li><img src="../../../static/images/code-phone-download.jpg" alt=""/></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom clear">
      <p>©版权所有 北京冠城瑞富信息技术有限公司 Copyright Reserved　|　京ICP备15020986</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HthFooter'
  }
</script>

<style lang="scss" scoped>
  .footer-wrapper{
    width: 100%;
    background-color: #3b3b3b;

    .footer-top{
      width: 1000px;
      min-height: 170px;
      margin: 0 auto;
      padding: 20px 0;
      border-bottom: 1px solid #707070;
      font-size: 16px;
      color: #707070;

      .logo{
        display: inline-block;
        margin-top: 25px;
        margin-left: 25px;

        a{
          width: 168px;
          height: 59px;
          display: inline-block;

          img{
            width: 100%;
          }
        }

        .txt1{
          font-size: 12px;
          line-height: 25px;
        }

        .txt2{
          font-size: 22px;
          line-height: 30px;
        }
      }

      .footer-nav-box{
        font-size: 16px;
        color: #707070;
        font-weight: bold;
        float: right;

        ul{
          float: left;
          margin-left: 65px;

          li{
            height: 30px;
          }

          &:last-child img{
            width: 125px;
            height: 125px;
          }
        }

        .nav-a{
          font-size: 14px;
          font-weight: normal;

          &:hover{
            color: #9ec8ff;;
          }
        }
      }
    }

    .footer-bottom{
      width: 1000px;
      margin: 0 auto;
      padding: 20px 0;
      font-size: 12px;
      color: #818181;
    }
  }
</style>
