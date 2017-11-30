<template>
  <div class="hth-data-table">
    <el-table :data="data">
      <template v-for="col in colConfigs">
        <slot v-if="col.slot"></slot>
        <component
          v-else-if="col.component"
          :is="col.component"
          :col-config="col">
        </component>
        <el-table-column v-else
                         :prop='col.prop'
                         :fixed='col.fixed'
                         :label='col.label'
                         :width='col.width'></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: ['colConfigs', 'data']
  }
</script>
