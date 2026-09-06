import { animate } from 'motion';
import { useEffect, useRef, useState } from 'react';
import { forEach, map } from 'remeda';
import { useMutationObserver } from 'rooks';
import type { ValueOf } from 'type-fest';

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = ValueOf<typeof THEME>;

const THEME_TRANSITION_SECONDS = 0.3;

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === THEME.LIGHT ? THEME.LIGHT : THEME.DARK;

const prefersReducedMotion = () =>
  globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useDocumentTheme = (): Theme => {
  const target = useRef(globalThis.document.documentElement);
  const [theme, setTheme] = useState<Theme>(() => readTheme());

  useMutationObserver(target, () => setTheme(readTheme()), {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  return theme;
};

export const useAnimatedThemeColors = (palettes: Record<Theme, string[]>) => {
  const theme = useDocumentTheme();
  const [colors, setColors] = useState<string[]>(() => palettes[theme]);
  const colorsRef = useRef(colors);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const duration = prefersReducedMotion() ? 0 : THEME_TRANSITION_SECONDS;

    const controls = map(palettes[theme], (to, index) =>
      animate(colorsRef.current[index] ?? to, to, {
        duration,
        ease: 'easeInOut',
        onUpdate: (value) => {
          const newColors = Array.from(colorsRef.current);
          newColors[index] = value;

          colorsRef.current = newColors;
          setColors(newColors);
        },
      }),
    );

    return () => {
      forEach(controls, (control) => {
        control.stop();
      });
    };
  }, [theme, palettes]);

  return colors;
};

export const useAnimatedThemeColor = (palettes: Record<Theme, string>): string => {
  const theme = useDocumentTheme();
  const [color, setColor] = useState(() => palettes[theme]);
  const colorRef = useRef(color);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const duration = prefersReducedMotion() ? 0 : THEME_TRANSITION_SECONDS;

    const control = animate(colorRef.current, palettes[theme], {
      duration,
      ease: 'easeInOut',
      onUpdate: (value) => {
        colorRef.current = value;
        setColor(value);
      },
    });

    return () => {
      control.stop();
    };
  }, [theme, palettes]);

  return color;
};
