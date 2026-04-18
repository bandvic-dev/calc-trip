import { createI18n } from 'vue-i18n'
import ru from './locales/ru.js'
import en from './locales/en.js'
import ro from './locales/ro.js'
import uk from './locales/uk.js'

const messages = {
  ru,
  en,
  ro,
  uk
}

const STORAGE_KEY = 'app-language'
const savedLocale = localStorage.getItem(STORAGE_KEY)
const locale = savedLocale && Object.prototype.hasOwnProperty.call(messages, savedLocale)
  ? savedLocale
  : 'ru'

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages
})

export default i18n