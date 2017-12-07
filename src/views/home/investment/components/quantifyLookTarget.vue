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
      <el-table :data="list"
                style="width: 100%"
                v-loading="listLoading"
                element-loading-text="拼命加载中...">
        <el-table-column prop="loanId" label="项目编号" width="120">
          <template slot-scope="scope">
            <a :href="scope.row.loanTargetUrl" style="color: #409eff;" target="_blank">{{ scope.row.loanId }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="loanMoney" label="借款金额" width="100">
          <template slot-scope="scope">
            {{ scope.row.loanMoney | currency('') + '元' }}
          </template>
        </el-table-column>
        <el-table-column label="往期年利率" width="70">
          <template slot-scope="scope">
            {{ scope.row.rate + '%' }}
          </template>
        </el-table-column>
        <el-table-column prop="period" label="借款期限" width="70"></el-table-column>
        <el-table-column prop="investMoney" label="投资金额" width="100">
          <template slot-scope="scope">
            {{ scope.row.investMoney | currency('') + '元' }}
          </template>
        </el-table-column>
        <el-table-column label="还款时间" width="80">
          <template slot-scope="scope">
            {{ scope.row.repayTimeFormat || '--' }}
          </template>
        </el-table-column>
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
        <el-table-column prop="status" label="状态" width="80"></el-table-column>
        <el-table-column fixed="right" prop="contract" label="合同" width="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.showContract"
                       @click="downLoadContract(scope.row.investId)"
                       type="text">下载合同</el-button>
            <p v-else="">放款后可查看</p>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pages" v-if="!listLoading && list">
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
  import { feachDownLoadClaimsContract } from 'api/home/investment';
  import img_icon_sxb from 'assets/images/home/icon-shengXinBaoLiangHua.png';

  export default {
    data() {
      return {
        img_icon_sxb,
        list: null,
        listLoading: false,
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
        this.listLoading = true;
        queryUserAssetInfoList(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            this.total = data.data.count || 0;
          }
          this.listLoading = false;
        })
      },
      query() {
        this.getPageList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getPageList();
      },
      downLoadContract(id) {
        feachDownLoadClaimsContract(id)
          .then(response => {
            if (response.data.meta.code === 200) {
              window.open(response.data.data);
            }
            if (response.data.meta.code === 9999) {
              this.$notify({
                title: '下载失败',
                message: response.data.meta.message,
                type: 'error'
              });
            }
          })
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
  .lookTarget {
    width: 100%;
    height: auto;

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
      height: auto;
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
