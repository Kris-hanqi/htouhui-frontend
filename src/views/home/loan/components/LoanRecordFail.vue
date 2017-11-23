<template>
  <div>
    <el-table :data="list" :border="false" style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="150">
        <template slot-scope="scope">
          <a :href="baseUrl + '/loan/' + scope.row.id" target="_blank">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="verifyTime" label="发布时间" width="140"></el-table-column>
      <el-table-column prop="loanMoney" label="借款金额" width="110"></el-table-column>
      <el-table-column prop="cancelTime" label="流标时间" width="150"></el-table-column>
      <el-table-column prop="trusteeship" label="管理平台" width="100"></el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <el-button type="text">还款计划</el-button>
          <el-button type="text">合同</el-button>
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
