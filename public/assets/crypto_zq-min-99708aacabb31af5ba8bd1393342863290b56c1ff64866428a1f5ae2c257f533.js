function Base64(){_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",this.encode=function(r){var d,e,n,t,_,m,c,h="",f=0;for(r=_utf8_encode(r);f<r.length;)d=r.charCodeAt(f++),e=r.charCodeAt(f++),n=r.charCodeAt(f++),t=d>>2,_=(3&d)<<4|e>>4,m=(15&e)<<2|n>>6,c=63&n,isNaN(e)?m=c=64:isNaN(n)&&(c=64),h=h+_keyStr.charAt(t)+_keyStr.charAt(_)+_keyStr.charAt(m)+_keyStr.charAt(c);return h},this.decode=function(r){var d,e,n,t,_,m,c,h="",f=0;for(r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");f<r.length;)t=_keyStr.indexOf(r.charAt(f++)),_=_keyStr.indexOf(r.charAt(f++)),m=_keyStr.indexOf(r.charAt(f++)),c=_keyStr.indexOf(r.charAt(f++)),d=t<<2|_>>4,e=(15&_)<<4|m>>2,n=(3&m)<<6|c,h+=String.fromCharCode(d),64!=m&&(h+=String.fromCharCode(e)),64!=c&&(h+=String.fromCharCode(n));return h=_utf8_decode(h)},_utf8_encode=function(r){var d,e,n;for(r=r.replace(/\r\n/g,"\n"),d="",e=0;e<r.length;e++)n=r.charCodeAt(e),128>n?d+=String.fromCharCode(n):n>127&&2048>n?(d+=String.fromCharCode(192|n>>6),d+=String.fromCharCode(128|63&n)):(d+=String.fromCharCode(224|n>>12),d+=String.fromCharCode(128|63&n>>6),d+=String.fromCharCode(128|63&n));return d},_utf8_decode=function(r){for(var d="",e=0,n=c1=c2=0;e<r.length;)n=r.charCodeAt(e),128>n?(d+=String.fromCharCode(n),e++):n>191&&224>n?(c2=r.charCodeAt(e+1),d+=String.fromCharCode((31&n)<<6|63&c2),e+=2):(c2=r.charCodeAt(e+1),c3=r.charCodeAt(e+2),d+=String.fromCharCode((15&n)<<12|(63&c2)<<6|63&c3),e+=3);return d}}function hex_md5(r){return binl2hex(core_md5(str2binl(r),r.length*chrsz))}function b64_md5(r){return binl2b64(core_md5(str2binl(r),r.length*chrsz))}function str_md5(r){return binl2str(core_md5(str2binl(r),r.length*chrsz))}function hex_hmac_md5(r,d){return binl2hex(core_hmac_md5(r,d))}function b64_hmac_md5(r,d){return binl2b64(core_hmac_md5(r,d))}function str_hmac_md5(r,d){return binl2str(core_hmac_md5(r,d))}function md5_vm_test(){return"900150983cd24fb0d6963f7d28e17f72"==hex_md5("abc")}function core_md5(r,d){var e,n,t,_,m,c,h,f,a;for(r[d>>5]|=128<<d%32,r[(d+64>>>9<<4)+14]=d,e=1732584193,n=-271733879,t=-1732584194,_=271733878,m=0;m<r.length;m+=16)c=e,h=n,f=t,a=_,e=md5_ff(e,n,t,_,r[m+0],7,-680876936),_=md5_ff(_,e,n,t,r[m+1],12,-389564586),t=md5_ff(t,_,e,n,r[m+2],17,606105819),n=md5_ff(n,t,_,e,r[m+3],22,-1044525330),e=md5_ff(e,n,t,_,r[m+4],7,-176418897),_=md5_ff(_,e,n,t,r[m+5],12,1200080426),t=md5_ff(t,_,e,n,r[m+6],17,-1473231341),n=md5_ff(n,t,_,e,r[m+7],22,-45705983),e=md5_ff(e,n,t,_,r[m+8],7,1770035416),_=md5_ff(_,e,n,t,r[m+9],12,-1958414417),t=md5_ff(t,_,e,n,r[m+10],17,-42063),n=md5_ff(n,t,_,e,r[m+11],22,-1990404162),e=md5_ff(e,n,t,_,r[m+12],7,1804603682),_=md5_ff(_,e,n,t,r[m+13],12,-40341101),t=md5_ff(t,_,e,n,r[m+14],17,-1502002290),n=md5_ff(n,t,_,e,r[m+15],22,1236535329),e=md5_gg(e,n,t,_,r[m+1],5,-165796510),_=md5_gg(_,e,n,t,r[m+6],9,-1069501632),t=md5_gg(t,_,e,n,r[m+11],14,643717713),n=md5_gg(n,t,_,e,r[m+0],20,-373897302),e=md5_gg(e,n,t,_,r[m+5],5,-701558691),_=md5_gg(_,e,n,t,r[m+10],9,38016083),t=md5_gg(t,_,e,n,r[m+15],14,-660478335),n=md5_gg(n,t,_,e,r[m+4],20,-405537848),e=md5_gg(e,n,t,_,r[m+9],5,568446438),_=md5_gg(_,e,n,t,r[m+14],9,-1019803690),t=md5_gg(t,_,e,n,r[m+3],14,-187363961),n=md5_gg(n,t,_,e,r[m+8],20,1163531501),e=md5_gg(e,n,t,_,r[m+13],5,-1444681467),_=md5_gg(_,e,n,t,r[m+2],9,-51403784),t=md5_gg(t,_,e,n,r[m+7],14,1735328473),n=md5_gg(n,t,_,e,r[m+12],20,-1926607734),e=md5_hh(e,n,t,_,r[m+5],4,-378558),_=md5_hh(_,e,n,t,r[m+8],11,-2022574463),t=md5_hh(t,_,e,n,r[m+11],16,1839030562),n=md5_hh(n,t,_,e,r[m+14],23,-35309556),e=md5_hh(e,n,t,_,r[m+1],4,-1530992060),_=md5_hh(_,e,n,t,r[m+4],11,1272893353),t=md5_hh(t,_,e,n,r[m+7],16,-155497632),n=md5_hh(n,t,_,e,r[m+10],23,-1094730640),e=md5_hh(e,n,t,_,r[m+13],4,681279174),_=md5_hh(_,e,n,t,r[m+0],11,-358537222),t=md5_hh(t,_,e,n,r[m+3],16,-722521979),n=md5_hh(n,t,_,e,r[m+6],23,76029189),e=md5_hh(e,n,t,_,r[m+9],4,-640364487),_=md5_hh(_,e,n,t,r[m+12],11,-421815835),t=md5_hh(t,_,e,n,r[m+15],16,530742520),n=md5_hh(n,t,_,e,r[m+2],23,-995338651),e=md5_ii(e,n,t,_,r[m+0],6,-198630844),_=md5_ii(_,e,n,t,r[m+7],10,1126891415),t=md5_ii(t,_,e,n,r[m+14],15,-1416354905),n=md5_ii(n,t,_,e,r[m+5],21,-57434055),e=md5_ii(e,n,t,_,r[m+12],6,1700485571),_=md5_ii(_,e,n,t,r[m+3],10,-1894986606),t=md5_ii(t,_,e,n,r[m+10],15,-1051523),n=md5_ii(n,t,_,e,r[m+1],21,-2054922799),e=md5_ii(e,n,t,_,r[m+8],6,1873313359),_=md5_ii(_,e,n,t,r[m+15],10,-30611744),t=md5_ii(t,_,e,n,r[m+6],15,-1560198380),n=md5_ii(n,t,_,e,r[m+13],21,1309151649),e=md5_ii(e,n,t,_,r[m+4],6,-145523070),_=md5_ii(_,e,n,t,r[m+11],10,-1120210379),t=md5_ii(t,_,e,n,r[m+2],15,718787259),n=md5_ii(n,t,_,e,r[m+9],21,-343485551),e=safe_add(e,c),n=safe_add(n,h),t=safe_add(t,f),_=safe_add(_,a);return Array(e,n,t,_)}function md5_cmn(r,d,e,n,t,_){return safe_add(bit_rol(safe_add(safe_add(d,r),safe_add(n,_)),t),e)}function md5_ff(r,d,e,n,t,_,m){return md5_cmn(d&e|~d&n,r,d,t,_,m)}function md5_gg(r,d,e,n,t,_,m){return md5_cmn(d&n|e&~n,r,d,t,_,m)}function md5_hh(r,d,e,n,t,_,m){return md5_cmn(d^e^n,r,d,t,_,m)}function md5_ii(r,d,e,n,t,_,m){return md5_cmn(e^(d|~n),r,d,t,_,m)}function core_hmac_md5(r,d){var e,n,t,_,m=str2binl(r);for(m.length>16&&(m=core_md5(m,r.length*chrsz)),e=Array(16),n=Array(16),t=0;16>t;t++)e[t]=909522486^m[t],n[t]=1549556828^m[t];return _=core_md5(e.concat(str2binl(d)),512+d.length*chrsz),core_md5(n.concat(_),640)}function safe_add(r,d){var e=(65535&r)+(65535&d),n=(r>>16)+(d>>16)+(e>>16);return n<<16|65535&e}function bit_rol(r,d){return r<<d|r>>>32-d}function str2binl(r){var d,e=Array(),n=(1<<chrsz)-1;for(d=0;d<r.length*chrsz;d+=chrsz)e[d>>5]|=(r.charCodeAt(d/chrsz)&n)<<d%32;return e}function binl2str(r){var d,e="",n=(1<<chrsz)-1;for(d=0;d<32*r.length;d+=chrsz)e+=String.fromCharCode(r[d>>5]>>>d%32&n);return e}function binl2hex(r){var d,e=hexcase?"0123456789ABCDEF":"0123456789abcdef",n="";for(d=0;d<4*r.length;d++)n+=e.charAt(15&r[d>>2]>>8*(d%4)+4)+e.charAt(15&r[d>>2]>>8*(d%4));return n}function binl2b64(r){var d,e,n,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_="";for(d=0;d<4*r.length;d+=3)for(e=(255&r[d>>2]>>8*(d%4))<<16|(255&r[d+1>>2]>>8*((d+1)%4))<<8|255&r[d+2>>2]>>8*((d+2)%4),n=0;4>n;n++)_+=8*d+6*n>32*r.length?b64pad:t.charAt(63&e>>6*(3-n));return _}function encode_param(r){var d=new Base64;return d.encode(r)}function encode_secret(){var r,d=appId;for(r=0;r<arguments.length;r++)d+=arguments[r];return d=d.replace(/\s/g,""),hex_md5(d)}function decode_result(r){var d=new Base64;return d.decode(d.decode(d.decode(r)))}var hexcase=0,b64pad="",chrsz=8,appId="a01901d3caba1f362d69474674ce477f";