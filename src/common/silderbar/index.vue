<template>
  <div class="silderbar">
    <div class="count"></div>
    <div class="online-service">
      <div class="silderbar-box">
        <p>工作日</p>
        <p class="roboto-regular">（9:00-18:00）</p>
      </div>
      <i class="fa fa-caret-right" aria-hidden="true"></i>
    </div>
    <div class="code">
      <div class="silderbar-box">
        <div class="phone-code">
          <img src="../../../static/images/code-phone-download.jpg" alt=""/>
          <p>手机客户端下载</p>
        </div>
        <div class="wechat-code">
          <img src="../../../static/images/code-weixin-download.png" alt=""/>
          <p>微信公众号</p>
        </div>
      </div>
      <i class="fa fa-caret-right" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HthSilderBar'
  }
</script>

<style lang="scss" scoped>
  .silderbar{
    position: fixed;
    right: 0;
    bottom:140px;
    width: 50px;
    height: auto;
    z-index: 1000;

    > div{
      position: relative;
      width: 100%;
      height: 50px;
      margin-bottom: 5px;
      border-radius: 2px;
      transition: all .2s ease-in-out;
      background: url(../../../static/images/icon_home.png) no-repeat;
      cursor: pointer;

      .silderbar-box{
        position: absolute;
        top: 0;
        right: 55px;
        padding: 10px;
        background: #fff;
        color: #7b7b7b;
        text-align: center;
        display: none;

        > p{
          width: 100px;
          font-size: 14px;
          line-height: 20px;
        }

        > div {
          display: inline-block;
          text-align: center;

          img{
            width: 125px;
            height: 125px;
          }

          p{
            font-size: 14px;
          }
        }
      }

      i{
        position: absolute;
        right: 50px;
        top: 15px;
        color: #fff;
        display: none;
      }
    }

    .count{
      background-position: -550px 0;

      &:hover{
        background-position: -550px -50px;
      }
    }

    .online-service{
      background-position: -350px 0;

      &:hover{
        background-position: -350px -50px;

        .silderbar-box{
          display: block;
        }
        i{
          display: block;
        }
      }

      .silderbar-box{
        top: -5px;
      }
    }

    .code{
      background-position: -400px 0;

      .silderbar-box{
        width: 255px;
        top: -50px;
      }

      &:hover{
        background-position: -400px -51px;

        .silderbar-box{
          display: block;
        }
        i{
          display: block;
        }
      }
    }
  }
</style>
