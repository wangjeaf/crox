/*!build time : 2014-01-24 10:23:12 AM*/
KISSY.add("gallery/crox/1.0/index",function(){var Crox=function(){function Class(a,b,c){function d(){}d.prototype=a.prototype;var e=new d;if(c)for(var f in c)e[f]=c[f];return b||(b=d),b.prototype=e,b}function Position(a,b){this.row=a,this.col=b}function getPos(a,b){var c=a.substring(0,b),d=/\r\n?|\n/g,e=c.match(d),f=1;e&&(f+=e.length);var g=1+/[^\r\n]*$/.exec(c)[0].length;return new Position(f,g)}function Enum(a){for(var b={},c=0;c<a.length;++c)b[a[c]]=a[c];return b}function inArr(a,b){for(var c=0;c<a.length;++c)if(a[c]==b)return c;return-1}function inArr_strict(a,b){for(var c=0;c<a.length;++c)if(a[c]===b)return c;return-1}function nodup(a,b){b||(b=function(a,b){return a===b});for(var c=[],d=a.length,e=0;d>e;e++){for(var f=e+1;d>f;f++)b(a[e],a[f])&&(f=++e);c.push(a[e])}return c}function htmlEncode(a){return String(a).replace(/[&<>"]/g,function(a){switch(a){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";default:return"&quot;"}})}function quote(a){return'"'+a.replace(/[\x00-\x1f"\\\u2028\u2029]/g,function(a){switch(a){case'"':return'\\"';case"\\":return"\\\\";case"\b":return"\\b";case"\f":return"\\f";case"\n":return"\\n";case"\r":return"\\r";case"	":return"\\t"}return"\\u"+("000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"'}function phpQuote(a){return"'"+String(a).replace(/['\\]/g,"\\$&")+"'"}function createLexer(a){function b(a,b,c,d){this.tag=a,this.text=b,this.index=c,this.subMatches=d}function c(){}function d(a){for(var b=1,d=[],e=[1],f=[],g=0;g<a.length;++g)e.push(b+=RegExp("|"+a[g][0].source).exec("").length),f.push(a[g][1]||c),d.push("("+a[g][0].source+")");var h=RegExp(d.join("|")+"|","g");return[h,e,f]}function e(a){function c(){var c=h[h.length-1],j=g[c],k=j[0];k.lastIndex=e;var l=k.exec(a);if(""==l[0]){if(d>e)throw Error("lexer error: "+getPos(a,e)+"\n"+a.slice(e,e+50));return new b(f,"",e)}i.index=e,e=k.lastIndex;for(var m=j[1],n=0;n<m.length;++n)if(l[m[n]]){var o=j[2][n].apply(i,l.slice(m[n],m[n+1]));return new b(o,l[0],i.index,l.slice(m[n]+1,m[n+1]))}}var d=a.length,e=0,h=[""],i={text:"",index:0,source:a,pushState:function(a){h.push(a)},popState:function(){h.pop()},retract:function(a){e-=a}};return{scan:function(){do var a=c();while(null==a.tag);return a},getPos:function(b){return getPos(a,b)},reset:function(){e=0,h=[""]}}}b.prototype.toString=function(){return this.text};var f=a.$||"$",g={};for(var h in a)"$"!=h.charAt(0)&&(g[h]=d(a[h]));return e}function isAtom(a){switch(a){case"id":case"lit":return!0}return!1}function isMember(a){return isAtom(a)||"."==a||"[]"==a}function isUnary(a){return isMember(a)||"!"==a||"u-"==a}function isMul(a){if(isUnary(a))return!0;switch(a){case"*":case"/":case"%":return!0}return!1}function isAdd(a){if(isMul(a))return!0;switch(a){case"+":case"-":return!0}return!1}function isRel(a){if(isAdd(a))return!0;switch(a){case"<":case">":case"<=":case">=":return!0}return!1}function isEquality(a){if(isRel(a))return!0;switch(a){case"eq":case"ne":return!0}return!1}function isLogicalAnd(a){return isEquality(a)||"&&"==a}function isLogicalOr(a){return isLogicalAnd(a)||"||"==a}function codegen_js_tran(a){function b(){i+="	"}function c(){i=i.slice(0,-1)}function d(a){j+=i+a+"\n"}function e(a){switch(a[0]){case"if":d("if("+h(a[1])+"){"),b(),f(a[2]),c(),d("}"),a[3]&&(d("else{"),b(),f(a[3]),c(),d("}"));break;case"each":var e=a[3]||"$i";d("var $list = "+h(a[1])+";"),d("for(var "+e+" in $list) {"),b(),d("var "+a[4]+" = $list["+e+"];"),f(a[2]),c(),d("}");break;case"set":d("var "+a[1]+"="+h(a[2])+";");break;case"eval":var g=h(a[1]);a[2]&&(g="$htmlEncode("+g+")"),d("$print("+g+");");break;case"text":d("$print("+quote(a[1])+");");break;default:throw Error("unknown stmt: "+a[0])}}function f(a){for(var b=0;b<a.length;++b)e(a[b])}function g(a,b){var c=h(a);return b&&!b(a[0])&&(c="("+c+")"),c}function h(a){switch(a[0]){case"id":return a[1];case"lit":return"string"==typeof a[1]?quote(a[1]):String(a[1]);case".":return g(a[1],isMember)+"."+a[2];case"[]":return g(a[1],isMember)+"["+h(a[2])+"]";case"!":return"!"+g(a[1],isUnary);case"u-":return"- "+g(a[1],isUnary);case"*":case"/":case"%":return g(a[1],isMul)+a[0]+g(a[2],isUnary);case"+":case"-":return g(a[1],isAdd)+a[0]+" "+g(a[2],isMul);case"<":case">":case"<=":case">=":return g(a[1],isRel)+a[0]+g(a[2],isAdd);case"eq":case"ne":return g(a[1],isEquality)+("eq"==a[0]?"===":"!==")+g(a[2],isRel);case"&&":return g(a[1],isLogicalAnd)+"&&"+g(a[2],isEquality);case"||":return g(a[1],isLogicalOr)+"||"+g(a[2],isLogicalAnd);default:throw Error("unknown expr: "+a[0])}}var i="	",j="";return f(a[1]),j}function codegen_js_wrap(a){var b="var obj = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '\"': '&quot;' };\n    function $htmlEncode(s) {\n        return String(s).replace(/[<>&\"]/g, function(c) {\n            return obj[c];\n        });\n    }";b+="var $s = '';",b+="function $print(s){ $s += s; }",b+=a,b+="return $s;";var c=Function("root",b);return c}function codegen_js_tofn(a){var b=codegen_js_tran(a),c=codegen_js_wrap(b);return c}function compile2jsfn(a){return codegen_js_tofn(parse(Lexer(a)))}Position.prototype.toString=function(){return"("+this.row+","+this.col+")"};var Lexer=function(){function a(a){return-1!=" abstract boolean break byte case catch char class const continue debugger default delete do double else enum export extends final finally float for function goto if implements import in instanceof int interface let long native new package private protected public return short static super switch synchronized this throw throws transient try typeof var void volatile while with yield ".indexOf(" "+a+" ")}var b=/[A-Za-z_]\w*/,c=/"(?:[^"\\]|\\[\s\S])*"|'(?:[^'\\]|\\[\s\S])*'/,d=/\d+(?:\.\d+)?(?:e-?\d+)?/,e=[[/\s+/,function(){return"ws"}],[b,function(b){switch(b){case"true":case"false":return"boolean";case"set":return b;default:if(a(b)||"null"==b)throw Error("Reserved: "+b+" "+getPos(this.source,this.index));return"realId"}}],[c,function(){return"string"}],[d,function(){return"number"}],[function(a){a.sort().reverse();for(var b=0;b<a.length;++b)a[b]=a[b].replace(/[()*+?.[\]|]/g,"\\$&");return RegExp(a.join("|"))}(["!","%","&&","(",")","*","+","-",".","/","<","<=","=",">",">=","[","]","||","===","!=="]),function(a){switch(a){case"===":return"eq";case"!==":return"ne";default:return a}}]],f=createLexer({"":[[/(?:(?!{{)[\s\S])+/,function(a){return"{{"==a.substring(0,2)?(this.pushState(a),a):"text"}],[/{{{/,function(a){return this.pushState(a),a}],[/{{(?:\/if|else|\/each)}}/,function(a){return a}],[/{{(?:#(?:if|each)(?=\s))?/,function(a){return this.pushState("{{"),a}]],"{{":e.concat([[/}}/,function(a){return this.popState(),a}]]),"{{{":e.concat([[/}}}/,function(a){return this.popState(),a}]])});return f}(),parse=function(){function $f0($1,$2,$3,$4,$5,$6,$7){var $$;return $$=["each",$2,$6,$4&&eval($4.text),eval($3.text)]}function $f1($1){var $$;return $$=["lit",eval($1.text)]}function $f2(a,b,c){var d;return d=[b.text,a,c]}function getAction(a,b){var c=tAction[actionIndex[a]];return c[b]||c._}for(var nBegin=36,tSymbols=["$","!","%","&&","(",")","*","+","-",".","/","<","<=","=",">",">=","[","]","boolean","eq","ne","number","realId","set","string","text","{{","{{#each","{{#if","{{/each}}","{{/if}}","{{else}}","{{{","||","}}","}}}","AdditiveExpression","EqualityExpression","LogicalAndExpression","LogicalOrExpression","MemberExpression","MultiplicativeExpression","PrimaryExpression","RelationalExpression","UnaryExpression","epsilon","expr","id","program","statement","statements"],tSymbolIndex={},i=0;i<tSymbols.length;++i)tSymbolIndex[tSymbols[i]]=i;var tAction=[{_:-2},{_:-32768},{25:3,26:4,27:5,28:6,32:7,_:-1},{_:-11},{1:9,4:10,8:11,18:12,21:13,22:14,23:15,24:16,_:0},{1:9,4:10,8:11,18:12,21:13,22:14,23:28,24:16,_:0},{_:-3},{_:-16},{_:-15},{_:-12},{22:14,23:28,_:-13},{_:-14},{7:36,8:37,_:-32},{19:38,20:39,_:-40},{3:40,_:-42},{33:41,_:-44},{9:42,16:43,_:-22},{2:44,6:45,10:46,_:-29},{_:-19},{11:47,12:48,14:49,15:50,_:-37},{_:-25},{34:51,_:0},{_:-17},{_:-13},{24:52,_:0},{34:53,_:0},{35:54,_:0},{_:-23},{5:55,_:0},{_:-24},{13:56,_:0},{22:14,23:28,_:0},{_:-9},{24:72,_:-45},{_:-10},{_:-18},{2:44,6:45,10:46,_:-30},{2:44,6:45,10:46,_:-31},{11:47,12:48,14:49,15:50,_:-38},{11:47,12:48,14:49,15:50,_:-39},{19:38,20:39,_:-41},{3:40,_:-43},{_:-20},{17:76,_:0},{_:-28},{_:-26},{_:-27},{7:36,8:37,_:-33},{7:36,8:37,_:-35},{7:36,8:37,_:-34},{7:36,8:37,_:-36},{34:77,_:0},{34:78,_:0},{25:3,26:4,27:5,28:6,30:79,31:80,32:7,_:0},{34:81,_:0},{_:-21},{_:-4},{_:-8},{25:3,26:4,27:5,28:6,29:85,32:7,_:0},{25:3,26:4,27:5,28:6,29:86,32:7,_:0},{25:3,26:4,27:5,28:6,30:87,32:7,_:0},{_:-7},{_:-6},{_:-5}],actionIndex=[0,1,2,3,4,5,5,5,6,5,5,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,5,5,5,5,5,5,31,5,5,5,5,5,5,5,5,32,33,0,34,35,5,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,0,0,56,0,57,58,59,60,61,62,63],tGoto=[{12:1,14:2},,{13:8},,{0:17,1:18,2:19,3:20,4:21,5:22,6:23,7:24,8:25,10:26,11:27},{0:17,1:18,2:19,3:20,4:21,5:22,6:23,7:24,8:25,10:29,11:27},{0:17,1:18,2:19,3:20,4:21,5:22,6:23,7:24,8:25,10:30,11:27},{0:17,1:18,2:19,3:20,4:21,5:22,6:23,7:24,8:25,10:31,11:27},,{4:21,6:23,8:32,11:27},{0:17,1:18,2:19,3:20,4:21,5:22,6:23,7:24,8:25,10:33,11:27},{4:21,6:23,8:34,11:27},,,,{11:35},,,,,,,,,,,,,,,,,,,,,{4:21,5:57,6:23,8:25,11:27},{4:21,5:58,6:23,8:25,11:27},{0:17,4:21,5:22,6:23,7:59,8:25,11:27},{0:17,4:21,5:22,6:23,7:60,8:25,11:27},{0:17,1:61,4:21,5:22,6:23,7:24,8:25,11:27},{0:17,1:18,2:62,4:21,5:22,6:23,7:24,8:25,11:27},{11:63},{0:17,1:18,2:19,3:20,4:21,5:22,6:23,7:24,8:25,10:64,11:27},{4:21,6:23,8:65,11:27},{4:21,6:23,8:66,11:27},{4:21,6:23,8:67,11:27},{0:68,4:21,5:22,6:23,8:25,11:27},{0:69,4:21,5:22,6:23,8:25,11:27},{0:70,4:21,5:22,6:23,8:25,11:27},{0:71,4:21,5:22,6:23,8:25,11:27},,{9:73},{14:74},,,{0:17,1:18,2:19,3:20,4:21,5:22,6:23,7:24,8:25,10:75,11:27},,,,,,,,,,,,,,,,,,{13:8},,,{14:82},{14:83},,{14:84},,{13:8},{13:8},{13:8}],tRules=[[51,48],[48,50],[50],[50,50,49],[49,28,46,34,50,30],[49,28,46,34,50,31,50,30],[49,27,46,24,45,34,50,29],[49,27,46,24,24,34,50,29],[49,26,23,47,13,46,34],[49,26,46,34],[49,32,46,35],[49,25],[47,22],[47,23],[42,24],[42,21],[42,18],[42,47],[42,4,46,5],[40,42],[40,40,9,47],[40,40,16,46,17],[44,40],[44,1,44],[44,8,44],[41,44],[41,41,6,44],[41,41,10,44],[41,41,2,44],[36,41],[36,36,7,41],[36,36,8,41],[43,36],[43,43,11,36],[43,43,14,36],[43,43,12,36],[43,43,15,36],[37,43],[37,37,19,43],[37,37,20,43],[38,37],[38,38,3,37],[39,38],[39,39,33,38],[46,39],[45]],tFuncs=[,function(a){var b;return b=["prog",a]},function(){var a;return a=[]},function(a,b){var c;return a.push(b),c=a},function(a,b,c,d){var e;return e=["if",b,d]},function(a,b,c,d,e,f){var g;return g=["if",b,d,f]},$f0,$f0,function(a,b,c,d,e){var f;return f=["set",c.text,e]},function(a,b){var c;return c=["eval",b,!0]},function(a,b){var c;return c=["eval",b,!1]},function(a){var b;return b=["text",a.text]},,,$f1,$f1,function(a){var b;return b=["lit","true"==a.text]},function(a){var b;return b=["id",a.text]},function(a,b){var c;return c=b},,function(a,b,c){var d;return d=[".",a,c.text]},function(a,b,c){var d;return d=["[]",a,c]},,function(a,b){var c;return c=["!",b]},function(a,b){var c;return c=["u-",b]},,$f2,$f2,$f2,,$f2,$f2,,$f2,$f2,$f2,$f2,,function(a,b,c){var d;return d=["eq",a,c]},function(a,b,c){var d;return d=["ne",a,c]},,$f2,,$f2];return function(a,b){function c(){var b=a.scan();return"ws"==b.tag&&(b=a.scan()),b}function d(){throw Error("Syntax error: "+a.getPos(g.index))}var e=0,f=[0],g=c(),h=[],i={get:function(a){return h[h.length+a]},set:function(a,b){h[h.length+a]=b}};if(b)for(var j in b)i[j]=b[j];for(;;){var k=getAction(e,tSymbolIndex[g.tag]);if(k)if(k>0)f.push(e=k),h.push(g),g=c();else{if(!(0>k&&k>-32768))return g.tag!=tSymbols[0]&&d(),h[0];var l=-k,m=tRules[l],n=m.length-1;if(f.length-=n,e=tGoto[f[f.length-1]][m[0]-nBegin],f.push(e),tFuncs[l]){var o=tFuncs[l].apply(i,h.splice(h.length-n,n));h.push(o)}else 1!=n&&h.splice(h.length-n,n,null)}else d()}}}(),Crox={compile:function(a){return compile2jsfn(a)},compileToStr:function(a){return codegen_js_tran(parse(Lexer(a)))},render:function(a,b){return compile2jsfn(a)(b)}};return Crox.version="1.1.0",Crox}();return Crox});