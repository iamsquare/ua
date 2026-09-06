import { map } from 'remeda';

import { AssignKind, type TransformKind } from '@/rules/kinds';
import { transforms } from '@/rules/transforms';
import type { Assign, Rule, StringMap } from '@/types';

export type AuthoredAssign =
  | { type: typeof AssignKind.Capture; field: string; transform?: TransformKind }
  | { type: typeof AssignKind.Literal; field: string; value: string | undefined }
  | {
      type: typeof AssignKind.Replace;
      field: string;
      replace: [RegExp, string];
      transform?: TransformKind;
    }
  | { type: typeof AssignKind.Map; field: string; map: StringMap }
  | {
      type: typeof AssignKind.ReplaceMap;
      field: string;
      replace: [RegExp, string];
      map: StringMap;
    }
  | {
      type: typeof AssignKind.Test;
      field: string;
      test: RegExp;
      ifTrue: string;
      ifFalse: string;
    };

export type AuthoredRule = [patterns: RegExp[], assign: AuthoredAssign[]];

export type AuthoredCategory = AuthoredRule[];

export type ExtensionsData = Record<string, Partial<Record<string, AuthoredCategory>>>;

const toAssign = (item: AuthoredAssign): Assign => {
  switch (item.type) {
    case AssignKind.Literal:
      return { type: AssignKind.Literal, field: item.field, value: item.value };
    case AssignKind.Capture:
      return item.transform
        ? {
            type: AssignKind.Capture,
            field: item.field,
            transform: transforms[item.transform],
          }
        : { type: AssignKind.Capture, field: item.field };
    case AssignKind.Replace:
      return item.transform
        ? {
            type: AssignKind.Replace,
            field: item.field,
            replace: item.replace,
            transform: transforms[item.transform],
          }
        : { type: AssignKind.Replace, field: item.field, replace: item.replace };
    case AssignKind.Map:
      return { type: AssignKind.Map, field: item.field, map: item.map };
    case AssignKind.ReplaceMap:
      return {
        type: AssignKind.ReplaceMap,
        field: item.field,
        replace: item.replace,
        map: item.map,
      };
    case AssignKind.Test:
      return {
        type: AssignKind.Test,
        field: item.field,
        test: item.test,
        ifTrue: item.ifTrue,
        ifFalse: item.ifFalse,
      };
  }
};

export const loadRules = (authored: AuthoredCategory): Rule[] =>
  map(authored, ([patterns, assign]) => [patterns, map(assign, toAssign)] as const);
