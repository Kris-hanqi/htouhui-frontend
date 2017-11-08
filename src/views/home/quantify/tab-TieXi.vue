<template>
  <div class="tab-TieXie">
    <div class="message">
      <div>
        <p>加入金额：<span class="roboto-regular">{{ messageList.joinMoney }}</span><span>元</span></p>
        <p>加入时间：<span class="roboto-regular">{{ messageList.joinTime }}</span></p>
      </div>
      <div>
        <p>贴息到期时间：<span class="roboto-regular">{{ messageList.tiexiEndTime }}</span></p>
        <p class="color-txt">贴息金额：<span class="roboto-regular">{{ messageList.tiexiMoney }}</span><span>元</span></p>
      </div>
    </div>
    <div class="message-list">
      <p class="title">贴息流水</p>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="investMoney" label="在投金额"></el-table-column>
        <el-table-column prop="rate" label="贴息利率"></el-table-column>
        <el-table-column prop="money" label="贴息金额"></el-table-column>
      </el-table>
      <div class="pages small">
        <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.PageSize" layout="prev, pager, next" :total="total"></el-pagination>
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
          joinId: this.joinPlanId,
          type: 'tiexi',
          pageNo: 1,
          PageSize: 10
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
        console.log(this.joinPlanId);
        queryPlatformAwardRecord(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.messageList = data.data.data || {};
            this.list = data.data.data.data;
            this.total = data.data.count || 0;
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

      .color-txt span {
        color: #ff4a33;
      }
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
