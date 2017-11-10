<template>
  <div class="coupon-container">
    <el-card class="box-card">
      <div v-for="o in 4" :key="o">
        {{'列表内容 ' + o }}
    </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  .coupon-container {
    display: none;
  }
</style>

