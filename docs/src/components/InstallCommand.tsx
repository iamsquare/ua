import { useState } from 'react';
import type { ReadonlyDeep } from 'type-fest';

import { cn } from '@/lib/cn';

const COMMAND = 'npm install @iamsquare/ua';

type InstallCommandProps = ReadonlyDeep<{
  sizeLabel: string;
}>;

export const InstallCommand = ({ sizeLabel }: InstallCommandProps) => {
  const [flashKey, setFlashKey] = useState(0);

  return (
    <button
      type="button"
      className={cn(
        'relative flex max-w-max cursor-pointer flex-col items-center gap-8 rounded-2xl border border-gray-300 bg-gray-950 px-14 py-12 font-mono text-gray-100 transition-colors',
        'hover:border-gray-500 sm:flex-row sm:justify-between sm:gap-12 sm:rounded-full sm:px-18 dark:border-gray-700 dark:hover:border-gray-500',
      )}
      aria-label={`Copy “${COMMAND}”`}
      title="Copy to clipboard"
      onClick={async () => {
        await navigator.clipboard.writeText(COMMAND);
        setFlashKey((key) => key + 1);
      }}
    >
      {flashKey > 0 && (
        <>
          <span
            key={`border-${flashKey}`}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-accent-600 animate-install-copy-flash"
          />
          <span
            key={`label-${flashKey}`}
            aria-live="polite"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 text-center text-xs font-sans font-medium tracking-wide text-emerald-400 animate-install-copy-toast"
          >
            Copied to clipboard
          </span>
        </>
      )}
      <code className="bg-transparent text-center text-sm text-inherit sm:text-start">
        <span className="text-emerald-400">$</span> {COMMAND}
      </code>
      <span className="text-xs tracking-wide text-gray-400 uppercase">{sizeLabel}</span>
    </button>
  );
};
