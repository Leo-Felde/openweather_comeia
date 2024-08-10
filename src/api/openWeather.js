
import createAPI from './index'

const apiUrl = 'data/2.5'

const api = createAPI(apiUrl)

export const getClima = async (options) => {
  try {
    const response = await api.get('weather', { params: { ...options, units: 'metric', lang: 'pt_br' } })
    return response
  } catch (error) {
    console.error('Erro ao obter clima da cidade', error)
    throw error
  }
}

export const getPrevisao = async (options) => {
  try {
    const response = await api.get('forecast', { params: { ...options, units: 'metric', lang: 'pt_br' } })
    return response
  } catch (error) {
    console.error('Erro ao obter previsão:', error)
    throw error
  }
}