import { translations } from '../i18n/translations.js';

export const translate = (key) => {
  const lang = document.documentElement.lang || 'en';
  return translations[lang]?.[key] || key;
};