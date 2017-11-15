<template>
  <div class="hth-panel">
    <div class="hth-panel-header" v-if="title">
      <h1 class="htn-panel-title">{{ title }}</h1>
    </div>
    <div class="hth-panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      }
    }
  }
</script>

<style lang="scss">
  .panel-wrapper {
    height: auto;
    margin-top: 16px;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    h1 {
      font-size: 20px;
      line-height: 1;
      color: #274161;
      margin-left: 7px;
    }

    .panel-body {
      padding-bottom: 10px;
    }
  }
</style>
