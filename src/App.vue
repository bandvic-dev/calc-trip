<template>
    <v-app theme="dark">
        <v-toolbar class="mb-5" density="compact" title="Calc Trip">
            <v-row>
                <v-col cols="11" class="d-flex align-center">
                    <nav class="navigation">
                        <router-link to="/" class="nav-link">Главная</router-link>
                        <router-link to="/map" class="nav-link">Карта</router-link>
                    </nav>
                </v-col>
                <v-col cols="1" class="d-flex align-center">
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn class="toolbar-button" v-bind="props" icon="mdi-dots-vertical" />
                        </template>

                        <v-list>
                            <v-list-item 
                                v-for="item in toolbarMenu" 
                                :key="item.title" 
                                :to="item.link || null"
                                :title="item.title" link 
                            />
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </v-toolbar>
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
import { ref } from 'vue';

const toolbarMenu = ref([
    { title: 'Настройки', link: '/settings' },
    { title: 'О приложении', link: '/about' },
    { title: 'Очистить данные' }
]);
</script>

<style lang="scss">
:root {
    color-scheme: dark;
}

body {
    background-color: #121212;
    color: rgba(255, 255, 255, 0.87);
}

.toolbar-button {
    width: 40px;
    height: 40px;
}

.navigation {
    display: flex;
    gap: 20px;
    margin-left: 20px;
}

.nav-link {
    color: rgba(255, 255, 255, 0.87);
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-size: 0.95rem;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #4caf50;
}

.nav-link.router-link-active {
    color: #4caf50;
    background-color: rgba(76, 175, 80, 0.1);
    border-bottom: 2px solid #4caf50;
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
