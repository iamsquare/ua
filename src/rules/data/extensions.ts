import { AssignKind, TransformKind } from '@/rules/kinds';
import type { ExtensionsData } from '@/rules/load';

export const extensionsData = {
  bots: {
    browser: [
      [
        [/(wget|curl|lynx|elinks|httpie|powershell)[/ ]\(?([\w.-]+)/i],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'cli' },
        ],
      ],
      [
        [
          /(asana|ahrefssiteaudit|(?:bing|microsoft)preview|blueno|(?:amzn|chatgpt|claude|kimi|mistralai|perplexity)-user|cohere-ai|flipboardproxy|hubspot page fetcher|mastodon|(?:bitly|bufferlinkpreview|discord|duckassist|linkedin|pinterest|reddit|roger|siteaudit|twitter|uptime(?:ro)?|ward|zoom)bot|google-site-verification|iframely|kakaotalk-scrap|meta-externalfetcher|y!?j-dlc|yandex(?:calendar|direct(?:dyn)?|fordomain|pagechecker|searchshop)|yadirectfetcher|whatsapp)\/([\w.]+)/i,
          /(bluesky) cardyb\/([\w.]+)/i,
          /(feedly)(?:bot)?\/([\w.]+)/i,
          /agent-(novaact)\/([\w.]+)/i,
          /(skypeuripreview) preview\/([\w.]+)/i,
          /(slack(?:bot)?(?:-imgproxy|-linkexpanding)?) ([\w.]+)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'fetcher' },
        ],
      ],
      [
        [
          /((?:better uptime |keybase|telegram|vercel)bot|lighthouse$|feedfetcher-google|gemini-deep-research|google(?:docs|imageproxy|-read-aloud|-pagerenderer|producer)|snap url preview|vercel(flags|tracing|-(favicon|screenshot)-bot)|virustotal(?=cloud)|yandex(?:sitelinks|userproxy))/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Literal, field: 'type', value: 'fetcher' },
        ],
      ],
      [
        [
          /((?:adidx|ahrefs|amazon|(?:amzn|oai)-search|awario(?:smart|rss)?|bing|borderx|brave|cc|contx|coveo|criteo|dot|duckduck(?:go-favicons-)?|exa|facebook|gpt|iask|kagi|kangaroo |kimi(?:-search)?|linkedin|mj12|mojeek|onespot-scraper|perplexity|qualified|sbintuitions|semrush|seznam|surdotly|swift|yep)bot)\/([\w.-]+)/i,
          /(algolia crawler(?: renderscript)?)\/?([\w.]*)/i,
          /(applebot(?:-extended)?)\/?([\w.]*)/i,
          /(baiduspider[-imagevdonwsfcpr]{0,7})\/?([\w.]*)/i,
          /(claude(?:bot|-searchbot|-web)|anthropic-ai)\/?([\w.]*)/i,
          /(coccocbot-(?:image|web))\/([\w.]+)/i,
          /(daum(?:oa)?(?:-image)?|hubspot crawler)[ /]([\w.]+)/i,
          /(facebook(?:externalhit|catalog)|meta-(?:externalagent|externalads|webindexer))\/([\w.]+)/i,
          /(google(?:bot|other|-inspectiontool)(?:-image|-video|-news)?|storebot-google)\/?([\w.]*)/i,
          /(ia_archiver|archive\.org_bot)\/?([\w.]*)/i,
          /(oncrawl) mobile\/([\w.]+)/i,
          /(qwantbot(?:-news)?)[-\w]*\/?([\w.]*)/i,
          /((?:semrush|splitsignal)bot[-abcfimostw]*)\/?([\w.-]*)/i,
          /(sogou (?:pic|head|web|orion|news) spider)\/([\w.]+)/i,
          /(y!?j-(?:asr|br[uw]|dscv|mmp|vsidx|wsc))\/([\w.]+)/i,
          /(yandex(?:(?:mobile)?(?:accessibility|additional|com|renderresources|screenshot|sprav)?bot(?!.+mirror)|image(?:s|resizer)|adnet|blogs|favicons|market|media|metrika|news|ontodb(?:api)?|partner|rca|tracker|turbo|verti(?:cal)?s|webmaster|video(?:parser)?))\/([\w.]+)/i,
          /(yeti)\/([\w.]+)/i,
          /((?:aihit|blex|diff|fish|huggingface-|liner|msn|pangu|replicate-|runpod-|timpi|together-|xai-|you|zum)bot|(?:audisto |brightedge |magpie-|velenpublicweb)crawler|(?:chatglm-|line|screaming frog seo |yisou)spider|cloudflare(?:-autorag|b\w{21}r)|cotoyogi|(?:firecrawl|twin)agent|freespoke|omgili(?:bot)?|openai image downloader|startpagep\w{14}xy|webzio-extended)\/?([\w.]*)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'crawler' },
        ],
      ],
      [
        [/(ev-crawler)\/([\w.]+)/i],
        [
          { type: AssignKind.Literal, field: 'name', value: 'Headline' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'crawler' },
        ],
      ],
      [
        [/(yandexbot\/([\w.]+); mirrordetector)/i],
        [
          {
            type: AssignKind.Replace,
            field: 'name',
            replace: [/\/.+;/gi, ''] as const,
          },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'crawler' },
        ],
      ],
      [
        [
          /((?:adsbot|apis|mediapartners)-google(?:-mobile)?|google-?(?:other|cloudvertexbot|extended|notebooklm|safety))/i,
          /\b((ai2|aspiegel|atlassian-|dataforseo|deepseek|imagesift|petal|seekport|turnitin|v0|yacy)bot|360spider-?(image|video)?|baidu-ads|botify|(byte|tiktok)spider|cohere-training-data-crawler|elastic(?=\/s)|marginalia|proximic|siteimprove(?=bot|\.com)|teoma|webzio|yahoo! slurp)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Literal, field: 'type', value: 'crawler' },
        ],
      ],
      [
        [
          /^((?:apache|go|java)-http-?client|axios|bun|dart|deno|got|(?:guzzle|lua-resty-|ocaml-co|ok)http|hackney|http\.rb|java|jetty|libwww-perl|needle|node(?:\.js|-fetch|-superagent)|php-soap|postmanruntime|python-(?:httpx|urllib[23]?|requests)|rest-client|scrapy)\/([\w.]+)/i,
          /(adobeair|aiohttp|jsdom)\/([\w.]+)/i,
          /(nutch)-([\w.-]+)(\(|$)/i,
          /\((java)\/([\w.]+)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'library' },
        ],
      ],
      [
        [/(node-fetch|phpcrawl|undici)/i],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Literal, field: 'type', value: 'library' },
        ],
      ],
    ],
    os: [
      [
        [/whatsapp\/[\d.]+ (a|i)/i],
        [
          {
            type: AssignKind.Capture,
            field: 'name',
            transform: TransformKind.AndroidOrIos,
          },
        ],
      ],
    ],
  },
  cli: {
    browser: [
      [
        [/(wget|curl|lynx|elinks|httpie|powershell)[/ ]\(?([\w.-]+)/i],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'cli' },
        ],
      ],
    ],
  },
  crawler: {
    browser: [
      [
        [
          /((?:adidx|ahrefs|amazon|(?:amzn|oai)-search|awario(?:smart|rss)?|bing|borderx|brave|cc|contx|coveo|criteo|dot|duckduck(?:go-favicons-)?|exa|facebook|gpt|iask|kagi|kangaroo |kimi(?:-search)?|linkedin|mj12|mojeek|onespot-scraper|perplexity|qualified|sbintuitions|semrush|seznam|surdotly|swift|yep)bot)\/([\w.-]+)/i,
          /(algolia crawler(?: renderscript)?)\/?([\w.]*)/i,
          /(applebot(?:-extended)?)\/?([\w.]*)/i,
          /(baiduspider[-imagevdonwsfcpr]{0,7})\/?([\w.]*)/i,
          /(claude(?:bot|-searchbot|-web)|anthropic-ai)\/?([\w.]*)/i,
          /(coccocbot-(?:image|web))\/([\w.]+)/i,
          /(daum(?:oa)?(?:-image)?|hubspot crawler)[ /]([\w.]+)/i,
          /(facebook(?:externalhit|catalog)|meta-(?:externalagent|externalads|webindexer))\/([\w.]+)/i,
          /(google(?:bot|other|-inspectiontool)(?:-image|-video|-news)?|storebot-google)\/?([\w.]*)/i,
          /(ia_archiver|archive\.org_bot)\/?([\w.]*)/i,
          /(oncrawl) mobile\/([\w.]+)/i,
          /(qwantbot(?:-news)?)[-\w]*\/?([\w.]*)/i,
          /((?:semrush|splitsignal)bot[-abcfimostw]*)\/?([\w.-]*)/i,
          /(sogou (?:pic|head|web|orion|news) spider)\/([\w.]+)/i,
          /(y!?j-(?:asr|br[uw]|dscv|mmp|vsidx|wsc))\/([\w.]+)/i,
          /(yandex(?:(?:mobile)?(?:accessibility|additional|com|renderresources|screenshot|sprav)?bot(?!.+mirror)|image(?:s|resizer)|adnet|blogs|favicons|market|media|metrika|news|ontodb(?:api)?|partner|rca|tracker|turbo|verti(?:cal)?s|webmaster|video(?:parser)?))\/([\w.]+)/i,
          /(yeti)\/([\w.]+)/i,
          /((?:aihit|blex|diff|fish|huggingface-|liner|msn|pangu|replicate-|runpod-|timpi|together-|xai-|you|zum)bot|(?:audisto |brightedge |magpie-|velenpublicweb)crawler|(?:chatglm-|line|screaming frog seo |yisou)spider|cloudflare(?:-autorag|b\w{21}r)|cotoyogi|(?:firecrawl|twin)agent|freespoke|omgili(?:bot)?|openai image downloader|startpagep\w{14}xy|webzio-extended)\/?([\w.]*)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'crawler' },
        ],
      ],
      [
        [/(ev-crawler)\/([\w.]+)/i],
        [
          { type: AssignKind.Literal, field: 'name', value: 'Headline' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'crawler' },
        ],
      ],
      [
        [/(yandexbot\/([\w.]+); mirrordetector)/i],
        [
          {
            type: AssignKind.Replace,
            field: 'name',
            replace: [/\/.+;/gi, ''] as const,
          },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'crawler' },
        ],
      ],
      [
        [
          /((?:adsbot|apis|mediapartners)-google(?:-mobile)?|google-?(?:other|cloudvertexbot|extended|notebooklm|safety))/i,
          /\b((ai2|aspiegel|atlassian-|dataforseo|deepseek|imagesift|petal|seekport|turnitin|v0|yacy)bot|360spider-?(image|video)?|baidu-ads|botify|(byte|tiktok)spider|cohere-training-data-crawler|elastic(?=\/s)|marginalia|proximic|siteimprove(?=bot|\.com)|teoma|webzio|yahoo! slurp)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Literal, field: 'type', value: 'crawler' },
        ],
      ],
    ],
  },
  extraDevice: {
    device: [
      [[/([\w ]+)?smart tv box/i], [{ type: AssignKind.Literal, field: 'type', value: 'smarttv' }]],
      [
        [
          /(nook)[\w ]+build\/(\w+)/i,
          /(dell) (strea[kpr\d ]*[\dko])/i,
          /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
          /(trinity)[- ]*(t\d{3}) bui/i,
          /(gigaset)[- ]+(q\w{1,9}) bui/i,
          /(vodafone) ([\w ]+)(?:\)| bui)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'vendor' },
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/(u304aa)/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'AT&T' },
          { type: AssignKind.Literal, field: 'type', value: 'mobile' },
        ],
      ],
      [
        [/\bsie-(\w*)/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Siemens' },
          { type: AssignKind.Literal, field: 'type', value: 'mobile' },
        ],
      ],
      [
        [/\b(rct\w+) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'RCA' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b(venue[\d ]{2,7}) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Dell' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b(q(?:mv|ta)\w+) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Verizon' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b(?:barnes[& ]+noble |bn[rt])([\w+ ]*) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Barnes & Noble' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b(tm\d{3}\w+) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'NuVision' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b(k88) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'ZTE' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b(nx\d{3}j) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'ZTE' },
          { type: AssignKind.Literal, field: 'type', value: 'mobile' },
        ],
      ],
      [
        [/\b(gen\d{3}) b.+49h/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Swiss' },
          { type: AssignKind.Literal, field: 'type', value: 'mobile' },
        ],
      ],
      [
        [/\b(zur\d{3}) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Swiss' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b((zeki)?tb\w*)/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Zeki' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b([yr]\d{2}) b/i, /\b(?:dragon[- ]+touch |dt)(\w{5}) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Dragon Touch' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b(ns-?\w{0,9}) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Insignia' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b((nxa|next)-?\w{0,9}) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'NextBook' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b(xtreme_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
        [
          { type: AssignKind.Literal, field: 'vendor', value: 'Voice' },
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'type', value: 'mobile' },
        ],
      ],
      [
        [/\b(lvtel-)?(v1[12]) b/i],
        [
          { type: AssignKind.Literal, field: 'vendor', value: 'LvTel' },
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'type', value: 'mobile' },
        ],
      ],
      [
        [/\b(ph-1) /i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Essential' },
          { type: AssignKind.Literal, field: 'type', value: 'mobile' },
        ],
      ],
      [
        [/\b(v(100md|700na|7011|917g).*\b) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Envizen' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\b(trio[-\w. ]+) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'MachSpeed' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
      [
        [/\btu_(1491) b/i],
        [
          { type: AssignKind.Capture, field: 'model' },
          { type: AssignKind.Literal, field: 'vendor', value: 'Rotor' },
          { type: AssignKind.Literal, field: 'type', value: 'tablet' },
        ],
      ],
    ],
  },
  email: {
    browser: [
      [
        [/(android)\/([\w.-]+email)/i],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'email' },
        ],
      ],
      [
        [
          /((?:air|aqua|blue|claws|daum|fair|fox|k-9|mac|nylas|pegasus|poco|poly|proton|samsung|squirrel|yahoo) ?e?mail(?:-desktop| app| bridge)?|microsoft outlook|r2mail2|spicebird|turnpike|yahoomobile|(?:microsoft )?outlook(?:-express)?|macoutlook|windows-live-mail|alpine|balsa|barca|canary|emclient|eudora|evolution|geary|gnus|horde::imp|incredimail|kmail2?|kontact|lotus-notes|mail(?:bird|mate|spring)|mutt|navermailapp|newton|nine|postbox|rainloop|roundcube webmail|spar(?:row|kdesktop)|sylpheed|the bat!|thunderbird|trojita|tutanota-desktop|wanderlust|zdesktop|zohomail-desktop)(?:m.+ail; |[/ ])([\w.-]+)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name', transform: TransformKind.Email },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'email' },
        ],
      ],
      [
        [/(mail)\/([\w.]+) cf/i],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'email' },
        ],
      ],
      [
        [/(zimbra)\/([\w.-]+)/i],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'email' },
        ],
      ],
    ],
  },
  fetcher: {
    browser: [
      [
        [
          /(asana|ahrefssiteaudit|(?:bing|microsoft)preview|blueno|(?:amzn|chatgpt|claude|kimi|mistralai|perplexity)-user|cohere-ai|flipboardproxy|hubspot page fetcher|mastodon|(?:bitly|bufferlinkpreview|discord|duckassist|linkedin|pinterest|reddit|roger|siteaudit|twitter|uptime(?:ro)?|ward|zoom)bot|google-site-verification|iframely|kakaotalk-scrap|meta-externalfetcher|y!?j-dlc|yandex(?:calendar|direct(?:dyn)?|fordomain|pagechecker|searchshop)|yadirectfetcher|whatsapp)\/([\w.]+)/i,
          /(bluesky) cardyb\/([\w.]+)/i,
          /(feedly)(?:bot)?\/([\w.]+)/i,
          /agent-(novaact)\/([\w.]+)/i,
          /(skypeuripreview) preview\/([\w.]+)/i,
          /(slack(?:bot)?(?:-imgproxy|-linkexpanding)?) ([\w.]+)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'fetcher' },
        ],
      ],
      [
        [
          /((?:better uptime |keybase|telegram|vercel)bot|lighthouse$|feedfetcher-google|gemini-deep-research|google(?:docs|imageproxy|-read-aloud|-pagerenderer|producer)|snap url preview|vercel(flags|tracing|-(favicon|screenshot)-bot)|virustotal(?=cloud)|yandex(?:sitelinks|userproxy))/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Literal, field: 'type', value: 'fetcher' },
        ],
      ],
    ],
    os: [
      [
        [/whatsapp\/[\d.]+ (a|i)/i],
        [
          {
            type: AssignKind.Capture,
            field: 'name',
            transform: TransformKind.AndroidOrIos,
          },
        ],
      ],
    ],
  },
  inApp: {
    browser: [
      [
        [/\bcodex\/([\w.]+).+electron\//i],
        [
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'name', value: 'ChatGPT' },
          { type: AssignKind.Literal, field: 'type', value: 'inapp' },
        ],
      ],
      [
        [
          /\b(discord|figma|mattermost|notion|postman|rambox|rocket.chat|slack|teams)\/([\w.]+).+(electron\/|; ios)/i,
          /(flipboard)\/([\w.]+)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'inapp' },
        ],
      ],
      [
        [/(evernote) win/i, /(teams)mobile-(ios|and)/i],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Literal, field: 'type', value: 'inapp' },
        ],
      ],
      [
        [/chatlyio\/([\d.]+)/i],
        [
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'name', value: 'Slack' },
          { type: AssignKind.Literal, field: 'type', value: 'inapp' },
        ],
      ],
      [
        [/ultralite app_version\/([\w.]+)/i],
        [
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'name', value: 'TikTok Lite' },
          { type: AssignKind.Literal, field: 'type', value: 'inapp' },
        ],
      ],
      [
        [/\) code\/([\d.]+).+electron\//i],
        [
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'name', value: 'VS Code' },
          { type: AssignKind.Literal, field: 'type', value: 'inapp' },
        ],
      ],
      [
        [/jp\.co\.yahoo\.(?:android\.yjtop|ipn\.appli)\/([\d.]+)/i],
        [
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'name', value: 'Yahoo! Japan' },
          { type: AssignKind.Literal, field: 'type', value: 'inapp' },
        ],
      ],
    ],
  },
  library: {
    browser: [
      [
        [
          /^((?:apache|go|java)-http-?client|axios|bun|dart|deno|got|(?:guzzle|lua-resty-|ocaml-co|ok)http|hackney|http\.rb|java|jetty|libwww-perl|needle|node(?:\.js|-fetch|-superagent)|php-soap|postmanruntime|python-(?:httpx|urllib[23]?|requests)|rest-client|scrapy)\/([\w.]+)/i,
          /(adobeair|aiohttp|jsdom)\/([\w.]+)/i,
          /(nutch)-([\w.-]+)(\(|$)/i,
          /\((java)\/([\w.]+)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'library' },
        ],
      ],
      [
        [/(node-fetch|phpcrawl|undici)/i],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Literal, field: 'type', value: 'library' },
        ],
      ],
    ],
  },
  mediaPlayer: {
    browser: [
      [
        [/(Python-urllib)\/([\w.]+)/i],
        [
          { type: AssignKind.Literal, field: 'name', value: 'Python-urllib' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'mediaplayer' },
        ],
      ],
      [
        [/APP-BE Test\/([\w.-]+)/i],
        [
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'name', value: 'BE Test' },
          { type: AssignKind.Literal, field: 'type', value: 'mediaplayer' },
        ],
      ],
      [
        [/\b(stagefright)\/([\w.-]+)/i],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'mediaplayer' },
        ],
      ],
      [
        [/(mplayer)\s+svn\s+(r?[\d]+)/i],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'mediaplayer' },
        ],
      ],
      [
        [/^(videos)\/([\w.-]+)/i],
        [
          { type: AssignKind.Literal, field: 'name', value: 'Video' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'mediaplayer' },
        ],
      ],
      [
        [
          /(apple(?:coremedia|tv))\/([\w._]+)/i,
          /(coremedia) v([\w._]+)/i,
          /(ares|clementine|music player daemon|nexplayer|ossproxy) ([\w.-]+)/i,
          /^(aqualung|audacious|audimusicstream|amarok|bass|bsplayer|core|gnomemplayer|gvfs|irapp|lyssna|music on console|nero (?:home|scout)|nokia\d+|nsplayer|psp-internetradioplayer|quicktime|rma|radioapp|radioclientapplication|soundtap|stagefright|streamium|totem|videos|xbmc|xine|xmms)\/([\w.-]+)/i,
          /(lg player|nexplayer) ([\d.]+)/i,
          /player\/(nexplayer|lg player) ([\w.-]+)/i,
          /(gstreamer) souphttpsrc.+libsoup\/([\w.-]+)/i,
          /(htc streaming player) [\w_]+ \/ ([\d.]+)/i,
          /(lavf)([\d.]+)/i,
          /(mplayer)(?: |\/)(?:(?:sherpya-){0,1}svn)(?:-| )(r\d+(?:-\d+[\w.-]+))/i,
          / (songbird)\/([\w.-]+)/i,
          /(winamp)(?:3 version|mpeg)?(?:[/ ]([\w.-]+))?/i,
          /(vlc)(?:\/| media player - version )([\w.-]+)/i,
          /^(foobar2000|itunes|smp)\/([\d.]+)/i,
          /com\.(riseupradioalarm)\/([\d.]*)/i,
          /(mplayer)(?:\s|\/| unknown-)([\w.-]+)/i,
          /(windows)\/([\w.-]+) upnp\/[\d.]+ dlnadoc\/[\d.]+ home media server/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'mediaplayer' },
        ],
      ],
      [
        [/(flrp)\/([\w.-]+)/i],
        [
          { type: AssignKind.Literal, field: 'name', value: 'Flip Player' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'mediaplayer' },
        ],
      ],
      [
        [
          /(fstream|media player classic|inlight radio|mplayer|nativehost|nero showtime|ocms-bot|queryseekspider|tapinradio|tunein radio|winamp|yourmuze)/i,
        ],
        [
          { type: AssignKind.Capture, field: 'name' },
          { type: AssignKind.Literal, field: 'type', value: 'mediaplayer' },
        ],
      ],
      [
        [/(htc_one_s|windows-media-player|wmplayer)\/([\w.-]+)/i],
        [
          {
            type: AssignKind.Replace,
            field: 'name',
            replace: [/[_-]/g, ' '] as const,
          },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'mediaplayer' },
        ],
      ],
      [
        [/(rad.io|radio.(?:de|at|fr)) ([\d.]+)/i],
        [
          { type: AssignKind.Literal, field: 'name', value: 'rad.io' },
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'type', value: 'mediaplayer' },
        ],
      ],
    ],
  },
  vehicle: {
    device: [
      [[/aftlbt962e2/i], [{ type: AssignKind.Literal, field: 'vendor', value: 'BMW' }]],
      [[/dilink.+(byd) auto/i], [{ type: AssignKind.Capture, field: 'vendor' }]],
      [
        [/aftlft962x3/i],
        [
          { type: AssignKind.Literal, field: 'vendor', value: 'Jeep' },
          { type: AssignKind.Literal, field: 'model', value: 'Wagooner' },
        ],
      ],
      [
        [/(rivian) (r1t)/i],
        [
          { type: AssignKind.Capture, field: 'vendor' },
          { type: AssignKind.Capture, field: 'model' },
        ],
      ],
      [[/vcc.+netfront/i], [{ type: AssignKind.Literal, field: 'vendor', value: 'Volvo' }]],
    ],
  },
} as const satisfies ExtensionsData;
