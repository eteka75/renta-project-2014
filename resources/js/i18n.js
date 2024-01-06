import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
const Languages = ['fr', 'en'];
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    debug: false,
    whitelist: Languages,
    interpolation: {
      escapeValue: false
    }
  });
export default i18n;

    //i18n.changeLanguage('fr'); // <--- add this
