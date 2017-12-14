<template>
  <el-button type="info" size="small" round :disabled="disabled || time > 0" >{{time | change}}</el-button>
</template>

<script>
  let flag = true;
  
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
        disabled: false,
        time: '获取验证码',
        interval: null
      }
    },
    watch: {
      start(value) {
        if (value === true) {
          this.countDown()
        } else {
          if (this.interval) {
            clearInterval(this.interval);
            this.time = '获取验证码';
            this.disabled = false;
          }
        }
      }
    },
    methods: {
      countDown() {
        this.time = this.second;
        this.disabled = true;
        this.interval = setInterval(() => {
          this.time --;
          if (this.time === 0) {
            this.$emit('countDown');
            this.time = '获取验证码';
            this.disabled = false;
            flag = true;
            clearInterval(this.interval)
          }
        }, 1000)
      }
    },
    filters: {
      change(value) {
        if (!value) return '';
        if (!isNaN(value)) {
          if (flag === true) {
            return `重新发送${value}S`
          }
          return value + 'S'
        } else {
          return value
        }
      }
    }
  }
</script>
