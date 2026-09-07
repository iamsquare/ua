import { windowsVersionMap } from '@/rules/data/maps';
import type { AuthoredCategory } from '@/rules/load';

export const osRulesData = [
  [
    [/(windows nt) (6\.[23]); arm/i],
    [
      { type: 'replace', group: 1, field: 'name', replace: [/N/, 'R'] as const },
      {
        type: 'map',
        group: 2,
        field: 'version',
        map: windowsVersionMap,
      },
    ],
  ],
  [
    [
      /(windows (?:phone|mobile|iot))(?: os)?[/ ]?([\d.]*( se)?)/i,
      /(windows)[/ ](1[01]|2000|3\.1|7|8(\.1)?|9[58]|me|server 20\d\d( r2)?|vista|xp)/i,
    ],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/windows nt ?([\d.)]*)(?!.+xbox)/i, /\bwin(?=3| ?9|n)(?:nt| 9x )?([\d.;]*)/i],
    [
      {
        type: 'replace-map',
        group: 1,
        field: 'version',
        replace: [/(;|\))/g, ''] as const,
        map: windowsVersionMap,
      },
      { type: 'literal', field: 'name', value: 'Windows' },
    ],
  ],
  [
    [/(windows ce)\/?([\d.]*)/i],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [
      /[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
      /(?:ios;fbsv|ios(?=.+ip(?:ad|hone)|.+apple ?tv)|ip(?:ad|hone)(?: |.+i(?:pad)?)os|apple ?tv.+ios)[/ ]([\w.]+)/i,
      /\btvos ?([\w.]+)/i,
      /cfnetwork\/.+darwin/i,
    ],
    [
      { type: 'replace', group: 1, field: 'version', replace: [/_/g, '.'] as const },
      { type: 'literal', field: 'name', value: 'iOS' },
    ],
  ],
  [
    [/(mac os x) ?([\w. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+(haiku|morphos))/i],
    [
      { type: 'literal', field: 'name', value: 'macOS' },
      { type: 'replace', group: 2, field: 'version', replace: [/_/g, '.'] as const },
    ],
  ],
  [
    [/android ([\d.]+).*crkey/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Chromecast Android' },
    ],
  ],
  [
    [/fuchsia.*crkey\/([\d.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Chromecast Fuchsia' },
    ],
  ],
  [
    [/crkey\/([\d.]+).*devicetype\/smartspeaker/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Chromecast SmartSpeaker' },
    ],
  ],
  [
    [/linux.*crkey\/([\d.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Chromecast Linux' },
    ],
  ],
  [
    [/crkey\/([\d.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Chromecast' },
    ],
  ],
  [
    [/droid ([\w.]+)\b.+(android[- ]x86)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'capture', group: 2, field: 'name' },
    ],
  ],
  [
    [/(ubuntu) ([\w.]+) like android/i],
    [
      {
        type: 'replace',
        group: 1,
        field: 'name',
        replace: [/(.+)/, '$1 Touch'] as const,
      },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [
      /(harmonyos)[/ ]?([\d.]*)/i,
      /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen)\w*[-/.; ]?([\d.]*)/i,
    ],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/\(bb(10);/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'BlackBerry' },
    ],
  ],
  [
    [/(?:symbian ?os|symbos|s60(?=;)|series ?60)[-/ ]?([\w.]*)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Symbian' },
    ],
  ],
  [
    [
      /mozilla\/[\d.]+ \((?:mobile[;\w ]*|tablet|tv|[^)]*(?:viera|lg(?:l25|-d300)|alcatel ?o.+|y300-f1)); rv:([\w.]+)\).+gecko\//i,
    ],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Firefox OS' },
    ],
  ],
  [
    [/\b(?:hp)?wos(?:browser)?\/([\w.]+)/i, /webos(?:[ /]?|\.tv-20(?=2[2-9]))(\d[\d.]*)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'webOS' },
    ],
  ],
  [
    [/web0s;.+?(?:chr[o0]me|safari)\/(\d+)/i],
    [
      {
        type: 'map',
        group: 1,
        field: 'version',
        map: {
          '1': '537',
          '2': '538',
          '3': '38',
          '4': '53',
          '5': '68',
          '6': '79',
          '22': '87',
          '23': '94',
          '24': '108',
          '25': '120',
          '*': 'TV',
        },
      },
      { type: 'literal', field: 'name', value: 'webOS' },
    ],
  ],
  [
    [/watch(?: ?os[,/ ]|\d,\d\/)([\d.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'watchOS' },
    ],
  ],
  [
    [/cros [\w]+(?:\)| ([\w.]+)\b)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Chrome OS' },
    ],
  ],
  [
    [/kepler ([\w.]+); (aft|aeo)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Vega OS' },
    ],
  ],
  [
    [
      /(netrange)mmh/i,
      /(nettv)\/(\d+\.[\w.]+)/i,
      /(nintendo|playstation) (\w+)/i,
      /(xbox); +xbox ([^);]+)/i,
      /(pico) .+os([\w.]+)/i,
      /\b(joli|palm)\b ?(?:os)?\/?([\w.]*)/i,
      /linux.+(mint)[/() ]?([\w.]*)/i,
      /(mageia|vectorlinux|fuchsia|arcaos|arch(?= ?linux))[;l ]([\d.]*)/i,
      /([kxln]?ubuntu|debian|suse|opensuse|gentoo|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire|knoppix)(?: gnu[/ ]linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-/ ]?(?!chrom|package)([-\w.]*)/i,
      /((?:open)?solaris)[-/ ]?([\w.]*)/i,
      /\b(aix)[; ]([1-9.]{0,4})/i,
      /(hurd|linux|morphos)(?: (?:arm|x86|ppc)\w*| ?)([\w.]*)/i,
      /(gnu) ?([\w.]*)/i,
      /\b([-frentopcghs]{0,5}bsd|dragonfly)[/ ]?(?!amd|[ix346]{1,2}86)([\w.]*)/i,
      /(haiku) ?(r\d)?/i,
    ],
    [
      { type: 'map', group: 1, field: 'name', map: { PICO: 'pico' } },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/(sunos) ?([\d.]*)/i],
    [
      { type: 'literal', field: 'name', value: 'Solaris' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/\b(beos|os\/2|amigaos|openvms|hp-ux|serenityos)/i, /(unix) ?([\w.]*)/i],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
] as const satisfies AuthoredCategory;
