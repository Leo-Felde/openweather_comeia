<template>
  <v-app>
    <v-main>
      <div class="content">
        <main-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import MainView from './views/Main.vue'

export default {
  name: 'App',

  components: {
    MainView,
  }
}
</script>

<style lang="sass" scoped>
.content
  height: 100%
</style>