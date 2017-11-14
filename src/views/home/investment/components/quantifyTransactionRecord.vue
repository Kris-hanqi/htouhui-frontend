<template>
  <div class="transactionRecord">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="加入记录" name="first">
        <join-record></join-record>
      </el-tab-pane>
      <el-tab-pane label="退出记录" name="second">
        <out-record></out-record>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import joinRecord from './quantifyJoinRecord.vue';
  import outRecord from './quantifyOutRecord.vue';

  export default {
    components: {
      joinRecord,
      outRecord
    },
    data() {
      return {
        activeName: 'first'
      };
    }
  };
</script>

<style lang="scss" scoped>
  .times-box {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .transactionRecord {
    width: 100%;
    height: 845px;
    box-sizing: border-box;
    padding: 15px 10px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
  }
</style>
