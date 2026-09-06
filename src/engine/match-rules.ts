import { isArray, isEmpty, isNullish, isString, keys, sliceString } from 'remeda';

import { AssignKind } from '@/rules/kinds';
import type { Assign, Rule, StringMap } from '@/types';

export const UA_MAX_LENGTH = 500;

export const trimUa = (ua: string, maxLength = UA_MAX_LENGTH) =>
  sliceString(ua.replace(/^\s+/, ''), 0, maxLength);

export const majorFromVersion = (version?: string) => {
  if (!isString(version)) return;

  return version.replace(/[^\d.]/g, '').split('.')[0];
};

export const includesIgnoreCase = (needle: unknown, haystack: string) => {
  if (!isString(needle)) return false;

  if (isEmpty(needle)) return isEmpty(haystack);

  return haystack.toLowerCase().includes(needle.toLowerCase());
};

export const mapString = (value: string, mapTable: StringMap) => {
  for (const key of keys(mapTable)) {
    const mappedValue = mapTable[key];

    if (isArray(mappedValue)) {
      for (const entry of mappedValue) {
        if (includesIgnoreCase(entry, value)) return key === '?' ? undefined : key;
      }

      continue;
    }

    if (includesIgnoreCase(mappedValue, value)) return key === '?' ? undefined : key;
  }

  const fallback = mapTable['*'];

  return isString(fallback) ? fallback : value;
};

const resolveAssign = (assign: Assign, match: RegExpExecArray, captureIndex: number) => {
  const captured = match[captureIndex];
  const nextIndex = captureIndex + 1;
  const present = captured ? captured : undefined;

  switch (assign.type) {
    case AssignKind.Literal:
      return { field: assign.field, value: assign.value, nextIndex };

    case AssignKind.Test:
      return {
        field: assign.field,
        value: present ? (assign.test.test(present) ? assign.ifTrue : assign.ifFalse) : undefined,
        nextIndex,
      };

    case AssignKind.Map: {
      if (isNullish(captured)) return { field: assign.field, value: undefined, nextIndex };

      return { field: assign.field, value: mapString(captured, assign.map), nextIndex };
    }

    case AssignKind.ReplaceMap: {
      if (isNullish(captured)) return { field: assign.field, value: undefined, nextIndex };

      const [search, replacement] = assign.replace;

      return {
        field: assign.field,
        value: mapString(captured.replace(search, replacement), assign.map),
        nextIndex,
      };
    }

    case AssignKind.Replace: {
      const [search, replacement] = assign.replace;
      const replaced = present ? present.replace(search, replacement) : undefined;

      return {
        field: assign.field,
        value: assign.transform ? assign.transform(replaced ?? '', match) : replaced,
        nextIndex,
      };
    }

    case AssignKind.Capture:
      return {
        field: assign.field,
        value: assign.transform ? assign.transform(captured ?? '', match) : present,
        nextIndex,
      };
  }
};

export const matchRules = (ua: string, rules: Rule[]) => {
  for (const [patterns, assign] of rules) {
    for (const pattern of patterns) {
      const match = pattern.exec(ua);

      if (isNullish(match)) continue;

      const result: Record<string, string | undefined> = {};
      let captureIndex = 1;

      for (const item of assign) {
        const resolved = resolveAssign(item, match, captureIndex);

        result[resolved.field] = resolved.value;
        captureIndex = resolved.nextIndex;
      }

      return result;
    }
  }
};

/** Desktop shells that usually have no device. Skipped unless DEVICE_UA_HINT matches. */
const DEVICE_DESKTOP_SHELL = /Windows NT|\bWin64\b|\bWOW64\b|X11;|Linux x86_64|Linux i686/i;

/** Device signals that override a desktop-shell fast miss. */
export const DEVICE_UA_HINT =
  /Mobile|Android|\bdroid\b|iPhone|iPad|iPod|Tablet|\bTab[/;]|Touch|Phone|TV|Smart-?TV|HbbTV|Silk|Kindle|PlayStation|Xbox|Nintendo|CrKey|NetCast|Web0S|Tizen|webOS|Watch|Quest|Tesla|HomePod|\bPixel\b|Samsung|Huawei|Xiaomi|Redmi|OnePlus|OPPO|Vivo|Realme|Honor|Nokia|Motorola|Lenovo|BlackBerry|Surface Duo|PDA|Nexus|SM-|GT-|SCH-|KF[a-z]|Macintosh|large screen|Kobo|Obigo|NetFront|UP\.Browser|BREW|Alcatel|HTC[_\s]|Sony|LG[-; ]|Sprint |MIDP|MMP\/|Roku|PadFone|MOT-Linux|Steam Deck|Valve/i;

export const matchDeviceRules = (ua: string, rules: Rule[]) => {
  if (DEVICE_DESKTOP_SHELL.test(ua) && !DEVICE_UA_HINT.test(ua)) return;

  return matchRules(ua, rules);
};
