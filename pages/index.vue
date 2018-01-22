<template>
  <section class="index-container">
    <shortcut></shortcut>
    <hth-header></hth-header>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </section>
</template>

<script>
import Shortcut from '~/components/Shortcut.vue';
import HthHeader from '~/components/Header.vue';

export default {
  components: {
    Shortcut,
    HthHeader
  }
}
</script>
