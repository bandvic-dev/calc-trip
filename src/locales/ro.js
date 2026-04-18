export default {
    nav: {
        home: 'Acasă',
        map: 'Hartă'
    },
    menu: {
        settings: 'Setări',
        about: 'Despre',
        clearData: 'Șterge datele'
    },
    footer: {
        copyright: '© {year} Copyright',
        telegram: 'Telegram'
    },
    common: {
        language: 'Limbă',
        selectLanguage: 'Selectați limba',
        title: 'Calculator de călătorie'
    },
    content: {
        select: {
            method: {
                label: 'Selectați metoda de calcul',
                options: {
                    route: 'După distanța parcursă',
                    fuel: 'După litri de combustibil',
                    amount: 'După suma cheltuită'
                }
            },
        },
        input: {
            price: {
                label: 'Preț combustibil',
                suffix: 'lei/litru'
            },
            consumption: {
                label: 'Consum mediu de combustibil',
                suffix: 'l/100km'
            },
            fuel: {
                label: 'Litri combustibil'
            },
            amount: {
                label: 'Suma cheltuită'
            }
        },
        text: {
            distance: {
                label: 'Distanța parcursă',
            }
        },
        result: {
            route: 'Consum: {fuel} {fuelUnit}. Cost: {cost} {currency}.',
            fuel: 'Pentru {value} {fuelUnit} poți parcurge {distance} {distanceUnit}. Cost: {cost} {currency}.',
            amount: 'Pentru {value} {currency} primești {fuel} {fuelUnit}. Poți parcurge {distance} {distanceUnit}.',
            default: 'Selectați metoda de calcul'
        },
        map: {
            distance: 'Distanță',
            clear: 'Șterge',
            close: 'Închide',
            addressNotFound: 'Adresa nu a fost găsită'
        },
        pages: {
            about: 'Despre',
            settings: 'Setări'
        },
        settings: {
            currency: 'Monedă',
            units: 'Unități',
            unitOptions: {
                metric: 'Metric (km, litri)',
                imperial: 'Imperial (mile, galoane)'
            }
        },
        units: {
            km: 'km',
            liters: 'litri',
            lei: 'lei',
            gallons: 'galoane',
            miles: 'mile'
        }
    }
}