<template>
  <img :src="test" v-on:mouseenter="hover" alt="">
</template>

<script>
  
  export default {
    name: 'ImgToggle',
    props: {
      imgInfo: {
        type: Object,
        default: {
          notHover: '',
          hover: '',
          status: false
        }
      }
    },
    methods: {
      hover() {
        this.imgInfo.status = true;
      }
    },
    computed: {
      test() {
        const src = this.imgInfo.status ? this.imgInfo.hover : this.imgInfo.notHover;
        return src;
      }
    }
  }
</script>
