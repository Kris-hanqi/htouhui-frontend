<template>
  <div class="ku-card">
    <div class="ku-card-head" v-if="showHead">
      <slot name="title"></slot>
    </div>
    <div class="ku-card-extra" v-if="showExtra">
      <slot name="extra"></slot>
    </div>
    <div class="ku-card-body" :style="bodyStyles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  const prefixCls = 'ku-card';
  const defaultPadding = 16;
  
  export default {
    name: 'KuCard',
    props: {
      // 是否显示边框
      bordered: {
        type: Boolean,
        default: true
      },
      // 禁用鼠标悬停显示阴影
      disHover: {
        type: Boolean,
        default: false
      },
      // 卡片阴影
      shadow: {
        type: Boolean,
        default: false
      },
      // 卡片内部间距
      padding: {
        type: Number,
        default: defaultPadding
      }
    },
    data() {
      return {
        showHead: true,
        showExtra: true
      }
    },
    computed: {
      classes() {
        return [
          {
            [`${prefixCls}-bordered`]: this.bordered && !this.shadow,
            [`${prefixCls}-dis-hover`]: this.disHover || this.shadow,
            [`${prefixCls}-shadow`]: this.shadow
          }
        ]
      },
      bodyStyles() {
        if (this.padding !== defaultPadding) {
          return {
            padding: `${this.padding}px`
          };
        } else {
          return '';
        }
      }
    },
    mounted() {
      this.showHead = this.$slots.title !== undefined;
      this.showExtra = this.$slots.extra !== undefined;
    }
  }
</script>
