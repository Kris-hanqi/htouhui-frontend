<template>
  <div class="right-notification">
    <h1 class="notification-title">站内通知</h1>
    <el-tabs v-model="type" @tab-click="handleTabClick" type="card">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="未读" name="unread"></el-tab-pane>
      <el-tab-pane label="已读" name="read"></el-tab-pane>
    </el-tabs>
    <div class="notification-data">
      <!-- 无数据显示 -->
      <no-data></no-data>
    </div>
  </div>
</template>

<script>
  import NoData from '../components/NoData.vue';
  
  export default {
    components: {
      NoData
    },
    data() {
      return {
        type: 'all'
      }
    },
    methods: {
      handleTabClick(tab) {
        this.type = tab.name;
      }
    }
  }
</script>

<style lang="scss">
  .right-notification {
    width: 832px;
    height: 850px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    padding-left: 28px;
    padding-right: 20px;
    
    .notification-title {
      padding-top: 21px;
      margin-bottom: 32px;
      line-height: 1;
      font-size: 20px;
      color: #274161;
    }
    
    .notification-data {
      text-align: center;
    }
  }
</style>
