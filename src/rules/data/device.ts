import { AssignKind, TransformKind } from '@/rules/kinds';
import type { AuthoredCategory } from '@/rules/load';

export const deviceRulesData = [
  [
    [/(?:\/|\()(ip(?:hone|od)[\w, ]*)[/);]/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Apple' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/\b(?:ios|apple\w+)\/.+[(/](ipad)/i, /\b(ipad)[\d,]*[;\] ].+(mac |i(pad)?)os/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Apple' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/(macintosh);/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Apple' },
    ],
  ],
  [
    [/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Samsung' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [
      /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
      /samsung[- ]((?!sm-[lr]|browser)[-\w]+)/i,
      /sec-(sgh\w+)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Samsung' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/(pixel (c|tablet))\b/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Google' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [
      /droid.+;(?: google)? (g(01[13]a|020[aem]|025[jn]|1b60|1f8f|2ybb|4s1m|576d|5nz6|8hhn|8vou|a02099|c15s|d1yq|e2ae|ec77|gh2x|kv4x|p4bc|pj41|r83y|tt9q|ur25|wvk6)|pixel[\d ]*a?( pro)?( xl)?( fold)?( \(5g\))?)( bui|\))/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Google' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/(google) (pixelbook( go)?)/i],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Capture, field: 'model' },
    ],
  ],
  [
    [
      /oid[^)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i,
      /\b(?:xiao)?((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i,
    ],
    [
      { type: AssignKind.Replace, field: 'model', replace: [/_/g, ' '] as const },
      { type: AssignKind.Literal, field: 'vendor', value: 'Xiaomi' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [
      /\b; (\w+) build\/hm\1/i,
      /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
      /oid[^)]+; (redmi[-_ ]?(?:note|k)?[\w_ ]+|m?[12]\d[01]\d\w{3,6}|poco[\w ]+|(shark )?\w{3}-[ah]0|qin ?[1-3](s\+|ultra| pro)?)( bui|; wv|\))/i,
      /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note|max|cc)?[_ ]?(?:\d{0,2}\w?)[_ ]?(?:plus|se|lite|pro)?( 5g|lte)?)(?: bui|\))/i,
      /; ([\w ]+) miui\/v?\d/i,
    ],
    [
      { type: AssignKind.Replace, field: 'model', replace: [/_/g, ' '] as const },
      { type: AssignKind.Literal, field: 'vendor', value: 'Xiaomi' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Sharp' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Honor' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/honor([-\w ]+)[;)]/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Honor' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [
      /\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w. ]*(?= bui|\)))\b(?!.+d\/s)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Huawei' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [
      /(?:huawei) ?([-\w ]+)[;)]/i,
      /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][\dc][adnt]?)\b(?!.+d\/s)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Huawei' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [
      /droid.+; (cph2[3-6]\d[13579]|((gm|hd)19|(ac|be|in|kb)20|(d[en]|eb|le|mt)21|ne22)[0-2]\d|p[g-l]\w[1m]10)\b/i,
      /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'OnePlus' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'OPPO' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/\b(opd2(\d{3}a?))(?: bui|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      {
        type: AssignKind.Map,
        field: 'vendor',
        map: {
          OnePlus: ['203', '304', '403', '404', '413', '415'],
          '*': 'OPPO',
        },
      },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/(vivo (5r?|6|8l?|go|one|s|x[il]?[2-4]?)[\w+ ]*)(?: bui|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'BLU' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/; vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Vivo' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Realme' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [
      /(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i,
      /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Lenovo' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/lenovo[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Lenovo' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [
      /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
      /\bmot(?:orola)?[- ]([\w\s]+)(\)| bui)/i,
      /((?:moto(?! 360)[-\w() ]+|xt\d{3,4}[cgkosw+]?[-\d]*|nexus 6)(?= bui|\)))/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Motorola' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Motorola' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/\b(?:lg)?([vl]k-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'LG' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [
      /(lm(?:-?f100[nv]?|-[\w.]+)(?= bui|\))|nexus [45])/i,
      /\blg[-e;/ ]+(?!.*(?:browser|netcast|android tv|watch|webos))(\w+)/i,
      /\blg-?([\d\w]+) bui/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'LG' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/(nokia) (t[12][01])/i],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i, /nokia[-_ ]?(([-\w. ]*?))( bui|\)|;|\/)/i],
    [
      { type: AssignKind.Replace, field: 'model', replace: [/_/g, ' '] as const },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Nokia' },
    ],
  ],
  [
    [
      /droid.+; (a?\d{3}so|[c-g]\d{4}|so[-gl]\w+|xq-\w\w\d\d)(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Sony' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
    [
      { type: AssignKind.Literal, field: 'model', value: 'Xperia Tablet' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Sony' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Amazon' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
    [
      {
        type: AssignKind.Replace,
        field: 'model',
        replace: [/(.+)/g, 'Fire Phone $1'] as const,
      },
      { type: AssignKind.Literal, field: 'vendor', value: 'Amazon' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/(playbook);[-\w),; ]+(rim)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/\b((?:bb[a-f]|st[hv])100-\d)/i, /(?:blackberry|\(bb10;) (\w+)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'BlackBerry' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'ASUS' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'ASUS' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/(nexus 9)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'HTC' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [
      /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
      /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
      /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Replace, field: 'model', replace: [/_/g, ' '] as const },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [
      /tcl (xess p17aa)/i,
      /droid [\w.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])(_\w(\w|\w\w))?(\)| bui)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'TCL' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [
      /droid [\w.]+; (418(?:7d|8v)|5087z|5102l|61(?:02[dh]|25[adfh]|27[ai]|56[dh]|59k|65[ah])|a509dl|t(?:43(?:0w|1[adepqu])|50(?:6d|7[adju])|6(?:09dl|10k|12b|71[efho]|76[hjk])|7(?:66[ahju]|67[hw]|7[045][bh]|71[hk]|73o|76[ho]|79w|81[hks]?|82h|90[bhsy]|99b)|810[hs]))(_\w(\w|\w\w))?(\)| bui)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'TCL' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/(itel) ((\w+))/i],
    [
      { type: AssignKind.Capture, field: 'vendor', transform: TransformKind.Lower },
      { type: AssignKind.Capture, field: 'model' },
      {
        type: AssignKind.Map,
        field: 'type',
        map: {
          tablet: ['p10001l', 'w7001'],
          '*': 'mobile',
        },
      },
    ],
  ],
  [
    [/droid.+; ([ab][1-7]-?[0178a]\d\d?)( bui|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Acer' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Meizu' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Ulefone' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Energizer' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Cat' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/((?:new )?andromax[\w- ]+)(?: bui|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Smartfren' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/droid.+; (a(in)?(0(15|59|6[35])|142)p?)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Nothing' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [
      /; (x67 5g|tikeasy \w+|ac[1789]\d\w+)( b|\))/i,
      /archos ?(5|gamepad2?|([\w ]*[t1789]|hello) ?\d+[\w ]*)( b|\))/i,
    ],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Archos' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/archos ([\w ]+)( b|\))/i, /; (ac[3-6]\d\w{2,8})( b|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Archos' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/blackview ([-\w ]+)( b|\))/i, /; (a200 pro|bv\d{4}[-\w ]*)( b|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Blackview' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/; (n159v)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'HMD' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/((revvl[ \w+]+|tm(?:rv|af)\w*[45]g(?:tb)?))( b|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      {
        type: AssignKind.Test,
        field: 'type',
        test: /ta?b/i,
        ifTrue: 'tablet',
        ifFalse: 'mobile',
      },
      { type: AssignKind.Literal, field: 'vendor', value: 'T-Mobile' },
    ],
  ],
  [
    [
      /(imo) (tab \w+)/i,
      /(infinix|tecno) (x1101b?|p904|dp(7c|8d|10a)( pro)?|p70[1-3]a?|p904|t1101)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [
      /(blackberry|benq|palm(?=-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
      /; (blu|coolpad|cubot|hmd|imo|infinix|lava|oneplus|tcl|wiko)[_ ]([-\w+ ]+?)(?: bui|\)|; r)/i,
      /(hp) ([\w ]+\w)/i,
      /(microsoft); (lumia[\w ]+)/i,
      /(oppo) ?([\w ]+) bui/i,
      /(hisense) ([ehv][\w ]+)\)/i,
      /droid[^;]+; (philips)[_ ]([sv-x][\d]{3,4}[xz]?)/i,
    ],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/(kobo)\s(ereader|touch)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/(surface duo)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Microsoft' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/droid [\d.]+; (fp\du?)(?: b|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Fairphone' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Nvidia' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/(sprint) (\w+)/i],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/(kin\.[onetw]{3})/i],
    [
      { type: AssignKind.Replace, field: 'model', replace: [/\./g, ' '] as const },
      { type: AssignKind.Literal, field: 'vendor', value: 'Microsoft' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Zebra' },
      { type: AssignKind.Literal, field: 'type', value: 'tablet' },
    ],
  ],
  [
    [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Zebra' },
      { type: AssignKind.Literal, field: 'type', value: 'mobile' },
    ],
  ],
  [
    [/(philips)[\w ]+tv/i, /smart-tv.+(samsung)/i],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/hbbtv.+maple;(\d+)/i],
    [
      {
        type: AssignKind.Replace,
        field: 'model',
        replace: [/^/, 'SmartTV'] as const,
      },
      { type: AssignKind.Literal, field: 'vendor', value: 'Samsung' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/(vizio)(?: |.+model\/)(\w+-\w+)/i, /tcast.+(lg)e?. ([-\w]+)/i],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
    [
      { type: AssignKind.Literal, field: 'vendor', value: 'LG' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/(apple) ?tv/i],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Literal, field: 'model', value: 'Apple TV' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/crkey.*devicetype\/chromecast/i],
    [
      { type: AssignKind.Literal, field: 'model', value: 'Chromecast Third Generation' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Google' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/crkey.*devicetype\/([^/]*)/i],
    [
      {
        type: AssignKind.Replace,
        field: 'model',
        replace: [/^/, 'Chromecast '] as const,
      },
      { type: AssignKind.Literal, field: 'vendor', value: 'Google' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/fuchsia.*crkey/i],
    [
      { type: AssignKind.Literal, field: 'model', value: 'Chromecast Nest Hub' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Google' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/crkey/i],
    [
      { type: AssignKind.Literal, field: 'model', value: 'Chromecast' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Google' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/(portaltv)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Facebook' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/droid.+aft(\w+)( bui|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Amazon' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/(shield \w+ tv)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Nvidia' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/\(dtv[);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Sharp' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/(bravia[\w ]+)( bui|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Sony' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/(mi(tv|box)-?\w+) bui/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Xiaomi' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/Hbbtv.*(technisat) (.*);/i],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [
      /\b(roku)[\dx]*[)/]((?:dvp-)?[\d.]*)/i,
      /hbbtv\/\d+\.\d+\.\d+ +\([\w+ ]*; *([\w\d][^;]*);([^;]*)/i,
    ],
    [
      {
        type: AssignKind.ReplaceMap,
        field: 'vendor',
        replace: [/.+\/(\w+)/, '$1'] as const,
        map: {
          LG: 'lge',
        },
      },
      { type: AssignKind.Capture, field: 'model', transform: TransformKind.Trim },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/(playstation \w+)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Sony' },
      { type: AssignKind.Literal, field: 'type', value: 'console' },
    ],
  ],
  [
    [/\b(xbox(?: one)?(?!; xbox))[); ]/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Microsoft' },
      { type: AssignKind.Literal, field: 'type', value: 'console' },
    ],
  ],
  [
    [
      /(ouya)/i,
      /(nintendo) (\w+)/i,
      /(retroid) (pocket ([^)]+))/i,
      /(valve).+(steam deck)/i,
      /droid.+; ((shield|rgcube|gr0006))( bui|\))/i,
    ],
    [
      {
        type: AssignKind.Map,
        field: 'vendor',
        map: {
          Nvidia: 'Shield',
          Anbernic: 'RGCUBE',
          Logitech: 'GR0006',
        },
      },
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'type', value: 'console' },
    ],
  ],
  [
    [/\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Samsung' },
      { type: AssignKind.Literal, field: 'type', value: 'wearable' },
    ],
  ],
  [
    [/((pebble))app/i, /(asus|google|lg|oppo|xiaomi) ((pixel |zen)?watch[\w ]*)( bui|\))/i],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'type', value: 'wearable' },
    ],
  ],
  [
    [/(ow(?:19|20)?we?[1-3]{1,3})/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'OPPO' },
      { type: AssignKind.Literal, field: 'type', value: 'wearable' },
    ],
  ],
  [
    [/(?:watch(?: ?os[,/]| \d,\d\/)[\d.]+).+(watch\d,\d)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Apple' },
      { type: AssignKind.Literal, field: 'type', value: 'wearable' },
    ],
  ],
  [
    [/(opwwe\d{3})/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'OnePlus' },
      { type: AssignKind.Literal, field: 'type', value: 'wearable' },
    ],
  ],
  [
    [/(moto 360)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Motorola' },
      { type: AssignKind.Literal, field: 'type', value: 'wearable' },
    ],
  ],
  [
    [/(smartwatch 3)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Sony' },
      { type: AssignKind.Literal, field: 'type', value: 'wearable' },
    ],
  ],
  [
    [/(g watch r)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'LG' },
      { type: AssignKind.Literal, field: 'type', value: 'wearable' },
    ],
  ],
  [
    [/droid.+; (wt63?0{2,3})\)/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Zebra' },
      { type: AssignKind.Literal, field: 'type', value: 'wearable' },
    ],
  ],
  [
    [/droid.+; (glass) \d/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Google' },
      { type: AssignKind.Literal, field: 'type', value: 'xr' },
    ],
  ],
  [
    [/(pico) ([\w ]+) os\d/i],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'type', value: 'xr' },
    ],
  ],
  [
    [/(quest( \d| pro)?s?).+vr/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Facebook' },
      { type: AssignKind.Literal, field: 'type', value: 'xr' },
    ],
  ],
  [[/mobile vr; rv.+firefox/i], [{ type: AssignKind.Literal, field: 'type', value: 'xr' }]],
  [
    [/(tesla)(?: qtcarbrowser|\/[-\w.]+)/i],
    [
      { type: AssignKind.Capture, field: 'vendor' },
      { type: AssignKind.Literal, field: 'type', value: 'embedded' },
    ],
  ],
  [
    [/(aeobc)\b/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Amazon' },
      { type: AssignKind.Literal, field: 'type', value: 'embedded' },
    ],
  ],
  [
    [/(homepod).+mac os/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Apple' },
      { type: AssignKind.Literal, field: 'type', value: 'embedded' },
    ],
  ],
  [[/windows iot/i], [{ type: AssignKind.Literal, field: 'type', value: 'embedded' }]],
  [
    [/droid.+; ([\w- ]+) (4k|android|smart|google)[- ]?tv/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'type', value: 'smarttv' },
    ],
  ],
  [
    [/\b((4k|android|smart|opera)[- ]?tv|tv; rv:|large screen[\w ]+safari)\b/i],
    [{ type: AssignKind.Literal, field: 'type', value: 'smarttv' }],
  ],
  [
    [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew|; hmsc).+?(mobile|vr|\d) safari/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      {
        type: AssignKind.Map,
        field: 'type',
        map: {
          mobile: 'Mobile',
          xr: 'VR',
          '*': 'tablet',
        },
      },
    ],
  ],
  [
    [/\b((tablet|tab)[;/]|focus\/\d(?!.+mobile))/i],
    [{ type: AssignKind.Literal, field: 'type', value: 'tablet' }],
  ],
  [
    [/(phone|mobile(?:[;/]| [ \w/.]*safari)|pda(?=.+windows ce))/i],
    [{ type: AssignKind.Literal, field: 'type', value: 'mobile' }],
  ],
  [
    [/droid .+?; ([\w. -]+)( bui|\))/i],
    [
      { type: AssignKind.Capture, field: 'model' },
      { type: AssignKind.Literal, field: 'vendor', value: 'Generic' },
    ],
  ],
] as const satisfies AuthoredCategory;
