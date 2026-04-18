<template>
    <v-container>
        <h1>{{ $t('content.pages.settings') }}</h1>
        <v-row class="mt-5">
            <v-col cols="12" md="6">
                <v-select v-model="currentCurrency" :items="currencies" item-title="name" item-value="code"
                    :label="$t('content.settings.currency')" density="compact" variant="outlined" />
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref, computed, watch } from 'vue'

const currencies = ref([
    { code: 'lei', name: 'Lei' },
    { code: 'dollars', name: 'Dollars' },
    { code: 'euro', name: 'Euro' },
    { code: 'гривна', name: 'Гривна' },
])

const STORAGE_KEY_CURRENCY = 'app-currency'

const currentCurrency = ref(localStorage.getItem(STORAGE_KEY_CURRENCY) || 'lei')

watch(currentCurrency, (newValue) => {
    console.log('Currency changed to:', newValue)
    localStorage.setItem(STORAGE_KEY_CURRENCY, newValue)
})
</script>
<style lang="scss" scoped></style>