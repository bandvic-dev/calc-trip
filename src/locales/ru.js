export default {
  nav: {
    home: 'Главная',
    map: 'Карта'
  },
  menu: {
    settings: 'Настройки',
    about: 'О приложении',
    clearData: 'Очистить данные'
  },
  footer: {
    copyright: '© {year} Copyright',
    telegram: 'Telegram'
  },
  common: {
    language: 'Язык',
    selectLanguage: 'Выберите язык',
    title: 'Калькулятор поездки'
  },
  content: {
    select: {
        method:  {
            label: 'Выберите метод расчета',
            options: {
                route: 'По пройденному расстоянию',
                fuel: 'По литрам топлива',
                amount: 'Потраченная сумма'
            }
        },
    },
    input: {
        price: {
            label: 'Стоимость топлива',
            suffix: 'лей/литр'
        },
        consumption: {
            label: 'Средний расход топлива',
            suffix: 'л/100км'
        },
        fuel: {
            label: 'Литры топлива'
        },
        amount: {
            label: 'Потраченная сумма'
        }
    },
    text: {
        distance:  {
            label: 'Пройденное расстояние',
        }
    },
    result: {
        route: 'Расход: {fuel} {fuelUnit}. Стоимость: {cost} {currency}.',
        fuel: 'На {value} {fuelUnit} можно проехать: {distance} {distanceUnit}. Стоимость: {cost} {currency}.',
        amount: 'За {value} {currency} вы получите: {fuel} {fuelUnit}. Можно проехать: {distance} {distanceUnit}.',
        default: 'Выберите метод расчета'
    },
    map: {
        distance: 'Дистанция',
        clear: 'Очистить',
        close: 'Закрыть',
        addressNotFound: 'Адрес не найден'
    },
    pages: {
        about: 'О приложении',
        settings: 'Настройки'
    },
    settings: {
        currency: 'Валюта',
        units: 'Единицы измерения',
        unitOptions: {
            metric: 'Метрическая (км, литры)',
            imperial: 'Имперская (мили, галлоны)'
        }
    },
    units: {
        km: 'км',
        liters: 'литров',
        lei: 'лей',
        gallons: 'галлонов',
        miles: 'миль'
    }
  }
}