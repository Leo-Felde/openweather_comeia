<template>
  <v-img
    :src="`https://openweathermap.org/img/wn/${icon}.png`"
    :max-width="tamanhoImagem"
    class="weather-icon"
  />
</template>

<script>
export default {
  name: 'WeatherIcon',

  props: {
    icon: {
      type: String,
      default: null
    },

    size: {
      type: String,
      default: 'md',
      validator: function (value) {
        return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
      }
    }
  },

  computed: {
    tamanhoImagem: function () {
      switch (this.size) {
      case 'xs': return '8'
      case 'sm': return '16'
      case 'md': return '24'
      case 'lg': return '32'
      case 'xl': return '48'
      default: return '16'
      }
    }
  }
}
</script>