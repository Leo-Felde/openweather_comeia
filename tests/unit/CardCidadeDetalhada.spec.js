import { shallowMount } from '@vue/test-utils'
import { vuetify } from './setup'

import CardCidadeDetalhada from '@/components/CardCidadeDetalhada.vue'
import { getPrevisao } from '@/api/openWeather.js'

jest.mock('@/api/openWeather.js', () => ({
  getPrevisao: jest.fn(),
}))

describe('CardCidadeDetalhada.vue', () => {
  let wrapper
  const cidadeMock = {
    id: 1,
    name: 'Rebouças',
    lat: -25.6259339,
    lon: -50.6946598,
    state: 'Paraná',
    weather: [{ icon: '04d', description: 'nublado' }],
    main: { temp: 25.5 },
    wind: { speed: 10, deg: 180 }
  }

  beforeEach(() => {
    wrapper = shallowMount(CardCidadeDetalhada, {
      vuetify,
      propsData: {
        cidade: cidadeMock
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Renderiza corretamente com as informações da cidade', () => {
    expect(wrapper.find('#city-name').text()).toBe('Clima para Rebouças')
    expect(wrapper.find('#weather-temp').text()).toBe('25.5°C')
    expect(wrapper.find('#weather-desc').text()).toContain('nublado')
    expect(wrapper.find('#weather-wind').text()).toContain('vento: 10km/h sul')
  })

  it('Mostra mensagem de seleção quando a cidade não está definida', async () => {
    await wrapper.setProps({ cidade: {} })
    expect(wrapper.text()).toContain('Selecione uma cidade para começar')
  })

  it('Chama API para buscar a previsão do tempo', async () => {
    const previsaoMock = {
      list: [
        { dt_txt: '2023-08-10 12:00:00', main: { temp: 20.0 }, weather: [{ icon: '01d' }] },
        { dt_txt: '2023-08-10 15:00:00', main: { temp: 21.5 }, weather: [{ icon: '01d' }] }
      ]
    }

    getPrevisao.mockResolvedValueOnce({ data: previsaoMock })

    await wrapper.vm.fetchPrevisao()

    expect(getPrevisao).toHaveBeenCalledWith({ lat: cidadeMock.lat, lon: cidadeMock.lon })
    expect(wrapper.vm.previsao).toEqual(previsaoMock.list)
    expect(wrapper.findComponent({ name: 'ChartClima' }).exists()).toBe(true)
  })

  it('Formata corretamente a direção do vento', () => {
    expect(wrapper.vm.formatarDirecaoVento(0)).toBe('norte')
    expect(wrapper.vm.formatarDirecaoVento(180)).toBe('sul')
    expect(wrapper.vm.formatarDirecaoVento(90)).toBe('leste')
    expect(wrapper.vm.formatarDirecaoVento(270)).toBe('oeste')
  })

  it('Lida corretamente com erro ao buscar previsão do tempo', async () => {
    getPrevisao.mockRejectedValueOnce(new Error('Erro ao buscar dados'))
    console.error = jest.fn()

    await wrapper.vm.fetchPrevisao()

    expect(wrapper.vm.previsao).toEqual([])
    expect(console.error).toHaveBeenCalledWith(
      'Não foi possível obter os dados da cidade Rebouças:',
      expect.any(Error)
    )
  })
})
