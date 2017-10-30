<template>
  <div class="recently-repayment-wrapper">
    <div class="recently-repayment__header">
      <h1>近期还款</h1>
    </div>
    
    <div class="recently-repayment__body">
      <el-table :data="list"
                v-loading="listLoading"
                element-loading-text="拼命加载中..."
                :border="false"
                style="width: 100%">
        <el-table-column prop="time" label="项目名称" width="150"></el-table-column>
        <el-table-column prop="projectName" label="放款时间" width="110"></el-table-column>
        <el-table-column prop="typeinfo" label="已还期数/总期数" width="110"></el-table-column>
        <el-table-column prop="money" label="本金" width="100"></el-table-column>
        <el-table-column prop="trusteeship" label="利息" width="140"></el-table-column>
        <el-table-column prop="canUseMoney" label="罚息" width="100"></el-table-column>
        <el-table-column prop="trusteeship" label="还款日" width="140"></el-table-column>
        <el-table-column prop="canUseMoney" label="状态" width="100"></el-table-column>
        <el-table-column prop="canUseMoney" label="管理平台" width="100"></el-table-column>
        <el-table-column prop="detail" label="操作" width="100"></el-table-column>
      </el-table>
      <div class="pages" v-show="!listLoading">
        <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.pageNo"
          :page-size="listQuery.size"
          layout="prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          size: 10,
          type: ''
        }
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.size);
      }
    },
    methods: {
      toggleType(tab) {
        console.log(tab);
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
      }
    }
  }
</script>

<style lang="scss">
  .recently-repayment-wrapper {
    .el-tabs__item {
      width: 132px;
    }
    
    .recently-repayment__header {
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
    }
    
    .recently-repayment__body {
      margin-top: 13px;
      padding: 17px 20px;
      background-color: #fff;
    }
  }
</style>
