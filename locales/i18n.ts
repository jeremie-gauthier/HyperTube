import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// This will probably help me later
// https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript

import componentsFR from "./translations/fr/components.json";
import componentsEN from "./translations/en/components.json";
import componentsES from "./translations/es/components.json";
import componentsJA from "./translations/ja/components.json";

import commonFR from "./translations/fr/common.json";
import commonEN from "./translations/en/common.json";
import commonES from "./translations/es/common.json";
import commonJA from "./translations/ja/common.json";

const LANGUAGES = {
  fr: {
    translation: { pages: {}, components: componentsFR, common: commonFR },
  },
  en: {
    translation: { pages: {}, components: componentsEN, common: commonEN },
  },
  es: {
    translation: { pages: {}, components: componentsES, common: commonES },
  },
  ja: {
    translation: { pages: {}, components: componentsJA, common: commonJA },
  },
};

export const langs = {
  en: "common.lang.english",
  fr: "common.lang.french",
  es: "common.lang.spanish",
  ja: "common.lang.japanese",
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
