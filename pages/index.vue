<template>
  <div class="container">
    <head-top></head-top>
  </div>
</template>

<script>
import HeadTop from '~/components/HeadTop.vue'

export default {
  components: {
    HeadTop
  },
  data () {
    return {}
  },
  head () {
    return {
      title: '海投汇-互联网金融平台-小额投资'
    }
  }
}
</script>
