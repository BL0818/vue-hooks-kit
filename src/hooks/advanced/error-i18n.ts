import { ref, shallowRef, onErrorCaptured, type Ref, computed, inject, provide, type App, type InjectionKey } from 'vue';

/**
 * useErrorBoundary - Capture errors in child components
 * 
 * @param callback Optional callback when error occurs
 * @returns Object with error state and reset function
 */
export function useErrorBoundary(callback?: (err: Error, instance: any, info: string) => void) {
  const error = shallowRef<Error | null>(null);

  onErrorCaptured((err, instance, info) => {
    error.value = err as Error;
    callback?.(err as Error, instance, info);
    return false; // Stop propagation
  });

  const reset = () => {
    error.value = null;
  };

  return {
    error,
    reset,
  };
}

// I18n Types
export type Locale = 'en' | 'zh-CN' | string;
export type I18nMessages = Record<string, Record<string, any>>;

const I18nSymbol: InjectionKey<{
  locale: Ref<Locale>;
  messages: Ref<I18nMessages>;
  setLocale: (l: Locale) => void;
  t: (key: string, ...args: any[]) => string;
}> = Symbol('I18n');

/**
 * useI18n - Lightweight Internationalization Hook
 * 
 * Features:
 * - Reactive locale switching
 * - Nested message support (dot notation)
 * - UnoCSS support via direction/locale class hints
 * 
 * @param options Initial options (only used if providing root)
 */
export function useI18n(options?: { locale: Locale; messages: I18nMessages }) {
  // Check if injected
  const instance = inject(I18nSymbol, null);

  if (instance && !options) {
    return instance;
  }

  // If options provided or not injected, create new instance (local scope or root)
  // Usually this is used in App.vue or via createI18n plugin, but as a hook:
  const locale = ref<Locale>(options?.locale || 'en');
  const messages = ref<I18nMessages>(options?.messages || {});

  const setLocale = (l: Locale) => {
    locale.value = l;
    // Update HTML lang attribute for UnoCSS/Tailwind generic usage
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l;
      // Simple RTL detection
      document.documentElement.dir = ['ar', 'he', 'fa'].includes(l) ? 'rtl' : 'ltr';
    }
  };

  const getNestedMessage = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const t = (key: string, ...args: any[]) => {
    const msg = getNestedMessage(messages.value[locale.value], key) || key;
    if (typeof msg === 'function') {
      return msg(...args);
    }
    // Simple interpolation {0}, {1}
    return String(msg).replace(/\{(\d+)\}/g, (match, index) => {
      return args[index] !== undefined ? args[index] : match;
    });
  };

  const i18n = {
    locale,
    messages,
    setLocale,
    t,
  };

  // Provide for children if creating a new scope
  provide(I18nSymbol, i18n);

  return i18n;
}
