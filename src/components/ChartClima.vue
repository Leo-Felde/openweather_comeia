<template>
  <div>
    <apexchart
      type="line"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'ChartClima',

  components: {
    apexchart: VueApexCharts,
  },

  props: {
    dados: {
      type: Array,
      required: true
    },
    showToolbar: {
      type: Boolean,
      required: false
    },
    enableZoom: {
      type: Boolean,
      required: false
    }
  },

  data() {
    return {
      chartOptions: {
        chart: {
          id: 'temperature-chart',
          toolbar: {
            show: this.showToolbar
          },
          zoom: {
            enabled: this.enableZoom
          }
        },
        xaxis: {
          type: 'datetime',
          title: {
            text: 'Tempo'
          }
        },
        yaxis: {
          title: {
            text: 'Temperatura (°C)',
          }
        },
        title: {
          text: 'Previsão para os próximos 5 dias',
          align: 'center'
        },
        tooltip: {
          x: {
            formatter: function (val) {
              const date = new Date(val)
              return date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })
            }
          },
          y: {
            formatter: function (val) {
              return `${val.toFixed(1)} °C`
            }
          }
        }
      }
    }
  },
  
  computed: {
    series() {
      return [{
        name: 'Temperatura',
        data: this.dados.map(dia => ({
          x: dia.dt_txt,
          y: dia.main.temp,
        })),
      }]
    },
  },
}
</script>
