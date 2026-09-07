import type { AuthoredCategory } from '@/rules/load';

export const browserRulesData = [
  [
    [/\b(?:crmo|crios)\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Mobile Chrome' },
    ],
  ],
  [
    [/webview.+edge\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Edge WebView' },
      { type: 'literal', field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/edg(?:e|ios|a)?\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Edge' },
    ],
  ],
  [
    [
      /(opera mini)\/([-\w.]+)/i,
      /(opera [mobiletab]{3,6})\b.+version\/([-\w.]+)/i,
      /(opera)(?:.+version\/|[/ ]+)([\w.]+)/i,
    ],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/opios[/ ]+([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Opera Mini' },
    ],
  ],
  [
    [/\bop(?:rg)?x\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Opera GX' },
    ],
  ],
  [
    [/\bopr\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Opera' },
    ],
  ],
  [
    [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[/ ]?([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Baidu' },
    ],
  ],
  [
    [/\b(?:mxbrowser|mxios|myie2)\/?([-\w.]*)\b/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Maxthon' },
    ],
  ],
  [
    [
      /(kindle)\/([\w.]+)/i,
      /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[/ ]?([\w.]*)/i,
      /(avant|iemobile|slim(?:browser|boat|jet))[/ ]?([\d.]*)/i,
      /(?:ms|\()(ie) ([\w.]+)/i,
      /(atlas|flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon|otter|dooble|(?:hi|lg |ovi|qute)browser|palemoon)\/v?([-\w.]+)/i,
      /(brave)(?: chrome)?\/([\d.]+)/i,
      /(aloha|heytap|ovi|115|surf|qwant)browser\/([\d.]+)/i,
      /(qwant)(?:ios|mobile)\/([\d.]+)/i,
      /(ecosia|weibo)(?:__| \w+@)([\d.]+)/i,
    ],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/quark(?:pc)?\/([-\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Quark' },
    ],
  ],
  [
    [/\bddg\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'DuckDuckGo' },
    ],
  ],
  [
    [/(?:\buc? ?browser|(?:juc.+)ucweb| ucpc)[/ ]?([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'UCBrowser' },
    ],
  ],
  [
    [/microm.+\bqbcore\/([\w.]+)/i, /\bqbcore\/([\w.]+).+microm/i, /micromessenger\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'WeChat' },
    ],
  ],
  [
    [/konqueror\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Konqueror' },
    ],
  ],
  [
    [/trident.+rv[: ]([\w.]{1,9})\b.+like gecko/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'IE' },
    ],
  ],
  [
    [/ya(?:search)?browser\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Yandex' },
    ],
  ],
  [
    [/slbrowser\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Smart Lenovo Browser' },
    ],
  ],
  [
    [/(av(?:ast|g|ira))\/([\w.]+)/i],
    [
      {
        type: 'replace',
        group: 1,
        field: 'name',
        replace: [/(.+)/, '$1 Secure Browser'] as const,
      },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/norton\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Norton Private Browser' },
    ],
  ],
  [
    [/\bfocus\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Firefox Focus' },
    ],
  ],
  [
    [/ mms\/([\w.]+)$/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Opera Neon' },
    ],
  ],
  [
    [/ opt\/([\w.]+)$/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Opera Touch' },
    ],
  ],
  [
    [/coc_coc\w+\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Coc Coc' },
    ],
  ],
  [
    [/dolfin\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Dolphin' },
    ],
  ],
  [
    [/coast\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Opera Coast' },
    ],
  ],
  [
    [/miuibrowser\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'MIUI Browser' },
    ],
  ],
  [
    [/fxios\/([\w.-]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Mobile Firefox' },
    ],
  ],
  [
    [/\bqihoobrowser\/?([\w.]*)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: '360' },
    ],
  ],
  [
    [/\b(qq)\/([\w.]+)/i],
    [
      {
        type: 'replace',
        group: 1,
        field: 'name',
        replace: [/(.+)/, '$1Browser'] as const,
      },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w.]+)/i],
    [
      {
        type: 'replace',
        group: 1,
        field: 'name',
        replace: [/(.+)/, '$1 Browser'] as const,
      },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/ HBPC\/([\w.]+)/],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Huawei Browser' },
    ],
  ],
  [
    [/samsungbrowser\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Samsung Internet' },
    ],
  ],
  [
    [/metasr[/ ]?([\d.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Sogou Explorer' },
    ],
  ],
  [
    [/(sogou)mo\w+\/([\d.]+)/i],
    [
      { type: 'literal', field: 'name', value: 'Sogou Mobile' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [
      /(electron)\/([\w.]+) safari/i,
      /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w.]+))/i,
      /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[/ ]?v?([\w.]+)/i,
    ],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/(lbbrowser|luakit|rekonq|steam(?= (clie|tenf|gameo)))/i],
    [{ type: 'capture', group: 1, field: 'name' }],
  ],
  [
    [/version\/([\d.]+) .+ (brave)$/i, /ome\/([\w.]+).+(iron(?= saf)|360(?=[es]e$))/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'capture', group: 2, field: 'name' },
    ],
  ],
  [
    [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w.]+);)/i],
    [
      { type: 'literal', field: 'name', value: 'Facebook' },
      { type: 'capture', group: 2, field: 'version' },
      { type: 'literal', field: 'type', value: 'inapp' },
    ],
  ],
  [
    [
      /(^chatgpt|instagram|kakao(?:talk|story)|klarna|snapchat)[/ ]([-\w.]+)/i,
      /(naver)\(.*?(\d+\.[\w.]+).*\)/i,
      /(daum)apps[/ ]([\w.]+)/i,
      /safari (line)\/([\w.]+)/i,
      /\b(line)\/([\w.]+)\/iab/i,
      /(alipay)client\/([\w.]+)/i,
      /(twitter)(?:and| f.+e\/([\w.]+))/i,
      /(bing)(?:web|sapphire)\/([\w.]+)/i,
    ],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
      { type: 'literal', field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/\bwa(?:4a|ios)[/ ]([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'WhatsApp' },
      { type: 'literal', field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/\bgsa\/([\w.]+) .*safari\//i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'GSA' },
      { type: 'literal', field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/(?:musical_ly|trill)(?:.+app_?version\/|_)([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'TikTok' },
      { type: 'literal', field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/\[(linkedin)app\]/i],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'literal', field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/(zalo(?:app)?)[/\sa-z]*([\w.-]+)/i],
    [
      {
        type: 'replace',
        group: 1,
        field: 'name',
        replace: [/(.+)/, 'Zalo'] as const,
      },
      { type: 'capture', group: 2, field: 'version' },
      { type: 'literal', field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/(chromium)[/ ]([-\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/ome-(lighthouse)$/i],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'literal', field: 'type', value: 'fetcher' },
    ],
  ],
  [
    [/headlesschrome(?:\/([\w.]+)| )/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Chrome Headless' },
    ],
  ],
  [
    [/wv\).+chrome\/([\w.]+).+edgw\//i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Edge WebView2' },
      { type: 'literal', field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/; wv\).+(chrome)\/([\w.]+)/i],
    [
      { type: 'literal', field: 'name', value: 'Chrome WebView' },
      { type: 'capture', group: 2, field: 'version' },
      { type: 'literal', field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/droid.+ version\/([\w.]+)\b.+(?:mobile safari|safari)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Android Browser' },
    ],
  ],
  [
    [/chrome\/([\w.]+) mobile/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Mobile Chrome' },
    ],
  ],
  [
    [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/version\/([\w.,]+) .*mobile(?:\/\w+ | ?)safari/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Mobile Safari' },
    ],
  ],
  [
    [/iphone .*mobile(?:\/\w+ | ?)safari/i],
    [{ type: 'literal', field: 'name', value: 'Mobile Safari' }],
  ],
  [
    [/version\/([\w.,]+) .*(safari)/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'capture', group: 2, field: 'name' },
    ],
  ],
  [
    [/webkit.+?(mobile ?safari|safari)(\/[\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'literal', field: 'version', value: '1' },
    ],
  ],
  [
    [/(webkit|khtml)\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/(?:mobile|tablet);.*(firefox)\/([\w.-]+)/i],
    [
      { type: 'literal', field: 'name', value: 'Mobile Firefox' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/(navigator|netscape\d?)\/([-\w.]+)/i],
    [
      { type: 'literal', field: 'name', value: 'Netscape' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/(wolvic|librewolf)\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'capture', group: 2, field: 'version' },
    ],
  ],
  [
    [/mobile vr; rv:([\w.]+)\).+firefox/i],
    [
      { type: 'capture', group: 1, field: 'version' },
      { type: 'literal', field: 'name', value: 'Firefox Reality' },
    ],
  ],
  [
    [
      /ekiohf.+(flow)\/([\w.]+)/i,
      /(swiftfox)/i,
      /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[/ ]?([\w.+]+)/i,
      /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|basilisk|waterfox)\/([-\w.]+)$/i,
      /(firefox)\/([\w.]+)/i,
      /(mozilla)\/([\w.]+(?= .+rv:.+gecko\/\d+)|[0-4][\w.]+(?!.+compatible))/i,
      /(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[. ]?browser)[-/ ]?v?([\w.]+)/i,
      /\b(links) \(([\w.]+)/i,
    ],
    [
      { type: 'capture', group: 1, field: 'name' },
      { type: 'replace', group: 2, field: 'version', replace: [/_/g, '.'] as const },
    ],
  ],
  [
    [/(cobalt)\/([\w.]+)/i],
    [
      { type: 'capture', group: 1, field: 'name' },
      {
        type: 'replace',
        group: 2,
        field: 'version',
        replace: [/[^\d.]+./, ''] as const,
      },
    ],
  ],
] as const satisfies AuthoredCategory;
