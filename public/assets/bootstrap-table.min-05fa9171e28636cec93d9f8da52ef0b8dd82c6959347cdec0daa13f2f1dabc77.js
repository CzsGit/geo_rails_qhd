/*
* bootstrap-table - v1.7.0 - 2015-04-01
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2015 zhixin wen
* Licensed MIT License
*/
!function(t){"use strict";var i=37,e=null,o=function(t){var i=arguments,e=!0,o=1;return t=t.replace(/%s/g,function(){var t=i[o++];return"undefined"==typeof t?(e=!1,""):t}),e?t:""},s=function(i,e,o,s){var n="";return t.each(i,function(t,i){return i[e]===s?(n=i[o],!1):!0}),n},n=function(i,e){var o=-1;return t.each(i,function(t,i){return i.field===e?(o=t,!1):!0}),o},a=function(){if(null===e){var i,o,s=t("<p/>").addClass("fixed-table-scroll-inner"),n=t("<div/>").addClass("fixed-table-scroll-outer");n.append(s),t("body").append(n),i=s[0].offsetWidth,n.css("overflow","scroll"),o=s[0].offsetWidth,i===o&&(o=n[0].clientWidth),n.remove(),e=i-o}return e},r=function(i,e,o,s){if("string"==typeof e){var n=e.split(".");n.length>1?(e=window,t.each(n,function(t,i){e=e[i]})):e=window[e]}return"object"==typeof e?e:"function"==typeof e?e.apply(i,o):s},h=function(t){return"string"==typeof t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):t},l=function(i,e){this.options=e,this.$el=t(i),this.$el_=this.$el.clone(),this.timeoutId_=0,this.timeoutFooter_=0,this.init()};l.DEFAULTS={classes:"table table-hover",height:void 0,undefinedText:"-",sortName:void 0,sortOrder:"asc",striped:!1,columns:[],data:[],method:"get",url:void 0,cache:!0,contentType:"application/json",dataType:"json",ajaxOptions:{},queryParams:function(t){return t},queryParamsType:"limit",responseHandler:function(t){return t},pagination:!1,sidePagination:"client",totalRows:0,pageNumber:1,pageSize:10,pageList:[10,25,50,100],paginationHAlign:"right",paginationVAlign:"bottom",paginationDetailHAlign:"left",search:!1,searchAlign:"right",selectItemName:"btSelectItem",showHeader:!0,showFooter:!1,showColumns:!1,showPaginationSwitch:!1,showRefresh:!1,showToggle:!1,buttonsAlign:"right",smartDisplay:!0,minimumCountColumns:1,idField:void 0,uniqueId:void 0,cardView:!1,trimOnSearch:!0,clickToSelect:!1,singleSelect:!1,toolbar:void 0,toolbarAlign:"left",checkboxHeader:!0,sortable:!0,maintainSelected:!1,searchTimeOut:500,keyEvents:!1,searchText:"",iconSize:void 0,iconsPrefix:"glyphicon",icons:{paginationSwitchDown:"glyphicon-collapse-down icon-chevron-down",paginationSwitchUp:"glyphicon-collapse-up icon-chevron-up",refresh:"glyphicon-refresh icon-refresh",toggle:"glyphicon-list-alt icon-list-alt",columns:"glyphicon-th icon-th"},rowStyle:function(){return{}},rowAttributes:function(){return{}},onAll:function(){return!1},onClickRow:function(){return!1},onDblClickRow:function(){return!1},onSort:function(){return!1},onCheck:function(){return!1},onUncheck:function(){return!1},onCheckAll:function(){return!1},onUncheckAll:function(){return!1},onLoadSuccess:function(){return!1},onLoadError:function(){return!1},onColumnSwitch:function(){return!1},onColumnSearch:function(){return!1},onPageChange:function(){return!1},onSearch:function(){return!1},onPreBody:function(){return!1},onPostBody:function(){return!1},onPostHeader:function(){return!1}},l.LOCALES=[],l.LOCALES["en-US"]={formatLoadingMessage:function(){return"Loading, please wait..."},formatRecordsPerPage:function(t){return o("%s records per page",t)},formatShowingRows:function(t,i,e){return o("Showing %s to %s of %s rows",t,i,e)},formatSearch:function(){return"Search"},formatNoMatches:function(){return"No matching records found"},formatPaginationSwitch:function(){return"Hide/Show pagination"},formatRefresh:function(){return"Refresh"},formatToggle:function(){return"Toggle"},formatColumns:function(){return"Columns"},formatAllRows:function(){return"All"}},t.extend(l.DEFAULTS,l.LOCALES["en-US"]),l.COLUMN_DEFAULTS={radio:!1,checkbox:!1,checkboxEnabled:!0,field:void 0,title:void 0,"class":void 0,align:void 0,halign:void 0,falign:void 0,valign:void 0,width:void 0,sortable:!1,order:"asc",visible:!0,switchable:!0,clickToSelect:!0,formatter:void 0,footerFormatter:void 0,events:void 0,sorter:void 0,cellStyle:void 0,searchable:!0,cardVisible:!0,filterControl:void 0},l.EVENTS={"all.bs.table":"onAll","click-row.bs.table":"onClickRow","dbl-click-row.bs.table":"onDblClickRow","sort.bs.table":"onSort","check.bs.table":"onCheck","uncheck.bs.table":"onUncheck","check-all.bs.table":"onCheckAll","uncheck-all.bs.table":"onUncheckAll","load-success.bs.table":"onLoadSuccess","load-error.bs.table":"onLoadError","column-switch.bs.table":"onColumnSwitch","column-search.bs.table":"onColumnSearch","page-change.bs.table":"onPageChange","search.bs.table":"onSearch","pre-body.bs.table":"onPreBody","post-body.bs.table":"onPostBody","post-header.bs.table":"onPostHeader"},l.prototype.init=function(){this.initContainer(),this.initTable(),this.initHeader(),this.initData(),this.initFooter(),this.initToolbar(),this.initPagination(),this.initBody(),this.initServer(),this.initKeyEvents()},l.prototype.initContainer=function(){this.$container=t(['<div class="bootstrap-table">','<div class="fixed-table-toolbar"></div>',"top"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?'<div class="fixed-table-pagination" style="clear: both;"></div>':"",'<div class="fixed-table-container">','<div class="fixed-table-header"><table></table></div>','<div class="fixed-table-body">','<div class="fixed-table-loading">',this.options.formatLoadingMessage(),"</div>","</div>",'<div class="fixed-table-footer"><table><tr></tr></table></div>',"bottom"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?'<div class="fixed-table-pagination"></div>':"","</div>","</div>"].join("")),this.$container.insertAfter(this.$el),this.$container.find(".fixed-table-body").append(this.$el),this.$container.after('<div class="clearfix"></div>'),this.$loading=this.$container.find(".fixed-table-loading"),this.$el.addClass(this.options.classes),this.options.striped&&this.$el.addClass("table-striped")},l.prototype.initTable=function(){var i=this,e=[],o=[];this.$header=this.$el.find("thead"),this.$header.length||(this.$header=t("<thead></thead>").appendTo(this.$el)),this.$header.find("tr").length||this.$header.append("<tr></tr>"),this.$header.find("th").each(function(){var i=t.extend({},{title:t(this).html(),"class":t(this).attr("class")},t(this).data());e.push(i)}),this.options.columns=t.extend(!0,[],e,this.options.columns),t.each(this.options.columns,function(e,o){i.options.columns[e]=t.extend({},l.COLUMN_DEFAULTS,{field:e},o)}),this.options.data.length||(this.$el.find("tbody tr").each(function(){var e={};e._id=t(this).attr("id"),e._class=t(this).attr("class"),t(this).find("td").each(function(o){var s=i.options.columns[o].field;e[s]=t(this).html(),e["_"+s+"_id"]=t(this).attr("id"),e["_"+s+"_class"]=t(this).attr("class"),e["_"+s+"_data"]=t(this).data()}),o.push(e)}),this.options.data=o)},l.prototype.initHeader=function(){var e=this,s=[],n=[],a=!1,r=0;this.header={fields:[],styles:[],classes:[],formatters:[],events:[],sorters:[],cellStyles:[],clickToSelects:[],searchables:[]},t.each(this.options.columns,function(t,i){var r="",h="",l="",c="",p=o(' class="%s"',i["class"]),d=(e.options.sortOrder||i.order,"px"),u="hidden";if(i.visible&&(!e.options.cardView||i.cardVisible)){if(void 0!==i.width&&"string"==typeof i.width&&(i.width.indexOf("%")>-1&&(d="%"),i.width=i.width.replace("%","").replace("px","")),h=o("text-align: %s; ",i.halign?i.halign:i.align),l=o("text-align: %s; ",i.align),c=o("vertical-align: %s; ",i.valign),c+=o("width: %s"+d+"; ",i.checkbox||i.radio?36:i.width),s.push(i),e.header.fields.push(i.field),e.header.styles.push(l+c),e.header.classes.push(p),e.header.formatters.push(i.formatter),e.header.events.push(i.events),e.header.sorters.push(i.sorter),e.header.cellStyles.push(i.cellStyle),e.header.clickToSelects.push(i.clickToSelect),e.header.searchables.push(i.searchable),n.push("<th",i.checkbox||i.radio?o(' class="bs-checkbox %s"',i["class"]||""):p,o(' style="%s"',h+c),">"),n.push(o('<div class="th-inner %s">',e.options.sortable&&i.sortable?"sortable":"")),r=i.title,e.options.sortName===i.field&&e.options.sortable&&i.sortable&&(r+=e.getCaretHtml()),i.checkbox&&(!e.options.singleSelect&&e.options.checkboxHeader&&(r='<input name="btSelectAll" type="checkbox" />'),e.header.stateField=i.field),i.radio&&(r="",e.header.stateField=i.field,e.options.singleSelect=!0),n.push(r),n.push("</div>"),n.push('<div class="fht-cell"></div>'),n.push('<div style="margin: 0px 2px 2px 2px;" class="filterControl">'),i.filterControl&&i.searchable&&(a=!0,u="visible"),void 0!==i.filterControl)switch(i.filterControl.toLowerCase()){case"input":n.push(o('<input type="text" class="form-control" style="width: 100%; visibility: %s">',u));break;case"select":n.push(o('<select class="%s form-control" style="width: 100%; visibility: %s"></select>',i.field,u))}else n.push('<div style="height: 34px;"></div>');n.push("</div>"),n.push("</th>")}}),this.$header.find("tr").html(n.join("")),this.$header.find("th").each(function(i){t(this).data(s[i])}),this.$container.off("click",".th-inner").on("click",".th-inner",function(i){e.options.sortable&&t(this).parent().data().sortable&&e.onSort(i)}),!this.options.showHeader||this.options.cardView?(this.$header.hide(),this.$container.find(".fixed-table-header").hide(),this.$loading.css("top",0)):(this.$header.show(),this.$container.find(".fixed-table-header").show(),this.$loading.css("top",i+"px")),this.$selectAll=this.$header.find('[name="btSelectAll"]'),this.$container.off("click",'[name="btSelectAll"]').on("click",'[name="btSelectAll"]',function(){var i=t(this).prop("checked");e[i?"checkAll":"uncheckAll"]()}),a?(this.$header.off("keyup","input").on("keyup","input",function(t){clearTimeout(r),r=setTimeout(function(){e.onColumnSearch(t)},e.options.searchTimeOut)}),this.$header.off("change","select").on("change","select",function(t){clearTimeout(r),r=setTimeout(function(){e.onColumnSearch(t)},e.options.searchTimeOut)})):this.$header.find(".filterControl").hide()},l.prototype.initFooter=function(){this.$footer=this.$container.find(".fixed-table-footer"),!this.options.showFooter||this.options.cardView?this.$footer.hide():this.$footer.show()},l.prototype.initData=function(t,i){this.data="append"===i?this.data.concat(t):"prepend"===i?[].concat(t).concat(this.data):t||this.options.data,this.options.data=this.data,"server"!==this.options.sidePagination&&this.initSort()},l.prototype.initSort=function(){var i=this,e=this.options.sortName,o="desc"===this.options.sortOrder?-1:1,s=t.inArray(this.options.sortName,this.header.fields);-1!==s&&this.data.sort(function(n,a){var h=n[e],l=a[e],c=r(i.header,i.header.sorters[s],[h,l]);return void 0!==c?o*c:void 0!==c?o*c:((void 0===h||null===h)&&(h=""),(void 0===l||null===l)&&(l=""),t.isNumeric(h)&&t.isNumeric(l)?(h=parseFloat(h),l=parseFloat(l),l>h?-1*o:o):h===l?0:("string"!=typeof h&&(h=h.toString()),-1===h.localeCompare(l)?-1*o:o))})},l.prototype.onSort=function(i){var e=t(i.currentTarget).parent(),o=this.$header.find("th").eq(e.index());return this.$header.add(this.$header_).find("span.order").remove(),this.options.sortName===e.data("field")?this.options.sortOrder="asc"===this.options.sortOrder?"desc":"asc":(this.options.sortName=e.data("field"),this.options.sortOrder="asc"===e.data("order")?"desc":"asc"),this.trigger("sort",this.options.sortName,this.options.sortOrder),e.add(o).data("order",this.options.sortOrder).find(".th-inner").append(this.getCaretHtml()),"server"===this.options.sidePagination?void this.initServer():(this.initSort(),void this.initBody())},l.prototype.initToolbar=function(){var i,e,s=this,n=[],a=0,h=0;this.$toolbar=this.$container.find(".fixed-table-toolbar").html(""),"string"==typeof this.options.toolbar&&t(o('<div class="bars pull-%s"></div>',this.options.toolbarAlign)).appendTo(this.$toolbar).append(t(this.options.toolbar)),n=[o('<div class="columns columns-%s btn-group pull-%s">',this.options.buttonsAlign,this.options.buttonsAlign)],"string"==typeof this.options.icons&&(this.options.icons=r(null,this.options.icons)),this.options.showPaginationSwitch&&n.push(o('<button class="btn btn-default" type="button" name="paginationSwitch" title="%s">',this.options.formatPaginationSwitch()),o('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.paginationSwitchDown),"</button>"),this.options.showRefresh&&n.push(o('<button class="btn btn-default'+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+'" type="button" name="refresh" title="%s">',this.options.formatRefresh()),o('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.refresh),"</button>"),this.options.showToggle&&n.push(o('<button class="btn btn-default'+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+'" type="button" name="toggle" title="%s">',this.options.formatToggle()),o('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.toggle),"</button>"),this.options.showColumns&&(n.push(o('<div class="keep-open btn-group" title="%s">',this.options.formatColumns()),'<button type="button" class="btn btn-default'+(void 0==this.options.iconSize?"":" btn-"+this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">',o('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.columns),' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'),t.each(this.options.columns,function(t,i){if(!(i.radio||i.checkbox||s.options.cardView&&!i.cardVisible)){var e=i.visible?' checked="checked"':"";i.switchable&&(n.push(o('<li><label><input type="checkbox" data-field="%s" value="%s"%s> %s</label></li>',i.field,t,e,i.title)),h++)}}),n.push("</ul>","</div>")),n.push("</div>"),(this.showToolbar||n.length>2)&&this.$toolbar.append(n.join("")),this.options.showPaginationSwitch&&this.$toolbar.find('button[name="paginationSwitch"]').off("click").on("click",t.proxy(this.togglePagination,this)),this.options.showRefresh&&this.$toolbar.find('button[name="refresh"]').off("click").on("click",t.proxy(this.refresh,this)),this.options.showToggle&&this.$toolbar.find('button[name="toggle"]').off("click").on("click",function(){s.toggleView()}),this.options.showColumns&&(i=this.$toolbar.find(".keep-open"),h<=this.options.minimumCountColumns&&i.find("input").prop("disabled",!0),i.find("li").off("click").on("click",function(t){t.stopImmediatePropagation()}),i.find("input").off("click").on("click",function(){var i=t(this);s.toggleColumn(i.val(),i.prop("checked"),!1),s.trigger("column-switch",t(this).data("field"),i.prop("checked"))})),this.options.search&&(n=[],n.push('<div class="pull-'+this.options.searchAlign+' search">',o('<input class="form-control'+(void 0===this.options.iconSize?"":" input-"+this.options.iconSize)+'" type="text" placeholder="%s">',this.options.formatSearch()),"</div>"),this.$toolbar.append(n.join("")),e=this.$toolbar.find(".search input"),e.off("keyup").on("keyup",function(t){clearTimeout(a),a=setTimeout(function(){s.onSearch(t)},s.options.searchTimeOut)}),""!==this.options.searchText&&(e.val(this.options.searchText),clearTimeout(a),a=setTimeout(function(){e.trigger("keyup")},s.options.searchTimeOut)))},l.prototype.onSearch=function(i){var e=t.trim(t(i.currentTarget).val());this.options.trimOnSearch&&t(i.currentTarget).val()!==e&&t(i.currentTarget).val(e),e!==this.searchText&&(this.searchText=e,this.options.pageNumber=1,this.initSearch(),this.updatePagination(),this.trigger("search",e))},l.prototype.onColumnSearch=function(i){var e=t.trim(t(i.currentTarget).val()),o=t(i.currentTarget).parent().parent().data("field");t.isEmptyObject(this.filterColumnsPartial)&&(this.filterColumnsPartial={}),e?this.filterColumnsPartial[o]=e:delete this.filterColumnsPartial[o],this.options.pageNumber=1,this.initSearch(),this.updatePagination()},l.prototype.initSearch=function(){var i=this;if("server"!==this.options.sidePagination){var e=this.searchText&&this.searchText.toLowerCase(),o=t.isEmptyObject(this.filterColumns)?null:this.filterColumns,s=t.isEmptyObject(this.filterColumnsPartial)?null:this.filterColumnsPartial;this.data=o?t.grep(this.options.data,function(t){for(var i in o)if(t[i]!==o[i])return!1;return!0}):this.options.data,this.data=s?t.grep(this.data,function(e,o){for(var n in s){var a=s[n].toLowerCase(),h=e[n];if(h=r(i.header,i.header.formatters[t.inArray(n,i.header.fields)],[h,e,o],h),-1===t.inArray(n,i.header.fields)||"string"!=typeof h&&"number"!=typeof h||-1===(h+"").toLowerCase().indexOf(a))return!1}return!0}):this.data,this.data=e?t.grep(this.data,function(o,s){for(var n in o){n=t.isNumeric(n)?parseInt(n,10):n;var a=o[n];a=r(i.header,i.header.formatters[t.inArray(n,i.header.fields)],[a,o,s],a);var h=t.inArray(n,i.header.fields);if(-1!==h&&i.header.searchables[h]&&("string"==typeof a||"number"==typeof a)&&-1!==(a+"").toLowerCase().indexOf(e))return!0}return!1}):this.data}},l.prototype.initPagination=function(){if(this.$pagination=this.$container.find(".fixed-table-pagination"),!this.options.pagination)return void this.$pagination.hide();this.$pagination.show();var i,e,s,n,a,r,h,l,c,p=this,d=[],u=!1,f=this.getData();if("server"!==this.options.sidePagination&&(this.options.totalRows=f.length),this.totalPages=0,this.options.totalRows){if(this.options.pageSize===this.options.formatAllRows())this.options.pageSize=this.options.totalRows,u=!0;else if(this.options.pageSize===this.options.totalRows){var g="string"==typeof this.options.pageList?this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").toLowerCase().split(","):this.options.pageList;g.indexOf(this.options.formatAllRows().toLowerCase())>-1&&(u=!0)}this.totalPages=~~((this.options.totalRows-1)/this.options.pageSize)+1,this.options.totalPages=this.totalPages}this.totalPages>0&&this.options.pageNumber>this.totalPages&&(this.options.pageNumber=this.totalPages),this.pageFrom=(this.options.pageNumber-1)*this.options.pageSize+1,this.pageTo=this.options.pageNumber*this.options.pageSize,this.pageTo>this.options.totalRows&&(this.pageTo=this.options.totalRows),d.push('<div class="pull-'+this.options.paginationDetailHAlign+' pagination-detail">','<span class="pagination-info">',this.options.formatShowingRows(this.pageFrom,this.pageTo,this.options.totalRows),"</span>"),d.push('<span class="page-list">');var b=[o('<span class="btn-group %s">',"top"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?"dropdown":"dropup"),'<button type="button" class="btn btn-default '+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">','<span class="page-size">',u?this.options.formatAllRows():this.options.pageSize,"</span>",' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'],m=this.options.pageList;if("string"==typeof this.options.pageList){var y=this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").split(",");m=[],t.each(y,function(t,i){m.push(i.toUpperCase()===p.options.formatAllRows().toUpperCase()?p.options.formatAllRows():+i)})}for(t.each(m,function(t,i){if(!p.options.smartDisplay||0===t||m[t-1]<=p.options.totalRows){var e;e=u?i===p.options.formatAllRows()?' class="active"':"":i===p.options.pageSize?' class="active"':"",b.push(o('<li%s><a href="javascript:void(0)">%s</a></li>',e,i))}}),b.push("</ul></span>"),d.push(this.options.formatRecordsPerPage(b.join(""))),d.push("</span>"),d.push("</div>",'<div class="pull-'+this.options.paginationHAlign+'">','<ul class="pagination'+(void 0===this.options.iconSize?"":" pagination-"+this.options.iconSize)+'">','<li class="page-first"><a href="javascript:void(0)">&lt;&lt;</a></li>','<li class="page-pre"><a href="javascript:void(0)">&lt;</a></li>'),this.totalPages<5?(e=1,s=this.totalPages):(e=this.options.pageNumber-2,s=e+4,1>e&&(e=1,s=5),s>this.totalPages&&(s=this.totalPages,e=s-4)),i=e;s>=i;i++)d.push('<li class="page-number'+(i===this.options.pageNumber?" active":"")+'">','<a href="javascript:void(0)">',i,"</a>","</li>");d.push('<li class="page-next"><a href="javascript:void(0)">&gt;</a></li>','<li class="page-last"><a href="javascript:void(0)">&gt;&gt;</a></li>',"</ul>","</div>"),this.$pagination.html(d.join("")),n=this.$pagination.find(".page-list a"),a=this.$pagination.find(".page-first"),r=this.$pagination.find(".page-pre"),h=this.$pagination.find(".page-next"),l=this.$pagination.find(".page-last"),c=this.$pagination.find(".page-number"),this.options.pageNumber<=1&&(a.addClass("disabled"),r.addClass("disabled")),this.options.pageNumber>=this.totalPages&&(h.addClass("disabled"),l.addClass("disabled")),this.options.smartDisplay&&(this.totalPages<=1&&this.$pagination.find("div.pagination").hide(),(m.length<2||this.options.totalRows<=m[0])&&this.$pagination.find("span.page-list").hide(),this.$pagination[this.getData().length?"show":"hide"]()),u&&(this.options.pageSize=this.options.formatAllRows()),n.off("click").on("click",t.proxy(this.onPageListChange,this)),a.off("click").on("click",t.proxy(this.onPageFirst,this)),r.off("click").on("click",t.proxy(this.onPagePre,this)),h.off("click").on("click",t.proxy(this.onPageNext,this)),l.off("click").on("click",t.proxy(this.onPageLast,this)),c.off("click").on("click",t.proxy(this.onPageNumber,this))},l.prototype.updatePagination=function(i){i&&t(i.currentTarget).hasClass("disabled")||(this.options.maintainSelected||this.resetRows(),this.initPagination(),"server"===this.options.sidePagination?this.initServer():this.initBody(),this.trigger("page-change",this.options.pageNumber,this.options.pageSize))},l.prototype.onPageListChange=function(i){var e=t(i.currentTarget);e.parent().addClass("active").siblings().removeClass("active"),this.options.pageSize=e.text().toUpperCase()===this.options.formatAllRows().toUpperCase()?this.options.formatAllRows():+e.text(),this.$toolbar.find(".page-size").text(this.options.pageSize),this.updatePagination(i)},l.prototype.onPageFirst=function(t){this.options.pageNumber=1,this.updatePagination(t)},l.prototype.onPagePre=function(t){this.options.pageNumber--,this.updatePagination(t)},l.prototype.onPageNext=function(t){this.options.pageNumber++,this.updatePagination(t)},l.prototype.onPageLast=function(t){this.options.pageNumber=this.totalPages,this.updatePagination(t)},l.prototype.onPageNumber=function(i){this.options.pageNumber!==+t(i.currentTarget).text()&&(this.options.pageNumber=+t(i.currentTarget).text(),this.updatePagination(i))},l.prototype.initBody=function(i){var e=this,a=[],l=this.getData();this.trigger("pre-body",l),this.$body=this.$el.find("tbody"),this.$body.length||(this.$body=t("<tbody></tbody>").appendTo(this.$el)),this.options.pagination&&"server"!==this.options.sidePagination||(this.pageFrom=1,this.pageTo=l.length);for(var c=this.pageFrom-1;c<this.pageTo;c++){var p,d=l[c],u={},f=[],g={},b=[];if(u=r(this.options,this.options.rowStyle,[d,c],u),u&&u.css)for(p in u.css)f.push(p+": "+u.css[p]);if(g=r(this.options,this.options.rowAttributes,[d,c],g))for(p in g)b.push(o('%s="%s"',p,h(g[p])));a.push("<tr",o(" %s",b.join(" ")),o(' id="%s"',t.isArray(d)?void 0:d._id),o(' class="%s"',u.classes||(t.isArray(d)?void 0:d._class)),o(' data-index="%s"',c),o(' data-unique-id="%s"',d[this.options.uniqueId]),">"),this.options.cardView&&a.push(o('<td colspan="%s">',this.header.fields.length)),t.each(this.header.fields,function(i,h){var l="",p=d[h],g="",b={},m="",y=e.header.classes[i],v="",w=e.options.columns[n(e.options.columns,h)];if(u=o('style="%s"',f.concat(e.header.styles[i]).join("; ")),p=r(e.header,e.header.formatters[i],[p,d,c],p),d["_"+h+"_id"]&&(m=o(' id="%s"',d["_"+h+"_id"])),d["_"+h+"_class"]&&(y=o(' class="%s"',d["_"+h+"_class"])),b=r(e.header,e.header.cellStyles[i],[p,d,c],b),b.classes&&(y=o(' class="%s"',b.classes)),b.css){var $=[];for(var k in b.css)$.push(k+": "+b.css[k]);u=o('style="%s"',$.concat(e.header.styles[i]).join("; "))}if(d["_"+h+"_data"]&&!t.isEmptyObject(d["_"+h+"_data"])&&t.each(d["_"+h+"_data"],function(t,i){"index"!==t&&(v+=o(' data-%s="%s"',t,i))}),w.checkbox||w.radio)g=w.checkbox?"checkbox":g,g=w.radio?"radio":g,l=[e.options.cardView?'<div class="card-view">':'<td class="bs-checkbox">',"<input"+o(' data-index="%s"',c)+o(' name="%s"',e.options.selectItemName)+o(' type="%s"',g)+o(' value="%s"',d[e.options.idField])+o(' checked="%s"',p===!0||p&&p.checked?"checked":void 0)+o(' disabled="%s"',!w.checkboxEnabled||p&&p.disabled?"disabled":void 0)+" />",e.options.cardView?"</div>":"</td>"].join("");else{if(p="undefined"==typeof p||null===p?e.options.undefinedText:p,l=e.options.cardView?['<div class="card-view">',e.options.showHeader?o('<span class="title" %s>%s</span>',u,s(e.options.columns,"field","title",h)):"",o('<span class="value">%s</span>',p),"</div>"].join(""):[o("<td%s %s %s %s>",m,y,u,v),p,"</td>"].join(""),void 0!==w.filterControl&&"select"===w.filterControl.toLowerCase()&&w.searchable){var S,x=t("."+w.field),P=0,C=!1;if(void 0!==x)if(S=x.get(0).options,0===S.length)x.append(t("<option></option>").attr("value","").text("")),x.append(t("<option></option>").attr("value",p).text(p));else{for(;P<S.length;P++)if(S[P].value===p){C=!0;break}C||x.append(t("<option></option>").attr("value",p).text(p))}}e.options.cardView&&e.options.smartDisplay&&""===p&&(l="")}a.push(l)}),this.options.cardView&&a.push("</td>"),a.push("</tr>")}a.length||a.push('<tr class="no-records-found">',o('<td colspan="%s">%s</td>',this.header.fields.length,this.options.formatNoMatches()),"</tr>"),this.$body.html(a.join("")),i||this.scrollTo(0),this.$body.find("> tr > td").off("click").on("click",function(){var i=t(this).parent();e.trigger("click-row",e.data[i.data("index")],i),e.options.clickToSelect&&e.header.clickToSelects[i.children().index(t(this))]&&i.find(o('[name="%s"]',e.options.selectItemName))[0].click()}),this.$body.find("tr").off("dblclick").on("dblclick",function(){e.trigger("dbl-click-row",e.data[t(this).data("index")],t(this))}),this.$selectItem=this.$body.find(o('[name="%s"]',this.options.selectItemName)),this.$selectItem.off("click").on("click",function(i){i.stopImmediatePropagation();var o=t(this).prop("checked"),s=e.data[t(this).data("index")];s[e.header.stateField]=o,e.trigger(o?"check":"uncheck",s),e.options.singleSelect&&(e.$selectItem.not(this).each(function(){e.data[t(this).data("index")][e.header.stateField]=!1}),e.$selectItem.filter(":checked").not(this).prop("checked",!1)),e.updateSelected()}),t.each(this.header.events,function(i,o){if(o){"string"==typeof o&&(o=r(null,o));for(var s in o)e.$body.find("tr").each(function(){var n=t(this),a=n.find(e.options.cardView?".card-view":"td").eq(i),r=s.indexOf(" "),h=s.substring(0,r),l=s.substring(r+1),c=o[s];a.find(l).off(h).on(h,function(t){var o=n.data("index"),s=e.data[o],a=s[e.header.fields[i]];c.apply(this,[t,a,s,o])})})}}),this.updateSelected(),this.resetView(),this.trigger("post-body")},l.prototype.initServer=function(i,e){var o=this,s={},n={pageSize:this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize,pageNumber:this.options.pageNumber,searchText:this.searchText,sortName:this.options.sortName,sortOrder:this.options.sortOrder};this.options.url&&("limit"===this.options.queryParamsType&&(n={search:n.searchText,sort:n.sortName,order:n.sortOrder},this.options.pagination&&(n.limit=this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize,n.offset=this.options.pageSize===this.options.formatAllRows()?0:this.options.pageSize*(this.options.pageNumber-1))),t.isEmptyObject(this.filterColumnsPartial)||(n.filter=JSON.stringify(this.filterColumnsPartial,null)),s=r(this.options,this.options.queryParams,[n],s),t.extend(s,e||{}),s!==!1&&(i||this.$loading.show(),t.ajax(t.extend({},r(null,this.options.ajaxOptions),{type:this.options.method,url:this.options.url,data:"application/json"===this.options.contentType&&"post"===this.options.method?JSON.stringify(s):s,cache:this.options.cache,contentType:this.options.contentType,dataType:this.options.dataType,success:function(t){t=r(o.options,o.options.responseHandler,[t],t),o.load(t),o.trigger("load-success",t)},error:function(t){o.trigger("load-error",t.status)},complete:function(){i||o.$loading.hide()}}))))},l.prototype.initKeyEvents=function(){if(this.options.keyEvents){var i=this;t(document).off("keypress").on("keypress",function(t){var e=i.$toolbar.find(".search input"),o=i.$toolbar.find('button[name="refresh"]'),s=i.$toolbar.find('button[name="toggle"]'),n=i.$toolbar.find('button[name="paginationSwitch"]');switch(t.keyCode){case 115:case 83:if(!i.options.search)return;return document.activeElement===e.get(0)?!0:(e.focus(),!1);case 114:case 82:if(!i.options.showRefresh)return;return document.activeElement===e.get(0)?!0:(o.click(),!1);case 116:case 84:if(!i.options.showToggle)return;return document.activeElement===e.get(0)?!0:(s.click(),!1);case 112:case 80:if(!i.options.showPaginationSwitch)return;return document.activeElement===e.get(0)?!0:(n.click(),!1)}})}},l.prototype.getCaretHtml=function(){return['<span class="order'+("desc"===this.options.sortOrder?"":" dropup")+'">','<span class="caret" style="margin: 10px 5px;"></span>',"</span>"].join("")},l.prototype.updateSelected=function(){var i=this.$selectItem.filter(":enabled").length===this.$selectItem.filter(":enabled").filter(":checked").length;this.$selectAll.add(this.$selectAll_).prop("checked",i),this.$selectItem.each(function(){t(this).parents("tr")[t(this).prop("checked")?"addClass":"removeClass"]("selected")})},l.prototype.updateRows=function(i){var e=this;this.$selectItem.each(function(){e.data[t(this).data("index")][e.header.stateField]=i})},l.prototype.resetRows=function(){var i=this;t.each(this.data,function(t,e){i.$selectAll.prop("checked",!1),i.$selectItem.prop("checked",!1),e[i.header.stateField]=!1})},l.prototype.trigger=function(i){var e=Array.prototype.slice.call(arguments,1);i+=".bs.table",this.options[l.EVENTS[i]].apply(this.options,e),this.$el.trigger(t.Event(i),e),this.options.onAll(i,e),this.$el.trigger(t.Event("all.bs.table"),[i,e])},l.prototype.resetHeader=function(){this.$el.css("margin-top",-this.$header.height()),clearTimeout(this.timeoutId_),this.timeoutId_=setTimeout(t.proxy(this.fitHeader,this),this.$el.is(":hidden")?100:0)},l.prototype.fitHeader=function(){var i,e,o,s=this;return s.$el.is(":hidden")?void(s.timeoutFooter_=setTimeout(t.proxy(s.fitHeader,s),100)):(i=s.$container.find(".fixed-table-header"),e=s.$container.find(".fixed-table-body"),o=s.$el.width()>e.width()?a():0,s.$header_=s.$header.clone(!0,!0),s.$selectAll_=s.$header_.find('[name="btSelectAll"]'),i.css({"margin-right":o}).find("table").css("width",s.$el.css("width")).html("").attr("class",s.$el.attr("class")).append(s.$header_),s.$header.find("th").each(function(i){s.$header_.find("th").eq(i).data(t(this).data())}),s.$body.find("tr:first-child:not(.no-records-found) > *").each(function(i){s.$header_.find("div.fht-cell").eq(i).width(t(this).innerWidth())}),e.off("scroll").on("scroll",function(){i.scrollLeft(t(this).scrollLeft())}),void s.trigger("post-header"))},l.prototype.resetFooter=function(){var i=this,e=i.getData(),s=[];this.options.showFooter&&!this.options.cardView&&(t.each(this.options.columns,function(t,n){var a="",h="",l=o(' class="%s"',n["class"]);n.visible&&(!i.options.cardView||n.cardVisible)&&(a=o("text-align: %s; ",n.falign?n.falign:n.align),h=o("vertical-align: %s; ",n.valign),s.push("<td",l,o(' style="%s"',a+h),">"),s.push(r(n,n.footerFormatter,[e],"&nbsp;")||"&nbsp;"),s.push("</td>"))}),this.$footer.find("tr").html(s.join("")),clearTimeout(this.timeoutFooter_),this.timeoutFooter_=setTimeout(t.proxy(this.fitFooter,this),this.$el.is(":hidden")?100:0))},l.prototype.fitFooter=function(){var i,e,o,s;return clearTimeout(this.timeoutFooter_),this.$el.is(":hidden")?void(this.timeoutFooter_=setTimeout(t.proxy(this.fitFooter,this),100)):(i=this.$container.find(".fixed-table-body"),o=this.$el.css("width"),s=o>i.width()?a():0,this.$footer.css({"margin-right":s}).find("table").css("width",o).attr("class",this.$el.attr("class")),e=this.$footer.find("td"),void i.find("tbody tr:first-child:not(.no-records-found) > td").each(function(i){e.eq(i).outerWidth(t(this).outerWidth())}))},l.prototype.toggleColumn=function(t,i,e){if(-1!==t&&(this.options.columns[t].visible=i,this.initHeader(),this.initSearch(),this.initPagination(),this.initBody(),this.options.showColumns)){var s=this.$toolbar.find(".keep-open input").prop("disabled",!1);e&&s.filter(o('[value="%s"]',t)).prop("checked",i),s.filter(":checked").length<=this.options.minimumCountColumns&&s.filter(":checked").prop("disabled",!0)}},l.prototype.toggleRow=function(i,e,s){-1!==i&&t(this.$body[0]).children().filter(o(e?'[value="%s"]':'[data-index="%s"]',i))[s?"show":"hide"]()},l.prototype.resetView=function(t){var e=this,o=0,s=e.$container.find(".fixed-table-container");if(t&&t.height&&(this.options.height=t.height),this.$selectAll.prop("checked",this.$selectItem.length>0&&this.$selectItem.length===this.$selectItem.filter(":checked").length),this.options.height){var n=+this.$toolbar.children().outerHeight(!0),a=+this.$pagination.children().outerHeight(!0),r=this.options.height-n-a;
s.css("height",r+"px")}return this.options.cardView?(e.$el.css("margin-top","0"),void s.css("padding-bottom","0")):(this.options.showHeader&&this.options.height?(this.$container.find(".fixed-table-header").show(),this.resetHeader(),o+=i):(this.$container.find(".fixed-table-header").hide(),this.trigger("post-header")),this.options.showFooter&&(this.resetFooter(),this.options.height&&(o+=i)),void s.css("padding-bottom",o+"px"))},l.prototype.getData=function(){return!this.searchText&&t.isEmptyObject(this.filterColumns)&&t.isEmptyObject(this.filterColumnsPartial)?this.options.data:this.data},l.prototype.load=function(i){var e=!1;"server"===this.options.sidePagination?(this.options.totalRows=i.total,e=i.fixedScroll,i=i.rows):t.isArray(i)||(e=i.fixedScroll,i=i.data),this.initData(i),this.initSearch(),this.initPagination(),this.initBody(e)},l.prototype.append=function(t){this.initData(t,"append"),this.initSearch(),this.initPagination(),this.initBody(!0)},l.prototype.prepend=function(t){this.initData(t,"prepend"),this.initSearch(),this.initPagination(),this.initBody(!0)},l.prototype.remove=function(i){var e,o,s=this.options.data.length;if(i.hasOwnProperty("field")&&i.hasOwnProperty("values")){for(e=s-1;e>=0;e--)o=this.options.data[e],o.hasOwnProperty(i.field)&&-1!==t.inArray(o[i.field],i.values)&&this.options.data.splice(e,1);s!==this.options.data.length&&(this.initSearch(),this.initPagination(),this.initBody(!0))}},l.prototype.insertRow=function(t){t.hasOwnProperty("index")&&t.hasOwnProperty("row")&&(this.data.splice(t.index,0,t.row),this.initSearch(),this.initPagination(),this.initBody(!0))},l.prototype.updateRow=function(i){i.hasOwnProperty("index")&&i.hasOwnProperty("row")&&(t.extend(this.data[i.index],i.row),this.initBody(!0))},l.prototype.showRow=function(t){t.hasOwnProperty("index")&&this.toggleRow(t.index,void 0===t.isIdField?!1:!0,!0)},l.prototype.hideRow=function(t){t.hasOwnProperty("index")&&this.toggleRow(t.index,void 0===t.isIdField?!1:!0,!1)},l.prototype.getRowsHidden=function(i){var e=t(this.$body[0]).children().filter(":hidden"),o=0;if(i)for(;o<e.length;o++)t(e[o]).show();return e},l.prototype.mergeCells=function(i){var e,o,s=i.index,n=t.inArray(i.field,this.header.fields),a=i.rowspan||1,r=i.colspan||1,h=this.$body.find("tr"),l=h.eq(s).find("td").eq(n);if(!(0>s||0>n||s>=this.data.length)){for(e=s;s+a>e;e++)for(o=n;n+r>o;o++)h.eq(e).find("td").eq(o).hide();l.attr("rowspan",a).attr("colspan",r).show()}},l.prototype.getOptions=function(){return this.options},l.prototype.getSelections=function(){var i=this;return t.grep(this.data,function(t){return t[i.header.stateField]})},l.prototype.checkAll=function(){this.checkAll_(!0)},l.prototype.uncheckAll=function(){this.checkAll_(!1)},l.prototype.checkAll_=function(t){var i;t||(i=this.getSelections()),this.$selectItem.filter(":enabled").prop("checked",t),this.updateRows(t),this.updateSelected(),t&&(i=this.getSelections()),this.trigger(t?"check-all":"uncheck-all",i)},l.prototype.check=function(t){this.check_(!0,t)},l.prototype.uncheck=function(t){this.check_(!1,t)},l.prototype.check_=function(t,i){this.$selectItem.filter(o('[data-index="%s"]',i)).prop("checked",t),this.data[i][this.header.stateField]=t,this.updateSelected(),this.trigger(t?"check":"uncheck",this.data[i])},l.prototype.checkBy=function(t){this.checkBy_(!0,t)},l.prototype.uncheckBy=function(t){this.checkBy_(!1,t)},l.prototype.checkBy_=function(i,e){if(e.hasOwnProperty("field")&&e.hasOwnProperty("values")){var s=this;t.each(this.options.data,function(n,a){return a.hasOwnProperty(e.field)?void(-1!==t.inArray(a[e.field],e.values)&&(s.$selectItem.filter(o('[data-index="%s"]',n)).prop("checked",i),a[s.header.stateField]=i,s.trigger(i?"check":"uncheck",a))):!1}),this.updateSelected()}},l.prototype.destroy=function(){this.$el.insertBefore(this.$container),t(this.options.toolbar).insertBefore(this.$el),this.$container.next().remove(),this.$container.remove(),this.$el.html(this.$el_.html()).css("margin-top","0").attr("class",this.$el_.attr("class")||"")},l.prototype.showLoading=function(){this.$loading.show()},l.prototype.hideLoading=function(){this.$loading.hide()},l.prototype.togglePagination=function(){this.options.pagination=!this.options.pagination;var t=this.$toolbar.find('button[name="paginationSwitch"] i');this.options.pagination?t.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchDown):t.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchUp),this.updatePagination()},l.prototype.refresh=function(t){t&&t.url&&(this.options.url=t.url,this.options.pageNumber=1),this.initServer(t&&t.silent,t&&t.query)},l.prototype.showColumn=function(t){this.toggleColumn(n(this.options.columns,t),!0,!0)},l.prototype.hideColumn=function(t){this.toggleColumn(n(this.options.columns,t),!1,!0)},l.prototype.filterBy=function(i){this.filterColumns=t.isEmptyObject(i)?{}:i,this.options.pageNumber=1,this.initSearch(),this.updatePagination()},l.prototype.scrollTo=function(t){var i=this.$container.find(".fixed-table-body");"string"==typeof t&&(t="bottom"===t?i[0].scrollHeight:0),"number"==typeof t&&i.scrollTop(t)},l.prototype.selectPage=function(t){t>0&&t<=this.options.totalPages&&(this.options.pageNumber=t,this.updatePagination())},l.prototype.prevPage=function(){this.options.pageNumber>1&&(this.options.pageNumber--,this.updatePagination())},l.prototype.nextPage=function(){this.options.pageNumber<this.options.totalPages&&(this.options.pageNumber++,this.updatePagination())},l.prototype.toggleView=function(){this.options.cardView=!this.options.cardView,this.initHeader(),this.initBody()};var c=["getOptions","getSelections","getData","load","append","prepend","remove","insertRow","updateRow","showRow","hideRow","getRowsHidden","mergeCells","checkAll","uncheckAll","check","uncheck","checkBy","uncheckBy","refresh","resetView","destroy","showLoading","hideLoading","showColumn","hideColumn","filterBy","scrollTo","selectPage","prevPage","nextPage","togglePagination","toggleView"];t.fn.bootstrapTable=function(i,e){var o;return this.each(function(){var s=t(this),n=s.data("bootstrap.table"),a=t.extend({},l.DEFAULTS,s.data(),"object"==typeof i&&i);if("string"==typeof i){if(t.inArray(i,c)<0)throw"Unknown method: "+i;if(!n)return;o=n[i](e),"destroy"===i&&s.removeData("bootstrap.table")}n||s.data("bootstrap.table",n=new l(this,a))}),"undefined"==typeof o?this:o},t.fn.bootstrapTable.Constructor=l,t.fn.bootstrapTable.defaults=l.DEFAULTS,t.fn.bootstrapTable.columnDefaults=l.COLUMN_DEFAULTS,t.fn.bootstrapTable.locales=l.LOCALES,t.fn.bootstrapTable.methods=c,t(function(){t('[data-toggle="table"]').bootstrapTable()})}(jQuery);