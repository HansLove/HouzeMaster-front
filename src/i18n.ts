import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['es', 'en'];

export default getRequestConfig(async ({ locale }) => {
  // Temporarily add debugging
  console.log('DEBUG i18n.ts - Incoming locale:', locale, 'Type:', typeof locale);
  console.log('DEBUG i18n.ts - locales array:', locales);
  console.log('DEBUG i18n.ts - includes check:', locales.includes(locale as any));
  
  // Validate that the incoming `locale` parameter is valid
  // If invalid, default to Spanish
  const validLocale = locales.includes(locale as any) ? locale : 'es';
  
  console.log('DEBUG i18n.ts - Valid locale:', validLocale);

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});
