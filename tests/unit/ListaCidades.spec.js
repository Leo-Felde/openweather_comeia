import { shallowMount } from '@vue/test-utils'
import ListaCidades from '@/components/ListaCidades.vue'
import AutocompleteCidade from '@/components/AutocompleteCidade.vue'
import CardCidadeResumida from '@/components/CardCidadeResumida.vue'

describe('ListaCidades.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ListaCidades, {
      propsData: {
        value: {},
      },
      stubs: {
        AutocompleteCidade,
        CardCidadeResumida,
      },
    })
  })

  it('Renderiza corretamente a lista de cidades', () => {
    expect(wrapper.findComponent({ name: 'v-card' }).exists()).toBe(true)
    expect(wrapper.findAllComponents(CardCidadeResumida).length).toBe(wrapper.vm.cidadesSelecionadas.length)
  })

  it('Adiciona uma nova cidade corretamente', async () => {
    wrapper.setData({ novaCidade: { name: 'Rebouças', id: 1 } })

    await wrapper.vm.adicionarNovaCidade(wrapper.vm.novaCidade)

    expect(wrapper.vm.cidadesSelecionadas.length).toBe(1)
    expect(wrapper.vm.cidadesSelecionadas[0].name).toBe('Rebouças')
  })

  it('Cancela a adição de uma nova cidade', async () => {
    wrapper.setData({ adicionandoCidades: true })

    await wrapper.vm.cancelarAdicionarCidade()

    expect(wrapper.vm.adicionandoCidades).toBe(false)
    expect(wrapper.vm.novaCidade).toEqual({})
  })

  it('Remove uma cidade corretamente', async () => {
    const mockCidades = [
      { name: 'Rebouças', id: 1 },
      { name: 'Curitiba', id: 2 }
    ]

    wrapper.setData({ cidadesSelecionadas: mockCidades })

    await wrapper.vm.removerCidade(mockCidades[0])

    expect(wrapper.vm.cidadesSelecionadas.length).toBe(1)
    expect(wrapper.vm.cidadesSelecionadas[0].name).toBe('Curitiba')
  })

  it('Atualiza cidade selecionada corretamente', async () => {
    const mockCity = { name: 'Curitiba', id: 2 }

    await wrapper.vm.updateCidadeSelecionada(mockCity)

    expect(wrapper.emitted().input[0]).toEqual([mockCity])
  })

  it('Habilita a adição de nova cidade ao clicar no botão correspondente', async () => {
    await wrapper.vm.AdicionarCidade()

    expect(wrapper.vm.adicionandoCidades).toBe(true)
  })

  it('Adiciona nova cidade utilizando AutocompleteCidade', async () => {
    wrapper.setData({ adicionandoCidades: true })
    
    await wrapper.vm.$nextTick()

    const autocomplete = wrapper.findComponent({ name: 'AutocompleteCidade' })
    expect(autocomplete.exists()).toBe(true)

    autocomplete.vm.$emit('input', { name: 'Curitiba', id: 3 })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.cidadesSelecionadas.length).toBe(1)
    expect(wrapper.vm.cidadesSelecionadas[0].name).toBe('Curitiba')
  })

  it('Renderiza CardCidadeResumida corretamente', async () => {
    const mockCidades = [
      { name: 'Rebouças', id: 1 },
      { name: 'Curitiba', id: 2 },
    ]

    wrapper.setData({ cidadesSelecionadas: mockCidades })

    await wrapper.vm.$nextTick()

    const cards = wrapper.findAllComponents(CardCidadeResumida)
    expect(cards.length).toBe(mockCidades.length)
    expect(cards.at(0).props('cidade')).toEqual(mockCidades[0])
    expect(cards.at(1).props('cidade')).toEqual(mockCidades[1])
  })
})
