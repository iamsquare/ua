import { AssignKind } from '@/rules/kinds';
import type { AuthoredCategory } from '@/rules/load';

export const browserRulesData = [
  {
    patterns: [/\b(?:crmo|crios)\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Mobile Chrome' },
    ],
  },
  {
    patterns: [/webview.+edge\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Edge WebView' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  },
  {
    patterns: [/edg(?:e|ios|a)?\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Edge' },
    ],
  },
  {
    patterns: [
      /(opera mini)\/([-\w.]+)/i,
      /(opera [mobiletab]{3,6})\b.+version\/([-\w.]+)/i,
      /(opera)(?:.+version\/|[/ ]+)([\w.]+)/i,
    ],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/opios[/ ]+([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera Mini' },
    ],
  },
  {
    patterns: [/\bop(?:rg)?x\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera GX' },
    ],
  },
  {
    patterns: [/\bopr\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera' },
    ],
  },
  {
    patterns: [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[/ ]?([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Baidu' },
    ],
  },
  {
    patterns: [/\b(?:mxbrowser|mxios|myie2)\/?([-\w.]*)\b/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Maxthon' },
    ],
  },
  {
    patterns: [
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
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/quark(?:pc)?\/([-\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Quark' },
    ],
  },
  {
    patterns: [/\bddg\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'DuckDuckGo' },
    ],
  },
  {
    patterns: [/(?:\buc? ?browser|(?:juc.+)ucweb| ucpc)[/ ]?([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'UCBrowser' },
    ],
  },
  {
    patterns: [
      /microm.+\bqbcore\/([\w.]+)/i,
      /\bqbcore\/([\w.]+).+microm/i,
      /micromessenger\/([\w.]+)/i,
    ],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'WeChat' },
    ],
  },
  {
    patterns: [/konqueror\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Konqueror' },
    ],
  },
  {
    patterns: [/trident.+rv[: ]([\w.]{1,9})\b.+like gecko/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'IE' },
    ],
  },
  {
    patterns: [/ya(?:search)?browser\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Yandex' },
    ],
  },
  {
    patterns: [/slbrowser\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Smart Lenovo Browser' },
    ],
  },
  {
    patterns: [/(av(?:ast|g|ira))\/([\w.]+)/i],
    assign: [
      {
        type: AssignKind.Replace,
        field: 'name',
        replace: [/(.+)/, '$1 Secure Browser'] as const,
      },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/norton\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Norton Private Browser' },
    ],
  },
  {
    patterns: [/\bfocus\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Firefox Focus' },
    ],
  },
  {
    patterns: [/ mms\/([\w.]+)$/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera Neon' },
    ],
  },
  {
    patterns: [/ opt\/([\w.]+)$/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera Touch' },
    ],
  },
  {
    patterns: [/coc_coc\w+\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Coc Coc' },
    ],
  },
  {
    patterns: [/dolfin\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Dolphin' },
    ],
  },
  {
    patterns: [/coast\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Opera Coast' },
    ],
  },
  {
    patterns: [/miuibrowser\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'MIUI Browser' },
    ],
  },
  {
    patterns: [/fxios\/([\w.-]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Mobile Firefox' },
    ],
  },
  {
    patterns: [/\bqihoobrowser\/?([\w.]*)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: '360' },
    ],
  },
  {
    patterns: [/\b(qq)\/([\w.]+)/i],
    assign: [
      {
        type: AssignKind.Replace,
        field: 'name',
        replace: [/(.+)/, '$1Browser'] as const,
      },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w.]+)/i],
    assign: [
      {
        type: AssignKind.Replace,
        field: 'name',
        replace: [/(.+)/, '$1 Browser'] as const,
      },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/ HBPC\/([\w.]+)/],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Huawei Browser' },
    ],
  },
  {
    patterns: [/samsungbrowser\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Samsung Internet' },
    ],
  },
  {
    patterns: [/metasr[/ ]?([\d.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Sogou Explorer' },
    ],
  },
  {
    patterns: [/(sogou)mo\w+\/([\d.]+)/i],
    assign: [
      { type: AssignKind.Literal, field: 'name', value: 'Sogou Mobile' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [
      /(electron)\/([\w.]+) safari/i,
      /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w.]+))/i,
      /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[/ ]?v?([\w.]+)/i,
    ],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/(lbbrowser|luakit|rekonq|steam(?= (clie|tenf|gameo)))/i],
    assign: [{ type: AssignKind.Capture, field: 'name' }],
  },
  {
    patterns: [/version\/([\d.]+) .+ (brave)$/i, /ome\/([\w.]+).+(iron(?= saf)|360(?=[es]e$))/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Capture, field: 'name' },
    ],
  },
  {
    patterns: [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w.]+);)/i],
    assign: [
      { type: AssignKind.Literal, field: 'name', value: 'Facebook' },
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  },
  {
    patterns: [
      /(^chatgpt|instagram|kakao(?:talk|story)|klarna|snapchat)[/ ]([-\w.]+)/i,
      /(naver)\(.*?(\d+\.[\w.]+).*\)/i,
      /(daum)apps[/ ]([\w.]+)/i,
      /safari (line)\/([\w.]+)/i,
      /\b(line)\/([\w.]+)\/iab/i,
      /(alipay)client\/([\w.]+)/i,
      /(twitter)(?:and| f.+e\/([\w.]+))/i,
      /(bing)(?:web|sapphire)\/([\w.]+)/i,
    ],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  },
  {
    patterns: [/\bwa(?:4a|ios)[/ ]([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'WhatsApp' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  },
  {
    patterns: [/\bgsa\/([\w.]+) .*safari\//i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'GSA' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  },
  {
    patterns: [/(?:musical_ly|trill)(?:.+app_?version\/|_)([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'TikTok' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  },
  {
    patterns: [/\[(linkedin)app\]/i],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  },
  {
    patterns: [/(zalo(?:app)?)[/\sa-z]*([\w.-]+)/i],
    assign: [
      {
        type: AssignKind.Replace,
        field: 'name',
        replace: [/(.+)/, 'Zalo'] as const,
      },
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  },
  {
    patterns: [/(chromium)[/ ]([-\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/ome-(lighthouse)$/i],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Literal, field: 'type', value: 'fetcher' },
    ],
  },
  {
    patterns: [/headlesschrome(?:\/([\w.]+)| )/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Chrome Headless' },
    ],
  },
  {
    patterns: [/wv\).+chrome\/([\w.]+).+edgw\//i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Edge WebView2' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  },
  {
    patterns: [/; wv\).+(chrome)\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Literal, field: 'name', value: 'Chrome WebView' },
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'type', value: 'inapp' },
    ],
  },
  {
    patterns: [/droid.+ version\/([\w.]+)\b.+(?:mobile safari|safari)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Android Browser' },
    ],
  },
  {
    patterns: [/chrome\/([\w.]+) mobile/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Mobile Chrome' },
    ],
  },
  {
    patterns: [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/version\/([\w.,]+) .*mobile(?:\/\w+ | ?)safari/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Mobile Safari' },
    ],
  },
  {
    patterns: [/iphone .*mobile(?:\/\w+ | ?)safari/i],
    assign: [{ type: AssignKind.Literal, field: 'name', value: 'Mobile Safari' }],
  },
  {
    patterns: [/version\/([\w.,]+) .*(safari)/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Capture, field: 'name' },
    ],
  },
  {
    patterns: [/webkit.+?(mobile ?safari|safari)(\/[\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Literal, field: 'version', value: '1' },
    ],
  },
  {
    patterns: [/(webkit|khtml)\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/(?:mobile|tablet);.*(firefox)\/([\w.-]+)/i],
    assign: [
      { type: AssignKind.Literal, field: 'name', value: 'Mobile Firefox' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/(navigator|netscape\d?)\/([-\w.]+)/i],
    assign: [
      { type: AssignKind.Literal, field: 'name', value: 'Netscape' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/(wolvic|librewolf)\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Capture, field: 'version' },
    ],
  },
  {
    patterns: [/mobile vr; rv:([\w.]+)\).+firefox/i],
    assign: [
      { type: AssignKind.Capture, field: 'version' },
      { type: AssignKind.Literal, field: 'name', value: 'Firefox Reality' },
    ],
  },
  {
    patterns: [
      /ekiohf.+(flow)\/([\w.]+)/i,
      /(swiftfox)/i,
      /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[/ ]?([\w.+]+)/i,
      /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|basilisk|waterfox)\/([-\w.]+)$/i,
      /(firefox)\/([\w.]+)/i,
      /(mozilla)\/([\w.]+(?= .+rv:.+gecko\/\d+)|[0-4][\w.]+(?!.+compatible))/i,
      /(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[. ]?browser)[-/ ]?v?([\w.]+)/i,
      /\b(links) \(([\w.]+)/i,
    ],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      { type: AssignKind.Replace, field: 'version', replace: [/_/g, '.'] as const },
    ],
  },
  {
    patterns: [/(cobalt)\/([\w.]+)/i],
    assign: [
      { type: AssignKind.Capture, field: 'name' },
      {
        type: AssignKind.Replace,
        field: 'version',
        replace: [/[^\d.]+./, ''] as const,
      },
    ],
  },
] as const satisfies AuthoredCategory;
