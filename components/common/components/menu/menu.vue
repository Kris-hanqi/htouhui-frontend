<template>
  <!-- 导航菜单 -->
  <ul :class="classes" :style="styles">
    <slot></slot>
  </ul>
</template>

<script>
  import { oneOf, findComponentsDownward, findBrothersComponents } from '../../utils/assist';
  import Emitter from '../../mixins/emitter';
  
  const prefixCls = 'ku-menu';
  
  export default {
    name: 'Menu',
    mixins: [Emitter],
    props: {
      // 菜单类型 -- 可选值为 horizontal（水平） 和 vertical（垂直）
      mode: {
        validator(value) {
          return oneOf(value, ['horizontal', 'vertical']);
        },
        default: 'vertical'
      },
      // 主题
      theme: {
        validator(value) {
          return oneOf(value, ['light', 'dark', 'primary']);
        },
        default: 'light'
      },
      // 激活菜单的 name 值
      activeName: {
        type: [String, Number]
      },
      // 展开的 Submenu 的 name 集合
      openNames: {
        type: Array,
        default() {
          return [];
        }
      },
      // 是否开启手风琴模式
      accordion: {
        type: Boolean,
        default: false
      },
      // 导航菜单的宽度
      width: {
        type: String,
        default: '240px'
      }
    },
    data() {
      return {
        currentActiveName: this.activeName
      }
    },
    computed: {
      classes() {
        let theme = this.theme;
        if (this.mode === 'vertical' && this.theme === 'primary') {
          theme = 'light';
        }
        return [
          `${prefixCls}`,
          `${prefixCls}-${theme}`,
          {
            [`${prefixCls}-${this.mode}`]: this.mode
          }
        ];
      },
      styles() {
        let style = {};
        
        if (this.mode === 'vertical') {
          style.width = this.width;
        }
        
        return style;
      }
    },
    methods: {
      updateActiveName() {
        if (this.currentActiveName === undefined) {
          this.currentActiveName = -1;
        }
        this.broadcast('Submenu', 'on-update-active-name', false);
        this.broadcast('MenuItem', 'on-update-active-name', this.currentActiveName);
      },
      updateOpenKeys(name) {
        console.log(123);
        const index = this.openNames.indexOf(name);
        if (index > -1) {
          this.openNames.splice(name);
        } else {
          this.openNames.push(name);
          if (this.accordion) {
            let currentSubmenu = {};
            console.log(findComponentsDownward(this, 'Submenu'));
            findComponentsDownward(this, 'Submenu')
              .forEach(item => {
                if (item && item.name === name) {
                  currentSubmenu = item;
                }
              });
            console.log(currentSubmenu);
            console.log(findBrothersComponents(currentSubmenu, 'Submenu'));
            findBrothersComponents(currentSubmenu, 'Submenu')
              .forEach(item => {
                let index = this.openNames.indexOf(item.name);
                this.openNames.splice(index, index >= 0 ? 1 : 0);
              });
            this.openNames.push(name);
          }
        }
      },
      // 更新菜单打开状态
      updateOpened() {
        const items = findComponentsDownward(this, 'Submenu');
        if (items.length) {
          items.forEach(item => {
            console.log(item);
            if (this.openNames.indexOf(item.name) > -1) {
              item.opened = true;
            }
          })
        }
      }
    },
    mounted() {
      this.updateActiveName();
      this.updateOpened();
      this.$on('on-menu-item-select', name => {
        this.currentActiveName = name;
        this.$emit('on-select', name);
      });
    },
    watch: {
      openNames() {
        this.$emit('on-open-change', this.openNames);
      },
      activeName(val) {
        this.currentActiveName = val;
      },
      currentActiveName() {
        this.updateActiveName();
      }
    }
  }
</script>
