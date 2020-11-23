import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// This will probably help me later
// https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript

import componentsFR from "./translations/fr/components.json";
import componentsEN from "./translations/en/components.json";
import componentsES from "./translations/es/components.json";
import componentsJA from "./translations/ja/components.json";

const LANGUAGES = {
  fr: { translation: { pages: {}, components: componentsFR } },
  en: { translation: { pages: {}, components: componentsEN } },
  es: { translation: { pages: {}, components: componentsES } },
  ja: { translation: { pages: {}, components: componentsJA } },
};

export const langs = [
  { key: "common.lang.english", value: "en" },
  { key: "common.lang.french", value: "fr" },
  { key: "common.lang.spanish", value: "es" },
  { key: "common.lang.japanese", value: "ja" },
];

i18n.use(initReactI18next).init({
  resources: LANGUAGES,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
