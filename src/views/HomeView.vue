<template>
    <v-container>
        <h1 class="mb-5">Расчитать раcход топлива</h1>
        <v-row>
            <v-col cols="12">
                <v-select v-model="form.method" hide-details="auto" label="Выбрать метод расчета"
                    :items="['По пройденному растоянию', 'По литрам топлива', 'Потраченная сумма']" />
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.fuel_price" hide-details="auto" label="Стоимость топлива" suffix="лей" />
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.input" hide-details="auto" :label="inputLabel" :suffix="inputSuffix" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.fuel_consumption" hide-details="auto" label="Средний расход топлива"
                    suffix="л/100км" />
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.fuel_distance" hide-details="auto" label="Пройденное расстояние"
                    suffix="км" />
            </v-col>
            <v-col cols="12" sm="6">
                <v-checkbox v-model="form.reverse_calculation" label="Обратный расчет" hide-details></v-checkbox>
            </v-col>
            <v-col cols="12">
                <div class="result">{{ result }}</div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { reactive, computed } from 'vue';

const form = reactive({
    fuel_price: 23.05,
    input: 10,
    fuel_consumption: 5.7,
    fuel_distance: 150,
    reverse_calculation: false,
    method: 'По пройденному растоянию'
});

// helper to parse numbers
const toNum = v => Number(v) || 0;

// dynamic label/suffix for the universal input
const inputLabel = computed(() => {
    if (form.method === 'Потраченная сумма') return 'Потраченная сумма';
    return 'Литры топлива';
});
const inputSuffix = computed(() => {
    return form.method === 'Потраченная сумма' ? 'лей' : 'л';
});

const result = computed(() => {
    const price = toNum(form.fuel_price);         // цена за литр
    const value = toNum(form.input);              // универсальное значение (литры или сумма)
    const consumption = toNum(form.fuel_consumption); // л/100км
    const distance = toNum(form.fuel_distance);   // км
    const rev = !!form.reverse_calculation;

    switch (form.method) {
        case 'По пройденному растоянию':
            if (!rev) {
                // вход: distance -> расход и стоимость
                const litersUsed = (consumption / 100) * distance;
                const cost = litersUsed * price;
                return `Расход: ${litersUsed.toFixed(2)} л.\n Стоимость: ${cost.toFixed(2)} лей.`;
            } else {
                // вход (универсальное поле): value = литры -> возможный пробег и стоимость
                const liters = value;
                const possibleDistance = consumption > 0 ? (liters / consumption) * 100 : 0;
                const cost = liters * price;
                return `На ${liters.toFixed(2)} л. можно проехать: ${possibleDistance.toFixed(2)} км.\n Стоимость: ${cost.toFixed(2)} лей.`;
            }

        case 'По литрам топлива':
            if (!rev) {
                // вход (универсальное поле): value = литры -> пробег и стоимость
                const liters = value;
                const possibleDistance = consumption > 0 ? (liters / consumption) * 100 : 0;
                const cost = liters * price;
                return `На ${liters.toFixed(2)} л. можно проехать: ${possibleDistance.toFixed(2)} км.\n Стоимость: ${cost.toFixed(2)} лей.`;
            } else {
                // вход: distance -> требуется литров и стоимость
                const litersNeeded = (consumption / 100) * distance;
                const cost = litersNeeded * price;
                return `Для ${distance.toFixed(2)} км потребуется: ${litersNeeded.toFixed(2)} л.\n Стоимость: ${cost.toFixed(2)} лей.`;
            }

        case 'Потраченная сумма':
            if (!rev) {
                // вход (универсальное поле): value = потраченная сумма -> литры и пробег
                const money = value;
                const litersFromMoney = price > 0 ? (money / price) : 0;
                const possibleDistance = consumption > 0 ? (litersFromMoney / consumption) * 100 : 0;
                return `За ${money.toFixed(2)} лей вы получите: ${litersFromMoney.toFixed(2)} л.\n Можно проехать: ${possibleDistance.toFixed(2)} км.`;
            } else {
                // вход: distance -> сколько потребуется денег
                const litersNeeded = (consumption / 100) * distance;
                const cost = litersNeeded * price;
                return `Для ${distance.toFixed(2)} км потребуется: ${litersNeeded.toFixed(2)} л.\n Стоимость: ${cost.toFixed(2)} лей.`;
            }

        default:
            return 'Выберите метод расчета';
    }
});
</script>

<style lang="scss" scoped>
// Component styles go here</style>
