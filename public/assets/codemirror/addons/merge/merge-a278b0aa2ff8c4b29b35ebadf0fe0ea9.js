!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("diff_match_patch")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","diff_match_patch"],e):e(CodeMirror,diff_match_patch)}(function(e,t){"use strict";function r(e,t){this.mv=e,this.type=t,this.classes="left"==t?{chunk:"CodeMirror-merge-l-chunk",start:"CodeMirror-merge-l-chunk-start",end:"CodeMirror-merge-l-chunk-end",insert:"CodeMirror-merge-l-inserted",del:"CodeMirror-merge-l-deleted",connect:"CodeMirror-merge-l-connect"}:{chunk:"CodeMirror-merge-r-chunk",start:"CodeMirror-merge-r-chunk-start",end:"CodeMirror-merge-r-chunk-end",insert:"CodeMirror-merge-r-inserted",del:"CodeMirror-merge-r-deleted",connect:"CodeMirror-merge-r-connect"}}function i(t){t.diffOutOfDate&&(t.diff=y(t.orig.getValue(),t.edit.getValue()),t.chunks=w(t.diff),t.diffOutOfDate=!1,e.signal(t.edit,"updateDiff",t.diff))}function o(e){function t(t){U=!0,h=!1,"full"==t&&(e.svg&&N(e.svg),e.copyButtons&&N(e.copyButtons),s(e.edit,a.marked,e.classes),s(e.orig,c.marked,e.classes),a.from=a.to=c.from=c.to=0),i(e),e.showDifferences&&(f(e.edit,e.diff,a,DIFF_INSERT,e.classes),f(e.orig,e.diff,c,DIFF_DELETE,e.classes)),d(e),"align"==e.mv.options.connect&&m(e),U=!1}function r(t){U||(e.dealigned=!0,o(t))}function o(e){U||h||(clearTimeout(l),e===!0&&(h=!0),l=setTimeout(t,e===!0?20:250))}function n(t,i){e.diffOutOfDate||(e.diffOutOfDate=!0,a.from=a.to=c.from=c.to=0),r(i.text.length-1!=i.to.line-i.from.line)}var l,a={from:0,to:0,marked:[]},c={from:0,to:0,marked:[]},h=!1;return e.edit.on("change",n),e.orig.on("change",n),e.edit.on("markerAdded",r),e.edit.on("markerCleared",r),e.orig.on("markerAdded",r),e.orig.on("markerCleared",r),e.edit.on("viewportChange",function(){o(!1)}),e.orig.on("viewportChange",function(){o(!1)}),t(),t}function n(e){e.edit.on("scroll",function(){l(e,DIFF_INSERT)&&d(e)}),e.orig.on("scroll",function(){l(e,DIFF_DELETE)&&d(e)})}function l(e,t){if(e.diffOutOfDate)return!1;if(!e.lockScroll)return!0;var r,i,o=+new Date;if(t==DIFF_INSERT?(r=e.edit,i=e.orig):(r=e.orig,i=e.edit),r.state.scrollSetBy==e&&(r.state.scrollSetAt||0)+50>o)return!1;var n=r.getScrollInfo();if("align"==e.mv.options.connect)v=n.top;else{var l,c,s=.5*n.clientHeight,f=n.top+s,h=r.lineAtHeight(f,"local"),d=L(e.chunks,h,t==DIFF_INSERT),u=a(r,t==DIFF_INSERT?d.edit:d.orig),g=a(i,t==DIFF_INSERT?d.orig:d.edit),m=(f-u.top)/(u.bot-u.top),v=g.top-s+m*(g.bot-g.top);if(v>n.top&&(c=n.top/s)<1)v=v*c+n.top*(1-c);else if((l=n.height-n.clientHeight-n.top)<s){var p=i.getScrollInfo(),k=p.height-p.clientHeight-v;k>l&&(c=l/s)<1&&(v=v*c+(p.height-p.clientHeight-l)*(1-c))}}return i.scrollTo(n.left,v),i.state.scrollSetAt=o,i.state.scrollSetBy=e,!0}function a(e,t){var r=t.after;return null==r&&(r=e.lastLine()+1),{top:e.heightAtLine(t.before||0,"local"),bot:e.heightAtLine(r,"local")}}function c(e,t,r){e.lockScroll=t,t&&0!=r&&l(e,DIFF_INSERT)&&d(e),e.lockButton.innerHTML=t?"\u21db\u21da":"\u21db&nbsp;&nbsp;\u21da"}function s(t,r,i){for(var o=0;o<r.length;++o){var n=r[o];n instanceof e.TextMarker?n.clear():n.parent&&(t.removeLineClass(n,"background",i.chunk),t.removeLineClass(n,"background",i.start),t.removeLineClass(n,"background",i.end))}r.length=0}function f(e,t,r,i,o){var n=e.getViewport();e.operation(function(){r.from==r.to||n.from-r.to>20||r.from-n.to>20?(s(e,r.marked,o),h(e,t,i,r.marked,n.from,n.to,o),r.from=n.from,r.to=n.to):(n.from<r.from&&(h(e,t,i,r.marked,n.from,r.from,o),r.from=n.from),n.to>r.to&&(h(e,t,i,r.marked,r.to,n.to,o),r.to=n.to))})}function h(e,t,r,i,o,n,l){function a(t,r){for(var a=Math.max(o,t),c=Math.min(n,r),s=a;c>s;++s){var f=e.addLineClass(s,"background",l.chunk);s==t&&e.addLineClass(f,"background",l.start),s==r-1&&e.addLineClass(f,"background",l.end),i.push(f)}t==r&&a==r&&c==r&&i.push(a?e.addLineClass(a-1,"background",l.end):e.addLineClass(a,"background",l.start))}for(var c=H(0,0),s=H(o,0),f=e.clipPos(H(n-1)),h=r==DIFF_DELETE?l.del:l.insert,d=0,u=0;u<t.length;++u){var g=t[u],m=g[0],v=g[1];if(m==DIFF_EQUAL){var p=c.line+(D(t,u)?0:1);x(c,v);var k=c.line+(M(t,u)?1:0);k>p&&(u&&a(d,p),d=k)}else if(m==r){var C=x(c,v,!0),T=R(s,c),F=B(f,C);V(T,F)||i.push(e.markText(T,F,{className:h})),c=C}}d<=c.line&&a(d,c.line+1)}function d(e){if(e.showDifferences){if(e.svg){N(e.svg);var t=e.gap.offsetWidth;_(e.svg,"width",t,"height",e.gap.offsetHeight)}e.copyButtons&&N(e.copyButtons);for(var r=e.edit.getViewport(),i=e.orig.getViewport(),o=e.edit.getScrollInfo().top,n=e.orig.getScrollInfo().top,l=0;l<e.chunks.length;l++){var a=e.chunks[l];a.editFrom<=r.to&&a.editTo>=r.from&&a.origFrom<=i.to&&a.origTo>=i.from&&k(e,a,n,o,t)}}}function u(e,t){for(var r=0,i=0,o=0;o<t.length;o++){var n=t[o];if(n.editTo>e&&n.editFrom<=e)return null;if(n.editFrom>e)break;r=n.editTo,i=n.origTo}return i+(e-r)}function g(e,t){for(var r=[],i=0;i<e.chunks.length;i++){var o=e.chunks[i];r.push([o.origTo,o.editTo,t?u(o.editTo,t.chunks):null])}if(t)for(var i=0;i<t.chunks.length;i++){for(var o=t.chunks[i],n=0;n<r.length;n++){var l=r[n];if(l[1]==o.editTo){n=-1;break}if(l[1]>o.editTo)break}n>-1&&r.splice(n-1,0,[u(o.editTo,e.chunks),o.editTo,o.origTo])}return r}function m(e,t){if(e.dealigned||t){if(!e.orig.curOp)return e.orig.operation(function(){m(e,t)});e.dealigned=!1;var r=e.mv.left==e?e.mv.right:e.mv.left;r&&(i(r),r.dealigned=!1);for(var o=g(e,r),n=e.mv.aligners,l=0;l<n.length;l++)n[l].clear();n.length=0;var a=[e.orig,e.edit],c=[];r&&a.push(r.orig);for(var l=0;l<a.length;l++)c.push(a[l].getScrollInfo().top);for(var s=0;s<o.length;s++)v(a,o[s],n);for(var l=0;l<a.length;l++)a[l].scrollTo(null,c[l])}}function v(e,t,r){for(var i=0,o=[],n=0;n<e.length;n++)if(null!=t[n]){var l=e[n].heightAtLine(t[n],"local");o[n]=l,i=Math.max(i,l)}for(var n=0;n<e.length;n++)if(null!=t[n]){var a=i-o[n];a>1&&r.push(p(e[n],t[n],a))}}function p(e,t,r){var i=!0;t>e.lastLine()&&(t--,i=!1);var o=document.createElement("div");return o.className="CodeMirror-merge-spacer",o.style.height=r+"px",o.style.minWidth="1px",e.addLineWidget(t,o,{height:r,above:i})}function k(e,t,r,i,o){var n="left"==e.type,l=e.orig.heightAtLine(t.origFrom,"local")-r;if(e.svg){var a=l,c=e.edit.heightAtLine(t.editFrom,"local")-i;if(n){var s=a;a=c,c=s}var f=e.orig.heightAtLine(t.origTo,"local")-r,h=e.edit.heightAtLine(t.editTo,"local")-i;if(n){var s=f;f=h,h=s}var d=" C "+o/2+" "+c+" "+o/2+" "+a+" "+(o+2)+" "+a,u=" C "+o/2+" "+f+" "+o/2+" "+h+" -1 "+h;_(e.svg.appendChild(document.createElementNS(P,"path")),"d","M -1 "+c+d+" L "+(o+2)+" "+f+u+" z","class",e.classes.connect)}if(e.copyButtons){var g=e.copyButtons.appendChild(O("div","left"==e.type?"\u21dd":"\u21dc","CodeMirror-merge-copy")),m=e.mv.options.allowEditingOriginals;if(g.title=m?"Push to left":"Revert chunk",g.chunk=t,g.style.top=l+"px",m){var v=e.orig.heightAtLine(t.editFrom,"local")-i,p=e.copyButtons.appendChild(O("div","right"==e.type?"\u21dd":"\u21dc","CodeMirror-merge-copy-reverse"));p.title="Push to right",p.chunk={editFrom:t.origFrom,editTo:t.origTo,origFrom:t.editFrom,origTo:t.editTo},p.style.top=v+"px","right"==e.type?p.style.left="2px":p.style.right="2px"}}}function C(e,t,r,i){e.diffOutOfDate||t.replaceRange(r.getRange(H(i.origFrom,0),H(i.origTo,0)),H(i.editFrom,0),H(i.editTo,0))}function T(t){var r=t.lockButton=O("div",null,"CodeMirror-merge-scrolllock");r.title="Toggle locked scrolling";var i=O("div",[r],"CodeMirror-merge-scrolllock-wrap");e.on(r,"click",function(){c(t,!t.lockScroll)});var o=[i];if(t.mv.options.revertButtons!==!1&&(t.copyButtons=O("div",null,"CodeMirror-merge-copybuttons-"+t.type),e.on(t.copyButtons,"click",function(e){var r=e.target||e.srcElement;if(r.chunk)return"CodeMirror-merge-copy-reverse"==r.className?void C(t,t.orig,t.edit,r.chunk):void C(t,t.edit,t.orig,r.chunk)}),o.unshift(t.copyButtons)),"align"!=t.mv.options.connect){var n=document.createElementNS&&document.createElementNS(P,"svg");n&&!n.createSVGRect&&(n=null),t.svg=n,n&&o.push(n)}return t.gap=O("div",o,"CodeMirror-merge-gap")}function F(e){return"string"==typeof e?e:e.getValue()}function y(e,t){var r=z.diff_main(e,t);z.diff_cleanupSemantic(r);for(var i=0;i<r.length;++i){var o=r[i];o[1]?i&&r[i-1][0]==o[0]&&(r.splice(i--,1),r[i][1]+=o[1]):r.splice(i--,1)}return r}function w(e){for(var t=[],r=0,i=0,o=H(0,0),n=H(0,0),l=0;l<e.length;++l){var a=e[l],c=a[0];if(c==DIFF_EQUAL){var s=D(e,l)?0:1,f=o.line+s,h=n.line+s;x(o,a[1],null,n);var d=M(e,l)?1:0,u=o.line+d,g=n.line+d;u>f&&(l&&t.push({origFrom:i,origTo:h,editFrom:r,editTo:f}),r=u,i=g)}else x(c==DIFF_INSERT?o:n,a[1])}return(r<=o.line||i<=n.line)&&t.push({origFrom:i,origTo:n.line+1,editFrom:r,editTo:o.line+1}),t}function M(e,t){if(t==e.length-1)return!0;var r=e[t+1][1];return 1==r.length||10!=r.charCodeAt(0)?!1:t==e.length-2?!0:(r=e[t+2][1],r.length>1&&10==r.charCodeAt(0))}function D(e,t){if(0==t)return!0;var r=e[t-1][1];return 10!=r.charCodeAt(r.length-1)?!1:1==t?!0:(r=e[t-2][1],10==r.charCodeAt(r.length-1))}function L(e,t,r){for(var i,o,n,l,a=0;a<e.length;a++){var c=e[a],s=r?c.editFrom:c.origFrom,f=r?c.editTo:c.origTo;null==o&&(s>t?(o=c.editFrom,l=c.origFrom):f>t&&(o=c.editTo,l=c.origTo)),t>=f?(i=c.editTo,n=c.origTo):t>=s&&(i=c.editFrom,n=c.origFrom)}return{edit:{before:i,after:o},orig:{before:n,after:l}}}function I(e,t,r){function i(){n.clear(),e.removeLineClass(t,"wrap","CodeMirror-merge-collapsed-line")}e.addLineClass(t,"wrap","CodeMirror-merge-collapsed-line");var o=document.createElement("span");o.className="CodeMirror-merge-collapsed-widget",o.title="Identical text collapsed. Click to expand.";var n=e.markText(H(t,0),H(r-1),{inclusiveLeft:!0,inclusiveRight:!0,replacedWith:o,clearOnEnter:!0});return o.addEventListener("click",i),{mark:n,clear:i}}function b(e,t){function r(){for(var e=0;e<i.length;e++)i[e].clear()}for(var i=[],o=0;o<t.length;o++){var n=t[o],l=I(n.cm,n.line,n.line+e);i.push(l),l.mark.on("clear",r)}return i[0].mark}function E(e,t,r,i){for(var o=0;o<e.chunks.length;o++)for(var n=e.chunks[o],l=n.editFrom-t;l<n.editTo+t;l++){var a=l+r;a>=0&&a<i.length&&(i[a]=!1)}}function S(e,t){"number"!=typeof t&&(t=2);for(var r=[],i=e.editor(),o=i.firstLine(),n=o,l=i.lastLine();l>=n;n++)r.push(!0);e.left&&E(e.left,t,o,r),e.right&&E(e.right,t,o,r);for(var a=0;a<r.length;a++)if(r[a]){for(var c=a+o,s=1;a<r.length-1&&r[a+1];a++,s++);if(s>t){var f=[{line:c,cm:i}];e.left&&f.push({line:u(c,e.left.chunks),cm:e.left.orig}),e.right&&f.push({line:u(c,e.right.chunks),cm:e.right.orig});var h=b(s,f);e.options.onCollapse&&e.options.onCollapse(e,c,s,h)}}}function O(e,t,r,i){var o=document.createElement(e);if(r&&(o.className=r),i&&(o.style.cssText=i),"string"==typeof t)o.appendChild(document.createTextNode(t));else if(t)for(var n=0;n<t.length;++n)o.appendChild(t[n]);return o}function N(e){for(var t=e.childNodes.length;t>0;--t)e.removeChild(e.firstChild)}function _(e){for(var t=1;t<arguments.length;t+=2)e.setAttribute(arguments[t],arguments[t+1])}function A(e,t){t||(t={});for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return t}function x(e,t,r,i){for(var o=r?H(e.line,e.ch):e,n=0;;){var l=t.indexOf("\n",n);if(-1==l)break;++o.line,i&&++i.line,n=l+1}return o.ch=(n?0:o.ch)+(t.length-n),i&&(i.ch=(n?0:i.ch)+(t.length-n)),o}function B(e,t){return(e.line-t.line||e.ch-t.ch)<0?e:t}function R(e,t){return(e.line-t.line||e.ch-t.ch)>0?e:t}function V(e,t){return e.line==t.line&&e.ch==t.ch}var H=e.Pos,P="http://www.w3.org/2000/svg";r.prototype={constructor:r,init:function(t,r,i){this.edit=this.mv.edit,this.orig=e(t,A({value:r,readOnly:!this.mv.options.allowEditingOriginals},A(i))),this.diff=y(F(r),F(i.value)),this.chunks=w(this.diff),this.diffOutOfDate=this.dealigned=!1,this.showDifferences=i.showDifferences!==!1,this.forceUpdate=o(this),c(this,!0,!1),n(this)},setShowDifferences:function(e){e=e!==!1,e!=this.showDifferences&&(this.showDifferences=e,this.forceUpdate("full"))}};var U=!1,W=e.MergeView=function(t,i){if(!(this instanceof W))return new W(t,i);this.options=i;var o=i.origLeft,n=null==i.origRight?i.orig:i.origRight,l=null!=o,a=null!=n,c=1+(l?1:0)+(a?1:0),s=[],f=this.left=null,h=this.right=null,u=this;if(l){f=this.left=new r(this,"left");var g=O("div",null,"CodeMirror-merge-pane");s.push(g),s.push(T(f))}var v=O("div",null,"CodeMirror-merge-pane");if(s.push(v),a){h=this.right=new r(this,"right"),s.push(T(h));var p=O("div",null,"CodeMirror-merge-pane");s.push(p)}(a?p:v).className+=" CodeMirror-merge-pane-rightmost",s.push(O("div",null,null,"height: 0; clear: both;"));var k=this.wrap=t.appendChild(O("div",s,"CodeMirror-merge CodeMirror-merge-"+c+"pane"));this.edit=e(v,A(i)),f&&f.init(g,o,i),h&&h.init(p,n,i),i.collapseIdentical&&(U=!0,this.editor().operation(function(){S(u,i.collapseIdentical)}),U=!1),"align"==i.connect&&(this.aligners=[],m(this.left||this.right,!0));var C=function(){f&&d(f),h&&d(h)};e.on(window,"resize",C);var F=setInterval(function(){for(var t=k.parentNode;t&&t!=document.body;t=t.parentNode);t||(clearInterval(F),e.off(window,"resize",C))},5e3)};W.prototype={constuctor:W,editor:function(){return this.edit},rightOriginal:function(){return this.right&&this.right.orig},leftOriginal:function(){return this.left&&this.left.orig},setShowDifferences:function(e){this.right&&this.right.setShowDifferences(e),this.left&&this.left.setShowDifferences(e)},rightChunks:function(){return this.right?(i(this.right),this.right.chunks):void 0},leftChunks:function(){return this.left?(i(this.left),this.left.chunks):void 0}};var z=new t});