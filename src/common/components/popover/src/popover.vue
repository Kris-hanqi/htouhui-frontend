<template>
  <!-- 气泡提示组件 -->
  <div class="ku-popover"
       @mouseenter="handleMouseenter"
       @mouseleave="handleMouseleave">
    <div class="ku-popover-rel"
         ref="reference"
         @click="handleClick"
         @mousedown="handleFocus(false)"
         @mouseup="handleBlur(false)">
      <slot></slot>
    </div>
    <transition name="fade">
      <div ref="popper"
           v-show="visible"
           @click="handleTransferClick"
           @mouseenter="handleMouseenter"
           @mouseleave="handleMouseleave"></div>
    
    </transition>
  </div>
</template>

<script>
  const prefixCls = 'ku-popover';
  
  export default {
    name: 'KuPopover',
    props: {
      // 触发方式 可选值: hover、click、focus（confirm 模式下，只有 click 有效）
      trigger: {
      
      },
      // 提示框出现的位置
      placement: {
      
      },
      // 显示的标题
      title: {
        type: [String, Number]
      },
      // 显示的正文内容
      content: {
        type: [String, Number],
        default: ''
      },
      // 宽度，最小宽度为 150px，在 confirm 模式下，默认最大宽度为 300px
      width: {
        type: [String, Number]
      },
      // 是否开启对话框模式
      confirm: {
        type: Boolean,
        default: false
      },
      // 确定按钮的文字，只在 confirm 模式下有效
      okText: {
        type: String
      },
      // 取消按钮的文字，只在 confirm 模式下有效
      cancelText: {
        type: String
      },
      // 是否将弹层放置于 body 内
      transfer: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        prefixCls: prefixCls,
        showTitle: true,
        isInput: false,
        disableCloseUnderTransfer: false,  // transfer 模式下，点击 slot 也会触发关闭
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-confirm`]: this.confirm
          }
        ];
      }
    },
    methods: {
      handleClick () {
        if (this.confirm) {
          this.visible = !this.visible;
          return true;
        }
        if (this.trigger !== 'click') {
          return false;
        }
        this.visible = !this.visible;
      },
      handleMouseenter() {
        console.log(123);
      },
      handleMouseleave() {
        console.log(123);
      }
    }
  }
</script>
