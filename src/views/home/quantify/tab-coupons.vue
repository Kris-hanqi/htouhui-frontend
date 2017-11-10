<template>
  <div class="tab-coupons">
    <div class="empty" v-if="this.showNoAward">
      <img src="../../../assets/images/home/icon-noAward.png" alt=""/>
    </div>
    <div v-else>
      <div class="message">
        <div>
          <p>加入金额：<span class="roboto-regular">{{ messageList.joinMoney | currency('') }}</span><span>元</span></p>
          <p>面值：<span class="roboto-regular">{{ messageList.couponType != 'plus_coupon' ? messageList.couponMoney : messageList.couponRate  }}{{ messageList.couponType != 'plus_coupon' ? '元' : '%'  }}</span></p>
        </div>
        <div>
          <p>加入时间：<span class="roboto-regular">{{ messageList.joinTime }}</span></p>
          <p class="test-box">
            到账时间：<span class="roboto-regular">{{ messageList.couponEndTime }}</span>
            <img class="status-img" v-if="messageList.status == 'transfered'" src="../../../assets/images/home/icon-haveToAccount.png" alt=""/>
            <i class="status-txt" v-else>未发放</i>
          </p>
        </div>
        <div>
          <p>优惠券类型：<span>{{ messageList.couponType }}</span></p>
        </div>
      </div>
      <div class="message-list">
        <p class="title">贴息流水</p>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="time" label="时间"></el-table-column>
          <el-table-column prop="investMoney" label="在投金额">
            <template scope="scope">
              {{ scope.row.investMoney | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="rate" label="贴息利率">
            <template scope="scope">
              {{ scope.row.rate + '%' }}
            </template>
          </el-table-column>
          <el-table-column prop="money" label="贴息金额">
            <template scope="scope">
              {{ scope.row.money | currency('') + '元' }}
            </template>
          </el-table-column>
        </el-table>
        <div class="pages small">
          <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.PageSize" layout="prev, pager, next" :total="total"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { queryPlatformAwardRecord } from 'api/home/quantify';

  export default {
    props: [
      'joinPlanId'
    ],
    data() {
      return {
        list: null,
        messageList: {},
        total: 0,
        listQuery: {
          joinId: '',
          type: 'coupon',
          pageNo: 1,
          pageSize: 10
        },
        showNoAward: true
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.pageSize);
      }
    },
    methods: {
      getPageList() {
        this.listQuery.joinId = this.joinPlanId;
        queryPlatformAwardRecord(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            console.log('优惠券');
            console.log(data);
            if (data.data) {
              this.showNoAward = false;
              this.messageList = data.data;
              this.list = data.data.data;
              console.log(this.messageList);
              this.total = data.data.count || 0;
            }
          }
        })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getPageList();
      }
    },
    created() {
      this.getPageList();
    }
  }
</script>

<style lang="scss" scoped>
  .tab-coupons {
    width: 100%;
    margin-top: 15px;
  }

  .empty {
    width: 100%;
    text-align: center;

    img {
      width: 237px;
      height: 174px;
    }
  }

  .tab-coupons .message {
    width: 100%;

    > div {
      display: inline-block;
      vertical-align: text-top;
      width: 32%;

      p {
        margin-bottom: 20px;
        font-size: 14px;
        color: #7c86a2;

        span {
          font-size: 14px;
          color: #394b67;
        }
      }

      .test-box {
        position: relative;

        .status-txt {
          display: inline-block;
          width: 38px;
          height: 15px;
          box-sizing: border-box;
          border-radius: 2px;
          background-color: #ee544b;
          border: solid 1px #dd443b;
          line-height: 15px;
          text-align: center;
          font-size: 9px;
          color: #fff;
        }

        .status-img {
          position: absolute;
          bottom: -10px;
          right: 0;
          width: 80px;
          height: 78px;
        }
      }
    }
  }

  .tab-coupons .message-list {
    width: 100%;
    padding-top: 15px;
    border-top: 1px dashed #aab2c9;

    .title {
      margin-bottom: 15px;
      font-size: 16px;
      color: #4e5e77;
    }
  }
</style>
