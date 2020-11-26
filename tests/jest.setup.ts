import "@testing-library/jest-dom/extend-expect";
import i18n from "@/locales/i18n.ts";

// setting lng to 'cimode' will set t function to always return the key.
i18n.changeLanguage("cimode");

process.env = {
  ...process.env,
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    domains: ["images.example.com"],
    path: "/_next/image",
    loader: "default",
  },
};
