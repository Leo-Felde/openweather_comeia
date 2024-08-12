<<template>
  <v-card
    id="cidade-detalhada"
    class="pa-2 mb-1"
    :width="width"
    :max-width="maxWidth"
    :heigth="heigth"
    :flat="flat"
    color="'#ffffff00'"
  >
    <div
      v-if="cidade.id"
    >
      <div class="header d-flex">
        <span
          id="city-name"
          class="text-h6 ml-2"
        >
          Clima para {{ cidade.name }}
        </span>

        <span
          id="data-hora"
          class="ml-auto mt-1"
        >
          {{ dataHora }}
        </span>
      </div>

      <div
        v-if="cidade.weather"
        class="dados-clima d-flex"
      >
        <div class="d-flex">
          <weather-icon
            :icon="cidade.weather[0].icon"
            size="xl"
          />
          <span
            id="weather-temp"
            class="text-h5 my-auto"
          >{{ cidade.main.temp.toFixed(1) }}°C</span>
        </div>
        <div class="d-flex flex-column ml-auto text-end">
          <span
            id="weather-desc"
            class="text-subtitle-2"
          >{{ cidade.weather[0].description }}	</span>
          <span
            id="weather-wind"
            class="text-subtitle-2"
          >vento: {{ cidade.wind.speed }}km/h {{ formatarDirecaoVento(cidade.wind.deg) }}</span>
        </div>
      </div>
      <v-progress-linear
        v-if="loadingPrevisao"
        indeterminate
      />
      <chart-clima
        v-if="previsao.length"
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
    },
    flat: {
      type: Boolean,
      default: false
    },
    heigth: {
      type: [String, Number],
      default: undefined
    },
    width: {
      type: [String, Number],
      default: undefined
    },
    maxWidth: {
      type: [String, Number],
      default: '600px'
    }
  },

  data() {
    return {
      previsao: [],
      dataHora: null,
      loadingPrevisao: false
    }
  },

  watch: {
    cidade(newValue) {
      if (newValue && newValue.id !== this.previousId) {
        this.fetchPrevisao()
        this.previousId = newValue.id
      } else {
        this.previsao = []
      }
    }
  },

  mounted () {
    this.updateDateTime()
  },

  methods: {
    async fetchPrevisao() {
      try {
        this.loadingPrevisao = true
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
      } finally {
        this.loadingPrevisao = false
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
</style>>