import type { AuthoredCategory } from '@/rules/load';

export const engineRulesData = [
  [
    [/windows.+ edge\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'EdgeHTML' },
    ],
  ],
  [
    [/(arkweb)\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/webkit\/537\.36.+chrome\/(?!27)([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Blink' },
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
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [[/ladybird\//i], [{ type: 'literal', field: 'name', value: 'LibWeb' }]],
  [
    [/rv:([\w.]{1,9})\b.+(gecko)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'capture', group: 2, field: 'name' },
    ],
  ],
] as const satisfies AuthoredCategory;
