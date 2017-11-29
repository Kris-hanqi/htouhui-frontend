<template>
  <div class="has-transferred">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="140">
        <template slot-scope="scope">
          <a :href="scope.row.targetUrl" target="_blank">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="投资时间" width="80"></el-table-column>
      <el-table-column prop="money" label="投资金额">
        <template slot-scope="scope">
          {{ scope.row.money | currency('') + '元' }}
        </template>
      </el-table-column>
      <el-table-column prop="repayPeriod" label="剩余时间" width="80">
        <template slot-scope="scope">
          {{ scope.row.repayPeriod + '天' }}
        </template>
      </el-table-column>
      <el-table-column prop="debtPrice" label="债权价格">
        <template slot-scope="scope">
          {{ scope.row.debtPrice | currency('') + '元' }}
        </template>
      </el-table-column>
      <el-table-column prop="unPaidMoney" label="待收本息">
        <template slot-scope="scope">
          {{ scope.row.unPaidMoney | currency('') + '元' }}
        </template>
      </el-table-column>
      <el-table-column label="其它" width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isHasDetTransferCompact" class="icon-claim" type="text" size="small">债转合同</el-button>
          <el-button v-else-if="scope.row.isHasCompact" class="icon-plan" type="text" size="small">合同</el-button>
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
  import { debtTransfer } from 'api/home/claims';

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
        debtTransfer(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data;
            console.log('债权转让加入' + this.list);
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

<style lang="scss" scoped>

  .icon-plan {
    color: #0573f4;
  }

  .icon-claim {
    color: #0573f4;
  }

</style>
