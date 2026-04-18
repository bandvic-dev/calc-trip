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
        copyright: '© {year} Andrei Balanco'
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
            route: 'Витрата: {liters} літрів. Вартість: {cost} {currency}.',
            fuel: 'За {value} літрів можна проїхати {distance} км. Вартість: {cost} {currency}.',
            amount: 'За {value} {currency} ви отримаєте {liters} літрів. Можна проїхати {distance} км.',
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
            currency: 'Валюта'
        },
        units: {
            km: 'км',
            liters: 'літрів',
            lei: 'лей'
        }
    }
}
