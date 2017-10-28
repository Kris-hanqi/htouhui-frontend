<template>
  <div class="loan-record-wrapper">
    <div class="loan-record-wrapper__header">
    
    </div>
    
    <div class="loan-record-wrapper__body">
      <el-tabs v-model="activeName" @tab-click="toggleType">
        <el-tab-pane label="还款中" name="repaying"></el-tab-pane>
        <el-tab-pane label="待放款" name="rechecking"></el-tab-pane>
        <el-tab-pane label="待发布" name="waiting"></el-tab-pane>
        <el-tab-pane label="筹集中" name="raising"></el-tab-pane>
        <el-tab-pane label="已结清" name="finished"></el-tab-pane>
        <el-tab-pane label="流标" name="fail"></el-tab-pane>
      </el-tabs>
      <el-table :data="list"
                v-loading="listLoading"
                element-loading-text="拼命加载中..."
                :border="false"
                style="width: 100%">
        <el-table-column prop="time" label="交易时间" width="150"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="110"></el-table-column>
        <el-table-column prop="typeinfo" label="类型" width="110"></el-table-column>
        <el-table-column prop="money" label="变动金额" width="100"></el-table-column>
        <el-table-column prop="trusteeship" label="管理平台" width="140"></el-table-column>
        <el-table-column prop="canUseMoney" label="可用余额" width="100"></el-table-column>
        <el-table-column prop="detail" :show-overflow-tooltip="true" label="备注" width="100"></el-table-column>
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
        activeName: 'repaying',
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          size: 10,
          type:
            ''
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
      }
    }
  }
</script>

<style lang="scss">
  .loan-record-wrapper {
    .el-tabs__item {
      width: 132px;
    }
    
    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      display: none;
    }
  
    .el-tabs__nav-wrap.is-scrollable {
      padding: 0;
    }
    
    .loan-record-wrapper__body {
      padding-top: 17px;
      padding-left: 20px;
      padding-right: 20px;
      background-color: #fff;
    }
  }
</style>
