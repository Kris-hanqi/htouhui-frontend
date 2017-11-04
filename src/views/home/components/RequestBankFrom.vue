<template>
  <form :action="requestData.formPostUrl" method="post" id="frm1" target="_blank" v-show="false">
    <input type="text" v-for="(val, key) in requestData.formContent"
           :key="key"
           :name="key"
           :value="val" />
  </form>
</template>

<script>
  export default {
    props: {
      requestData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {}
    },
    methods: {
      requestBank() {
        document.getElementById('frm1').submit();
      }
    },
    updated() {
      this.$nextTick(function() {
        if (this.requestData.formPostUrl) {
          this.requestBank();
        }
      });
    }
  }
</script>
