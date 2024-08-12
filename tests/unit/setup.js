import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  breakpoint: {
    smAndDown: false,
    mdAndUp: true,
  },
  theme: {
    dark: false
  },
})

Vue.prototype.$vuetify = vuetify.framework

export { vuetify }
