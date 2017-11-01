<template>
  <div class="claims">
    <p class="title">债权转让</p>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="已转入的债权" name="first">
        <has-transferred></has-transferred>
      </el-tab-pane>
      <el-tab-pane label="已转出的债权转账" name="second">
        <have-turned-out></have-turned-out>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import hasTransferred from './hasTransferred.vue';
  import haveTurnedOut from './haveTurnedOut.vue';

  export default {
    components: {
      hasTransferred,
      haveTurnedOut
    },
    data() {
      return {
        activeName: 'first'
      };
    }
  };
</script>

<style lang="scss" scoped>
  .claims {
    width: 100%;
    height: 846px;
    box-sizing: border-box;
    padding: 20px 15px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    .title {
      margin-bottom: 25px;
      font-size: 20px;
      color: #274161;
    }
  }
</style>
