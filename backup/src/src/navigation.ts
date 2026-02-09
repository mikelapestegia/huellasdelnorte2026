import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['es', 'en', 'fr', 'zh', 'eu', 'gl', 'ast', 'ca'] as const;
export const localePrefix = 'always'; // Default

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
    locales,
    localePrefix
});
