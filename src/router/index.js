import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import AboutView from '../views/AboutView.vue'
import SetingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SetingsView
    }
  ]
})

export default router
