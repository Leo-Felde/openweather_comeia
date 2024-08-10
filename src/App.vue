<template>
  <v-app>
    <v-main>
      <div class="content">
        <lista-cidades v-model="cidadeSelecionada" />
        <card-cidade-detalhada
          :cidade="cidadeSelecionada"
        />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import listaCidades from './components/ListaCidades.vue'
import CardCidadeDetalhada from './components/CardCidadeDetalhada.vue'

export default {
  name: 'App',

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
.content
  display: flex
  height: 100%

#lista-cidades
  position: absolute
  top: 10px
  left: 10px

#cidade-detalhada
  margin: auto !important
</style>