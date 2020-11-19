import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// This will probably help me later
// https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript

const LANGUAGES = {
  fr: { translation: { pages: {} } },
  en: { translation: { pages: {} } },
  es: { translation: { pages: {} } },
};

i18n.use(initReactI18next).init({
  resources: LANGUAGES,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
