<template>
  <div class="rolling21day">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="加入记录" name="first"></el-tab-pane>
      <el-tab-pane label="退出记录" name="second"></el-tab-pane>
    </el-tabs>
    <join-record v-if="activeName === 'first'"></join-record>
    <out-record v-else=""></out-record>
  </div>
</template>

<script>
  import joinRecord from './components/scroll21JoinRecord.vue';
  import outRecord from './components/scroll21OutRecord.vue';
  
  export default {
    components: {
      joinRecord,
      outRecord
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    created() {
      if (this.$route.query.message === 'success') {
        this.$router.push('/investment/scroll21/index');
        this.$message({
          showClose: true,
          message: '加入成功',
          type: 'success'
        });
      }
      if (this.$route.query.tagName === 'second') {
        this.activeName = 'second';
      }
    }
  };
</script>

<style lang="scss" scoped>
  .times-box {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  
  .rolling21day {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 15px 10px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
  }
</style>
