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
    copyright: '© {year} Andrei Balanco'
  },
  common: {
    language: 'Язык',
    selectLanguage: 'Выберите язык'
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
        route: 'Расход: {liters} литров. Стоимость: {cost} лей.',
        fuel: 'На {value} литров можно проехать: {distance} км. Стоимость: {cost} лей.',
        amount: 'За {value} лей вы получите: {liters} литров. Можно проехать: {distance} км.',
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
    units: {
        km: 'км',
        liters: 'литров',
        lei: 'лей'
    }
  }
}