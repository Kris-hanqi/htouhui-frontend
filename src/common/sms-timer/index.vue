<template>
  <button class="sms-timer" type="button" :disabled="disabled || time > 0">{{ text }}</button>
</template>

<script>
  export default{
    props: {
      second: {
        type: Number,
        default: 60
      },
      start: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        time: 0,
        disabled: false
      }
    },
    watch: {
      start(value) {
        if (value === true) {
          this.countDown()
        }
      }
    },
    methods: {
      countDown() {
        this.$emit('run');
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
        return this.time > 0 ? '重新获取' + this.time + 'S' : '获取验证码';
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
