import { MeshGradient } from '@paper-design/shaders-react';
import { useEffect, useState } from 'react';
import type { ValueOf } from 'type-fest';

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

type Theme = ValueOf<typeof THEME>;

const COLORS = {
  [THEME.LIGHT]: ['#2563eb', '#93c5fd', '#0ea5e9', '#e0f2fe'],
  [THEME.DARK]: ['#1e3a5f', '#2563eb', '#93c5fd', '#09090b'],
} as const;

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === THEME.LIGHT ? THEME.LIGHT : THEME.DARK;

export const HeroMeshGradient = () => {
  const [theme, setTheme] = useState<Theme>(() => readTheme());

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()));

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="size-full opacity-40"
      style={{
        maskImage: 'linear-gradient(to bottom, black 0%, black 20%, black 65%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 0%, black 20%, black 65%, transparent 100%)',
      }}
    >
      <MeshGradient
        width="100%"
        height="100%"
        fit="cover"
        colors={Array.from(COLORS[theme])}
        distortion={0.7}
        swirl={0.1}
        grainMixer={0}
        grainOverlay={0}
        speed={0.5}
      />
    </div>
  );
};
