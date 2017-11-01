<template>
  <div class="lookTarget">
    <div class="detail">
      <div class="title-box">
        <p class="title">资产详情-债权信息</p>
        <router-link to="index"><p class="return">返回上一页 <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i></p></router-link>
      </div>
      <div class="main">
        <div class="name">
          <p><img src="../../../assets/images/home/icon-shengXinBaoLiangHua.png" alt=""/></p>
          <p>升薪宝量化90</p>
        </div>
        <div class="limit">
          <p><span class="roboto-regular">90</span>天</p>
          <p>持有期限</p>
        </div>
        <div class="money">
          <p><span class="roboto-regular">2104200.01</span>元</p>
          <p>在投金额</p>
        </div>
      </div>
    </div>

    <div class="message-list">
      <p class="title">您在升薪宝量化90的在投标的</p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="项目编号" width="120"></el-table-column>
        <el-table-column prop="borrowedMoney" label="借款金额" width="100"></el-table-column>
        <el-table-column prop="rate" label="往期年利率" width="70"></el-table-column>
        <el-table-column prop="timeLimit" label="借款期限" width="70"></el-table-column>
        <el-table-column prop="investMoney" label="投资金额" width="100"></el-table-column>
        <el-table-column prop="time" label="还款时间" width="80"></el-table-column>
        <el-table-column prop="incomePrincipal" label="已收本息"></el-table-column>
        <el-table-column prop="collectPrincipal" label="待收本息"></el-table-column>
        <el-table-column prop="state" label="状态" width="50"></el-table-column>
        <el-table-column prop="contract" label="合同" width="40">
          <template scope="scope">
            <el-button class="icon-download" type="text" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <p class="total-pages">共计<span class="roboto-regular">25</span>条记录（共<span class="roboto-regular">3</span>页）</p>
        <el-pagination layout="prev, pager, next" :total="30"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          number: '20170817004576',
          borrowedMoney: '10,00000.00元',
          rate: '12.0%',
          timeLimit: '14天',
          investMoney: '10,00000.00元',
          time: '2017/10/24',
          incomePrincipal: '10,00000.00元',
          collectPrincipal: '0',
          state: '还款中'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon-download {
    width: 20px;
    height: 21px;
    background: url(../../../assets/images/home/icons/icon-download.png) no-repeat center;
  }

  .lookTarget {
    width: 100%;

    .detail {
      width: 100%;
      height: auto;
      margin-bottom: 15px;
      box-sizing: border-box;
      padding: 20px 25px;
      background-color: #fff;
      box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

      .title-box {
        width: 100%;
        margin-bottom: 35px;

        .title {
          display: inline-block;
          font-size: 20px;
          color: #274161;
        }

        .return {
          float: right;
          font-size: 16px;
          color: #0573f4;
          cursor: pointer;
        }
      }

      .main {
        width: 100%;
        margin-bottom: 25px;
        text-align: center;

        > div {
          display: inline-block;
          width: 30%;
        }

        > div p:first-child {
          margin-bottom: 10px;
        }

        .name p {
          font-size: 18px;
          color: #35385a;
        }

        .name img {
          width: 67px;
          height: 56px;
        }

        .limit p {
          font-size: 14px;
          color: #818c9c;
        }

        .limit span {
          font-size: 30px;
          color: #475872;
        }

        .money p {
          font-size: 14px;
          color: #727e90;
        }

        .money p:first-child {
          color: #ff4a33;
        }

        .money span {
          font-size: 30px;
          color: #ff4a33;
        }
      }
    }

    .message-list {
      width: 100%;
      height: 630px;
      box-sizing: border-box;
      padding: 25px 10px;
      background-color: #fff;
      box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

      .title {
        margin-bottom: 30px;
        font-size: 20px;
        color: #274161;
      }
    }
  }
</style>
