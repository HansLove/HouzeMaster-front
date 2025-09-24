import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['es', 'en'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // If invalid, default to Spanish
  const validLocale = locales.includes(locale as any) ? locale : 'es';

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});
