export default {
    nav: {
        home: 'Головна',
        map: 'Карта'
    },
    menu: {
        settings: 'Налаштування',
        about: 'Про застосунок',
        clearData: 'Очистити дані'
    },
    footer: {
        copyright: '© {year} Copyright',
        telegram: 'Telegram'
    },
    common: {
        language: 'Мова',
        selectLanguage: 'Оберіть мову',
        title: 'Калькулятор подорожі'
    },
    content: {
        select: {
            method: {
                label: 'Оберіть метод розрахунку',
                options: {
                    route: 'За пройденою відстанню',
                    fuel: 'За літрами палива',
                    amount: 'За витраченою сумою'
                }
            }
        },
        input: {
            price: {
                label: 'Ціна палива',
                suffix: 'лей/літр'
            },
            consumption: {
                label: 'Середня витрата палива',
                suffix: 'л/100км'
            },
            fuel: {
                label: 'Літри палива'
            },
            amount: {
                label: 'Витрачена сума'
            }
        },
        text: {
            distance: {
                label: 'Пройдена відстань',
            }
        },
        result: {
            route: 'Витрата: {fuel} {fuelUnit}. Вартість: {cost} {currency}.',
            fuel: 'За {value} {fuelUnit} можна проїхати {distance} {distanceUnit}. Вартість: {cost} {currency}.',
            amount: 'За {value} {currency} ви отримаєте {fuel} {fuelUnit}. Можна проїхати {distance} {distanceUnit}.',
            default: 'Оберіть метод розрахунку'
        },
        map: {
            distance: 'Відстань',
            clear: 'Очистити',
            close: 'Закрити',
            addressNotFound: 'Адресу не знайдено'
        },
        pages: {
            about: 'Про застосунок',
            settings: 'Налаштування'
        },
        settings: {
            currency: 'Валюта',
            units: 'Одиниці вимірювання',
            unitOptions: {
                metric: 'Метрична (км, літри)',
                imperial: 'Імперська (милі, галони)'
            }
        },
        units: {
            km: 'км',
            liters: 'літрів',
            lei: 'лей',
            gallons: 'галонів',
            miles: 'миль'
        }
    }
}
