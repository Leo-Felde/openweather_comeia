<template>
  <div id="main-view">
    <lista-cidades v-model="cidadeSelecionada" />
    <card-cidade-detalhada
      :cidade="cidadeSelecionada"
    />
  </div>
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
      cidadeSelecionada: {}
    }
  },
}
</script>

<style lang="sass" scoped>
#main-view
  display: flex
  height: 100%

#lista-cidades
  position: absolute
  top: 10px
  left: 10px

#cidade-detalhada
  margin: auto !important
</style>