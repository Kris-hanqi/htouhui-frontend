<template>
  <!-- 面包屑组件 -->
  <div class="ku-breadcrumb" aria-label="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'KuBreadcrumb',
    props: {
      separator: {
        type: String,
        default: '>'
      },
      separatorClass: {
        type: String,
        default: ''
      }
    },
    provide() { // 向子组件返回一个父组件实例
      return {
        kuBreadcrumb: this
      };
    },
    mounted() {
      const items = this.$el.querySelectorAll('.ku-breadcrumb__item');
      if (items.length) {
        items[items.length - 1].setAttribute('aria-current', 'page');
      }
    }
  }
</script>
