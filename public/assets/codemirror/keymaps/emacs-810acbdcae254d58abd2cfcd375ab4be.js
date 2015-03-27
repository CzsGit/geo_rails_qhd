!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../lib/codemirror")):"function"==typeof define&&define.amd?define(["../lib/codemirror"],t):t(CodeMirror)}(function(t){"use strict";function e(t,e){return t.line==e.line&&t.ch==e.ch}function n(t){M.push(t),M.length>50&&M.shift()}function r(t){return M.length?void(M[M.length-1]+=t):n(t)}function o(t){return M[M.length-(t?Math.min(t,1):1)]||""}function i(){return M.length>1&&M.pop(),o()}function l(t,o,i,l,c){null==c&&(c=t.getRange(o,i)),l&&B&&B.cm==t&&e(o,B.pos)&&t.isClean(B.gen)?r(c):n(c),t.replaceRange("",o,i,"+delete"),B=l?{cm:t,pos:o,gen:t.changeGeneration()}:null}function c(t,e,n){return t.findPosH(e,n,"char",!0)}function a(t,e,n){return t.findPosH(e,n,"word",!0)}function u(t,e,n){return t.findPosV(e,n,"line",t.doc.sel.goalColumn)}function f(t,e,n){return t.findPosV(e,n,"page",t.doc.sel.goalColumn)}function s(t,e,n){for(var r=e.line,o=t.getLine(r),i=/\S/.test(0>n?o.slice(0,e.ch):o.slice(e.ch)),l=t.firstLine(),c=t.lastLine();;){if(r+=n,l>r||r>c)return t.clipPos(H(r-n,0>n?0:null));o=t.getLine(r);var a=/\S/.test(o);if(a)i=!0;else if(i)return H(r,0)}}function C(t,e,n){for(var r=e.line,o=e.ch,i=t.getLine(e.line),l=!1;;){var c=i.charAt(o+(0>n?-1:0));if(c){if(l&&/[!?.]/.test(c))return H(r,o+(n>0?1:0));l||(l=/\w/.test(c)),o+=n}else{if(r==(0>n?t.firstLine():t.lastLine()))return H(r,o);if(i=t.getLine(r+n),!/\S/.test(i))return H(r,o);r+=n,o=0>n?i.length:0}}}function g(t,n,r){var o;if(t.findMatchingBracket&&(o=t.findMatchingBracket(n,!0))&&o.match&&(o.forward?1:-1)==r)return r>0?H(o.to.line,o.to.ch+1):o.to;for(var i=!0;;i=!1){var l=t.getTokenAt(n),c=H(n.line,0>r?l.start:l.end);if(!(i&&r>0&&l.end==n.ch)&&/\w/.test(l.string))return c;var a=t.findPosH(c,r,"char");if(e(c,a))return n;n=a}}function d(t,e){var n=t.state.emacsPrefix;return n?(x(t),"-"==n?-1:Number(n)):e?null:1}function p(t){var e="string"==typeof t?function(e){e.execCommand(t)}:t;return function(t){var n=d(t);e(t);for(var r=1;n>r;++r)e(t)}}function h(t,n,r,o){var i=d(t);0>i&&(o=-o,i=-i);for(var l=0;i>l;++l){var c=r(t,n,o);if(e(c,n))break;n=c}return n}function v(t,e){var n=function(n){n.extendSelection(h(n,n.getCursor(),t,e))};return n.motion=!0,n}function A(t,e,n){for(var r,o=t.listSelections(),i=o.length;i--;)r=o[i].head,l(t,r,h(t,r,e,n),!0)}function m(t){if(t.somethingSelected()){for(var e,n=t.listSelections(),r=n.length;r--;)e=n[r],l(t,e.anchor,e.head);return!0}}function S(t,e){return t.state.emacsPrefix?void("-"!=e&&(t.state.emacsPrefix+=e)):(t.state.emacsPrefix=e,t.on("keyHandled",P),void t.on("inputRead",L))}function P(t,e){t.state.emacsPrefixMap||G.hasOwnProperty(e)||x(t)}function x(t){t.state.emacsPrefix=null,t.off("keyHandled",P),t.off("inputRead",L)}function L(t,e){var n=d(t);if(n>1&&"+input"==e.origin){for(var r=e.text.join("\n"),o="",i=1;n>i;++i)o+=r;t.replaceSelection(o)}}function R(t){t.state.emacsPrefixMap=!0,t.addKeyMap(T),t.on("keyHandled",y),t.on("inputRead",y)}function y(t,e){("string"!=typeof e||!/^\d$/.test(e)&&"Ctrl-U"!=e)&&(t.removeKeyMap(T),t.state.emacsPrefixMap=!1,t.off("keyHandled",y),t.off("inputRead",y))}function w(t){t.setCursor(t.getCursor()),t.setExtending(!t.getExtending()),t.on("change",function(){t.setExtending(!1)})}function b(t){t.setExtending(!1),t.setCursor(t.getCursor())}function k(t,e,n){t.openDialog?t.openDialog(e+': <input type="text" style="width: 10em"/>',n,{bottom:!0}):n(prompt(e,""))}function U(t,e){var n=t.getCursor(),r=t.findPosH(n,1,"word");t.replaceRange(e(t.getRange(n,r)),n,r),t.setCursor(r)}function X(t){for(var e=t.getCursor(),n=e.line,r=e.ch,o=[];n>=t.firstLine();){for(var i=t.getLine(n),l=null==r?i.length:r;l>0;){var r=i.charAt(--l);if(")"==r)o.push("(");else if("]"==r)o.push("[");else if("}"==r)o.push("{");else if(/[\(\{\[]/.test(r)&&(!o.length||o.pop()!=r))return t.extendSelection(H(n,l))}--n,r=null}}function D(t){t.execCommand("clearSearch"),b(t)}function E(t){T[t]=function(e){S(e,t)},K["Ctrl-"+t]=function(e){S(e,t)},G["Ctrl-"+t]=!0}for(var H=t.Pos,M=[],B=null,G={"Alt-G":!0,"Ctrl-X":!0,"Ctrl-Q":!0,"Ctrl-U":!0},K=t.keyMap.emacs=t.normalizeKeyMap({"Ctrl-W":function(t){l(t,t.getCursor("start"),t.getCursor("end"))},"Ctrl-K":p(function(t){var e=t.getCursor(),n=t.clipPos(H(e.line)),r=t.getRange(e,n);/\S/.test(r)||(r+="\n",n=H(e.line+1,0)),l(t,e,n,!0,r)}),"Alt-W":function(t){n(t.getSelection()),b(t)},"Ctrl-Y":function(t){var e=t.getCursor();t.replaceRange(o(d(t)),e,e,"paste"),t.setSelection(e,t.getCursor())},"Alt-Y":function(t){t.replaceSelection(i(),"around","paste")},"Ctrl-Space":w,"Ctrl-Shift-2":w,"Ctrl-F":v(c,1),"Ctrl-B":v(c,-1),Right:v(c,1),Left:v(c,-1),"Ctrl-D":function(t){A(t,c,1)},Delete:function(t){m(t)||A(t,c,1)},"Ctrl-H":function(t){A(t,c,-1)},Backspace:function(t){m(t)||A(t,c,-1)},"Alt-F":v(a,1),"Alt-B":v(a,-1),"Alt-D":function(t){A(t,a,1)},"Alt-Backspace":function(t){A(t,a,-1)},"Ctrl-N":v(u,1),"Ctrl-P":v(u,-1),Down:v(u,1),Up:v(u,-1),"Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd",End:"goLineEnd",Home:"goLineStart","Alt-V":v(f,-1),"Ctrl-V":v(f,1),PageUp:v(f,-1),PageDown:v(f,1),"Ctrl-Up":v(s,-1),"Ctrl-Down":v(s,1),"Alt-A":v(C,-1),"Alt-E":v(C,1),"Alt-K":function(t){A(t,C,1)},"Ctrl-Alt-K":function(t){A(t,g,1)},"Ctrl-Alt-Backspace":function(t){A(t,g,-1)},"Ctrl-Alt-F":v(g,1),"Ctrl-Alt-B":v(g,-1),"Shift-Ctrl-Alt-2":function(t){var e=t.getCursor();t.setSelection(h(t,e,g,1),e)},"Ctrl-Alt-T":function(t){var e=g(t,t.getCursor(),-1),n=g(t,e,1),r=g(t,n,1),o=g(t,r,-1);t.replaceRange(t.getRange(o,r)+t.getRange(n,o)+t.getRange(e,n),e,r)},"Ctrl-Alt-U":p(X),"Alt-Space":function(t){for(var e=t.getCursor(),n=e.ch,r=e.ch,o=t.getLine(e.line);n&&/\s/.test(o.charAt(n-1));)--n;for(;r<o.length&&/\s/.test(o.charAt(r));)++r;t.replaceRange(" ",H(e.line,n),H(e.line,r))},"Ctrl-O":p(function(t){t.replaceSelection("\n","start")}),"Ctrl-T":p(function(t){t.execCommand("transposeChars")}),"Alt-C":p(function(t){U(t,function(t){var e=t.search(/\w/);return-1==e?t:t.slice(0,e)+t.charAt(e).toUpperCase()+t.slice(e+1).toLowerCase()})}),"Alt-U":p(function(t){U(t,function(t){return t.toUpperCase()})}),"Alt-L":p(function(t){U(t,function(t){return t.toLowerCase()})}),"Alt-;":"toggleComment","Ctrl-/":p("undo"),"Shift-Ctrl--":p("undo"),"Ctrl-Z":p("undo"),"Cmd-Z":p("undo"),"Shift-Alt-,":"goDocStart","Shift-Alt-.":"goDocEnd","Ctrl-S":"findNext","Ctrl-R":"findPrev","Ctrl-G":D,"Shift-Alt-5":"replace","Alt-/":"autocomplete","Ctrl-J":"newlineAndIndent",Enter:!1,Tab:"indentAuto","Alt-G G":function(t){var e=d(t,!0);return null!=e&&e>0?t.setCursor(e-1):void k(t,"Goto line",function(e){var n;e&&!isNaN(n=Number(e))&&n==n|0&&n>0&&t.setCursor(n-1)})},"Ctrl-X Tab":function(t){t.indentSelection(d(t,!0)||t.getOption("indentUnit"))},"Ctrl-X Ctrl-X":function(t){t.setSelection(t.getCursor("head"),t.getCursor("anchor"))},"Ctrl-X Ctrl-S":"save","Ctrl-X Ctrl-W":"save","Ctrl-X S":"saveAll","Ctrl-X F":"open","Ctrl-X U":p("undo"),"Ctrl-X K":"close","Ctrl-X Delete":function(t){l(t,t.getCursor(),C(t,t.getCursor(),1),!0)},"Ctrl-X H":"selectAll","Ctrl-Q Tab":p("insertTab"),"Ctrl-U":R}),T={"Ctrl-G":x},N=0;10>N;++N)E(String(N));E("-")});