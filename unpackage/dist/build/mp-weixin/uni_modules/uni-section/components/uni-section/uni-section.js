"use strict";const t=require("../../../../common/vendor.js"),e={name:"UniSection",emits:["click"],props:{type:{type:String,default:""},title:{type:String,required:!0,default:""},bColor:{type:String,default:"#fff"},titleFontSize:{type:String,default:"14px"},titleColor:{type:String,default:"#333"},subTitle:{type:String,default:""},subTitleFontSize:{type:String,default:"12px"},subTitleColor:{type:String,default:"#999"},padding:{type:[Boolean,String],default:!1}},computed:{_padding(){return"string"==typeof this.padding?this.padding:this.padding?"10px":""}},watch:{title(e){t.index.report&&""!==e&&t.index.report("title",e)}},methods:{onClick(){this.$emit("click")}}};const i=t._export_sfc(e,[["render",function(e,i,n,l,o,r){return t.e({a:n.type},n.type?{b:t.n(n.type)}:{},{c:t.t(n.title),d:n.titleFontSize,e:n.titleColor,f:n.subTitle?"":1,g:n.subTitle},n.subTitle?{h:t.t(n.subTitle),i:n.subTitleFontSize,j:n.subTitleColor}:{},{k:t.o(((...t)=>r.onClick&&r.onClick(...t))),l:r._padding,m:n.bColor})}]]);wx.createComponent(i);
