import { useEffect, useState } from 'react';
import { isNonNullish, isNullish } from 'remeda';
import type { ValueOf } from 'type-fest';

import ThemeAutoIcon from '@/assets/theme-auto.svg?react';
import ThemeDarkIcon from '@/assets/theme-dark.svg?react';
import ThemeLightIcon from '@/assets/theme-light.svg?react';

const THEME = {
  AUTO: 'auto',
  DARK: 'dark',
  LIGHT: 'light',
} as const;

type Theme = ValueOf<typeof THEME>;

const STORAGE_KEY = 'starlight-theme';

const ICONS = {
  [THEME.LIGHT]: ThemeLightIcon,
  [THEME.DARK]: ThemeDarkIcon,
  [THEME.AUTO]: ThemeAutoIcon,
} as const;

const parseTheme = (theme: unknown): Theme =>
  theme === THEME.AUTO || theme === THEME.DARK || theme === THEME.LIGHT ? theme : THEME.AUTO;

const loadTheme = (): Theme =>
  parseTheme(isNonNullish(localStorage) && localStorage.getItem(STORAGE_KEY));

const storeTheme = (theme: Theme) => {
  if (isNullish(localStorage)) return;

  localStorage.setItem(STORAGE_KEY, theme === THEME.LIGHT || theme === THEME.DARK ? theme : '');
};

const getPreferredColorScheme = (): Exclude<Theme, 'auto'> =>
  matchMedia('(prefers-color-scheme: light)').matches ? THEME.LIGHT : THEME.DARK;

const resolveTheme = (theme: Theme): Exclude<Theme, 'auto'> =>
  theme === THEME.AUTO ? getPreferredColorScheme() : theme;

const applyDocumentTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = resolveTheme(theme);
};

type ThemeSelectProps = Readonly<{
  label: string;
}>;

export const ThemeSelect = ({ label }: ThemeSelectProps) => {
  const [theme, setTheme] = useState<Theme>(loadTheme);

  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: light)');

    const onSystemPreferenceChange = () => {
      if (loadTheme() !== THEME.AUTO) return;

      applyDocumentTheme(THEME.AUTO);
      setTheme(THEME.AUTO);
    };

    media.addEventListener('change', onSystemPreferenceChange);

    return () => media.removeEventListener('change', onSystemPreferenceChange);
  }, []);

  const applyTheme = (next: Theme) => {
    applyDocumentTheme(next);
    storeTheme(next);
    setTheme(next);
  };

  const Icon = ICONS[theme];

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center justify-center border-0 bg-transparent p-8 text-(--sl-color-gray-2) hover:text-(--sl-color-white)"
      aria-label={label}
      title={label}
      onClick={() => applyTheme(resolveTheme(theme) === THEME.DARK ? THEME.LIGHT : THEME.DARK)}
    >
      <Icon className="size-16" aria-hidden="true" />
    </button>
  );
};
