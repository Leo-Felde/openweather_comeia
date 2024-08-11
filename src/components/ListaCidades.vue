<template>
  <v-card
    id="lista-cidades"
    :width="width"
    :heigth="heigth"
  >
    <card-cidade-resumida
      v-for="cidade in cidadesSelecionadas"
      :ref="`cidade-resumo-${cidade.id}`"
      :key="cidade.id"
      :cidade="cidade"
      :selecionada="cidade.id === value.id"
      :disabled="adicionandoCidades"
      @click="updateCidadeSelecionada"
      @remover="removerCidade(cidade)"
    />
    <div
      v-if="cidadesSelecionadas.length < 5"
      v-ripple="false"
      class="card-cidade-nova"
      outlined
      @click="AdicionarCidade"
    >
      <div
        v-if="adicionandoCidades"
        class="d-flex"
      >
        <autocomplete-cidade
          v-model="novaCidade"
          @input="adicionarNovaCidade"
        />
        
        <v-btn
          class="ml-sm-2 mt-sm-1"
          color="red"
          fab
          x-small
          dark
          elevation="1"
          @click.stop.prevent="cancelarAdicionarCidade"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </div>
      <div v-else>
        Adicionar Cidade
        <v-icon color="primary">
          mdi-plus
        </v-icon>
      </div>
    </div>
  </v-card>
</template>

<script>
import autocompleteCidade from './AutocompleteCidade'
import cardCidadeResumida from './CardCidadeResumida.vue'

export default {
  name: 'ListaCidades',
  
  components: {
    autocompleteCidade,
    cardCidadeResumida
  },

  props: {
    value: {
      type: Object,
      default: () => ({})
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

  data () {
    return {
      novaCidade: {},
      cidadesSelecionadas: [],
      adicionandoCidades: false,
      nomeCidade: ''
    }
  },
   
  methods: {
    AdicionarCidade () {
      if (this.adicionandoCidades) return

      this.adicionandoCidades = true
    },

    adicionarNovaCidade (cidade) {
      this.cidadesSelecionadas.push({ ...cidade, id: this.cidadesSelecionadas.length + 1 })

      if (this.cidadesSelecionadas.length === 1) {
        setTimeout(() => {
          this.$refs['cidade-resumo-1'][0].selecionarCidade()
        }, 500)
      }

      this.cancelarAdicionarCidade()
    },

    cancelarAdicionarCidade () {
      this.adicionandoCidades = false
      this.novaCidade = {}
    },

    updateCidadeSelecionada (cidade) {
      this.$emit('input', cidade)
    },

    removerCidade (cidade) {
      if (!cidade?.id) return

      const indexCidade = this.cidadesSelecionadas.findIndex(cidadeSel => cidadeSel.id === cidade.id)
      if (indexCidade < 0) return
      
      this.cidadesSelecionadas.splice(indexCidade, 1)

      if (!this.cidadesSelecionadas.length) {
        this.updateCidadeSelecionada({})
      } else if (this.value.id === cidade.id) {
        this.$refs['cidade-resumo-1'][0].selecionarCidade()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
#lista-cidades
  min-width: 300px
  width: 20vw
  max-width: 400px
  padding: 10px !important
  display: flex
  flex-direction: column

</style>
