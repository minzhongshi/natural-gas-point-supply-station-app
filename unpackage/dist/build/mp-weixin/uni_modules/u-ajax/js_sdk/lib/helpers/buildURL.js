"use strict";const e=require("../utils.js");function r(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function t(t,n){let c;const i=[];if(e.forEach(n,((t,n)=>{null!=t&&(e.isArray(t)?n+="[]":t=[t],e.forEach(t,(e=>{null!==e&&"object"==typeof e&&(e=JSON.stringify(e)),i.push(r(n)+"="+r(e))})))})),c=i.join("&"),c){const e=t.indexOf("#");-1!==e&&(t=t.slice(0,e)),t+=(-1===t.indexOf("?")?"?":"&")+c}return t}exports.buildURL=function({baseURL:n,url:c,params:i,query:l}={}){let o=function(e="",r=""){return/^https?:\/\//.test(r)?r:r?e.replace(/\/+$/,"")+"/"+r.replace(/^\/+/,""):e}(n,c);return i||l?(i&&(/\/:/.test(o)?e.forEach(i,((e,t)=>{o=o.replace(`/:${t}`,`/${r(String(e))}`)})):l||(o=t(o,i))),l&&(o=t(o,l)),o):o};
