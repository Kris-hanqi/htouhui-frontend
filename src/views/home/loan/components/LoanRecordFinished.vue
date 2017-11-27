<template>
  <div>
    <el-table :data="list" :border="false" style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="110">
        <template slot-scope="scope">
          <a :href="baseUrl + '/loan/' + scope.row.id " target="_blank">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="giveTime" label="放款时间" width="140"></el-table-column>
      <el-table-column prop="actualBorrowMoney" label="借款金额" width="90"></el-table-column>
      <el-table-column prop="repayMoney" label="还款金额" width="90"></el-table-column>
      <el-table-column prop="settleDowndTime" label="结清日期" width="140"></el-table-column>
      <el-table-column prop="trusteeship" label="管理平台" width="100"></el-table-column>
      <el-table-column label="其他">
        <template slot-scope="scope">
          <el-button @click="openRepaymentPlan(scope.row.id)" type="text">还款计划</el-button>
          <el-button type="text">合同</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 还款计划 -->
    <repayment-plan :visible="visible"
                    :record-type="'finished'"
                    ref="repayment-plan"
                    @close="closeRepaymentPlan"></repayment-plan>
  </div>
</template>

<script>
  import RepaymentPlan from './repaymentPlan.vue';
  import { fetchContractDownload } from 'api/home/loan';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      RepaymentPlan
    },
    computed: {
      ...mapGetters([
        'baseUrl'
      ])
    },
    props: ['list'],
    data() {
      return {
        visible: false
      }
    },
    methods: {
      openRepaymentPlan(id) {
        this.loanId = id;
        this.$refs['repayment-plan'].getList(id);
        this.visible = true;
      },
      closeRepaymentPlan() {
        this.visible = false;
      },
      contractDownload(id) {
        fetchContractDownload(id);
      }
    }
  }
</script>
