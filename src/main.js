import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import snackbarPlugin from './plugins/snackbar'
import store from './store'

Vue.config.productionTip = false
Vue.use(snackbarPlugin, { store })

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
