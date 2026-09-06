import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useState } from 'react';

import { MotionRoot } from '@/components/MotionRoot';
import { cn } from '@/lib/cn';

const COMMAND = 'npm install @iamsquare/ua';
const FLASH_DURATION = 0.75;

export const InstallCommand = ({ version, sizeLabel }: { version: string; sizeLabel: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <MotionRoot>
      <AnimatePresence>
        <m.button
          type="button"
          className={cn(
            'relative flex max-w-max cursor-pointer border-2 border-gray-950 flex-col items-center gap-8 rounded-2xl bg-gray-950 px-12 py-10 font-mono text-gray-100 sm:flex-row sm:justify-between sm:gap-12 sm:rounded-full sm:px-14',
          )}
          initial={{
            borderColor: 'var(--color-gray-950)',
          }}
          animate={{
            borderColor: copied
              ? [
                  'var(--color-accent-600)',
                  'var(--color-emerald-400)',
                  'var(--color-emerald-400)',
                  'var(--color-gray-950)',
                ]
              : 'var(--color-gray-950)',
          }}
          transition={{
            duration: FLASH_DURATION,
            ease: 'easeInOut',
            times: copied ? [0, 0.3, 0.6, 1] : undefined,
          }}
          onAnimationComplete={() => setCopied(false)}
          aria-label={`Copy “${COMMAND}”`}
          title="Copy to clipboard"
          onClick={async () => {
            await navigator.clipboard.writeText(COMMAND);

            setCopied(true);
          }}
        >
          {copied && (
            <m.span
              key="label"
              aria-live="polite"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 text-center text-xs font-sans font-medium tracking-wide text-emerald-400"
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: [1, 1, 0], y: [20, 24, 26] }}
              transition={{ duration: FLASH_DURATION, ease: 'easeOut', times: [0, 0.5, 1] }}
            >
              Copied to clipboard
            </m.span>
          )}
          <div className="text-[--spacing(10)] rounded-full bg-accent-600 dark:bg-accent-500 px-10 py-3 font-mono font-semibold tracking-wide text-white">
            v{version}
          </div>
          <code className="bg-transparent text-center text-sm text-inherit sm:text-start">
            <span className="text-emerald-400">$</span> {COMMAND}
          </code>
          <span className="text-xs tracking-wide text-gray-400 uppercase">{sizeLabel}</span>
        </m.button>
      </AnimatePresence>
    </MotionRoot>
  );
};
