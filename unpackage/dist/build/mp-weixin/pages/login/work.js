"use strict";const s=require("../../common/vendor.js"),e=require("../../stores/counter.js"),i=require("../../uni_modules/u-ajax/js_sdk/index.js"),o=require("../../api/user/index.js");require("../../uni_modules/u-ajax/js_sdk/lib/core/Ajax.js"),require("../../uni_modules/u-ajax/js_sdk/lib/core/InterceptorManager.js"),require("../../uni_modules/u-ajax/js_sdk/lib/helpers/buildURL.js"),require("../../uni_modules/u-ajax/js_sdk/lib/utils.js"),require("../../uni_modules/u-ajax/js_sdk/lib/helpers/mergeConfig.js"),require("../../uni_modules/u-ajax/js_sdk/lib/core/dispatchRequest.js"),require("../../uni_modules/u-ajax/js_sdk/lib/helpers/isCallback.js"),require("../../uni_modules/u-ajax/js_sdk/lib/defaults.js"),require("../../uni_modules/u-ajax/js_sdk/lib/adapters/http.js"),require("../../uni_modules/u-ajax/js_sdk/lib/core/handleCancel.js"),require("../../uni_modules/u-ajax/js_sdk/lib/adapters/Fetcher.js");const r={data:()=>({userLoginInfo:{id:"",password:"",role:"APP"},containerHeight:{focus:"height:800rpx;transition:0.2s",blur:"height:1300rpx;transition:0.2s"},animationData:{},userImg:"../../static/img/user.png",isClearing:!1,pdMaxLength:10,isuserFocus:!1,ispdFocus:!1,customStyle:{"padding-left":"40rpx",color:"transparent","text-shadow":"0 0 0 #000"},clearImg:"../../static/img/clear.png",label_style:{focus:"width:100rpx;display:flex;justify-content:center;color:#FF5242;font-weight:bold;transform:scale(1.1)",blur:"width:100rpx;display:flex;justify-content:center;color:#aaaaaa;transform:scale(1)"},input_boder_style:{focus:"border-bottom: 1px solid #FF5242;",blur:"border-bottom: 1px solid #e4e4e4;"},login_btn_style:{able:{width:"100%",height:"100rpx","border-radius":"20rpx",border:"#e4e4e4","background-color":"#FF5242",color:"#fff"},disabled:{width:"100%",height:"100rpx","border-radius":"20rpx",border:"#e4e4e4","background-color":"#FF5242",color:"#fff",opacity:"0.5"}},isLogining:!1,un:!1,pd:!1,isDisabledBtn:!0}),onShow(){plus.navigator.setFullscreen(!0)},methods:{userFocus(){this.isuserFocus=!0},userBlur(){setTimeout((()=>{this.isuserFocus=!1}),1)},pdFocus(){this.ispdFocus=!0},pdBlur(){setTimeout((()=>{this.ispdFocus=!1}),1)},clearInput(s){switch(s){case"id":this.userLoginInfo.id="",this.un=!1,this.$nextTick((()=>{this.un=!0}));break;case"password":this.userLoginInfo.password="",this.pd=!1,this.$nextTick((()=>{this.pd=!0}))}},login(){this.isLogining=!0,i.ajax.post({url:o.API.USER_LOGIN,data:{...this.userLoginInfo}}).then((i=>{if(console.log(i),200===i.data.code){const o=e.userAccountStore(),r=e.userToken();o.$patch({information:i.data.data}),r.$patch({token:i.data.token}),s.index.showToast({title:"登录成功",duration:2e3}),s.index.switchTab({url:"/pages/equipment/index"})}else s.index.showToast({icon:"error",title:i.data.msg,duration:2e3});this.isLogining=!1})),this.isLogining=!1}},watch:{userLoginInfo:{handler(s,e){""!==s.userName&&""!==s.password?this.isDisabledBtn=!1:this.isDisabledBtn=!0},deep:!0}}};if(!Array){(s.resolveComponent("uni-easyinput")+s.resolveComponent("u-toast"))()}Math;const t=s._export_sfc(r,[["render",function(e,i,o,r,t,u){return{a:t.userImg,b:s.s(t.isDisabledBtn?"opacity:0.5":"opacity:1"),c:s.s(t.isuserFocus?t.label_style.focus:t.label_style.blur),d:s.o(e.input),e:s.o((s=>t.userLoginInfo.id=s)),f:s.p({inputBorder:!1,focus:!0,placeholder:"请输入工号",modelValue:t.userLoginInfo.id}),g:s.s(t.isuserFocus?t.input_boder_style.focus:t.input_boder_style.blur),h:s.s(t.ispdFocus?t.label_style.focus:t.label_style.blur),i:s.o((s=>t.userLoginInfo.password=s)),j:s.p({inputBorder:!1,type:"password",placeholder:"请输入密码",modelValue:t.userLoginInfo.password}),k:s.s(t.ispdFocus?t.input_boder_style.focus:t.input_boder_style.blur),l:s.t(t.isLogining?"":"登 录"),m:t.isLogining,n:s.s(t.isDisabledBtn?t.login_btn_style.disabled:t.login_btn_style.able),o:t.isDisabledBtn,p:s.o(((...s)=>u.login&&u.login(...s))),q:s.sr("uToast","61a6ebd4-2"),r:s.s(t.ispdFocus||t.isuserFocus?t.containerHeight.focus:t.containerHeight.blur)}}]]);wx.createPage(t);
