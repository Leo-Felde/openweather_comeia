import { shallowMount } from '@vue/test-utils'
import { vuetify } from './setup'

import CardCidadeResumida from '@/components/CardCidadeResumida.vue'
import { getClima } from '@/api/openWeather.js'

jest.mock('@/api/openWeather.js', () => ({
  getClima: jest.fn(),
}))

describe('CardCidadeResumida.vue', () => {
  let wrapper
  const cidadeMock = {
    id: 1,
    name: 'Rebouças',
    lat: -25.6259339,
    lon: -50.6946598,
    state: 'Paraná'
  }
  const climaMock = {
    weather: [{ icon: '04d' }],
    main: { temp: 25.5 }
  }

  beforeEach(() => {
    wrapper = shallowMount(CardCidadeResumida, {
      vuetify,
      propsData: {
        cidade: cidadeMock,
        selecionada: false
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Renderiza corretamente com skeleton loader quando clima ainda está sendo carregado', () => {
    expect(wrapper.findComponent({ name: 'v-skeleton-loader' }).exists()).toBe(true)
    expect(wrapper.find('.cidade-info').exists()).toBe(false)
  })

  it('Renderiza corretamente com informações do clima após carregar', async () => {
    getClima.mockResolvedValueOnce({ data: climaMock })
    
    await wrapper.vm.fetchClima()

    expect(wrapper.vm.clima).toEqual(climaMock)
    expect(wrapper.find('.cidade-info').text()).toContain('Rebouças')
    expect(wrapper.find('.cidade-clima .temp').text()).toBe('25.5°C')
    expect(wrapper.findComponent({ name: 'v-skeleton-loader' }).exists()).toBe(false)
  })

  it('Emite evento "remover" quando o botão de remover é clicado', async () => {
    getClima.mockResolvedValueOnce({ data: climaMock })
    await wrapper.vm.fetchClima()

    const removerButton = wrapper.find('.btn-remover-cidade')
    expect(removerButton.exists()).toBe(true)

    await wrapper.vm.removerCidade()
    expect(wrapper.emitted().remover).toBeTruthy()
  })

  it('Emite evento "click" com dados da cidade e clima quando a cidade é selecionada', async () => {
    getClima.mockResolvedValueOnce({ data: climaMock })
    await wrapper.vm.fetchClima()
    
    wrapper.vm.selecionarCidade()

    expect(wrapper.emitted().click).toBeTruthy()
    expect(wrapper.emitted().click[0][0]).toEqual({ ...cidadeMock, ...climaMock })
  })
  
  it('Aplica classe "selected" corretamente quando a cidade está selecionada', async () => {
    await wrapper.setProps({ selecionada: true })
    expect(wrapper.classes()).toContain('selected')
  })

  it('Lida corretamente com erro ao buscar dados do clima', async () => {
    getClima.mockRejectedValueOnce(new Error('Erro ao buscar dados'))
    console.error = jest.fn()

    await wrapper.vm.fetchClima()

    expect(wrapper.vm.clima).toBeNull()
    expect(console.error).toHaveBeenCalledWith(
      'Não foi possível obter os dados da cidade Rebouças:',
      expect.any(Error)
    )
  })
})
