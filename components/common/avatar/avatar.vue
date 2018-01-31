<template>
  <span :class="classes">
    <img :src="src" v-if="src">
    <ku-icon :type="icon" v-else-if="icon"></ku-icon>
    <span ref="children" :class="[prefixCls + '-string']" :style="childrenStyle" v-else>
      <slot></slot>
    </span>
  </span>
</template>

<script>
  import KuIcon from '../icon';
  import { oneOf } from '../../utils/assist';

  const prefixCls = 'ku-avatar';
  
  export default {
    name: 'KuAvatar',
    components: { KuIcon },
    props: {
      shape: {
        validator (value) {
          return oneOf(value, ['circle', 'square']);
        },
        default: 'circle'
      },
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large', 'default']);
        },
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
        prefixCls: prefixCls,
        scale: 1,
        isSlotShow: false
      };
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          `${prefixCls}-${this.shape}`,
          `${prefixCls}-${this.size}`,
          {
            [`${prefixCls}-image`]: !!this.src,
            [`${prefixCls}-icon`]: !!this.icon
          }
        ];
      },
      childrenStyle () {
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
      setScale () {
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
    mounted () {
      this.setScale();
    },
    updated () {
      this.setScale();
    }
  }
</script>

<style lang="scss">
  $avatar-size-base: 32px;
  $avatar-size-lg: 40px;
  $avatar-size-sm: 24px;
  $avatar-font-size-base: 18px;
  $avatar-font-size-lg: 24px;
  $avatar-font-size-sm: 14px;
  $avatar-bg: #eef2fe;
  $avatar-color: #8b93ad;
  $avatar-border-radius: 4px;
  
  @mixin avatar-size($size, $font-size) {
    width: $size;
    height: $size;
    line-height: $size;
    border-radius: $size / 2;
    
    & > * {
      line-height: $size;
    }
    
    &.kui-avatar-icon {
      font-size: $font-size;
    }
  }
  
  .ku-avatar {
    display: inline-block;
    text-align: center;
    background: $avatar-bg;
    color: $avatar-color;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    
    @include avatar-size($avatar-size-base, $avatar-font-size-base);
    
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  
  .ku-avatar-large {
    @include avatar-size($avatar-size-lg, $avatar-font-size-lg);
  }
  
  .ku-avatar-small {
    @include avatar-size($avatar-size-sm, $avatar-font-size-sm);
  }
  
  .ku-avatar-square {
    border-radius: $avatar-border-radius;
  }
</style>
