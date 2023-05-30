"use strict";const t=require("../../common/vendor.js"),n={name:"ranking-list",props:{content:{type:Array,default:()=>[]},isPC:{type:Boolean,default:!1},isRank:{type:Boolean,default:!1}},data:()=>({progressWidth:24,progressPadding:10,maxNumber:0,culCount:0,copyContent:[]}),watch:{content(t){this.init()}},methods:{init(){this.copyContent=this.deepClone(this.content),this.copyContent&&this.copyContent.length>0&&(this.isRank?(this.copyContent=this.copyContent.sort(((t,n)=>n.num-t.num)),this.maxNumber=this.copyContent[0].num):this.maxNumber=Math.max.apply(Math,this.copyContent.map((t=>t.num))),this.copyContent.map(((t,n)=>{t.width=this.computeWidth(this.maxNumber,t.num)})))},computeWidth:(t,n)=>(n/t*100).toFixed(2),deepClone(t){var n=new t.constructor;if(null===t)return t;if(t instanceof Date)return new Date(t);if(t instanceof RegExp)return new RegExp(t);if("object"!=typeof t)return t;for(var e in t)t.hasOwnProperty(e)&&(n[e]=this.deepClone(t[e]));return n}},mounted(){this.isPC&&(this.progressWidth=40,this.progressPadding=30),this.init()}};const e=t._export_sfc(n,[["render",function(n,e,o,i,s,r){return t.e({a:s.copyContent.length>0},s.copyContent.length>0?{b:t.f(s.copyContent,((n,e,o)=>({a:t.t(n.name),b:n.background,c:n.width+"%",d:t.t(n.num),e:e}))),c:s.progressWidth+"rpx",d:s.progressPadding+"rpx"}:{})}],["__scopeId","data-v-243588d9"]]);wx.createComponent(e);
