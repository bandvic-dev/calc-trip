<template>
  <v-app theme="dark">
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer class="text-center" color="transparent" app>
      <span class="copyright">
        © {{ new Date().getFullYear() }} 
        <a href="https://bandvic.vercel.app/" target="_blank" class="copyright-link">Andrei Balanco</a>
      </span>
    </v-footer>
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

.copyright {
  width: 100%;
  font-size: 0.9rem;
  opacity: 0.7;
}

.copyright-link {
  color: #4caf50;
  text-decoration: none;
}
</style>
