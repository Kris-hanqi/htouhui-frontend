<template>
  <div v-show="false">
    <form :action="requestData.formPostUrl" method="post" id="frm1" target="_blank" v-if="requestData.formPostUrl">
      <input type="text" v-for="(val, key) in requestData.formContent"
             :key="key"
             :name="key"
             :value="val" />
    </form>
  </div>
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
