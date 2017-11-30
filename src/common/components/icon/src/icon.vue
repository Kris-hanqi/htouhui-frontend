<template>
  <i :class="classes" :styles="styles"></i>
</template>

<script>
  const prefixCls = 'ku-icon';
  
  export default {
    name: 'KuIcon',
    props: {
      name: String,
      size: [Number, String],
      color: String
    },
    computed: {
      classes () {
        return `${prefixCls} ${prefixCls}-${this.name}`;
      },
      styles () {
        let style = {};
        // 设置图标大小
        if (this.size) {
          style['font-size'] = `${this.size}px`;
        }
        // 设置图标颜色
        if (this.color) {
          style.color = this.color;
        }
        return style;
      }
    }
  }
</script>
