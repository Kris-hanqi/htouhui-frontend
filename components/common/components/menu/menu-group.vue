<template>
  <li :class="[prefixCls + '-item-group']">
  
  </li>
</template>

<script>
  import mixin from './mixin';
  const prefixCls = 'ku-menu';
  
  export default {
    name: 'MenuGroup',
    mixins: [mixin],
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        prefixCls: prefixCls
      }
    },
    computed: {
      groupStyle() {
        return this.hasParentSubmenu && this.mode !== 'horizontal' ? {
          paddingLeft: 43 + (this.parentSubmenuNum - 1) * 28 + 'px'
        } : {};
      }
    }
  }
</script>
