<template>
  <v-app>
    <v-main>
      <v-app-bar
        elevation="1"
        color="white"
        absolute
      >
        🐝
        <v-toolbar-title>
          Clima comeia
        </v-toolbar-title>
      </v-app-bar>
      <div class="content mt-16">
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