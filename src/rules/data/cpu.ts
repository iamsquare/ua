import { AssignKind, TransformKind } from '@/rules/kinds';
import type { AuthoredCategory } from '@/rules/load';

export const cpuRulesData = [
  [
    [/\b((amd|x|x86[-_]?|wow|win)64)\b/i],
    [{ type: AssignKind.Literal, field: 'architecture', value: 'amd64' }],
  ],
  [
    [/(ia32(?=;))/i, /\b((i[346]|x)86)(pc)?\b/i],
    [{ type: AssignKind.Literal, field: 'architecture', value: 'ia32' }],
  ],
  [
    [/\b(aarch64|arm(v?[89]e?l?|_?64))\b/i],
    [{ type: AssignKind.Literal, field: 'architecture', value: 'arm64' }],
  ],
  [
    [/\b(arm(v[67])?ht?n?[fl]p?)\b/i],
    [{ type: AssignKind.Literal, field: 'architecture', value: 'armhf' }],
  ],
  [
    [/( (ce|mobile); ppc;|\/[\w.]+arm\b)/i],
    [{ type: AssignKind.Literal, field: 'architecture', value: 'arm' }],
  ],
  [[/ sun4\w[;)]/i], [{ type: AssignKind.Literal, field: 'architecture', value: 'sparc' }]],
  [
    [
      /\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i,
      /((ppc|powerpc)(64)?)( mac|;|\))/i,
      /(?:osf1|[freopnt]{3,4}bsd) (alpha)/i,
    ],
    [
      {
        type: AssignKind.Replace,
        field: 'architecture',
        replace: [/ower/, ''] as const,
        transform: TransformKind.Lower,
      },
    ],
  ],
  [[/mc680.0/i], [{ type: AssignKind.Literal, field: 'architecture', value: '68k' }]],
  [[/winnt.+\[axp/i], [{ type: AssignKind.Literal, field: 'architecture', value: 'alpha' }]],
] as const satisfies AuthoredCategory;
