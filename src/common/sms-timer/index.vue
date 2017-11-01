<template>
  <button class="sms-timer" type="button" @click="run" :disabled="disabled || time > 0">{{ text }}</button>
</template>

<script>
  export default{
    props: {
      second: {
        type: Number,
        default: 60
      }
    },
    data() {
      return {
        time: 0,
        disabled: false
      }
    },
    methods: {
      run() {
        this.$emit('run');
        this.start();
      },
      start() {
        this.time = this.second;
        this.timer();
      },
      setDisabled(val) {
        this.disabled = val;
      },
      timer() {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        } else {
          this.disabled = false;
        }
      }
    },
    computed: {
      text() {
        return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
      }
    }
  }
</script>

<style lang="scss">
  .sms-timer {
    height: 46px;
    border-radius: 100px;
    background-color: #dfe8f0;
    font-size: 16px;
    text-align: center;
    padding: 0 20px;
    color: #7c86a2;
    margin-left: 15px;
    cursor: pointer;
  }
</style>
