<template>
  <div>
    <el-table :data="list" :border="false" style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
      <el-table-column prop="giveTime" label="放款时间" width="140"></el-table-column>
      <el-table-column prop="loanMoney" label="借款金额" width="110"></el-table-column>
      <el-table-column prop="realLoanMoney" label="实际借款金额" width="110"></el-table-column>
      <el-table-column prop="rateCount" label="年利率" width="110">
        <template slot-scope="scope">
          {{ scope.row.rateCount + '%' }}
      </template>
      </el-table-column>
      <el-table-column prop="unPaidMoney" label="待还总额" width="110"></el-table-column>
      <el-table-column label="已还期数/总期数" width="110">
        <template slot-scope="scope">
          {{ scope.row.repayedTerm }}/{{ scope.row.repayedTerm + scope.row.unRepayTerm }}
      </template>
      </el-table-column>
      <el-table-column prop="payDay" label="下次还款日" width="140"></el-table-column>
      <el-table-column prop="nextRepayMoney" label="下次还款数" width="100"></el-table-column>
      <el-table-column prop="status" label="状态" width="100"></el-table-column>
      <el-table-column prop="trusteeship" label="管理平台" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="openRepaymentPlan(scope.row.id)" type="text">还款计划</el-button>
          <el-button @click="contractDownload(scope.row.id)" type="text">合同</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <!-- 还款计划 -->
    <repayment-plan :visible="visible"
                    ref="repayment-plan"
                    @close="closeRepaymentPlan"></repayment-plan>
  </div>
</template>

<script>
  import RepaymentPlan from './repaymentPlan.vue';
  import { fetchContractDownload } from 'api/home/loan';
  
  export default {
    components: {
      RepaymentPlan
    },
    props: ['list'],
    data() {
      return {
        visible: false
      }
    },
    methods: {
      openRepaymentPlan(id) {
        console.log(id);
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
