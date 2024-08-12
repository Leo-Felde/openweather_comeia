<template>
  <v-card
    class="card-cidade-resumida pa-1 mb-1 mx-1"
    outlined
    :class="{'selected' : selecionada}"
    :disabled="disabled"
    :flat="flat"
    :heigth="heigth"
    :width="width"
    :ripple="false"
    @click="selecionarCidade"
  >
    <v-skeleton-loader
      v-if="!clima"
      type="text"
      style="width: 100%"
    />

    <div v-else>
      <div class="header-cidade">
        <span class="cidade-info text-subtitle-2 ml-2">
          {{ cidade.name }}{{ cidade.state && $vuetify.breakpoint.mdAndUp ? `, ${ cidade.state }` : '' }}
        </span>
        <v-tooltip
          left
          open-delay="300"
        >
          <template #activator="{ on }">
            <v-btn
              class="btn-remover-cidade"
              :class="{ 'mobile' : $vuetify.breakpoint.smAndDown }"
              icon
              small
              v-on="on"
              @click.stop.prevent="removerCidade"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </template>
          <span> Remover cidade </span>
        </v-tooltip>
      </div>
      <div class="cidade-clima text-subtitle-2">
        <weather-icon
          :icon="clima.weather[0].icon"
          size="lg"
        />

        <span class="temp"> {{ clima.main.temp.toFixed(1) }}°C </span>
      </div>
    </div>
  </v-card>
</template>

<script>
import { getClima } from '../api/openWeather.js'
import WeatherIcon from './WeatherIcon.vue'

export default {
  name: 'CardCidadeResumida',

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
    },
    disabled:{
      type: Boolean,
      default: false
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
          if (resp?.data) {
            this.clima = resp.data
            delete this.clima.id
          }
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
    },

    removerCidade () {
      this.$emit('remover')
    }
  }
}
</script>

<style lang="sass" scoped>
.selected
  background: #79cff02e
  cursor: default

.cidade-clima
  display: flex
  .temp, .weather-icon
    margin-top: auto
    margin-bottom: auto

.card-cidade-resumida
  max-height: 120px !important
  min-width: 150px

.header-cidade
  display: flex
  width: 100%
.cidade-info
  width: 90%

.btn-remover-cidade
  width: 10%
</style>