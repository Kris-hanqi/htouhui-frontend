<template>
  <!-- 封装element table组件 -->
  <div class="hth-data-table">
    <el-table :data="data">
      <!-- 无数据时显示 -->
      <no-data slot="empty"></no-data>
      <template v-for="col in orderBy(colConfigs, 'order')">
        <slot v-if="col.slot"></slot>
        <component
          v-else-if="col.component"
          :is="col.component"
          :col-config="col">
        </component>
        <el-table-column v-else
                         :show-overflow-tooltip="col.showOverflowTooltip"
                         :prop='col.prop'
                         :fixed='col.fixed'
                         :label='col.label'
                         :width='col.width'></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
  import NoData from '../NoData.vue';
  
  export default {
    components: {
      NoData
    },
    props: ['colConfigs', 'data']
  }
</script>

<style lang="scss">
  .hth-data-table {
    .el-table__empty-block {
      min-height: 260px;
    }
  }
</style>
