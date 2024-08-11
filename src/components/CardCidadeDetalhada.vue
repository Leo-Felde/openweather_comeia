<template>
  <v-card
    id="cidade-detalhada"
    class="pa-md-2 mb-md-1"
  >
    <div
      v-if="cidade.id"
    >
      <div class="header d-flex">
        <span class="cidade-info text-h6">
          Clima para {{ cidade.name }}
        </span>

        <span class="ml-auto mt-sm-1">
          {{ dataHora }}
        </span>
      </div>

      <div class="dados-clima d-flex">
        <div class="d-flex">
          <weather-icon
            :icon="cidade.weather[0].icon"
            size="xl"
          />
          <span class="text-h5 my-auto">{{ cidade.main.temp.toFixed(1) }}°C</span>
        </div>
        <div class="d-flex flex-column ml-auto text-end">
          <span class="text-subtitle-2">{{ cidade.weather[0].description }}	</span>
          <span class="text-subtitle-2">vento: {{ cidade.wind.speed }}km/h {{ formatarDirecaoVento(cidade.wind.deg) }}</span>
        </div>
      </div>

      <chart-clima
        v-if="previsao"
        :dados="previsao"
      />
    </div>

    <div v-else>
      Selecione uma cidade para começar
    </div>
  </v-card>
</template>

<script>
import { getPrevisao } from '../api/openWeather.js'
import ChartClima from './ChartClima.vue'
import WeatherIcon from './WeatherIcon.vue'

export default {
  name: 'CardCidadeDetalhada',
  
  components: {
    WeatherIcon,
    ChartClima
  },

  props: {
    cidade: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      previsao: null,
      dataHora: null,
    }
  },

  watch: {
    cidade: function (newValue) {
      if (newValue) {
        this.fetchPrevisao()
      } else {
        this.previsao = null
      }
    }
  },

  mounted () {
    this.updateDateTime()
  },

  methods: {
    async fetchPrevisao() {
      try {
        if (this.cidade.lat && this.cidade.lon) {
          const options = {
            lat: this.cidade.lat,
            lon: this.cidade.lon
          }

          const resp = await getPrevisao(options)
          this.previsao = resp.data.list
        }
      } catch (error) {
        console.error(`Não foi possível obter os dados da cidade ${this.cidade.name || 'CIDADE_NAO_INFORMADA'}:`, error)
      }
    },

    updateDateTime () {
      const currentDate = new Date()
      currentDate.setHours(0, 0, 0, 0)
      
      this.dataHora = new Date().toLocaleTimeString(undefined, { weekday: 'long', hour: 'numeric', minute: 'numeric' })
    },

    formatarDirecaoVento (degrees) {
      const directions = ['norte', 'nordeste', 'leste', 'sudeste', 'sul', 'sudoeste', 'oeste', 'noroeste']
      const index = Math.round(degrees / 45) % 8
      return directions[index]
    }
  }
}
</script>

<style lang="sass" scoped>
#cidade-detalhada
  max-width: 600px
  width: 100%

.selected
  background: #79cff02e
  cursor: default
  color: #000

.btn-remover-cidade
  position: absolute
  top: 8px
  right: 10px

.cidade-clima
  display: flex
</style>