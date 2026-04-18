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
        copyright: '© {year} Andrei Balanco'
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
            route: 'Consum: {liters} litri. Cost: {cost} lei.',
            fuel: 'Pentru {value} litri poți parcurge {distance} km. Cost: {cost} lei.',
            amount: 'Pentru {value} lei primești {liters} litri. Poți parcurge {distance} km.',
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
        units: {
            km: 'km',
            liters: 'litri',
            lei: 'lei'
        }
    }
}