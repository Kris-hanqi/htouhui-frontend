<template>
  <div class="times-box">
    <ul class="times">
      <li>交易时间：</li>
      <li>
        <a class="active" href="#">全部</a>
      </li>
      <li>
        <a href="#">近三天</a>
      </li>
      <li>
        <a href="#">近一个月</a>
      </li>
      <li>
        <a href="#">近三个月</a>
      </li>
      <li>
        <a href="#" class="diy-time">自定义时间</a>
      </li>
    </ul>
    <button class="find-btn">查询</button>
  </div>
</template>

<style lang="scss" scoped>
  .times-box {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 25px;

    ul {
      float: left;
    }

    li {
      float: left;
      margin-right: 10px;
      font-size: 16px;
      color: #274161;

      a {
        display: inline-block;
        padding: 4px 10px;
        text-align: center;
        margin-top: -5px;
      }

      a.active {
        border-radius: 100px;
        background-color: #0671f0;
        color: #fff;
      }
    }

    .find-btn {
      float: right;
      width: 135px;
      height: 40px;
      box-sizing: border-box;
      margin-top: -10px;
      border-radius: 100px;
      background-color: #378ff6;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      cursor: pointer;
    }
  }
</style>
