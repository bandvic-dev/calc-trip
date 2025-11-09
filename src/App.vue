<template>
  <v-app theme="dark">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
// Component logic goes here
</script>

<style lang="scss">
:root {
  color-scheme: dark;
}

body {
  background-color: #121212;
  color: rgba(255, 255, 255, 0.87);
}
</style>
