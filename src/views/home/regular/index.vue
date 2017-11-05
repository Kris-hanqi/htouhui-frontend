<template>
  <div class="regular">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="还款中" name="first">
        <regular-repaying></regular-repaying>
      </el-tab-pane>
      <el-tab-pane label="投标中" name="second">
        <regular-bid-success></regular-bid-success>
      </el-tab-pane>
      <el-tab-pane label="已结清" name="third">
        <regular-complete></regular-complete>
      </el-tab-pane>
      <el-tab-pane label="未成功" name="four">
        <regular-cancel></regular-cancel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import regularRepaying from './regular-repaying.vue';
  import regularBidSuccess from './regular-bid_success.vue';
  import regularComplete from './regular-complete.vue';
  import regularCancel from './regular-cancel.vue';

  export default {
    components: {
      regularRepaying,
      regularBidSuccess,
      regularComplete,
      regularCancel
    },
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .regular {
    width: 100%;
    height: 846px;
    box-sizing: border-box;
    padding: 25px 15px;
    padding-top: 30px;
    background-color: #fff;
    margin-bottom: 20px;

    .icon-award {
      width: 24px;
      height: 24px;
      background: url(../../../assets/images/home/icon-award.png) no-repeat center;
    }

    .icon-plan {
      color: #0573f4;
    }

    .icon-interests {
      color: #0573f4;
    }

    .payment-details {
      color: #0573f4;
    }
  }
</style>
