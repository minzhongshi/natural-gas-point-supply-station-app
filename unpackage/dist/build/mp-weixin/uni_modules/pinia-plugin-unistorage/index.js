"use strict";const e=require("../../common/vendor.js");function t(e){return e}exports.createUnistorage=function(r={}){const{key:n=t}=r||{};return(null==r?void 0:r.key)&&delete r.key,function(t){{const{store:o,options:i}=t;let{unistorage:s}=i||{};if(!s)return;const{paths:u=null,afterRestore:l,beforeRestore:a,serializer:d={serialize:JSON.stringify,deserialize:JSON.parse},key:f=o.$id}=((e,t)=>{var r;return e="object"==typeof(r=e)&&null!==r?e:Object.create(null),new Proxy(e,{get:(e,r,n)=>Reflect.get(e,r,n)||Reflect.get(t,r,n)})})(s,r);null==a||a(t);const y=n(f);try{const t=e.index.getStorageSync(y);t&&o.$patch(d.deserialize(t))}catch(c){}null==l||l(t),o.$subscribe(((t,r)=>{try{const t=Array.isArray(u)?function(e,t){return t.reduce(((t,r)=>{const n=r.split(".");return function(e,t,r){return t.slice(0,-1).reduce(((e,t)=>/^(__proto__)$/.test(t)?{}:e[t]=e[t]||{}),e)[t[t.length-1]]=r,e}(t,n,function(e,t){return t.reduce(((e,t)=>null==e?void 0:e[t]),e)}(e,n))}),{})}(r,u):r;e.index.setStorageSync(y,d.serialize(t))}catch(c){}}),{detached:!0})}}};