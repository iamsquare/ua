import { AssignKind, TransformKind } from '@/rules/kinds';
import type { AuthoredCategory } from '@/rules/load';

export const cpuRulesData = [
  {
    patterns: [/\b((amd|x|x86[-_]?|wow|win)64)\b/i],
    assign: [{ type: AssignKind.Literal, field: 'architecture', value: 'amd64' }],
  },
  {
    patterns: [/(ia32(?=;))/i, /\b((i[346]|x)86)(pc)?\b/i],
    assign: [{ type: AssignKind.Literal, field: 'architecture', value: 'ia32' }],
  },
  {
    patterns: [/\b(aarch64|arm(v?[89]e?l?|_?64))\b/i],
    assign: [{ type: AssignKind.Literal, field: 'architecture', value: 'arm64' }],
  },
  {
    patterns: [/\b(arm(v[67])?ht?n?[fl]p?)\b/i],
    assign: [{ type: AssignKind.Literal, field: 'architecture', value: 'armhf' }],
  },
  {
    patterns: [/( (ce|mobile); ppc;|\/[\w.]+arm\b)/i],
    assign: [{ type: AssignKind.Literal, field: 'architecture', value: 'arm' }],
  },
  {
    patterns: [/ sun4\w[;)]/i],
    assign: [{ type: AssignKind.Literal, field: 'architecture', value: 'sparc' }],
  },
  {
    patterns: [
      /\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i,
      /((ppc|powerpc)(64)?)( mac|;|\))/i,
      /(?:osf1|[freopnt]{3,4}bsd) (alpha)/i,
    ],
    assign: [
      {
        type: AssignKind.Replace,
        field: 'architecture',
        replace: [/ower/, ''] as const,
        transform: TransformKind.Lower,
      },
    ],
  },
  {
    patterns: [/mc680.0/i],
    assign: [{ type: AssignKind.Literal, field: 'architecture', value: '68k' }],
  },
  {
    patterns: [/winnt.+\[axp/i],
    assign: [{ type: AssignKind.Literal, field: 'architecture', value: 'alpha' }],
  },
] as const satisfies AuthoredCategory;
