<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item @click.native="goToIndex">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in levelList"
                          :key="item.path"
                          :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  import { getLocationUrl } from 'utils/index';
  export default {
    data() {
      return {
        levelList: null
      }
    },
    methods: {
      goToIndex() {
        window.location.href = getLocationUrl();
      },
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.meta.title);
        matched = [{ meta: { title: '个人中心' }, path: '/' }].concat(matched);
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

<style lang="scss">
  .breadcrumb-wrapper {
    .el-breadcrumb__inner,
    .el-breadcrumb__inner a {
      font-size: 16px;
      font-weight: 500;
      color: #274161;
      
      &:hover {
        color: #0671f0;
      }
    }
    
    .el-breadcrumb__separator {
      margin: 0 5px;
      font-weight: 500;
      color: #274161;
    }
  }
</style>
