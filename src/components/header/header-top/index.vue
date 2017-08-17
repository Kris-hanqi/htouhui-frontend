<template>
  <div class="header-top">
    <div class="main-section">
      <span class="tel-phone">
        <i class="fa fa-phone" aria-hidden="true"></i>客服电话: <span class="roboto-regular">400-698-8810</span>（工作日 <span>09:00 - 18:00</span>）
      </span>
      <ul class="code-nav">
        <li class="nav-item">
          <p><i class="fa fa-mobile fa-lg" aria-hidden="true"></i>手机客户端</p>
          <div class="code-nav-arrow">
            <i></i>
            <div class="code-img">
              <img src="../../../../static/images/code-phone-download.jpg" alt=""/>
              <span>手机客户端下载</span>
            </div>
          </div>
        </li>
        <li class="nav-item">
          <p><i class="fa fa-weixin" aria-hidden="true"></i>微信公众号</p>
          <div class="code-nav-arrow">
            <i></i>
            <div class="code-img">
              <img src="../../../../static/images/code-weixin-download.png" alt=""/>
              <span>微信公众号</span>
            </div>
          </div>
        </li>
      </ul>
      <ul class="site-nav">
        <li class="nav-item">
          <a class="active" href="">立即登录</a>
        </li>
        <li class="nav-item padding-item">
          <a class="item-border" href="">免费注册</a>
        </li>
        <li class="nav-item padding-item">
          <a class="item-border" href="">活动中心</a>
        </li>
        <li class="nav-item padding-item">
          <a class="item-border" href="">新手指引</a>
        </li>
        <li class="nav-item padding-item">
          <a class="item-border" href="">网贷课堂</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HthHeaderTop'
  }
</script>

<style lang="scss" scoped>
  .header-top {
    height: 36px;
    background: #2875d9;
    line-height: 36px;
    font-size: 14px;
    font-weight: bold;

    .main-section {
      height: 100%;
      width: 1000px;
      margin: 0 auto;
      color: #fefefe;

      .tel-phone {
        float: left;
        height: 100%;
      }

      i {
        margin-right: 5px;
      }

      .site-nav {
        float: right;
      }

      .code-nav{
        float: right;

        .nav-item{
          background-color: #80cc60;
          position: relative;

          p {
            padding: 0 10px;
            cursor: pointer;
          }
          &:hover > .code-nav-arrow{
            display: block;
          }

          &:hover{
            background-color: #92df72;
          }

          .code-nav-arrow{
            display: none;
            position: absolute;
            top: 36px;
            left: -5px;

            i{
              display: inline-block;
              width: 13px;
              height: 8px;
              background: url(../../../../static/images/up_arrow.png) no-repeat center;
              margin-bottom: 15px;
            }

            .code-img{
              width: 125px;
              border:1px #E8E8E8 solid;
              background-color: #fff;
              margin-top: -30px;

              span{
                color: #7b7b7b;
                font-size: 14px;
                position: absolute;
                display: inline-block;
                width: 98px;
                text-align: center;
                bottom: -7px;
                left: 15px;
              }

              img{
                width: 100%;
              }
            }
          }
        }
      }

      .nav-item {
        float: left;
        height: 36px;
        text-align: center;
      }

      a {
        padding: 0 10px;

        &:hover,
        &:before {
          color: #7feff9;
        }

        &.active {
          color: #ffda1a;
        }
      }

      .item-border {
        border-left: 1px solid #dcdcdc;
      }
    }
  }
</style>
