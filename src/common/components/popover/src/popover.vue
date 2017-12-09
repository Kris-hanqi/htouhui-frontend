<template>
  <!-- 气泡提示组件 -->
  <div class="ku-popover"
       @mouseenter="handleMouseenter"
       @mouseleave="handleMouseleave">
  
  
  </div>
</template>

<script>
  export default {
    name: 'KuPopover',
    methods: {
      handleMouseenter() {
        console.log(123);
      },
      handleMouseleave() {
        console.log(123);
      }
    }
  }
</script>
