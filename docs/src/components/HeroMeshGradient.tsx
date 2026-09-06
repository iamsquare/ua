import { MeshGradient } from '@paper-design/shaders-react';

import { THEME, useAnimatedThemeColors } from '@/hooks/useThemeColors';

const COLORS = {
  [THEME.LIGHT]: ['#2563eb', '#93c5fd', '#0ea5e9', '#e0f2fe'],
  [THEME.DARK]: ['#1e3a5f', '#2563eb', '#93c5fd', '#09090b'],
};

export const HeroMeshGradient = () => {
  const colors = useAnimatedThemeColors(COLORS);

  return (
    <div className="size-full dark:opacity-50 opacity-100 mask-b-from-black via-black/65% to-transparent/95%">
      <MeshGradient
        width="100%"
        height="100%"
        fit="cover"
        colors={Array.from(colors)}
        distortion={0.7}
        swirl={0.1}
        grainMixer={0}
        grainOverlay={0}
        speed={0.5}
      />
    </div>
  );
};
