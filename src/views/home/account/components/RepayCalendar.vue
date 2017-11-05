<template>
  <div class="repayment-calendar-wrapper">
    <panel :title="'定期还款日历'">
      <event-calendar></event-calendar>
    </panel>
  </div>
</template>

<script>
  import EventCalendar from 'common/event-calendar/index.vue';
  import Panel from '../../components/panel.vue';
  
  export default {
    components: {
      EventCalendar,
      Panel
    },
    data() {
      return {
        date: null,
        defaultDate: []
      }
    }
  }
</script>

<style lang="scss">
  .repayment-calendar-wrapper {
    height: 418px;
  }
</style>

