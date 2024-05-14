<script setup lang="ts">
import { useBuildsStore } from '@/store'
import chartJs, { type BarControllerChartOptions } from 'chart.js'
import { computed, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

function groupByMonth(data: { day: string; count: number }[]) {
  const monthData: Record<string, number> = {}

  data.forEach((item) => {
    const date = new Date(item.day)
    // Set to the first day of the month
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
    const monthKey = monthStart.toISOString().slice(0, 7) // Format as YYYY-MM

    if (!monthData[monthKey]) {
      monthData[monthKey] = 0 // Initialize if not present
    }
    monthData[monthKey] += item.count // Aggregate counts
  })

  // Convert to array if needed, or you can return as object
  return Object.entries(monthData).map(([month, count]) => ({
    month: month,
    count: count
  }))
}

const sideLabelPlugin = {
  id: 'sideLabelPlugin',
  afterDraw(chart: any) {
    const ctx = chart.ctx
    ctx.save()
    ctx.font = '14px Arial'
    ctx.fillStyle = 'rgba(82, 87, 101, 1)'
    ctx.translate(chart.chartArea.left - 40, chart.chartArea.bottom + -25)
    ctx.rotate(-0.5 * Math.PI) // Rotate 90 degrees
    ctx.textAlign = 'center'
    ctx.fillText('Builds', 75, 0) // Position adjusted for new rotation
    ctx.restore()
  }
}

ChartJS.register(sideLabelPlugin, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useBuildsStore()
const groupedbuildsByDate = computed(() => store.groupedBuilds)
onMounted(() => {
  store.setGroupedBuilds()
})

const chartData = computed(() => {
  const dataByWeek = groupByMonth(groupedbuildsByDate.value)
  const labels = dataByWeek.map((build) => build.month)
  const data = dataByWeek.map((build) => build.count)
  return {
    labels,
    datasets: [{ data, backgroundColor: '#35CCD0' }]
  }
})

const chartOptions: chartJs.ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 30
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>

<template>
  <div class="wrapper h-[280px] w-5 p-4 pb-8">
    <h1 class="text-[16px] font-bold">Total builds</h1>
    <bar
      class="h-[220px]"
      :options="(chartOptions as BarControllerChartOptions)"
      :data="chartData"
      :responsive="true"
    />
  </div>
</template>
