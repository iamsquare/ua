import { LiquidMetal } from '@paper-design/shaders-react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useEffectOnceWhen, useMutationObserver } from 'rooks';
import type { ValueOf } from 'type-fest';

import logoUrl from '@/assets/logo.svg?url';

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

type Theme = ValueOf<typeof THEME>;

const THEME_PROPS = {
  [THEME.LIGHT]: {
    colorBack: '#ffffff00',
    colorTint: '#2563eb',
  },
  [THEME.DARK]: {
    colorBack: '#ffffff00',
    colorTint: '#93c5fd',
  },
} as const;

const READY_FALLBACK_MS = 2500;

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === THEME.LIGHT ? THEME.LIGHT : THEME.DARK;

const markPageReady = () => {
  const root = document.documentElement;

  if (root.hasAttribute('data-page-ready')) return;

  root.setAttribute('data-page-ready', '');
  root.removeAttribute('data-page-pending');
};

const HeroLiquidMetalLogoInner = () => {
  const target = useRef(window.document.documentElement);
  const [theme, setTheme] = useState<Theme>(() => readTheme());

  useEffectOnceWhen(() => {
    markPageReady();
  });

  useMutationObserver(target, () => setTheme(readTheme()), {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  const { colorBack, colorTint } = THEME_PROPS[theme];

  return (
    <LiquidMetal
      width="100%"
      height="100%"
      image={logoUrl}
      colorBack={colorBack}
      colorTint={colorTint}
      shape="none"
      repetition={3}
      softness={0.1}
      shiftRed={0.3}
      shiftBlue={0.3}
      distortion={0.6}
      contour={0.45}
      angle={0}
      speed={0.5}
      scale={1}
      rotation={0}
      offsetX={0}
      offsetY={0}
      fit="contain"
      suspendWhenProcessingImage
    />
  );
};

export const HeroLiquidMetalLogo = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markPageReady();
      return;
    }

    const timeoutId = window.setTimeout(markPageReady, READY_FALLBACK_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="size-[clamp(--spacing(128),28vw,--spacing(256))]" aria-hidden="true">
      <Suspense fallback={null}>
        <HeroLiquidMetalLogoInner />
      </Suspense>
    </div>
  );
};
