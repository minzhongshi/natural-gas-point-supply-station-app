"use strict";const e=require("../../../../common/vendor.js"),t={name:"uni-stat-select",mixins:[e.Ds.mixinDatacom||{}],data:()=>({showSelector:!1,current:"",mixinDatacomResData:[],apps:[],channels:[]}),props:{localdata:{type:Array,default:()=>[]},value:{type:[String,Number],default:""},modelValue:{type:[String,Number],default:""},label:{type:String,default:""},placeholder:{type:String,default:"请选择"},emptyTips:{type:String,default:"无选项"},clear:{type:Boolean,default:!0},defItem:{type:Number,default:0},disabled:{type:Boolean,default:!1}},created(){this.last=`${this.collection}_last_selected_option_value`,this.collection&&!this.localdata.length&&this.mixinDatacomEasyGet()},computed:{typePlaceholder(){const e=this.placeholder,t={"opendb-stat-app-versions":"版本","opendb-app-channels":"渠道","opendb-app-list":"应用"}[this.collection];return t?e+t:e}},watch:{localdata:{immediate:!0,handler(e,t){Array.isArray(e)&&t!==e&&(this.mixinDatacomResData=e)}},modelValue(){this.initDefVal()},mixinDatacomResData:{immediate:!0,handler(e){e.length&&this.initDefVal()}}},methods:{initDefVal(){let t="";if(!this.value&&0!==this.value||this.isDisabled(this.value))if(!this.modelValue&&0!==this.modelValue||this.isDisabled(this.modelValue)){let a;if(this.collection&&(a=e.index.getStorageSync(this.last)),a||0===a)t=a;else{let e="";this.defItem>0&&this.defItem<this.mixinDatacomResData.length&&(e=this.mixinDatacomResData[this.defItem-1].value),t=e}this.emit(t)}else t=this.modelValue;else t=this.value;const a=this.mixinDatacomResData.find((e=>e.value===t));this.current=a?this.formatItemName(a):""},isDisabled(e){let t=!1;return this.mixinDatacomResData.forEach((a=>{a.value===e&&(t=a.disable)})),t},clearVal(){this.emit(""),this.collection&&e.index.removeStorageSync(this.last)},change(e){e.disable||(this.showSelector=!1,this.current=this.formatItemName(e),this.emit(e.value))},emit(t){this.$emit("change",t),this.$emit("input",t),this.$emit("update:modelValue",t),this.collection&&e.index.setStorageSync(this.last,t)},toggleSelector(){this.disabled||(this.showSelector=!this.showSelector)},formatItemName(e){let{text:t,value:a,channel_code:l}=e;return l=l?`(${l})`:"",this.collection.indexOf("app-list")>0?`${t}(${a})`:t||`未命名${l}`}}};if(!Array){e.resolveComponent("uni-icons")()}Math;const a=e._export_sfc(t,[["render",function(t,a,l,i,s,o){return e.e({a:l.label},l.label?{b:e.t(l.label+"：")}:{},{c:s.current},s.current?{d:e.t(s.current)}:{e:e.t(o.typePlaceholder)},{f:s.current&&l.clear},s.current&&l.clear?{g:e.o(o.clearVal),h:e.p({type:"clear",color:"#c0c4cc",size:"24"})}:{i:e.p({type:s.showSelector?"top":"bottom",size:"14",color:"#999"})},{j:e.o(((...e)=>o.toggleSelector&&o.toggleSelector(...e))),k:s.showSelector},s.showSelector?{l:e.o(((...e)=>o.toggleSelector&&o.toggleSelector(...e)))}:{},{m:s.showSelector},s.showSelector?e.e({n:0===s.mixinDatacomResData.length},0===s.mixinDatacomResData.length?{o:e.t(l.emptyTips)}:{p:e.f(s.mixinDatacomResData,((t,a,l)=>({a:e.t(o.formatItemName(t)),b:t.disable?1:"",c:a,d:e.o((e=>o.change(t)),a)})))}):{},{q:l.disabled?1:"",r:s.current?1:""})}]]);wx.createComponent(a);
