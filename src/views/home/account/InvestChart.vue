<script>
  import { Doughnut } from 'vue-chartjs'

  export default {
    extends: Doughnut,
    mounted() {
      this.renderChart({
        labels: ['新手计划', '21天计划', '升薪宝量化', '升薪宝定期', '定期抵押'],
        datasets: [
          {
            backgroundColor: ['#f8e71c', '#ffa837', '#b8e986', '#50e3c2', '#06b7f0'],
            data: [40, 20, 80, 10, 50]
          }
        ]
      }, { responsive: true, maintainAspectRatio: false })
    }
  }
</script>
