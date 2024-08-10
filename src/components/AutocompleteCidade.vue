<template>
  <v-autocomplete
    v-model="selectedCity"
    label="Nome"
    outlined
    dense
    return-object
    prepend-inner-icon="mdi-map"
    no-data-text="Nenhuma cidade encontrada"
    :item-text="getItemText"
    :items="cidadesEncontradas"
    :loading="carregandoCidades"
    @update:search-input="pesquisarCidade"
  />
</template>

<script>
import { getCidade } from '../api/geolocation.js'

export default {
  name: 'AutocompleteCidade',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedCity: this.value,
      cidadesEncontradas: [],
      carregandoCidades: false,
    }
  },
  watch: {
    value(newVal) {
      this.selectedCity = newVal
    },

    selectedCity(newVal) {
      this.$emit('input', newVal)
    },
  },
  methods: {
    async pesquisarCidade(inputText) {
      if (!inputText || inputText?.length < 3) {
        this.cidadesEncontradas = []
        return
      }

      this.carregandoCidades = true
        
      try {
        const resp = await getCidade(inputText)
        this.cidadesEncontradas = resp.data || []
      } catch (error) {
        console.error('Error fetching cities:', error)
        this.cidadesEncontradas = []
      } finally {
        this.carregandoCidades = false
      }
    },

    getItemText(item) {
      return `${item.name} ${item.state ? `,${item.state}` : ''}  ${item.country}`
    },
  },
}
</script>
