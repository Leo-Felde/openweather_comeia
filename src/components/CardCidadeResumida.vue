<template>
  <v-card
    class="card-cidade-clima pa-md-1 mb-md-1"
    outlined
    :class="{'selected' : selecionada}"
    :ripple="false"
    @click="selecionarCidade"
  >
    <v-skeleton-loader
      v-if="!clima"
      type="text"
      style="width: 100%"
    />

    <div v-else>
      <span class="cidade-info text-subtitle-2 ml-md-2">
        {{ cidade.name }} {{ cidade.state ? `, ${ cidade.state }` : '' }}
      </span>
      <div class="cidade-clima text-subtitle-2">
        <weather-icon
          :icon="clima.weather[0].icon"
          size="lg"
        />

        <span class="temp"> {{ String(clima.main.temp).slice(0, 4) }}°C </span>
      </div>
    </div>

    <v-tooltip
      left
      open-delay="300"
    >
      <template #activator="{ on }">
        <v-btn
          icon
          small
          class="btn-remover-cidade"
          v-on="on"
          @click.stop.prevent="$emit('remover')"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
      <span> Remover cidade </span>
    </v-tooltip>
  </v-card>
</template>

<script>
import { getClima } from '../api/openWeather.js'
import WeatherIcon from './WeatherIcon.vue'

export default {
  components: {
    WeatherIcon
  },

  props: {
    cidade: {
      type: Object,
      default: () => ({})
    },

    selecionada:{
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      clima: null,
      loading: true
    }
  },

  mounted() {
    this.fetchClima()
  },

  methods: {
    async fetchClima () {
      try {
        this.loading = true

        if (this.cidade.lat && this.cidade.lon) {
          const options = {
            lat: this.cidade.lat,
            lon: this.cidade.lon
          }

          const resp = await getClima(options)
          this.clima = resp.data
          delete this.clima.id
        }
      } catch (error) {
        console.error(`Não foi possível obter os dados da cidade ${this.cidade.name || 'CIDADE_NAO_INFORMADA'}:`, error)
      } finally {
        this.loading = false
      }
    },

    async selecionarCidade () {
      if (this.loading) {
        setTimeout(() => {          
          this.selecionarCidade()
          return
        }, 100)
      }
      
      const dados = {
        ...this.cidade,
        ...this.clima
      }

      this.$emit('click', dados)
    }
  }
}
</script>

<style lang="sass" scoped>
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
  .temp, .weather-icon
    margin-top: auto
    margin-bottom: auto
</style>