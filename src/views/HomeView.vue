<template>
    <v-container class="mt-5">
        <v-row>
            <v-col cols="12" sm="6">
                <v-select v-model="form.method" hide-details="auto" :label="$t('content.select.method.label')"
                    :items="methodOptions" item-title="label" item-value="value" />
            </v-col>
            <v-col cols="12" sm="6" v-if="form.method === 'route'">
                <v-text-field v-model="form.fuel_distance" hide-details="auto" :label="$t('content.text.distance.label')"
                    prepend-inner-icon="mdi-map-marker" :suffix="t('content.units.km')" v-input-mask="mask"
                    @click:prepend-inner="goToMap" />
            </v-col>
            <v-col cols="12" sm="6" v-if="form.method !== 'route'">
                <v-text-field v-model="form.input" hide-details="auto" :label="inputLabel" :suffix="inputSuffix"
                    v-input-mask="mask" />
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.fuel_price" hide-details="auto" :label="t('content.input.price.label')" :suffix="t('content.input.price.suffix')"
                    v-input-mask="mask" />
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.fuel_consumption" hide-details="auto" :label="t('content.input.consumption.label')"
                    :suffix="t('content.input.consumption.suffix')" v-input-mask="mask" />
            </v-col>
            <v-col cols="12">
                <v-card class="result-card pa-3" color="#1E1E1E">
                    <v-card-text class="text-center py-2">
                        <div v-for="(line, index) in resultLines" :key="index"
                            class="result-line d-flex align-center justify-center">
                            <v-icon :icon="index === 0 ? 'mdi-gas-station' : 'mdi-currency-usd'" class="mr-2"
                                color="#4CAF50" />
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
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Inputmask from 'inputmask';

const { t } = useI18n();
const STORAGE_KEY = 'calc-trip-form';

const methodOptions = computed(() => [
    { value: 'route', label: t('content.select.method.options.route') },
    { value: 'fuel', label: t('content.select.method.options.fuel') },
    { value: 'amount', label: t('content.select.method.options.amount') }
]);

const methodValueMap = {
    route: 'route',
    fuel: 'fuel',
    amount: 'amount',
    'По пройденному расстоянию': 'route',
    'По литрам топлива': 'fuel',
    'Потраченная сумма': 'amount',
    'By distance traveled': 'route',
    'By liters of fuel': 'fuel',
    'By amount spent': 'amount',
    'După distanța parcursă': 'route',
    'După litri de combustibil': 'fuel',
    'După suma cheltuită': 'amount'
};

const normalizeMethod = (value) => {
    return methodValueMap[value] || 'route';
};

const router = useRouter();

const goToMap = () => {
    router.push('/map');
}

// Восстановление данных из localStorage
const saved = localStorage.getItem(STORAGE_KEY);
const form = reactive(
    saved
        ? (() => {
            const parsed = JSON.parse(saved);
            return {
                fuel_price: parsed.fuel_price ?? 23.05,
                input: parsed.input ?? 10,
                fuel_consumption: parsed.fuel_consumption ?? 5.7,
                fuel_distance: parsed.fuel_distance ?? 150,
                method: normalizeMethod(parsed.method)
            };
        })()
        : {
            fuel_price: 23.05,
            input: 10,
            fuel_consumption: 5.7,
            fuel_distance: 150,
            method: 'route'
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

// Конфигурация маски
const mask = {
    alias: 'numeric',
    rightAlign: false,
    groupSeparator: '',
    autoGroup: true,
    radixPoint: '.',
    digits: 2,
    allowMinus: false,
    placeholder: '0',
};

// Обновляем helper для парсинга чисел
const toNum = v => Number(String(v).replace(/\s/g, '')) || 0;

// dynamic label/suffix for the universal input
const inputLabel = computed(() => {
    if (form.method === 'amount') return t('content.input.amount.label');
    if (form.method === 'route') return t('content.text.distance.label');
    return t('content.input.fuel.label');
});
const inputSuffix = computed(() => {
    return form.method === 'amount' ? t('content.units.lei') : t('content.units.liters');
});

const result = computed(() => {
    const price = toNum(form.fuel_price);
    const value = toNum(form.input);
    const consumption = toNum(form.fuel_consumption);
    const distance = toNum(form.fuel_distance);

    switch (form.method) {
        case 'route':
            const litersUsed = (consumption / 100) * distance;
            const cost = litersUsed * price;
            return t('content.result.route', { liters: litersUsed.toFixed(2), cost: cost.toFixed(2) });

        case 'fuel':
            const possibleDistance = consumption > 0 ? (value / consumption) * 100 : 0;
            const costFromLiters = value * price;
            return t('content.result.fuel', {
                value: value.toFixed(2),
                distance: possibleDistance.toFixed(2),
                cost: costFromLiters.toFixed(2)
            });

        case 'amount':
            const litersFromMoney = price > 0 ? (value / price) : 0;
            const distanceFromMoney = consumption > 0 ? (litersFromMoney / consumption) * 100 : 0;
            return t('content.result.amount', {
                value: value.toFixed(2),
                liters: litersFromMoney.toFixed(2),
                distance: distanceFromMoney.toFixed(2)
            });

        default:
            return t('content.result.default');
    }
});

const resultLines = computed(() => {
    return result.value.split('\n').map(line => line.trim());
});
</script>

<script>
export default {
    directives: {
        inputMask: {
            mounted(el, binding) {
                const input = el.querySelector('input');
                if (input) {
                    const im = new Inputmask(binding.value);
                    im.mask(input);
                }
            },
            updated(el, binding) {
                const input = el.querySelector('input');
                if (input) {
                    input.value = el.querySelector('input').value;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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
