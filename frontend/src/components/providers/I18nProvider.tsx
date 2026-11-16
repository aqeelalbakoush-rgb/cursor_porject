'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { IntlProvider } from 'use-intl';
import { usePosSettingsStore } from '@/store/pos-settings';
import { isLanguage, LANGUAGES, type Language } from '@/lib/i18n';
import { getCachedMessages, isLocaleLoaded, loadLocaleMessages } from '@/lib/i18n/loader';

/** Wraps application in use-intl's IntlProvider with lazy-loaded messages.
 * Arabic (ar-LY) is the default. English stays bundled as the cold-boot fallback. */
function resolveInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('pos-settings');
      if (raw) {
        const parsed = JSON.parse(raw);
        const savedLang = parsed?.state?.language;
        if (isLanguage(savedLang)) {
          return savedLang;
        }
      }
    } catch {
      // Ignore a broken saved preference and use Arabic.
    }
  }
  return 'ar';
}

/** Error handler for IntlProvider suppressing ENVIRONMENT_FALLBACK warnings. */
export function handleI18nError(error: { code?: string; message?: string } | Error) {
  if ('code' in error && error.code === 'ENVIRONMENT_FALLBACK') return;
  console.error(error);
}

/** Resolves default host runtime timezone, falling back to 'UTC'. */
export function getDefaultTimeZone(): string {
  return typeof Intl !== 'undefined'
    ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    : 'UTC';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const language = usePosSettingsStore((s) => s.language);
  const [active, setActive] = useState<Language>('ar');
  const activeRef = useRef<Language>('ar');
  const [messagesReady, setMessagesReady] = useState(() => isLocaleLoaded('ar'));

  // Resolve the saved language, otherwise Arabic, and synchronize the store.
  useEffect(() => {
    const initial = resolveInitialLanguage();
    if (initial !== usePosSettingsStore.getState().language) {
      usePosSettingsStore.setState({ language: initial });
    }
  }, []);

  // Sync rendered messages with store language; ignore stale loads
  // and revert store on failed fetch.
  useEffect(() => {
    if (language === activeRef.current && isLocaleLoaded(language)) return;
    let cancelled = false;
    loadLocaleMessages(language)
      .then(() => {
        if (cancelled) return;
        if (usePosSettingsStore.getState().language !== language) return; // superseded
        activeRef.current = language;
        setActive(language);
        setMessagesReady(true);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (usePosSettingsStore.getState().language !== language) return; // superseded
        console.warn(`[i18n] Failed to load messages for "${language}" — staying on "${activeRef.current}".`, err);
        usePosSettingsStore.setState({ language: activeRef.current });
      });
    return () => {
      cancelled = true;
    };
  }, [language]);

  const config = LANGUAGES[active] ?? LANGUAGES.ar;
  const messages = (messagesReady ? getCachedMessages(active) : undefined) ?? getCachedMessages('en') ?? {};

  return (
    <IntlProvider
      locale={config.locale}
      messages={messages}
      timeZone={getDefaultTimeZone()}
      onError={handleI18nError}
    >
      {children}
    </IntlProvider>
  );
}
