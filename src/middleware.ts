// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  localeDetection: true
});

export const config = {
  matcher: [
    // Aplica i18n a todo, EXCEPTO a estas rutas:
    '/((?!plano|api|assets|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ]
};
