import createAPI from './index'

const appUrl = 'geo/1.0'
const api = createAPI(appUrl)

export const getCidade = async (nome) => {
  try {
    const response = await api.get('/direct', {
      params: {
        q: nome,
        limit: 10,
      },
    })
    return response
  } catch (error) {
    return error
  }
}
