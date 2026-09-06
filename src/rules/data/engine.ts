import { AssignKind } from '@/rules/kinds';
import type { AuthoredCategory } from '@/rules/load';

export const engineRulesData = [
  [
    [/windows.+ edge\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'EdgeHTML' },
    ],
  ],
  [
    [/(arkweb)\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/webkit\/537\.36.+chrome\/(?!27)([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Blink' },
    ],
  ],
  [
    [
      /(presto)\/([\w.]+)/i,
      /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w.]+)/i,
      /ekioh(flow)\/([\w.]+)/i,
      /(khtml|tasman|links|dillo)[/ ]\(?([\w.]+)/i,
      /(icab)[/ ]([23]\.[\d.]+)/i,
      /\b(libweb)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [[/ladybird\//i], [{ type: AssignKind.Literal, field: 'name', value: 'LibWeb' }]],
  [
    [/rv:([\w.]{1,9})\b.+(gecko)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Capture, field: 'name' },
    ],
  ],
] as const satisfies AuthoredCategory;
