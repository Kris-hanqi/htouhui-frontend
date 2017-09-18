<template>
  <img :src="test" v-on:mouseenter="hover" alt="">
</template>

<script>

  export default {
    name: 'infoImgSrc',
    props: {
      imgSrc: {
        type: Object,
        default: function() {
          return {
            notHover: '',
            hover: '',
            status: false
          }
        }
      }
    },
    methods: {
      hover() {
        this.imgSrc.status = true;
      }
    },
    computed: {
      test() {
        const src = this.imgSrc.status ? this.imgSrc.hover : this.imgSrc.notHover;
        return src;
      }
    }
  }
</script>
