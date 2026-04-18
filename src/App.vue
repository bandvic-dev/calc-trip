<template>
    <v-app theme="dark">
        <v-toolbar class="toolbar" density="compact">
            <v-container>
                <v-row class="align-center">
                    <v-col cols="2" class="d-flex align-center">
                        <router-link to="/" class="toolbar-title">
                            <img src="/logo-mini.png" alt="Calc Trip" class="toolbar-logo" />
                            <span>Calc Trip</span>
                        </router-link>
                    </v-col>
                    <v-col cols="8" class="d-flex align-center justify-center">
                        <nav class="navigation">
                            <router-link to="/" class="nav-link">{{ $t('nav.home') }}</router-link>
                            <router-link to="/map" class="nav-link">{{ $t('nav.map') }}</router-link>
                        </nav>
                    </v-col>
                    <v-col cols="2" class="d-flex align-center justify-end">
                        <v-select v-model="currentLanguage" :items="languages" item-title="name" item-value="code"
                            density="compact" variant="outlined" hide-details class="language-selector">
                            <template #item="{ item, props }">
                                <v-list-item v-bind="props" title="">
                                    <span :class="item.raw.flagClass"></span> {{ item.raw.name }}
                                </v-list-item>
                            </template>
                            <template #selection="{ item }">
                                <span :class="item.raw.flagClass"></span> {{ item.raw.name }}
                            </template>
                        </v-select>
                    </v-col>
                    <!-- <v-col cols="1" class="d-flex align-center">
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn class="toolbar-button" v-bind="props" icon="mdi-dots-vertical" />
                            </template>

                            <v-list>
                                <v-list-item v-for="item in toolbarMenu" :key="item.key" :to="item.link || null"
                                    :title="$t(item.translationKey)" link />
                            </v-list>
                        </v-menu>
                    </v-col> -->
                </v-row>
            </v-container>
        </v-toolbar>
        <v-main>
            <router-view></router-view>
        </v-main>
        <v-footer class="text-center" color="transparent" app>
            <span class="copyright">
                {{ $t('footer.copyright', { year: new Date().getFullYear() }) }}
                <a href="https://bandvic.vercel.app/" target="_blank" class="copyright-link">Andrei Balanco</a>
            </span>
        </v-footer>
    </v-app>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// Update document title on locale change
watch(locale, () => {
    document.title = t('common.title')
})

onMounted(() => {
    document.title = t('common.title')
})

const languages = ref([
    { code: 'ru', name: 'Рус', flagClass: 'fi fi-ru' },
    { code: 'en', name: 'Eng', flagClass: 'fi fi-us' },
    { code: 'ro', name: 'Rom', flagClass: 'fi fi-ro' },
    { code: 'uk', name: 'Укр', flagClass: 'fi fi-ua' },
])

const STORAGE_KEY = 'app-language'

const currentLanguage = computed({
    get: () => locale.value,
    set: (value) => {
        locale.value = value
        localStorage.setItem(STORAGE_KEY, value)
    }
})

const changeLanguage = (newLang) => {
    locale.value = newLang
    localStorage.setItem(STORAGE_KEY, newLang)
}

const toolbarMenu = ref([
    { key: 'settings', translationKey: 'menu.settings', link: '/settings' },
    { key: 'about', translationKey: 'menu.about', link: '/about' },
    { key: 'clearData', translationKey: 'menu.clearData' }
])
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

.toolbar-title {
    display: inline-flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.95);
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
}

.toolbar-logo {
    width: 28px;
    height: 28px;
    margin-right: 10px;
}

.language-selector {
    max-width: 120px;
    margin-right: 10px;
}

.language-selector span {
    margin-right: 5px;
    display: inline-block;
}

.fi {
    width: 20px;
    height: 15px;
    margin-right: 5px;
}

.language-selector .v-field {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
}

.language-selector .v-field:hover {
    border-color: #4caf50;
}

.language-selector .v-field__input {
    color: rgba(255, 255, 255, 0.87);
}

.language-selector .v-list-item {
    white-space: nowrap;
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
