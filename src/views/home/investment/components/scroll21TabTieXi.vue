<template>
  <div class="tab-TieXie">
    <div class="empty" v-if="this.showNoAward">
      <img src="../../../../assets/images/home/icon-noAward.png" alt=""/>
    </div>
    <div v-else>
      <div class="message">
        <div>
          <p>加入金额：<span class="roboto-regular">{{ messageList.joinMoney | currency('') }}</span><span>元</span></p>
          <p>加入时间：<span class="roboto-regular">{{ messageList.joinTime }}</span></p>
        </div>
        <div>
          <p>贴息到期时间：<span class="roboto-regular">{{ messageList.tiexiEndTime }}</span></p>
          <p class="color-txt">
            贴息金额：<span class="roboto-regular">{{ messageList.tiexiMoney | currency('') }}</span><span>元</span>
            <el-tooltip class="item" placement="top">
              <div slot="content">贴息金额计算方式以<br/>四舍五入至后两位</div>
              <i class="question"></i>
            </el-tooltip>
            <img class="status-img" v-if="messageList.status == 'transfered'" src="../../../../assets/images/home/icon-haveToAccount.png" alt=""/>
            <i class="status-txt" v-else>未发放</i>
          </p>
        </div>
      </div>
      <div class="message-list">
        <p class="title">贴息流水</p>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="time" label="时间"></el-table-column>
          <el-table-column prop="investMoney" label="在投金额">
            <template slot-scope="scope">
              {{ scope.row.investMoney | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="rate" label="贴息利率">
            <template slot-scope="scope">
              {{ scope.row.rate + '%' }}
            </template>
          </el-table-column>
          <el-table-column prop="money" label="贴息金额">
            <template slot-scope="scope">
              {{ scope.row.money | currency('', 4) + '元' }}
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
          type: 'tiexi',
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
            if (data.data) {
              this.showNoAward = false;
              this.messageList = data.data;
              this.list = data.data.data;
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
  .tab-TieXie {
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

  .tab-TieXie .message {
    width: 100%;

    > div {
      display: inline-block;
      width: 48%;

      p {
        margin-bottom: 20px;
        font-size: 14px;
        color: #7c86a2;

        span {
          font-size: 14px;
          color: #394b67;
        }
      }

      .color-txt {
        position: relative;
      }

      .color-txt span {
        color: #ff4a33;
      }

      .color-txt .question {
        display: inline-block;
        width: 13px;
        height: 13px;
        background: url(../../../../assets/images/home/icon-question.png) no-repeat center;
        margin-left: 5px;
        cursor: pointer;
      }
    }

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

  .tab-TieXie .message-list {
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
