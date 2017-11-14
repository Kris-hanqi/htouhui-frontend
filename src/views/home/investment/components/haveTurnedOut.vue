<template>
  <div class="have-turned-out">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
      <el-table-column prop="applyTime" label="发起时间"></el-table-column>
      <el-table-column prop="endTime" label="到期时间"></el-table-column>
      <el-table-column prop="corpus" label="转让本金">
        <template slot-scope="scope">
          {{ scope.row.corpus | currency('') + '元' }}
        </template>
      </el-table-column>
      <el-table-column prop="premium" label="折让金">
        <template slot-scope="scope">
          {{ scope.row.premium | currency('') + '元' }}
        </template>
      </el-table-column>
    </el-table>

    <div class="pages">
      <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-size="listQuery.size" layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import { transferTurnedOut } from 'api/home/claims';

  export default {
    data() {
      return {
        listQuery: {
          pageNo: 1,
          size: 10
        },
        total: 0,
        list: null
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.size);
      }
    },
    methods: {
      getPageList() {
        transferTurnedOut(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            console.log('债权转让转出' + this.list);
            console.log(this.list);
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
