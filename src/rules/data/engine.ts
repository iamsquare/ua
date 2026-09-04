import { AssignKind } from '@/rules/kinds';
import type { AuthoredCategory } from '@/rules/load';

export const engineRulesData = [
  {
    patterns: [/windows.+ edge\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'EdgeHTML' },
    ],
  },
  {
    patterns: [/(arkweb)\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/webkit\/537\.36.+chrome\/(?!27)([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Blink' },
    ],
  },
  {
    patterns: [
      /(presto)\/([\w.]+)/i,
      /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w.]+)/i,
      /ekioh(flow)\/([\w.]+)/i,
      /(khtml|tasman|links|dillo)[/ ]\(?([\w.]+)/i,
      /(icab)[/ ]([23]\.[\d.]+)/i,
      /\b(libweb)/i,
    ],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/ladybird\//i],
    assign: [{ type: AssignKind.Literal, field: 'name', value: 'LibWeb' }],
  },
  {
    patterns: [/rv:([\w.]{1,9})\b.+(gecko)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Capture, field: 'name' },
    ],
  },
] as const satisfies AuthoredCategory;
