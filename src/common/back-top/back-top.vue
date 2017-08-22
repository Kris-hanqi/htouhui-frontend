<template>
  <div :class="classes" :style="styles" @click="back">
    <slot>
      <div :class="innerClasses">
        <i :class="icon"></i>
      </div>
    </slot>
  </div>
</template>

<script>
  import { scrollTop } from '@/utils/assist';
  const prefixCls = 'back-top';

  export default {
    props: {
      height: {
        type: Number,
        default: 400
      },
      bottom: {
        type: Number,
        default: 30
      },
      right: {
        type: Number,
        default: 30
      },
      duration: {
        type: Number,
        default: 1000
      },
      icon: {
        type: String,
        default: 'fa fa-angle-up'
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
  @import "src/styles/variables.scss";
  .back-top {
    position: fixed;
    cursor: pointer;
    display: none;
    z-index: $z-index-back-top;

    &.back-top-show {
      display: block;
    }

    i {
      color: #fff;
      font-size: 24px;
    }
  }

  .back-top-inner {
    background-color: #7a6e6e;
    border-radius: 2px;
    width: 35px;
    height: 35px;
    transition: all .2s ease-in-out;
  }
</style>
