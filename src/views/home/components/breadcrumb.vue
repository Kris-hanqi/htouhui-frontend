<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item @click.native="goToIndex">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path" :to="item.path">
       {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        levelList: null
      }
    },
    methods: {
      goToIndex() {
        window.location.href = 'index.html';
      },
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name);
        matched = [{ name: '个人中心', path: '/' }].concat(matched);
        this.levelList = matched
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    }
  }
</script>
