<template>
  <div class="data-table-wrapper" v-loading="loading" element-loading-text="拼命加载中...">
    <div class="table-view">
      <slot></slot>
    </div>
    <div class="pagination-view">
      <p class="total-pages">
        共计<span class="roboto-regular">{{ total }}</span>条记录
       （共<span class="roboto-regular">{{ getPageSize }}</span>页）
      </p>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: true
      },
      pageSize: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        page: 1
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.pageSize);
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.$emit('page-no-change', val)
      }
    }
  }
</script>

<style lang="scss">
  .data-table-wrapper {
    margin-top: 16px;
    height: auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
  
    .pagination-view {
      width: 100%;
      margin-top: 20px;
      text-align: right;
    
      .total-pages {
        display: inline-block;
        margin-right: 10px;
        font-size: 14px;
        color: #394b67;
      }
    
      .el-pagination {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>
