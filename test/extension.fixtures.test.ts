import { forEach } from 'remeda';

import {
  cli,
  crawler,
  email,
  extraDevice,
  fetcher,
  inApp,
  library,
  mediaPlayer,
  vehicle,
} from '@/extensions';
import type { ExtensionPack } from '@/types';
import { runExtensionFixtures } from '@test/utils/fixtures';

const extensionSuites = [
  { name: 'cli', file: 'cli.json', extensions: cli, slice: 'browser' },
  { name: 'crawler', file: 'crawler.json', extensions: crawler, slice: 'browser' },
  { name: 'email', file: 'email.json', extensions: email, slice: 'browser' },
  {
    name: 'extra-device',
    file: 'extra-devices.json',
    extensions: extraDevice,
    slice: 'device',
  },
  { name: 'fetcher', file: 'fetcher.json', extensions: fetcher, slice: 'browser' },
  { name: 'inapp', file: 'inapp.json', extensions: inApp, slice: 'browser' },
  { name: 'library', file: 'library.json', extensions: library, slice: 'browser' },
  {
    name: 'mediaplayer',
    file: 'mediaplayer.json',
    extensions: mediaPlayer,
    slice: 'browser',
  },
  { name: 'vehicle', file: 'vehicle.json', extensions: vehicle, slice: 'device' },
] as const satisfies {
  name: string;
  file: string;
  extensions: ExtensionPack | ExtensionPack[];
  slice: 'browser' | 'device';
}[];

forEach(extensionSuites, runExtensionFixtures);
