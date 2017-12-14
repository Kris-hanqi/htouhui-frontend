<template>
  <span class="interest-rate">
    <span :style="{ fontSize: leftFontSize + 'px' }">
      {{ leftValue }}<i :style="{ fontSize: rightFontSize + 'px' }">{{ '.' + rightValue }}</i>
    </span>
  </span>
</template>

<script>
  export default {
    props: ['value', 'leftFontSize', 'rightFontSize'],
    computed: {
      leftValue() {
        return this.value.toString().split('.')[0] || 0;
      },
      rightValue() {
        return this.value.toString().split('.')[1] || 0;
      }
    }
  }
</script>

<style lang="scss">
  .interest-rate {
    color: #ff4a33;
  }
</style>
