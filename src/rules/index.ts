import { browserRulesData } from '@/rules/data/browser';
import { cpuRulesData } from '@/rules/data/cpu';
import { deviceRulesData } from '@/rules/data/device';
import { engineRulesData } from '@/rules/data/engine';
import { browserHintsMap, formFactorsMap, windowsVersionMap } from '@/rules/data/maps';
import { osRulesData } from '@/rules/data/os';
import { loadRules } from '@/rules/load';
import type { Rule } from '@/types';

export const coreMaps = {
  windowsVersionMap,
  formFactorsMap,
  browserHintsMap,
} as const;

export const browserRules: Rule[] = loadRules(browserRulesData);
export const cpuRules: Rule[] = loadRules(cpuRulesData);
export const deviceRules: Rule[] = loadRules(deviceRulesData);
export const engineRules: Rule[] = loadRules(engineRulesData);
export const osRules: Rule[] = loadRules(osRulesData);
