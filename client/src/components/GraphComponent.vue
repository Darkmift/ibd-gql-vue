<script setup lang="ts">
import { useBuildsStore } from '@/store'
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

const sideLabelPlugin = {
  id: 'sideLabelPlugin',
  afterDraw(chart: any) {
    const ctx = chart.ctx
    ctx.save()
    ctx.font = 'bold 11px Arial'
    ctx.fillStyle = '#07112C'
    ctx.translate(chart.chartArea.left - 10, chart.chartArea.bottom)
    ctx.rotate(-0.5 * Math.PI) // Rotate 90 degrees
    ctx.textAlign = 'center'
    ctx.fillText('Builds', 75, -20) // Position adjusted for new rotation
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
  const labels = groupedbuildsByDate.value.map((build) => build.day)
  const data = groupedbuildsByDate.value.map((build) => build.count)
  return {
    labels,
    datasets: [{ data, backgroundColor: '#35CCD0' }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
}

const styles = {
  position: 'relative',
  height: '100%',
  width: '100%',
  paddingBottom: '3vmin'
}
</script>

Script

<template>
  <div class="graph-component container wrapper">
    <h1>Total builds</h1>
    <bar :options="chartOptions" :style="styles" :data="chartData" :responsive="true"/>
  </div>
</template>

<style lang="scss" scoped>
.graph-component {
  height: 280px;
  top: 76px;
  left: 148px;
  padding: 0px 16px 16px 16px;
  gap: 8px;
  border-radius: 8px;
  opacity: 0px;
}
h1 {
  font-size: 16px;
}
</style>
