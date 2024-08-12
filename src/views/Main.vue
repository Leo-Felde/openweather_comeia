<template>
  <v-card
    id="main-view"
    v-resize="onResize"
    flat
    :class="{'flex-column' : listaMobile}"
  >
    <lista-cidades
      v-model="cidadeSelecionada"
      :flat="listaMobile"
      :transparent="listaMobile"
      :vertical="listaMobile"
      :width="listaMobile? '100%' : null"
      :max-width="listaMobile? '100%' : '400px'"
    />
    <card-cidade-detalhada
      class="ma-sm-auto my-md-auto mr-md-auto ml-md-4 mx-xs-4"
      :cidade="cidadeSelecionada"
      flat
      :transparent="!absoluteBreakpoint"
    />
  </v-card>
</template>

<script>
import listaCidades from '../components/ListaCidades.vue'
import CardCidadeDetalhada from '../components/CardCidadeDetalhada.vue'

export default {
  name: 'MainView',

  components: {
    listaCidades,
    CardCidadeDetalhada
  },

  data() {
    return {
      cidadeSelecionada: {},
      absoluteBreakpoint: false
    }
  },

  computed: {
    listaMobile () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },

  mounted () {
    this.onResize()
  },

  methods: {
    onResize () {
      this.absoluteBreakpoint = window.innerWidth > 1225
    }
  }
}
</script>

<style lang="sass" scoped>
#main-view
  display: flex
  height: 100%
  overflow: hidden

.lista-cidades-absolute
  position: absolute
  top: 10px
  left: 10px

#cidade-detalhada
  // margin: auto !important 
</style>