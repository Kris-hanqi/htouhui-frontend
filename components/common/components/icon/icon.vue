<template>
  <i :class="classes" :style="styles"></i>
</template>

<script>
  const prefixCls = 'ku-icon';
  
  export default {
    name: 'KuIcon',
    props: {
      type: String,
      size: [Number, String],
      color: String
    },
    computed: {
      classes() {
        return `${prefixCls} icon-${this.type}`;
      },
      styles() {
        let style = {};
        if (this.size) {
          style['font-size'] = `${this.size}px`;
        }
        if (this.color) {
          style.color = this.color;
        }
        return style;
      }
    }
  }
</script>
