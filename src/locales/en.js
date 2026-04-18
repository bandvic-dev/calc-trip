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
        copyright: '© {year} Copyright',
        telegram: 'Telegram'
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
            route: 'Consumption: {fuel} {fuelUnit}. Cost: {cost} {currency}.',
            fuel: 'For {value} {fuelUnit} you can drive {distance} {distanceUnit}. Cost: {cost} {currency}.',
            amount: 'For {value} {currency} you get {fuel} {fuelUnit}. You can drive {distance} {distanceUnit}.',
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
            currency: 'Currency',
            units: 'Units',
            unitOptions: {
                metric: 'Metric (km, liters)',
                imperial: 'Imperial (miles, gallons)'
            }
        },
        units: {
            km: 'km',
            liters: 'liters',
            lei: 'lei',
            gallons: 'gallons',
            miles: 'miles'
        }
    }
}