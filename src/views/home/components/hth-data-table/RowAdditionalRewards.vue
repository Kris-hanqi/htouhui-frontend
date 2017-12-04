<template>
  <!-- 定期项目 额外奖励 -->
  <el-table-column width="100" label="额外奖励">
    <template slot-scope="scope">
      <el-button @click="getExtendEarn(scope.row.investId)" class="icon-award" type="text"></el-button>
    </template>
  
    <el-dialog title="额外奖励"
               :visible.sync="dialogVisible"
               width="700px">
      <div class="dialog-main">
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="name" label="优惠券" width="140"></el-table-column>
          <el-table-column prop="rate" label="额外加息点数">
            <template slot-scope="scope">
              {{ scope.row.rate + '%' }}
            </template>
          </el-table-column>
          <el-table-column prop="money" label="额外利息">
            <template slot-scope="scope">
              {{ scope.row.money | currency('') + '元' }}
            </template>
          </el-table-column>
          <el-table-column prop="repayTime" label="还款时间" width="140"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{ scope.row.status | keyToValue(extendEarnListStatus) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </el-table-column>
</template>

<script>
  import { extendEarn } from 'api/home/regularInvest';
  
  export default {
    props: ['colConfig'],
    data() {
      return {
        list: null,
        dialogVisible: false,
        extendEarnListStatus: [
          { key: 'not_opened', value: '未发放' },
          { key: 'wait_repay', value: '未发放' },
          { key: 'success', value: '已发放' },
          { key: 'fail', value: '未发放' }
        ]
      }
    },
    methods: {
      getExtendEarn(id) {
        this.dialogVisible = true;
        extendEarn({ investId: id }).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data;
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .icon-award {
    width: 24px;
    height: 24px;
    background: url(../../../../assets/images/home/icon-award.png) no-repeat center;
  }
</style>
