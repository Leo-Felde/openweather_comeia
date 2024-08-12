import axios from 'axios'

const appURL = 'http://api.openweathermap.org'
const apiKey = process.env.VUE_APP_OWM_KEY

const createAPI = (serviceName) => {
  const baseURL = `${appURL}/${serviceName}`
  const api = axios.create({
    baseURL,
  })
  console.log(`## - apiKey: ${apiKey}`)
  api.interceptors.request.use((config) => {
    config.params = config.params || {}
    
    config.params['appid'] = apiKey

    return config
  })

  return api
}

export default createAPI
