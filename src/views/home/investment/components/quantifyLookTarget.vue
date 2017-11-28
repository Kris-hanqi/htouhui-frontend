<template>
  <!-- 升薪宝量化 查看标的 -->
  <div class="lookTarget">
    <div class="detail">
      <div class="title-box">
        <p class="title">资产详情-债权信息</p>
        <router-link to="/investment/quantify/index">
          <p class="return">返回上一页 <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i></p>
        </router-link>
      </div>
      <div class="main">
        <div class="name">
          <p><img :src="img_icon_sxb" alt=""/></p>
          <p>{{ planInfo.planName }}</p>
        </div>
        <div class="limit">
          <p><span class="roboto-regular">{{ planInfo.lockPeriod }}</span>天</p>
          <p>持有期限</p>
        </div>
        <div class="money">
          <p><span class="roboto-regular">{{ planInfo.investMoney | currency('')  }}</span>元</p>
          <p>在投金额</p>
        </div>
      </div>
    </div>

    <div class="message-list">
      <p class="title">您在{{ planInfo.planName }}的在投标的</p>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="loanId" label="项目编号" width="120">
          <template slot-scope="scope">
            <a :href="scope.row.loanTargetUrl" target="_blank">{{ scope.row.loanId }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="loanMoney" label="借款金额" width="100">
          <template slot-scope="scope">
            {{ scope.row.loanMoney | currency('') + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="往期年利率" width="70"></el-table-column>
        <el-table-column prop="perid" label="借款期限" width="70"></el-table-column>
        <el-table-column prop="investMoney" label="投资金额" width="100">
          <template slot-scope="scope">
            {{ scope.row.investMoney | currency('') + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="repayTimeFormat" label="还款时间" width="80"></el-table-column>
        <el-table-column prop="earnings" label="已收本息">
          <template slot-scope="scope">
            {{ scope.row.earnings | currency('') + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="uncollectedRepayMoney" label="待收本息">
          <template slot-scope="scope">
            {{ scope.row.uncollectedRepayMoney | currency('') + '元' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="50"></el-table-column>
        <el-table-column prop="contract" label="查看" width="40">
          <template slot-scope="scope">
            <el-button class="icon-download" type="text" size="small">合同</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <p class="total-pages">共计
          <span class="roboto-regular">{{ total }}</span>
          条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）
        </p>
        <el-pagination @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.pageNo"
                       :page-size="listQuery.size"
                       layout="prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { queryUserAssetInfoList } from 'api/home/queryUserAssetInfoList';
  import img_icon_sxb from 'assets/images/home/icon-shengXinBaoLiangHua.png';

  export default {
    data() {
      return {
        img_icon_sxb,
        list: null,
        planInfo: {
          lockPeriod: '',
          investMoney: 0,
          planName: ''
        },
        listQuery: {
          planId: this.$route.params.id,
          pageNo: 1,
          pageSize: 10
        },
        total: 0,
        messageQuery: {
          joinPlanId: this.$route.params.id
        }
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.pageSize);
      }
    },
    methods: {
      getPageList() {
        queryUserAssetInfoList(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            console.log(this.list);
            this.total = data.data.count || 0;
          }
        })
      },
      query() {
        this.getPageList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getPageList();
      }
    },
    created() {
      this.getPageList();
      this.planInfo.lockPeriod = this.$route.query.lockPeriod;
      this.planInfo.investMoney = this.$route.query.investMoney;
      this.planInfo.planName = this.$route.query.planName;
    }
  }
</script>

<style lang="scss" scoped>
  .icon-download {
    color: #0573f4;
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
