import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['es', 'en', 'fr', 'eu', 'gl', 'ca', 'ast', 'zh'];
const defaultLocale = 'es';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !locales.includes(locale as any)) {
        locale = defaultLocale;
    }

    // Load messages dynamically
    try {
        const messages = (await import(`./messages/${locale}.json`)).default;

        return {
            locale,
            messages
        };
    } catch (error) {
        console.error(`Error loading messages for locale ${locale}:`, error);

        // Return minimal fallback messages or re-throw depending on desired behavior
        // Typically falling back to default locale messages is good, but let's fail safely locally
        return {
            locale,
            messages: {}
        };
    }
});
