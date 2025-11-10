<template>
    <v-container>
        <h1 class="mb-5 text-center">Расчитать расход топлива</h1>
        <v-row>
            <v-col cols="12" sm="6">
                <v-select v-model="form.method" hide-details="auto" label="Выбрать метод расчета"
                    :items="['По пройденному растоянию', 'По литрам топлива', 'Потраченная сумма']" />
            </v-col>
            <v-col cols="12" sm="6" v-if="form.method === 'По пройденному растоянию'">
                <v-text-field v-model="form.fuel_distance" hide-details="auto" label="Пройденное расстояние"
                    suffix="км" />
            </v-col>
            <v-col cols="12" sm="6" v-if="form.method !== 'По пройденному растоянию'">
                <v-text-field v-model="form.input" hide-details="auto" :label="inputLabel" :suffix="inputSuffix" />
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.fuel_price" hide-details="auto" label="Стоимость топлива" suffix="лей/литр" />
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.fuel_consumption" hide-details="auto" label="Средний расход топлива"
                    suffix="л/100км" />
            </v-col>
            <v-col cols="12">
                <v-card class="result-card pa-3" color="#1E1E1E">
                    <v-card-text class="text-center py-2">
                        <div v-for="(line, index) in resultLines" :key="index" 
                             class="result-line d-flex align-center justify-center">
                            <v-icon :icon="index === 0 ? 'mdi-gas-station' : 'mdi-currency-usd'" 
                                   class="mr-2" color="#4CAF50" />
                            {{ line }}
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';

const STORAGE_KEY = 'calc-trip-form';

// Восстановление данных из localStorage
const saved = localStorage.getItem(STORAGE_KEY);
const form = reactive(
    saved
        ? JSON.parse(saved)
        : {
            fuel_price: 23.05,
            input: 10,
            fuel_consumption: 5.7,
            fuel_distance: 150,
            method: 'По пройденному растоянию'
        }
);

// Сохраняем данные при любом изменении
watch(
    form,
    (val) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    },
    { deep: true }
);

// helper to parse numbers
const toNum = v => Number(v) || 0;

// dynamic label/suffix for the universal input
const inputLabel = computed(() => {
    if (form.method === 'Потраченная сумма') return 'Потраченная сумма';
    return 'Литры топлива';
});
const inputSuffix = computed(() => {
    return form.method === 'Потраченная сумма' ? 'лей' : 'литров';
});

const result = computed(() => {
    const price = toNum(form.fuel_price);
    const value = toNum(form.input);
    const consumption = toNum(form.fuel_consumption);
    const distance = toNum(form.fuel_distance);

    switch (form.method) {
        case 'По пройденному растоянию':
            const litersUsed = (consumption / 100) * distance;
            const cost = litersUsed * price;
            return `Расход: ${litersUsed.toFixed(2)} литров.\n Стоимость: ${cost.toFixed(2)} лей.`;

        case 'По литрам топлива':
            const possibleDistance = consumption > 0 ? (value / consumption) * 100 : 0;
            const costFromLiters = value * price;
            return `На ${value.toFixed(2)} литров. можно проехать: ${possibleDistance.toFixed(2)} км.\n Стоимость: ${costFromLiters.toFixed(2)} лей.`;

        case 'Потраченная сумма':
            const litersFromMoney = price > 0 ? (value / price) : 0;
            const distanceFromMoney = consumption > 0 ? (litersFromMoney / consumption) * 100 : 0;
            return `За ${value.toFixed(2)} лей вы получите: ${litersFromMoney.toFixed(2)} литров.\n Можно проехать: ${distanceFromMoney.toFixed(2)} км.`;

        default:
            return 'Выберите метод расчета';
    }
});

const resultLines = computed(() => {
    return result.value.split('\n').map(line => line.trim());
});
</script>

<style lang="scss" scoped>
// Component styles go here
.result-card {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.result-line {
    font-size: 1rem;
    padding: 4px 0;
    color: #ffffff;
    letter-spacing: 0.5px;
    
    &:not(:last-child) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
}
</style>
