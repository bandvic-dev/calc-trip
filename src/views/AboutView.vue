<template>
    <v-container>
        <h1>{{ $t('content.pages.about') }}</h1>
        <p>Калькулятор расхода топлива — это удобное приложение для быстрого расчета затрат на поездки. Оно помогает определить расход топлива на заданное расстояние, рассчитать стоимость поездки по потраченным деньгам или узнать, сколько топлива было израсходовано.</p>
        <p>Приложение подойдет как для повседневного использования, так и для водителей, которые хотят точно контролировать свои расходы.</p>
        <strong>Возможности:</strong>
        <ul>
            <li>расчет расхода топлива на дистанцию</li>
            <li>расчет стоимости поездки</li>
            <li>расчет по количеству литров</li>
            <li>простой и понятный интерфейс</li>
        </ul>

        <p>Разработка: <a href="https://bandvic.vercel.app" target="_blank">Andrei Balanco</a></p>

        <p>Подписывайтесь на Telegram-канал:</p>
        <a href="https://t.me/calc_trip" target="_blank">https://t.me/calc_trip</a>
    </v-container>
</template>
<script setup></script>
<style lang="scss" scoped>
p {
    margin-bottom: 16px;
}
ul {
    margin-left: 20px;
    margin-bottom: 16px;
    margin-top: 16px;
}

a {
    color: #4caf50;
    text-decoration: none;
}
</style>