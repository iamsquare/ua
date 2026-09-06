import { AssignKind } from '@/rules/kinds';
import type { AuthoredCategory } from '@/rules/load';

export const browserRulesData = [
  [
    [/\b(?:crmo|crios)\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Mobile Chrome' },
    ],
  ],
  [
    [/webview.+edge\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Edge WebView' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/edg(?:e|ios|a)?\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Edge' },
    ],
  ],
  [
    [
      /(opera mini)\/([-\w.]+)/i,
      /(opera [mobiletab]{3,6})\b.+version\/([-\w.]+)/i,
      /(opera)(?:.+version\/|[/ ]+)([\w.]+)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/opios[/ ]+([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera Mini' },
    ],
  ],
  [
    [/\bop(?:rg)?x\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera GX' },
    ],
  ],
  [
    [/\bopr\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera' },
    ],
  ],
  [
    [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[/ ]?([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Baidu' },
    ],
  ],
  [
    [/\b(?:mxbrowser|mxios|myie2)\/?([-\w.]*)\b/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Maxthon' },
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
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/quark(?:pc)?\/([-\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Quark' },
    ],
  ],
  [
    [/\bddg\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'DuckDuckGo' },
    ],
  ],
  [
    [/(?:\buc? ?browser|(?:juc.+)ucweb| ucpc)[/ ]?([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'UCBrowser' },
    ],
  ],
  [
    [/microm.+\bqbcore\/([\w.]+)/i, /\bqbcore\/([\w.]+).+microm/i, /micromessenger\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'WeChat' },
    ],
  ],
  [
    [/konqueror\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Konqueror' },
    ],
  ],
  [
    [/trident.+rv[: ]([\w.]{1,9})\b.+like gecko/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'IE' },
    ],
  ],
  [
    [/ya(?:search)?browser\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Yandex' },
    ],
  ],
  [
    [/slbrowser\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Smart Lenovo Browser' },
    ],
  ],
  [
    [/(av(?:ast|g|ira))\/([\w.]+)/i],
    [
      {
        type: AssignKind.Replace,
        field: 'name',
        replace: [/(.+)/, '$1 Secure Browser'] as const,
      },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/norton\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Norton Private Browser' },
    ],
  ],
  [
    [/\bfocus\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Firefox Focus' },
    ],
  ],
  [
    [/ mms\/([\w.]+)$/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera Neon' },
    ],
  ],
  [
    [/ opt\/([\w.]+)$/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera Touch' },
    ],
  ],
  [
    [/coc_coc\w+\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Coc Coc' },
    ],
  ],
  [
    [/dolfin\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Dolphin' },
    ],
  ],
  [
    [/coast\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera Coast' },
    ],
  ],
  [
    [/miuibrowser\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'MIUI Browser' },
    ],
  ],
  [
    [/fxios\/([\w.-]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Mobile Firefox' },
    ],
  ],
  [
    [/\bqihoobrowser\/?([\w.]*)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: '360' },
    ],
  ],
  [
    [/\b(qq)\/([\w.]+)/i],
    [
      {
        type: AssignKind.Replace,
        field: 'name',
        replace: [/(.+)/, '$1Browser'] as const,
      },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w.]+)/i],
    [
      {
        type: AssignKind.Replace,
        field: 'name',
        replace: [/(.+)/, '$1 Browser'] as const,
      },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/ HBPC\/([\w.]+)/],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Huawei Browser' },
    ],
  ],
  [
    [/samsungbrowser\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Samsung Internet' },
    ],
  ],
  [
    [/metasr[/ ]?([\d.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Sogou Explorer' },
    ],
  ],
  [
    [/(sogou)mo\w+\/([\d.]+)/i],
    [
      { type: AssignKind.Literal, field: 'name', value: 'Sogou Mobile' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [
      /(electron)\/([\w.]+) safari/i,
      /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w.]+))/i,
      /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[/ ]?v?([\w.]+)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/(lbbrowser|luakit|rekonq|steam(?= (clie|tenf|gameo)))/i],
    [{ type: AssignKind.Capture, field: 'name' }],
  ],
  [
    [/version\/([\d.]+) .+ (brave)$/i, /ome\/([\w.]+).+(iron(?= saf)|360(?=[es]e$))/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Capture, field: 'name' },
    ],
  ],
  [
    [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w.]+);)/i],
    [
      { type: AssignKind.Literal, field: 'name', value: 'Facebook' },
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
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
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/\bwa(?:4a|ios)[/ ]([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'WhatsApp' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/\bgsa\/([\w.]+) .*safari\//i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'GSA' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/(?:musical_ly|trill)(?:.+app_?version\/|_)([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'TikTok' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/\[(linkedin)app\]/i],
    [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/(zalo(?:app)?)[/\sa-z]*([\w.-]+)/i],
    [
      {
        type: AssignKind.Replace,
        field: 'name',
        replace: [/(.+)/, 'Zalo'] as const,
      },
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/(chromium)[/ ]([-\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/ome-(lighthouse)$/i],
    [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Literal, field: 'type', value: 'fetcher' },
    ],
  ],
  [
    [/headlesschrome(?:\/([\w.]+)| )/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Chrome Headless' },
    ],
  ],
  [
    [/wv\).+chrome\/([\w.]+).+edgw\//i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Edge WebView2' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/; wv\).+(chrome)\/([\w.]+)/i],
    [
      { type: AssignKind.Literal, field: 'name', value: 'Chrome WebView' },
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  ],
  [
    [/droid.+ version\/([\w.]+)\b.+(?:mobile safari|safari)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Android Browser' },
    ],
  ],
  [
    [/chrome\/([\w.]+) mobile/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Mobile Chrome' },
    ],
  ],
  [
    [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/version\/([\w.,]+) .*mobile(?:\/\w+ | ?)safari/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Mobile Safari' },
    ],
  ],
  [
    [/iphone .*mobile(?:\/\w+ | ?)safari/i],
    [{ type: AssignKind.Literal, field: 'name', value: 'Mobile Safari' }],
  ],
  [
    [/version\/([\w.,]+) .*(safari)/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Capture, field: 'name' },
    ],
  ],
  [
    [/webkit.+?(mobile ?safari|safari)(\/[\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Literal, field: 'version', value: '1' },
    ],
  ],
  [
    [/(webkit|khtml)\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/(?:mobile|tablet);.*(firefox)\/([\w.-]+)/i],
    [
      { type: AssignKind.Literal, field: 'name', value: 'Mobile Firefox' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/(navigator|netscape\d?)\/([-\w.]+)/i],
    [
      { type: AssignKind.Literal, field: 'name', value: 'Netscape' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/(wolvic|librewolf)\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  ],
  [
    [/mobile vr; rv:([\w.]+)\).+firefox/i],
    [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Firefox Reality' },
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
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Replace, field: 'version', replace: [/_/g, '.'] as const },
    ],
  ],
  [
    [/(cobalt)\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'name' },
      {
        type: AssignKind.Replace,
        field: 'version',
        replace: [/[^\d.]+./, ''] as const,
      },
    ],
  ],
] as const satisfies AuthoredCategory;
