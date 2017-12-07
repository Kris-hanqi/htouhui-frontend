<template>
  <div :class="classes" :style="styles" @click="back">
    <slot>
      <div :class="innerClasses"></div>
    </slot>
  </div>
</template>

<script>
  import { scrollTop } from 'utils/assist';
  const prefixCls = 'back-top';

  export default {
    props: {
      height: {
        type: Number,
        default: 400
      },
      right: {
        type: Number,
        default: 30
      },
      duration: {
        type: Number,
        default: 1000
      }
    },
    data() {
      return {
        backTop: false
      }
    },
    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-show`]: this.backTop
          }
        ];
      },
      styles() {
        return {
          bottom: `${this.bottom}px`,
          right: `${this.right}px`
        }
      },
      innerClasses() {
        return `${prefixCls}-inner`
      }
    },
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    mounted() {
      window.addEventListener('scroll', this.handleScroll, false);
      window.addEventListener('resize', this.handleScroll, false);
    },
    // 销毁时调用该钩子
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll, false);
      window.removeEventListener('resize', this.handleScroll, false);
    },
    methods: {
      handleScroll() {
        this.backTop = window.pageYOffset >= this.height;
      },
      back() {
        const sTop = document.documentElement.scrollTop || document.body.scrollTop;
        scrollTop(window, sTop, 0, this.duration);
        this.$emit('on-click');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../src/styles/variables.scss";

  .back-top {
    display: none;
    position: fixed;
    z-index: $z-index-back-top;
    cursor: pointer;

    &.back-top-show {
      display: block;
    }
  }
</style>
