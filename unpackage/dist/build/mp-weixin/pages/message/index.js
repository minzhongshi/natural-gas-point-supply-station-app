"use strict";const e=require("../../common/vendor.js"),s=require("../../uni_modules/u-ajax/js_sdk/index.js"),a=require("../../api/user/device.js"),t=require("../../stores/counter.js");require("../../uni_modules/u-ajax/js_sdk/lib/core/Ajax.js"),require("../../uni_modules/u-ajax/js_sdk/lib/core/InterceptorManager.js"),require("../../uni_modules/u-ajax/js_sdk/lib/helpers/buildURL.js"),require("../../uni_modules/u-ajax/js_sdk/lib/utils.js"),require("../../uni_modules/u-ajax/js_sdk/lib/helpers/mergeConfig.js"),require("../../uni_modules/u-ajax/js_sdk/lib/core/dispatchRequest.js"),require("../../uni_modules/u-ajax/js_sdk/lib/helpers/isCallback.js"),require("../../uni_modules/u-ajax/js_sdk/lib/defaults.js"),require("../../uni_modules/u-ajax/js_sdk/lib/adapters/http.js"),require("../../uni_modules/u-ajax/js_sdk/lib/core/handleCancel.js"),require("../../uni_modules/u-ajax/js_sdk/lib/adapters/Fetcher.js");const r=t.userAccountStore(),i={data:()=>({messageData:[]}),onHide(){},onShow(){this.getMessage()},created(){this.getMessage(),t.userAccountStore()},methods:{messageGo(s){e.index.navigateTo({url:"/pages/message/details/details?data="+encodeURIComponent(JSON.stringify(s))})},getMessage(){s.ajax.post({url:a.API.DEVIE_MESSAGE,data:{id:r.information.id},header:{"Content-type":"application/x-www-form-urlencoded"}}).then((s=>{200===s.data.code?s.data.data!==[]&&(this.messageData=s.data.data):e.index.showToast({icon:"error",title:s.data.msg,duration:2e3})}))}}};if(!Array){e.resolveComponent("leruge-empty")()}Math;const u=e._export_sfc(i,[["render",function(s,a,t,r,i,u){return e.e({a:i.messageData.length>0},i.messageData.length>0?{b:e.f(i.messageData,((s,a,t)=>({a:e.t("系统"===s.name?"系统消息":"推送消息"),b:e.t(s.site),c:e.t(s.type),d:e.t(s.name),e:e.t(s.time),f:e.o((e=>u.messageGo(s)))})))}:{c:e.p({text:"暂无数据",type:"minus"})})}]]);wx.createPage(u);