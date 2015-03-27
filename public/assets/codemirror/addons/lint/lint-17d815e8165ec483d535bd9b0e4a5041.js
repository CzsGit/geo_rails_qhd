!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(t){"use strict";function e(e,n){function o(e){return r.parentNode?(r.style.top=Math.max(0,e.clientY-r.offsetHeight-5)+"px",void(r.style.left=e.clientX+5+"px")):t.off(document,"mousemove",o)}var r=document.createElement("div");return r.className="CodeMirror-lint-tooltip",r.appendChild(n.cloneNode(!0)),document.body.appendChild(r),t.on(document,"mousemove",o),o(e),null!=r.style.opacity&&(r.style.opacity=1),r}function n(t){t.parentNode&&t.parentNode.removeChild(t)}function o(t){t.parentNode&&(null==t.style.opacity&&n(t),t.style.opacity=0,setTimeout(function(){n(t)},600))}function r(n,r,i){function a(){t.off(i,"mouseout",a),s&&(o(s),s=null)}var s=e(n,r),u=setInterval(function(){if(s)for(var t=i;;t=t.parentNode){if(t&&11==t.nodeType&&(t=t.host),t==document.body)return;if(!t){a();break}}return s?void 0:clearInterval(u)},400);t.on(i,"mouseout",a)}function i(t,e,n){this.marked=[],this.options=e,this.timeout=null,this.hasGutter=n,this.onMouseOver=function(e){g(t,e)}}function a(e,n){if(n instanceof Function)return{getAnnotations:n};if(n&&n!==!0||(n={}),n.getAnnotations||(n.getAnnotations=e.getHelper(t.Pos(0,0),"lint")),!n.getAnnotations)throw new Error("Required option 'getAnnotations' missing (lint addon)");return n}function s(t){var e=t.state.lint;e.hasGutter&&t.clearGutter(h);for(var n=0;n<e.marked.length;++n)e.marked[n].clear();e.marked.length=0}function u(e,n,o,i){var a=document.createElement("div"),s=a;return a.className="CodeMirror-lint-marker-"+n,o&&(s=a.appendChild(document.createElement("div")),s.className="CodeMirror-lint-marker-multiple"),0!=i&&t.on(s,"mouseover",function(t){r(t,e,s)}),a}function l(t,e){return"error"==t?t:e}function c(t){for(var e=[],n=0;n<t.length;++n){var o=t[n],r=o.from.line;(e[r]||(e[r]=[])).push(o)}return e}function f(t){var e=t.severity;e||(e="error");var n=document.createElement("div");return n.className="CodeMirror-lint-message-"+e,n.appendChild(document.createTextNode(t.message)),n}function d(t){var e=t.state.lint,n=e.options,o=n.options||n;n.async||n.getAnnotations.async?n.getAnnotations(t.getValue(),m,o,t):m(t,n.getAnnotations(t.getValue(),o,t))}function m(t,e){s(t);for(var n=t.state.lint,o=n.options,r=c(e),i=0;i<r.length;++i){var a=r[i];if(a){for(var d=null,m=n.hasGutter&&document.createDocumentFragment(),p=0;p<a.length;++p){var v=a[p],g=v.severity;g||(g="error"),d=l(d,g),o.formatAnnotation&&(v=o.formatAnnotation(v)),n.hasGutter&&m.appendChild(f(v)),v.to&&n.marked.push(t.markText(v.from,v.to,{className:"CodeMirror-lint-mark-"+g,__annotation:v}))}n.hasGutter&&t.setGutterMarker(i,h,u(m,d,a.length>1,n.options.tooltips))}}o.onUpdateLinting&&o.onUpdateLinting(e,r,t)}function p(t){var e=t.state.lint;clearTimeout(e.timeout),e.timeout=setTimeout(function(){d(t)},e.options.delay||500)}function v(t,e){var n=e.target||e.srcElement;r(e,f(t),n)}function g(t,e){var n=e.target||e.srcElement;if(/\bCodeMirror-lint-mark-/.test(n.className))for(var o=n.getBoundingClientRect(),r=(o.left+o.right)/2,i=(o.top+o.bottom)/2,a=t.findMarksAt(t.coordsChar({left:r,top:i},"client")),s=0;s<a.length;++s){var u=a[s].__annotation;if(u)return v(u,e)}}var h="CodeMirror-lint-markers";t.defineOption("lint",!1,function(e,n,o){if(o&&o!=t.Init&&(s(e),e.off("change",p),t.off(e.getWrapperElement(),"mouseover",e.state.lint.onMouseOver),delete e.state.lint),n){for(var r=e.getOption("gutters"),u=!1,l=0;l<r.length;++l)r[l]==h&&(u=!0);var c=e.state.lint=new i(e,a(e,n),u);e.on("change",p),0!=c.options.tooltips&&t.on(e.getWrapperElement(),"mouseover",c.onMouseOver),d(e)}})});