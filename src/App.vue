<template>
  <v-app>
    <v-main>
      <v-app-bar
        elevation="1"
        absolute
      >
        🐝
        <v-toolbar-title>
          Clima comeia
        </v-toolbar-title>
        <v-spacer />
        <theme-button />
      </v-app-bar>
      <div class="content mt-16">
        <main-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import MainView from './views/Main.vue'
import ThemeButton from './components/ThemeButton.vue'

export default {
  name: 'App',

  components: {
    MainView,
    ThemeButton
  }
}
</script>

<style lang="sass" scoped>
.content
  height: 100%
</style>