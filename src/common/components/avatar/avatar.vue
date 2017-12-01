<!-- 头像组件 -->
<template>
  <span :class="classes">
    <img :src="src" v-if="src">
    <i class="iconfont" :class="icon" v-else-if="icon"></i>
    <span ref="children"
          :class="[prefixCls + '-string']"
          :style="childrenStyle" v-else>
      <slot></slot>
    </span>
  </span>
</template>

<script>
  import { oneOf } from '../../utils/assist';

  const prefixClass = 'kui-avatar';

  export default {
    name: 'Avatar',
    props: {
      shape: { // 头像形状
        type: String,
        validator: value => oneOf(value, ['circle', 'square']),
        default: 'circle'
      },
      size: { // 头像大小
        type: String,
        validator: value => oneOf(value, ['small', 'large', 'default']),
        default: 'default'
      },
      src: {
        type: String
      },
      icon: {
        type: String
      }
    },
    data() {
      return {
        prefixCls: prefixClass,
        scale: 1,
        isSlotShow: false
      }
    },
    computed: {
      classes() {
        return [
          `${prefixClass}`,
          `${prefixClass}-${this.shape}`,
          `${prefixClass}-${this.size}`,
          {
            [`${prefixClass}-image`]: !!this.src,
            [`${prefixClass}-icon`]: !!this.icon
          }
        ];
      },
      childrenStyle() {
        let style = {};
        if (this.isSlotShow) {
          style = {
            msTransform: `scale(${this.scale})`,
            WebkitTransform: `scale(${this.scale})`,
            transform: `scale(${this.scale})`,
            position: 'absolute',
            display: 'inline-block',
            left: `calc(50% - ${Math.round(this.$refs.children.offsetWidth / 2)}px)`
          };
        }
        return style;
      }
    },
    methods: {
      setScale() {
        this.isSlotShow = !this.src && !this.icon;
        if (this.$refs.children) {
          const childrenWidth = this.$refs.children.offsetWidth;
          const avatarWidth = this.$el.getBoundingClientRect().width;
          // add 4px gap for each side to get better performance
          if (avatarWidth - 8 < childrenWidth) {
            this.scale = (avatarWidth - 8) / childrenWidth;
          } else {
            this.scale = 1;
          }
        }
      }
    },
    mounted() {
      this.setScale();
    },
    updated() {
      this.setScale();
    }
  }
</script>
