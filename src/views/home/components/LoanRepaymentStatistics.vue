<template>
  <div class="loan-repayment-statistics">
    <h1>{{ title }}</h1>
    <ul>
      <li>
        <p><span>{{ data.totalUnRepayMoney }}<i>元</i></span></p>
        <p class="title">待还总额</p>
      </li>
      <li>
        <p><span>{{ data.curMonthUnRepayMoney }}<i>元</i></span></p>
        <p class="title">本月待还金额</p>
      </li>
      <li>
        <p><span>{{ data.curMonthUnRepayNum }}<i>笔</i></span></p>
        <p class="title">本月待还笔数</p>
      </li>
      <li>
        <p><span>{{ data.rsCurMonthOverdueMoney }}<i>元</i></span></p>
        <p class="title">逾期金额</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      data: {
        type: Object
      }
    }
  }
</script>

<style lang="scss">
  .loan-repayment-statistics {
    width: 100%;
    height: 200px;
    margin-top: 16px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
  
    h1 {
      font-size: 20px;
      line-height: 1;
      color: #274161;
      padding-top: 20px;
      margin-left: 27px;
    }
    
    ul li {
      float: left;
      margin-top: 50px;
      width: 25%;
      
      p {
        line-height: 1;
        font-size: 14px;
        text-align: center;
        color: #7c86a2;
      }
      
      p.title {
        padding-top: 10px;
      }
      
      p span {
        font-size: 26px;
        color: #475872;
        text-align: center;
      }
      
      span i {
        font-size: 14px;
      }
    }
  }
</style>
