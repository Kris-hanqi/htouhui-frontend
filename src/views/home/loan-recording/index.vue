<template>
  <el-tabs v-model="activeName" @tab-click="toggleType">
    <el-tab-pane label="还款中" name="one"></el-tab-pane>
    <el-tab-pane label="待放款" name="two"></el-tab-pane>
    <el-tab-pane label="待发布" name="there"></el-tab-pane>
    <el-tab-pane label="筹集中" name="four"></el-tab-pane>
    <el-tab-pane label="已结清" name="five"></el-tab-pane>
    <el-tab-pane label="流标" name="six"></el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'one',
        type: ''
      }
    },
    methods: {
      toggleType(tab) {
        console.log(tab);
      }
    }
  }
</script>
