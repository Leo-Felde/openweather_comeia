<template>
  <v-card
    id="lista-cidades"
    class="d-flex"
    :class="{'flex-column' : !vertical}"
    :width="width"
    :max-width="maxWidth"
    :heigth="heigth"
    :flat="flat"
    :color="transparent ? '#ffffff00' : '#fff'"
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
      :class="{ 'my-auto' : $vuetify.breakpoint.smAndDown }"
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
          class="ml-2 my-auto" 
          color="red"
          dark
          small
          rounded
          elevation="1"
          @click.stop.prevent="cancelarAdicionarCidade"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </div>
      <v-card
        v-else-if="$vuetify.breakpoint.mdAndUp"
        outlined
        class="py-2 pl-2 btn-add-cidade"
      >
        Adicionar Cidade
        <v-icon color="primary">
          mdi-plus
        </v-icon>
      </v-card>
      <v-btn
        v-else
        rounded
        dark
        small
        color="primary"
      >
        <v-icon> mdi-plus </v-icon>
      </v-btn>
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
    },
    maxWidth: {
      type: [String, Number],
      default: '400px'
    },
    flat: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
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
        }, 100)
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
  padding: 10px !important
  overflow: auto

.btn-add-cidade
  cursor: pointer
</style>
