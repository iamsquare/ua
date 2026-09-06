import { LiquidMetal } from '@paper-design/shaders-react';
import { Suspense, useEffect } from 'react';
import { useEffectOnceWhen } from 'rooks';

import logoUrl from '@/assets/logo.svg?url';
import { THEME, useAnimatedThemeColor } from '@/hooks/useThemeColors';

const COLOR_BACK = '#ffffff00';

const COLORS = {
  [THEME.LIGHT]: '#2563eb',
  [THEME.DARK]: '#93c5fd',
} as const;

const READY_FALLBACK_MS = 2500;

const markPageReady = () => {
  const root = document.documentElement;

  if (root.hasAttribute('data-page-ready')) return;

  root.setAttribute('data-page-ready', '');
  root.removeAttribute('data-page-pending');
};

const HeroLiquidMetalLogoInner = () => {
  const colors = useAnimatedThemeColor(COLORS);

  useEffectOnceWhen(() => {
    markPageReady();
  });

  return (
    <LiquidMetal
      width="100%"
      height="100%"
      image={logoUrl}
      colorBack={COLOR_BACK}
      colorTint={colors}
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
    if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markPageReady();
      return;
    }

    const timeoutId = globalThis.setTimeout(markPageReady, READY_FALLBACK_MS);

    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className="size-[clamp(--spacing(128),28vw,--spacing(256))] shadow-lg shadow-accent-800 dark:shadow-gray-200/30"
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <HeroLiquidMetalLogoInner />
      </Suspense>
    </div>
  );
};
