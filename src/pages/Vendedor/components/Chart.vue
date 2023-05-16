<template>
  <canvas :id="'clientchart_'+source" style="height: 350px"></canvas>
</template>

<script setup lang="ts">
import {registerables, Chart} from "chart.js";
import {onMounted, onDeactivated, onUpdated, onBeforeUpdate} from "vue";

const props = defineProps<{
  data: {total: number, month: string}[],
  source: number
}>()

Chart.register(...registerables)
let chart: Chart<"bar", number[], string> | null;

onMounted(() => {

  const clientchart = document.getElementById('clientchart_'+props.source) as HTMLCanvasElement
  try {
    if( chart !== null ) {
      chart.destroy()
    }
  }catch (e) {

  }
  chart = new Chart(clientchart, {
    type: 'bar',
    data: {
      labels: props.data.map(item => item.month),
      datasets: [{
        label: 'Total de ventas',
        data: props.data.map(item => item.total),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
})


onUpdated(() => {

  const clientchart = document.getElementById("clientchart") as HTMLCanvasElement

  try {
    if( chart !== null ) {
      chart.destroy()
    }
  }catch (e) {

  }

  chart = new Chart(clientchart, {
    type: 'bar',
    data: {
      labels: props.data.map(item => item.month),
      datasets: [{
        label: 'Total de ventas',
        data: props.data.map(item => item.total),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
})


onDeactivated(() => {
  if( chart !== null ) {
    chart.destroy()
  }
})

onBeforeUpdate(() => {
  if( chart !== null ) {
    chart.destroy()
  }
})

</script>

<style scoped>

</style>
