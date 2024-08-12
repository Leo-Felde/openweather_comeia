<template>
  <v-autocomplete
    ref="vAutocomplete"
    v-model="cidadeSelecionada"
    :append-icon="appendIcon"
    :clearable="clearable"
    :append-outer-icon="appendOuterIcon"
    :dense="dense"
    :item-text="getItemText"
    :item-value="itemValue"
    :items="cidadesEncontradas"
    :label="label"
    :loading="carregandoCidades"
    :no-data-text="noDataText"
    :outlined="outlined"
    :prepend-inner-icon="prependInnerIcon"
    :prepend-icon="prependIcon"
    :return-object="returnObject"
    :suffix="suffix"
    auto-select-first
    @update:search-input="pesquisarCidade"
    @click="$emit('click')"
    @blur="$emit('blur')"
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
    label: {
      type: String,
      default: 'cidade'
    },
    items: {
      type: Array,
      default: null
    },
    itemText: {
      type: [String, Array, Function],
      default: undefined
    },
    itemValue: {
      type: [String, Array, Function],
      default: undefined
    },
    appendIcon: {
      type: String,
      default: undefined
    },
    appendOuterIcon: {
      type: String,
      default: undefined
    },
    noDataText: {
      type: String,
      default: 'Nenhuma cidade encontrada'
    },
    prependIcon: {
      type: String,
      default: undefined
    },
    prependInnerIcon: {
      type: String,
      default: 'mdi-map'
    },
    suffix: {
      type: String,
      default: undefined
    },
    dense: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    returnObject: {
      type: Boolean,
      default: true,
    }
  },

  data() {
    return {
      cidadeSelecionada: this.value,
      cidadesEncontradas: [],
      carregandoCidades: false,
    }
  },

  watch: {
    value(newVal) {
      this.cidadeSelecionada = newVal
    },

    cidadeSelecionada(newVal) {
      this.$emit('input', newVal)
    },
  },

  mounted () {
    if (this.items) {
      this.cidadesEncontradas = this.items
    }
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
        this.cidadesEncontradas = resp?.data || []
      } catch (error) {
        this.$snackbar.showMessage({ content: 'Não foi possível pesquisar as cidades', color: 'error' })
        console.error('Nao foi possivel pesquisar cidades', error)
        this.cidadesEncontradas = []
      } finally {
        this.carregandoCidades = false
      }
    },

    getItemText(item) {
      if (this.itemText) return this.itemText

      return `${item.name}${item.state ? `, ${item.state}` : ''}  ${item.country}`
    },
  },
}
</script>
