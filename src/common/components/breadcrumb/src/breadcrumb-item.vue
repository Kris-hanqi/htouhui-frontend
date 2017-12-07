<template>
  <!-- 面包屑导航子项 -->
  <span class="ku-breadcrumb__item">
    <span class="ku-breadcrumb__inner" ref="link" role="link">
      <slot></slot>
    </span>
    <i v-if="separatorClass" class="ku-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="ku-breadcrumb__separator" role="presentation">{{separator}}</span>
  </span>
</template>

<script>
  export default {
    name: 'KuBreadcrumbItem',
    props: {
      to: {
        type: [Object, String]
      }
    },
    data() {
      return {}
    },
    inject: ['kuBreadcrumb'],
    mounted() {
      this.separator = this.kuBreadcrumb.separator;
      this.separatorClass = this.kuBreadcrumb.separatorClass;
      let self = this;
      if (this.to) {
        let link = this.$refs.link;
        link.setAttribute('role', 'link');
        link.addEventListener('click', _ => {
          let to = this.to;
          self.replace ? self.$router.replace(to)
            : self.$router.push(to);
        });
      }
    }
  }
</script>
