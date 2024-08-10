import axios from 'axios'

const appURL = 'http://api.openweathermap.org'
const apiKey = '8b11bc852b8cf3f301115623d1ef5dff'

const createAPI = (serviceName) => {
  const baseURL = `${appURL}/${serviceName}`
  const api = axios.create({
    baseURL,
  })

  api.interceptors.request.use((config) => {
    // Ensure that params is initialized if not present
    config.params = config.params || {}
    
    // Add the appid to the params instead of headers
    config.params['appid'] = apiKey

    return config
  })

  return api
}

export default createAPI
