function fixEvent(a){a.preventDefault=fixEvent.preventDefault;a.stopPropagation=fixEvent.stopPropagation;return a}function handleEvent(a){var b=true;a=a||fixEvent(((this.ownerDocument||this.document||this).parentWindow||window).event);var c=this.events[a.type];for(var d in c){this.$$handleEvent=c[d];if(this.$$handleEvent(a)===false){b=false}}return b}function removeEvent(a,b,c){if(a.removeEventListener){a.removeEventListener(b,c,false)}else{if(a.events&&a.events[b]){delete a.events[b][c.$$guid]}}}function dean_addEvent(a,b,c){if(a.addEventListener){a.addEventListener(b,c,false)}else{if(!c.$$guid)c.$$guid=dean_addEvent.guid++;if(!a.events)a.events={};var d=a.events[b];if(!d){d=a.events[b]={};if(a["on"+b]){d[0]=a["on"+b]}}d[c.$$guid]=c;a["on"+b]=handleEvent}}var stIsIE=false;sorttable={init:function(){if(arguments.callee.done)return;arguments.callee.done=true;if(_timer)clearInterval(_timer);if(!document.createElement||!document.getElementsByTagName)return;sorttable.DATE_RE=/^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;forEach(document.getElementsByTagName("table"),function(a){if(a.className.search(/\bsortable\b/)!=-1){sorttable.makeSortable(a)}})},makeSortable:function(a){if(a.getElementsByTagName("thead").length==0){the=document.createElement("thead");the.appendChild(a.rows[0]);a.insertBefore(the,a.firstChild)}if(a.tHead==null)a.tHead=a.getElementsByTagName("thead")[0];if(a.tHead.rows.length!=1)return;sortbottomrows=[];for(var b=0;b<a.rows.length;b++){if(a.rows[b].className.search(/\bsortbottom\b/)!=-1){sortbottomrows[sortbottomrows.length]=a.rows[b]}}if(sortbottomrows){if(a.tFoot==null){tfo=document.createElement("tfoot");a.appendChild(tfo)}for(var b=0;b<sortbottomrows.length;b++){tfo.appendChild(sortbottomrows[b])}delete sortbottomrows}headrow=a.tHead.rows[0].cells;for(var b=0;b<headrow.length;b++){if(!headrow[b].className.match(/\bsorttable_nosort\b/)){mtch=headrow[b].className.match(/\bsorttable_([a-z0-9]+)\b/);if(mtch){override=mtch[1]}if(mtch&&typeof sorttable["sort_"+override]=="function"){headrow[b].sorttable_sortfunction=sorttable["sort_"+override]}else{headrow[b].sorttable_sortfunction=sorttable.guessType(a,b)}headrow[b].sorttable_columnindex=b;headrow[b].sorttable_tbody=a.tBodies[0];dean_addEvent(headrow[b],"click",function(a){if(this.className.search(/\bsorttable_sorted\b/)!=-1){sorttable.reverse(this.sorttable_tbody);this.className=this.className.replace("sorttable_sorted","sorttable_sorted_reverse");this.removeChild(document.getElementById("sorttable_sortfwdind"));sortrevind=document.createElement("span");sortrevind.id="sorttable_sortrevind";sortrevind.innerHTML=stIsIE?'&nbsp<font face="webdings">5</font>':" &#x25B4;";this.appendChild(sortrevind);return}if(this.className.search(/\bsorttable_sorted_reverse\b/)!=-1){sorttable.reverse(this.sorttable_tbody);this.className=this.className.replace("sorttable_sorted_reverse","sorttable_sorted");this.removeChild(document.getElementById("sorttable_sortrevind"));sortfwdind=document.createElement("span");sortfwdind.id="sorttable_sortfwdind";sortfwdind.innerHTML=stIsIE?'&nbsp<font face="webdings">6</font>':" &#x25BE;";this.appendChild(sortfwdind);return}theadrow=this.parentNode;forEach(theadrow.childNodes,function(a){if(a.nodeType==1){a.className=a.className.replace("sorttable_sorted_reverse","");a.className=a.className.replace("sorttable_sorted","")}});sortfwdind=document.getElementById("sorttable_sortfwdind");if(sortfwdind){sortfwdind.parentNode.removeChild(sortfwdind)}sortrevind=document.getElementById("sorttable_sortrevind");if(sortrevind){sortrevind.parentNode.removeChild(sortrevind)}this.className+=" sorttable_sorted";sortfwdind=document.createElement("span");sortfwdind.id="sorttable_sortfwdind";sortfwdind.innerHTML=stIsIE?'&nbsp<font face="webdings">6</font>':" &#x25BE;";this.appendChild(sortfwdind);row_array=[];col=this.sorttable_columnindex;rows=this.sorttable_tbody.rows;for(var b=0;b<rows.length;b++){row_array[row_array.length]=[sorttable.getInnerText(rows[b].cells[col]),rows[b]]}row_array.sort(this.sorttable_sortfunction);tb=this.sorttable_tbody;for(var b=0;b<row_array.length;b++){tb.appendChild(row_array[b][1])}delete row_array})}}},guessType:function(a,b){sortfn=sorttable.sort_alpha;for(var c=0;c<a.tBodies[0].rows.length;c++){text=sorttable.getInnerText(a.tBodies[0].rows[c].cells[b]);if(text!=""){if(text.match(/^-?[£$¤]?[\d,.]+%?$/)){return sorttable.sort_numeric}possdate=text.match(sorttable.DATE_RE);if(possdate){first=parseInt(possdate[1]);second=parseInt(possdate[2]);if(first>12){return sorttable.sort_ddmm}else if(second>12){return sorttable.sort_mmdd}else{sortfn=sorttable.sort_ddmm}}}}return sortfn},getInnerText:function(a){hasInputs=typeof a.getElementsByTagName=="function"&&a.getElementsByTagName("input").length;if(a.getAttribute("sorttable_customkey")!=null){return a.getAttribute("sorttable_customkey")}else if(typeof a.textContent!="undefined"&&!hasInputs){return a.textContent.replace(/^\s+|\s+$/g,"")}else if(typeof a.innerText!="undefined"&&!hasInputs){return a.innerText.replace(/^\s+|\s+$/g,"")}else if(typeof a.text!="undefined"&&!hasInputs){return a.text.replace(/^\s+|\s+$/g,"")}else{switch(a.nodeType){case 3:if(a.nodeName.toLowerCase()=="input"){return a.value.replace(/^\s+|\s+$/g,"")};case 4:return a.nodeValue.replace(/^\s+|\s+$/g,"");break;case 1:case 11:var b="";for(var c=0;c<a.childNodes.length;c++){b+=sorttable.getInnerText(a.childNodes[c])}return b.replace(/^\s+|\s+$/g,"");break;default:return""}}},reverse:function(a){newrows=[];for(var b=0;b<a.rows.length;b++){newrows[newrows.length]=a.rows[b]}for(var b=newrows.length-1;b>=0;b--){a.appendChild(newrows[b])}delete newrows},sort_numeric:function(a,b){aa=parseFloat(a[0].replace(/[^0-9.-]/g,""));if(isNaN(aa))aa=0;bb=parseFloat(b[0].replace(/[^0-9.-]/g,""));if(isNaN(bb))bb=0;return aa-bb},sort_alpha:function(a,b){if(a[0]==b[0])return 0;if(a[0]<b[0])return-1;return 1},sort_ddmm:function(a,b){mtch=a[0].match(sorttable.DATE_RE);y=mtch[3];m=mtch[2];d=mtch[1];if(m.length==1)m="0"+m;if(d.length==1)d="0"+d;dt1=y+m+d;mtch=b[0].match(sorttable.DATE_RE);y=mtch[3];m=mtch[2];d=mtch[1];if(m.length==1)m="0"+m;if(d.length==1)d="0"+d;dt2=y+m+d;if(dt1==dt2)return 0;if(dt1<dt2)return-1;return 1},sort_mmdd:function(a,b){mtch=a[0].match(sorttable.DATE_RE);y=mtch[3];d=mtch[2];m=mtch[1];if(m.length==1)m="0"+m;if(d.length==1)d="0"+d;dt1=y+m+d;mtch=b[0].match(sorttable.DATE_RE);y=mtch[3];d=mtch[2];m=mtch[1];if(m.length==1)m="0"+m;if(d.length==1)d="0"+d;dt2=y+m+d;if(dt1==dt2)return 0;if(dt1<dt2)return-1;return 1},shaker_sort:function(a,b){var c=0;var d=a.length-1;var e=true;while(e){e=false;for(var f=c;f<d;++f){if(b(a[f],a[f+1])>0){var g=a[f];a[f]=a[f+1];a[f+1]=g;e=true}}d--;if(!e)break;for(var f=d;f>c;--f){if(b(a[f],a[f-1])<0){var g=a[f];a[f]=a[f-1];a[f-1]=g;e=true}}c++}}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",sorttable.init,false)}if(/WebKit/i.test(navigator.userAgent)){var _timer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){sorttable.init()}},10)}window.onload=sorttable.init;dean_addEvent.guid=1;fixEvent.preventDefault=function(){this.returnValue=false};fixEvent.stopPropagation=function(){this.cancelBubble=true};if(!Array.forEach){Array.forEach=function(a,b,c){for(var d=0;d<a.length;d++){b.call(c,a[d],d,a)}}}Function.prototype.forEach=function(a,b,c){for(var d in a){if(typeof this.prototype[d]=="undefined"){b.call(c,a[d],d,a)}}};String.forEach=function(a,b,c){Array.forEach(a.split(""),function(d,e){b.call(c,d,e,a)})};var forEach=function(a,b,c){if(a){var d=Object;if(a instanceof Function){d=Function}else if(a.forEach instanceof Function){a.forEach(b,c);return}else if(typeof a=="string"){d=String}else if(typeof a.length=="number"){d=Array}d.forEach(a,b,c)}}