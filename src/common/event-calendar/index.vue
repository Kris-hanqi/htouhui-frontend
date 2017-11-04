<template>
  <div class="event-calendar-wrapper">
    <cal-panel
      :calendar="calendarOptions"
      :events="[]"></cal-panel>
  </div>
</template>

<script>
  import CalPanel from './components/cal-panel.vue'
  export default {
    components: {
      CalPanel
    },
    data() {
      return {};
    },
    computed: {
      calendarOptions() {
        const dateObj = new Date();
        return {
          options: {
            weekStartOn: 7
          },
          params: {
            curYear: dateObj.getFullYear(),
            curMonth: dateObj.getMonth(),
            curDate: dateObj.getDate()
          }
        };
      }
    }
  }
</script>

<style lang="scss">

</style>
