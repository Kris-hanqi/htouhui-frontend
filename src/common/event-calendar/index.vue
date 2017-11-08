<template>
  <div class="event-calendar-wrapper">
    <cal-panel
      :calendar="calendarOptions"
      @cur-day-changed="handleChangeCurDay"
      @month-changed="handleMonthChanged"
      :events="dates"></cal-panel>
  </div>
</template>

<script>
  import CalPanel from './components/cal-panel.vue'
  export default {
    components: {
      CalPanel
    },
    props: {
      dates: {
        type: Array,
        required: true
      }
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
    },
    methods: {
      handleChangeCurDay(date) {
        this.$emit('day-changed', date)
      },
      handleMonthChanged(yearMonth) {
        this.$emit('month-changed', yearMonth)
      }
    }
  }
</script>

<style lang="scss">
  .event-calendar-wrapper {
    display: inline-block;
  }
</style>
