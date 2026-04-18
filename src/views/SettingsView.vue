<template>
    <v-container>
        <h1>{{ $t('content.pages.settings') }}</h1>
        <v-row class="mt-5">
            <v-col cols="12" md="6">
                <v-select v-model="currentLanguage" :items="languages" item-title="name" item-value="code"
                    :label="$t('common.language')" density="compact" variant="outlined">
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
            <v-col cols="12" md="6">
                <v-select v-model="currentCurrency" :items="currencies" item-title="name" item-value="code"
                    :label="$t('content.settings.currency')" density="compact" variant="outlined" />
            </v-col>
            <v-col cols="12" md="6">
                <v-select v-model="currentUnits" :items="unitsOptions" item-title="name" item-value="code"
                    :label="$t('content.settings.units')" density="compact" variant="outlined" />
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const languages = ref([
    { code: 'ru', name: 'Русский', flagClass: 'fi fi-ru' },
    { code: 'en', name: 'English', flagClass: 'fi fi-us' },
    { code: 'ro', name: 'Română', flagClass: 'fi fi-ro' },
    { code: 'uk', name: 'Українська', flagClass: 'fi fi-ua' },
])

const currencies = ref([
    { code: 'L', name: 'Lei' },
    { code: '$', name: 'Dollars' },
    { code: '€', name: 'Euro' },
    { code: '₴', name: 'Гривна' },
])

const unitsOptions = computed(() => [
    { code: 'metric', name: t('content.settings.unitOptions.metric') },
    { code: 'imperial', name: t('content.settings.unitOptions.imperial') },
])

const STORAGE_KEY_LANGUAGE = 'app-language'
const STORAGE_KEY_CURRENCY = 'app-currency'
const STORAGE_KEY_UNITS = 'app-units'

const currentLanguage = ref(localStorage.getItem(STORAGE_KEY_LANGUAGE) || 'ru')
const currentCurrency = ref(localStorage.getItem(STORAGE_KEY_CURRENCY) || 'L')
const currentUnits = ref(localStorage.getItem(STORAGE_KEY_UNITS) || 'metric')

watch(currentLanguage, (newValue) => {
    console.log('Language changed to:', newValue)
    locale.value = newValue
    localStorage.setItem(STORAGE_KEY_LANGUAGE, newValue)
})

watch(currentCurrency, (newValue) => {
    console.log('Currency changed to:', newValue)
    localStorage.setItem(STORAGE_KEY_CURRENCY, newValue)
})

watch(currentUnits, (newValue) => {
    console.log('Units changed to:', newValue)
    localStorage.setItem(STORAGE_KEY_UNITS, newValue)
})
</script>
<style lang="scss" scoped>
.language-selector {
    max-width: 160px;
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
</style>