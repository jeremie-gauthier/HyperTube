import "@testing-library/jest-dom/extend-expect";
import i18n from "@/locales/i18n.ts";

// setting lng to 'cimode' will set t function to always return the key.
i18n.changeLanguage("cimode");
