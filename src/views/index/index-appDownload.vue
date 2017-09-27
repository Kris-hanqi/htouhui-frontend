<template>
  <div class="appDownload">
    <div class="appDownload-title">手机APP更精彩</div>
    <div class="appDownload-icon"></div>
    <div class="appDownload-main">
      <img class="appDownload-code" src="../../assets/images/components/smart_download01.jpg" alt=""/>
      <a class="appDownload-android" href="https://www.htouhui.com/resources/app/2.3.0/htouhui-android-2.3.0_htouhui.apk"><i></i><span class="roboto-regular">Android</span>下载</a>
      <a class="appDownload-iphone" href="https://itunes.apple.com/us/app/hai-tou-hui-shang-shi-gong/id1017642310?l=zh&amp;ls=1&amp;mt=8" target="_blank"><i></i><span class="roboto-regular">iOS</span>下载</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'appDownload'
  }
</script>

<style lang="scss" scoped>
  .appDownload {
    float: right;
    width: 350px;
    height: 245px;
    box-sizing: border-box;
    padding: 15px;
    background-color: #fff;

    .appDownload-title {
      margin-bottom: 15px;
      font-size: 18px;
      color: #394b67;
    }

    .appDownload-icon {
      display: inline-block;
      width: 160px;
      height: 149px;
      margin-top: 30px;
      background: url(../../assets/images/index/home-pic.png) no-repeat center;
    }
  }

  .appDownload-main {
    float: right;
    width: 150px;
    text-align: center;

    .appDownload-code {
      width: 91px;
      height: 91px;
      margin-bottom: 13px;
    }

    .appDownload-android {
      display: block;
      width: 148px;
      height: 32px;
      box-sizing: border-box;
      margin: 0 auto;
      margin-bottom: 10px;
      border-radius: 41px;
      border: solid 1px #0671f0;
      line-height: 32px;
      text-align: left;
      font-size: 14px;
      color: #0671f0;
      background-color: #fff;

      i {
        display: inline-block;
        width: 27px;
        height: 14px;
        margin-right: 5px;
        margin-left: 20px;
        background: url(../../assets/images/index/icon-android.png) no-repeat center;
      }

      &:hover {
        border: none;
        background-color: #358df5;
        color: #fff;

        i {
          background: url(../../assets/images/index/icon-androiad-hover.png) no-repeat center;
        }
      }
    }

    .appDownload-iphone {
      display: block;
      width: 148px;
      height: 32px;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 41px;
      border: none;
      line-height: 32px;
      text-align: left;
      font-size: 14px;
      color: #fff;
      background-color: rgba(5, 114, 244, 0.8);

      i {
        display: inline-block;
        vertical-align: top;
        width: 21px;
        height: 26px;
        margin-top: 3px;
        margin-right: 17px;
        margin-left: 25px;
        background: url(../../assets/images/index/icon-iphone-hover.png) no-repeat center;
      }

      &:hover {
        border: solid 1px #0671f0;
        background-color: #fff;
        color: #0573f4;

        i {
          background: url(../../assets/images/index/icon-iphone.png) no-repeat center;
        }
      }
    }
  }
</style>
