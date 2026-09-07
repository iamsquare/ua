import { map } from 'remeda';

import { AssignKind, type TransformKind } from '@/rules/kinds';
import { transforms } from '@/rules/transforms';
import type { Assign, Rule, StringMap } from '@/types';

export type AuthoredAssign =
  | {
      type: typeof AssignKind.Capture;
      field: string;
      group: number;
      transform?: TransformKind;
    }
  | {
      type: typeof AssignKind.Literal;
      field: string;
      value: string | undefined;
    }
  | {
      type: typeof AssignKind.Replace;
      field: string;
      group: number;
      replace: [RegExp, string];
      transform?: TransformKind;
    }
  | {
      type: typeof AssignKind.Map;
      field: string;
      group: number;
      map: StringMap;
    }
  | {
      type: typeof AssignKind.ReplaceMap;
      field: string;
      group: number;
      replace: [RegExp, string];
      map: StringMap;
    }
  | {
      type: typeof AssignKind.Test;
      field: string;
      group: number;
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
      return {
        type: 'literal',
        field: item.field,
        value: item.value,
      };
    case AssignKind.Capture:
      return item.transform
        ? {
            type: 'capture',
            field: item.field,
            group: item.group,
            transform: transforms[item.transform],
          }
        : {
            type: 'capture',
            field: item.field,
            group: item.group,
          };
    case AssignKind.Replace:
      return item.transform
        ? {
            type: 'replace',
            field: item.field,
            group: item.group,
            replace: item.replace,
            transform: transforms[item.transform],
          }
        : {
            type: 'replace',
            field: item.field,
            group: item.group,
            replace: item.replace,
          };
    case AssignKind.Map:
      return {
        type: 'map',
        field: item.field,
        group: item.group,
        map: item.map,
      };
    case AssignKind.ReplaceMap:
      return {
        type: 'replace-map',
        field: item.field,
        group: item.group,
        replace: item.replace,
        map: item.map,
      };
    case AssignKind.Test:
      return {
        type: 'test',
        field: item.field,
        group: item.group,
        test: item.test,
        ifTrue: item.ifTrue,
        ifFalse: item.ifFalse,
      };
  }
};

export const loadRules = (authored: AuthoredCategory): Rule[] =>
  map(authored, ([patterns, assign]) => [patterns, map(assign, toAssign)] as const);
