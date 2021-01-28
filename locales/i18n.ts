import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// This will probably help me later
// https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript

import pagesFR from "./translations/fr/pages.json";
import pagesEN from "./translations/en/pages.json";
import pagesES from "./translations/es/pages.json";
import pagesJA from "./translations/ja/pages.json";

import componentsFR from "./translations/fr/components.json";
import componentsEN from "./translations/en/components.json";
import componentsES from "./translations/es/components.json";
import componentsJA from "./translations/ja/components.json";

import commonFR from "./translations/fr/common.json";
import commonEN from "./translations/en/common.json";
import commonES from "./translations/es/common.json";
import commonJA from "./translations/ja/common.json";

import modelsFR from "./translations/fr/models.json";
import modelsEN from "./translations/en/models.json";
import modelsES from "./translations/es/models.json";
import modelsJA from "./translations/ja/models.json";

const LANGUAGES_RESOURCES = {
  fr: {
    translation: {
      pages: pagesFR,
      components: componentsFR,
      common: commonFR,
      models: modelsFR,
    },
  },
  en: {
    translation: {
      pages: pagesEN,
      components: componentsEN,
      common: commonEN,
      models: modelsEN,
    },
  },
  es: {
    translation: {
      pages: pagesES,
      components: componentsES,
      common: commonES,
      models: modelsES,
    },
  },
  ja: {
    translation: {
      pages: pagesJA,
      components: componentsJA,
      common: commonJA,
      models: modelsJA,
    },
  },
} as const;

export enum LANGUAGE {
  EN = "en",
  ES = "es",
  FR = "fr",
  JA = "ja",
}
export type Languages = "en" | "es" | "fr" | "ja";

export const langs = {
  en: "common.lang.english",
  fr: "common.lang.french",
  es: "common.lang.spanish",
  ja: "common.lang.japanese",
} as const;

i18n.use(initReactI18next).init({
  resources: LANGUAGES_RESOURCES,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
