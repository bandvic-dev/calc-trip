export default {
    nav: {
        home: 'Home',
        map: 'Map'
    },
    menu: {
        settings: 'Settings',
        about: 'About',
        clearData: 'Clear Data'
    },
    footer: {
        copyright: '© {year} Andrei Balanco'
    },
    common: {
        language: 'Language',
        selectLanguage: 'Select language',
        title: 'Trip Calculator'
    },
    content: {
        select: {
            method: {
                label: 'Select calculation method',
                options: {
                    route: 'By distance traveled',
                    fuel: 'By liters of fuel',
                    amount: 'By amount spent'
                }
            }
        },
        input: {
            price: {
                label: 'Fuel price',
                suffix: 'lei/liter'
            },
            consumption: {
                label: 'Average fuel consumption',
                suffix: 'L/100km'
            },
            fuel: {
                label: 'Liters of fuel'
            },
            amount: {
                label: 'Amount spent'
            }
        },
        text: {
            distance: {
                label: 'Distance traveled',
            }
        },
        result: {
            route: 'Consumption: {liters} liters. Cost: {cost} {currency}.',
            fuel: 'For {value} liters you can drive {distance} km. Cost: {cost} {currency}.',
            amount: 'For {value} {currency} you get {liters} liters. You can drive {distance} km.',
            default: 'Select calculation method'
        },
        map: {
            distance: 'Distance',
            clear: 'Clear',
            close: 'Close',
            addressNotFound: 'Address not found'
        },
        pages: {
            about: 'About',
            settings: 'Settings'
        },
        settings: {
            currency: 'Currency'
        },
        units: {
            km: 'km',
            liters: 'liters',
            lei: 'lei'
        }
    }
}