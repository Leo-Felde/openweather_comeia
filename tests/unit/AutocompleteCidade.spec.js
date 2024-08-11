import { shallowMount } from '@vue/test-utils'
import AutocompleteCidade from '@/components/AutocompleteCidade.vue'
import { getCidade } from '@/api/geolocation.js'

jest.mock('@/api/geolocation.js', () => ({
  getCidade: jest.fn(),
}))

describe('AutocompleteCidade.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AutocompleteCidade, {
      propsData: {
        value: {},
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Renderizado corretamente', () => {
    expect(wrapper.findComponent({ name: 'v-autocomplete' }).exists()).toBe(true)
  })

  it('Atualiza cidadesEncontradas quando utilizar pesquisarCidade com input válido', async () => {
    const mockCities = [
      { name: 'Rebouças', lat: -25.6259339, lon: -50.6946598, country: 'BR', state: 'Paraná' },
      { name: 'Rebouças', lat: -27.0670403, lon: -53.1618767, country: 'BR', state: 'Santa Catarina' },
      { name: 'Rebouças', lat: -21.6600301, lon: -49.7574547, country: 'BR', state: 'São Paulo' },
    ]

    getCidade.mockResolvedValue({ data: mockCities })

    await wrapper.vm.pesquisarCidade('Reb')

    expect(wrapper.vm.carregandoCidades).toBe(false)
    expect(wrapper.vm.cidadesEncontradas).toEqual(mockCities)
  })

  it('Atualiza cidadesEncontradas quando utilizar pesquisarCidade com input inválido ', async () => {
    await wrapper.vm.pesquisarCidade('Re')
    expect(wrapper.vm.cidadesEncontradas).toEqual([])
  })

  it('Atualiza v-model cidadeSelecionada corretamente', async () => {
    wrapper.setData({ cidadeSelecionada: { name: 'Rebouças' } })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().input[0]).toEqual([{ name: 'Rebouças' }])
  })
})
