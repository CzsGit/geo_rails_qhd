!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../lib/codemirror"),require("../addon/search/searchcursor"),require("../addon/edit/matchbrackets")):"function"==typeof define&&define.amd?define(["../lib/codemirror","../addon/search/searchcursor","../addon/edit/matchbrackets"],e):e(CodeMirror)}(function(e){"use strict";function t(t,n,o){if(0>o&&0==n.ch)return t.clipPos(h(n.line-1));var r=t.getLine(n.line);if(o>0&&n.ch>=r.length)return t.clipPos(h(n.line+1,0));for(var i,l="start",a=n.ch,s=0>o?0:r.length,c=0;a!=s;a+=o,c++){var f=r.charAt(0>o?a-1:a),u="_"!=f&&e.isWordChar(f)?"w":"o";if("w"==u&&f.toUpperCase()==f&&(u="W"),"start"==l)"o"!=u&&(l="in",i=u);else if("in"==l&&i!=u){if("w"==i&&"W"==u&&0>o&&a--,"W"==i&&"w"==u&&o>0){i="w";continue}break}}return h(n.line,a)}function n(e,n){e.extendSelectionsBy(function(o){return e.display.shift||e.doc.extend||o.empty()?t(e.doc,o.head,n):0>n?o.from():o.to()})}function o(e,t){e.operation(function(){for(var n=e.listSelections().length,o=[],r=-1,i=0;n>i;i++){var l=e.listSelections()[i].head;if(!(l.line<=r)){var a=h(l.line+(t?0:1),0);e.replaceRange("\n",a,null,"+insertLine"),e.indentLine(a.line,null,!0),o.push({head:a,anchor:a}),r=l.line+1}}e.setSelections(o)})}function r(t,n){for(var o=n.ch,r=o,i=t.getLine(n.line);o&&e.isWordChar(i.charAt(o-1));)--o;for(;r<i.length&&e.isWordChar(i.charAt(r));)++r;return{from:h(n.line,o),to:h(n.line,r),word:i.slice(o,r)}}function i(e){var t=e.getCursor(),n=e.scanForBracket(t,-1);if(n)for(;;){var o=e.scanForBracket(t,1);if(!o)return;if(o.ch==m.charAt(m.indexOf(n.ch)+1))return e.setSelection(h(n.pos.line,n.pos.ch+1),o.pos,!1),!0;t=h(o.pos.line,o.pos.ch+1)}}function l(e,t){for(var n,o=e.listSelections(),r=[],i=0;i<o.length;i++){var l=o[i];if(!l.empty()){for(var a=l.from().line,s=l.to().line;i<o.length-1&&o[i+1].from().line==s;)s=l[++i].to().line;r.push(a,s)}}r.length?n=!0:r.push(e.firstLine(),e.lastLine()),e.operation(function(){for(var o=[],i=0;i<r.length;i+=2){var l=r[i],a=r[i+1],s=h(l,0),c=h(a),f=e.getRange(s,c,!1);t?f.sort():f.sort(function(e,t){var n=e.toUpperCase(),o=t.toUpperCase();return n!=o&&(e=n,t=o),t>e?-1:e==t?0:1}),e.replaceRange(f,s,c),n&&o.push({anchor:s,head:c})}n&&e.setSelections(o,0)})}function a(t,n){t.operation(function(){for(var o=t.listSelections(),i=[],l=[],a=0;a<o.length;a++){var s=o[a];s.empty()?(i.push(a),l.push("")):l.push(n(t.getRange(s.from(),s.to())))}t.replaceSelections(l,"around","case");for(var c,a=i.length-1;a>=0;a--){var s=o[i[a]];if(!(c&&e.cmpPos(s.head,c)>0)){var f=r(t,s.head);c=f.from,t.replaceRange(n(f.word),f.from,f.to)}}})}function s(t){var n=t.getCursor("from"),o=t.getCursor("to");if(0==e.cmpPos(n,o)){var i=r(t,n);if(!i.word)return;n=i.from,o=i.to}return{from:n,to:o,query:t.getRange(n,o),word:i}}function c(e,t){var n=s(e);if(n){var o=n.query,r=e.getSearchCursor(o,t?n.to:n.from);(t?r.findNext():r.findPrevious())?e.setSelection(r.from(),r.to()):(r=e.getSearchCursor(o,t?h(e.firstLine(),0):e.clipPos(h(e.lastLine()))),(t?r.findNext():r.findPrevious())?e.setSelection(r.from(),r.to()):n.word&&e.setSelection(n.from,n.to))}}var f=e.keyMap.sublime={fallthrough:"default"},u=e.commands,h=e.Pos,d=e.keyMap["default"]==e.keyMap.macDefault,p=d?"Cmd-":"Ctrl-";u[f["Alt-Left"]="goSubwordLeft"]=function(e){n(e,-1)},u[f["Alt-Right"]="goSubwordRight"]=function(e){n(e,1)},u[f[p+"Up"]="scrollLineUp"]=function(e){var t=e.getScrollInfo();if(!e.somethingSelected()){var n=e.lineAtHeight(t.top+t.clientHeight,"local");e.getCursor().line>=n&&e.execCommand("goLineUp")}e.scrollTo(null,t.top-e.defaultTextHeight())},u[f[p+"Down"]="scrollLineDown"]=function(e){var t=e.getScrollInfo();if(!e.somethingSelected()){var n=e.lineAtHeight(t.top,"local")+1;e.getCursor().line<=n&&e.execCommand("goLineDown")}e.scrollTo(null,t.top+e.defaultTextHeight())},u[f["Shift-"+p+"L"]="splitSelectionByLine"]=function(e){for(var t=e.listSelections(),n=[],o=0;o<t.length;o++)for(var r=t[o].from(),i=t[o].to(),l=r.line;l<=i.line;++l)i.line>r.line&&l==i.line&&0==i.ch||n.push({anchor:l==r.line?r:h(l,0),head:l==i.line?i:h(l)});e.setSelections(n,0)},f["Shift-Tab"]="indentLess",u[f.Esc="singleSelectionTop"]=function(e){var t=e.listSelections()[0];e.setSelection(t.anchor,t.head,{scroll:!1})},u[f[p+"L"]="selectLine"]=function(e){for(var t=e.listSelections(),n=[],o=0;o<t.length;o++){var r=t[o];n.push({anchor:h(r.from().line,0),head:h(r.to().line+1,0)})}e.setSelections(n)},f["Shift-"+p+"K"]="deleteLine",u[f[p+"Enter"]="insertLineAfter"]=function(e){o(e,!1)},u[f["Shift-"+p+"Enter"]="insertLineBefore"]=function(e){o(e,!0)},u[f[p+"D"]="selectNextOccurrence"]=function(t){var n=t.getCursor("from"),o=t.getCursor("to"),i=t.state.sublimeFindFullWord==t.doc.sel;if(0==e.cmpPos(n,o)){var l=r(t,n);if(!l.word)return;t.setSelection(l.from,l.to),i=!0}else{var a=t.getRange(n,o),s=i?new RegExp("\\b"+a+"\\b"):a,c=t.getSearchCursor(s,o);c.findNext()?t.addSelection(c.from(),c.to()):(c=t.getSearchCursor(s,h(t.firstLine(),0)),c.findNext()&&t.addSelection(c.from(),c.to()))}i&&(t.state.sublimeFindFullWord=t.doc.sel)};var m="(){}[]";u[f["Shift-"+p+"Space"]="selectScope"]=function(e){i(e)||e.execCommand("selectAll")},u[f["Shift-"+p+"M"]="selectBetweenBrackets"]=function(t){return i(t)?void 0:e.Pass},u[f[p+"M"]="goToBracket"]=function(t){t.extendSelectionsBy(function(n){var o=t.scanForBracket(n.head,1);if(o&&0!=e.cmpPos(o.pos,n.head))return o.pos;var r=t.scanForBracket(n.head,-1);return r&&h(r.pos.line,r.pos.ch+1)||n.head})};var g=d?"Cmd-Ctrl-":"Shift-Ctrl-";u[f[g+"Up"]="swapLineUp"]=function(e){for(var t=e.listSelections(),n=[],o=e.firstLine()-1,r=[],i=0;i<t.length;i++){var l=t[i],a=l.from().line-1,s=l.to().line;r.push({anchor:h(l.anchor.line-1,l.anchor.ch),head:h(l.head.line-1,l.head.ch)}),0!=l.to().ch||l.empty()||--s,a>o?n.push(a,s):n.length&&(n[n.length-1]=s),o=s}e.operation(function(){for(var t=0;t<n.length;t+=2){var o=n[t],i=n[t+1],l=e.getLine(o);e.replaceRange("",h(o,0),h(o+1,0),"+swapLine"),i>e.lastLine()?e.replaceRange("\n"+l,h(e.lastLine()),null,"+swapLine"):e.replaceRange(l+"\n",h(i,0),null,"+swapLine")}e.setSelections(r),e.scrollIntoView()})},u[f[g+"Down"]="swapLineDown"]=function(e){for(var t=e.listSelections(),n=[],o=e.lastLine()+1,r=t.length-1;r>=0;r--){var i=t[r],l=i.to().line+1,a=i.from().line;0!=i.to().ch||i.empty()||l--,o>l?n.push(l,a):n.length&&(n[n.length-1]=a),o=a}e.operation(function(){for(var t=n.length-2;t>=0;t-=2){var o=n[t],r=n[t+1],i=e.getLine(o);o==e.lastLine()?e.replaceRange("",h(o-1),h(o),"+swapLine"):e.replaceRange("",h(o,0),h(o+1,0),"+swapLine"),e.replaceRange(i+"\n",h(r,0),null,"+swapLine")}e.scrollIntoView()})},f[p+"/"]="toggleComment",u[f[p+"J"]="joinLines"]=function(e){for(var t=e.listSelections(),n=[],o=0;o<t.length;o++){for(var r=t[o],i=r.from(),l=i.line,a=r.to().line;o<t.length-1&&t[o+1].from().line==a;)a=t[++o].to().line;n.push({start:l,end:a,anchor:!r.empty()&&i})}e.operation(function(){for(var t=0,o=[],r=0;r<n.length;r++){for(var i,l=n[r],a=l.anchor&&h(l.anchor.line-t,l.anchor.ch),s=l.start;s<=l.end;s++){var c=s-t;s==l.end&&(i=h(c,e.getLine(c).length+1)),c<e.lastLine()&&(e.replaceRange(" ",h(c),h(c+1,/^\s*/.exec(e.getLine(c+1))[0].length)),++t)}o.push({anchor:a||i,head:i})}e.setSelections(o,0)})},u[f["Shift-"+p+"D"]="duplicateLine"]=function(e){e.operation(function(){for(var t=e.listSelections().length,n=0;t>n;n++){var o=e.listSelections()[n];o.empty()?e.replaceRange(e.getLine(o.head.line)+"\n",h(o.head.line,0)):e.replaceRange(e.getRange(o.from(),o.to()),o.from())}e.scrollIntoView()})},f[p+"T"]="transposeChars",u[f.F9="sortLines"]=function(e){l(e,!0)},u[f[p+"F9"]="sortLinesInsensitive"]=function(e){l(e,!1)},u[f.F2="nextBookmark"]=function(e){var t=e.state.sublimeBookmarks;if(t)for(;t.length;){var n=t.shift(),o=n.find();if(o)return t.push(n),e.setSelection(o.from,o.to)}},u[f["Shift-F2"]="prevBookmark"]=function(e){var t=e.state.sublimeBookmarks;if(t)for(;t.length;){t.unshift(t.pop());var n=t[t.length-1].find();if(n)return e.setSelection(n.from,n.to);t.pop()}},u[f[p+"F2"]="toggleBookmark"]=function(e){for(var t=e.listSelections(),n=e.state.sublimeBookmarks||(e.state.sublimeBookmarks=[]),o=0;o<t.length;o++){for(var r=t[o].from(),i=t[o].to(),l=e.findMarks(r,i),a=0;a<l.length;a++)if(l[a].sublimeBookmark){l[a].clear();for(var s=0;s<n.length;s++)n[s]==l[a]&&n.splice(s--,1);break}a==l.length&&n.push(e.markText(r,i,{sublimeBookmark:!0,clearWhenEmpty:!1}))}},u[f["Shift-"+p+"F2"]="clearBookmarks"]=function(e){var t=e.state.sublimeBookmarks;if(t)for(var n=0;n<t.length;n++)t[n].clear();t.length=0},u[f["Alt-F2"]="selectBookmarks"]=function(e){var t=e.state.sublimeBookmarks,n=[];if(t)for(var o=0;o<t.length;o++){var r=t[o].find();r?n.push({anchor:r.from,head:r.to}):t.splice(o--,0)}n.length&&e.setSelections(n,0)},f["Alt-Q"]="wrapLines";var v=p+"K ";f[v+p+"Backspace"]="delLineLeft",u[f[v+p+"K"]="delLineRight"]=function(e){e.operation(function(){for(var t=e.listSelections(),n=t.length-1;n>=0;n--)e.replaceRange("",t[n].anchor,h(t[n].to().line),"+delete");e.scrollIntoView()})},u[f[v+p+"U"]="upcaseAtCursor"]=function(e){a(e,function(e){return e.toUpperCase()})},u[f[v+p+"L"]="downcaseAtCursor"]=function(e){a(e,function(e){return e.toLowerCase()})},u[f[v+p+"Space"]="setSublimeMark"]=function(e){e.state.sublimeMark&&e.state.sublimeMark.clear(),e.state.sublimeMark=e.setBookmark(e.getCursor())},u[f[v+p+"A"]="selectToSublimeMark"]=function(e){var t=e.state.sublimeMark&&e.state.sublimeMark.find();t&&e.setSelection(e.getCursor(),t)},u[f[v+p+"W"]="deleteToSublimeMark"]=function(t){var n=t.state.sublimeMark&&t.state.sublimeMark.find();if(n){var o=t.getCursor(),r=n;if(e.cmpPos(o,r)>0){var i=r;r=o,o=i}t.state.sublimeKilled=t.getRange(o,r),t.replaceRange("",o,r)}},u[f[v+p+"X"]="swapWithSublimeMark"]=function(e){var t=e.state.sublimeMark&&e.state.sublimeMark.find();t&&(e.state.sublimeMark.clear(),e.state.sublimeMark=e.setBookmark(e.getCursor()),e.setCursor(t))},u[f[v+p+"Y"]="sublimeYank"]=function(e){null!=e.state.sublimeKilled&&e.replaceSelection(e.state.sublimeKilled,null,"paste")},f[v+p+"G"]="clearBookmarks",u[f[v+p+"C"]="showInCenter"]=function(e){var t=e.cursorCoords(null,"local");e.scrollTo(null,(t.top+t.bottom)/2-e.getScrollInfo().clientHeight/2)},u[f["Shift-Alt-Up"]="selectLinesUpward"]=function(e){e.operation(function(){for(var t=e.listSelections(),n=0;n<t.length;n++){var o=t[n];o.head.line>e.firstLine()&&e.addSelection(h(o.head.line-1,o.head.ch))}})},u[f["Shift-Alt-Down"]="selectLinesDownward"]=function(e){e.operation(function(){for(var t=e.listSelections(),n=0;n<t.length;n++){var o=t[n];o.head.line<e.lastLine()&&e.addSelection(h(o.head.line+1,o.head.ch))}})},u[f[p+"F3"]="findUnder"]=function(e){c(e,!0)},u[f["Shift-"+p+"F3"]="findUnderPrevious"]=function(e){c(e,!1)},u[f["Alt-F3"]="findAllUnder"]=function(e){var t=s(e);if(t){for(var n=e.getSearchCursor(t.query),o=[],r=-1;n.findNext();)o.push({anchor:n.from(),head:n.to()}),n.from().line<=t.from.line&&n.from().ch<=t.from.ch&&r++;e.setSelections(o,r)}},f["Shift-"+p+"["]="fold",f["Shift-"+p+"]"]="unfold",f[v+p+"0"]=f[v+p+"j"]="unfoldAll",f[p+"I"]="findIncremental",f["Shift-"+p+"I"]="findIncrementalReverse",f[p+"H"]="replace",f.F3="findNext",f["Shift-F3"]="findPrev",e.normalizeKeyMap(f)});