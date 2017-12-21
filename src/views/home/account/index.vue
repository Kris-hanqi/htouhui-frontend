<template>
  <div class="account-wrapper">
    <!-- 用户快捷操作工具栏 -->
    <top></top>

    <!-- 我的资产 -->
    <asset :data="assetData"></asset>

    <!-- 我的投资 -->
    <invest></invest>

    <!-- 还款日历 -->
    <repay-calendar></repay-calendar>

    <!-- 风险测评弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="625px"
      :before-close="onClose">
      <p class="risk-title-icon">
        <i class="ku-icon icon-user"></i>
      </p>
      <p class="risk-title-text">您还尚未完成风险测评！</p>
      <p class="risk-footer">
        <el-button type="primary" @click="onSkip()" round>去测评</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { fetchAsset } from 'api/home/account';
  import Top from './components/AccountTop.vue';
  import Asset from './components/AccountAsset.vue';
  import Invest from './components/AccountInvest.vue';
  import RepayCalendar from './components/RepayCalendar.vue';

  const riskName = 'risk';

  export default {
    components: {
      Top,
      Asset,
      Invest,
      RepayCalendar
    },
    computed: {
      ...mapGetters([
        'username',
        'status',
        'isOpenAccount',
        'isJoinRiskAssessment'
      ])
    },
    data() {
      return {
        assetData: {},
        dialogVisible: true,
        riskIgnoreUser: []
      }
    },
    methods: {
      // 获取我的资产数据
      getAsset() {
        fetchAsset().then(response => {
          if (response.data.meta.code === 200) {
            this.assetData = response.data.data;
          }
        })
      },
      onClose() {
        localStorage.setItem(`${this.username}_${riskName}`, 'close');
      },
      onSkip() {
        this.$router.push('/accountManage/set/riskEvaluation');
      }
    },
    created() {
      this.getAsset();
      const key = `${this.username}_${riskName}`;
      console.log(localStorage.getItem(key));
      if (!localStorage.getItem(key)) {
        console.log(123);
        console.log(this.status);
        console.log(this.isOpenAccount);
        console.log(this.isJoinRiskAssessment);
        this.dialogVisible = this.status === 1 && this.isOpenAccount && !this.isJoinRiskAssessment;
      }
    }
  }
</script>

<style lang="scss">
  .account-wrapper {
    .risk-title-icon {
      text-align: center;
      font-size: 139px;
      color: red;
    }

    .risk-title-text {
      margin: 25px 0;
      font-size: 24px;
      text-align: center;
      color: #727e90;
    }

    .risk-footer {
      text-align: center;
    }

    .el-button--primary {
      width: 187px;
      font-size: 18px;
    }

    .el-dialog__title {
      display: none;
    }
  }

</style>
