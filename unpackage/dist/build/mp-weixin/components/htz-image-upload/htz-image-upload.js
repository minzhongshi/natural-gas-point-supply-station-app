"use strict";const e=require("../../common/vendor.js"),t={name:"htz-image-upload",props:{max:{type:Number,default:1},chooseNum:{type:Number,default:9},name:{type:String,default:"file"},dataType:{type:Number,default:0},remove:{type:Boolean,default:!0},add:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},sourceType:{type:Array,default:()=>["album","camera"]},action:{type:String,default:""},headers:{type:Object,default:()=>{}},formData:{type:Object,default:()=>{}},compress:{type:Boolean,default:!0},quality:{type:Number,default:80},modelValue:{type:Array,default:()=>[]},uploadSuccess:{default:e=>({success:!1,url:""})},mediaType:{type:String,default:"image"},maxDuration:{type:Number,default:60},camera:{type:String,default:"back"},appVideoPoster:{type:String,default:"/static/htz-image-upload/play.png"}},data:()=>({uploadLists:[],mediaTypeData:["image","video","all"],previewVideoSrc:""}),mounted:function(){this.$nextTick((function(){this.uploadLists=this.modelValue,-1==this.mediaTypeData.indexOf(this.mediaType)&&e.index.showModal({title:"提示",content:"mediaType参数不正确",showCancel:!1,success:function(e){e.confirm||e.cancel}})}))},watch:{modelValue(e,t){this.uploadLists=e}},methods:{isVideo(e){let t=!1;return(!/.(gif|jpg|jpeg|png|gif|jpg|png)$/i.test(e)&&0==this.dataType||1==this.dataType&&1==e.type)&&(t=!0),t},getFileUrl(e){var t=e;return 1==this.dataType&&(t=e.url),t},previewVideo(e){this.previewVideoSrc=e},previewVideoClose(){this.previewVideoSrc=""},imgDel(t){e.index.showModal({title:"提示",content:"您确定要删除么?",success:e=>{if(e.confirm){let e=this.uploadLists[t];this.uploadLists.splice(t,1),this.$emit("update:modelValue",this.uploadLists),this.$emit("imgDelete",{del:e,tempFilePaths:this.uploadLists})}else e.cancel}})},imgPreview(t){var i=[];this.uploadLists.forEach((e=>{this.isVideo(e)||i.push(this.getFileUrl(e))})),e.index.previewImage({urls:i,current:t,loop:!0})},chooseFile(){if(this.disabled)return!1;switch(this.mediaTypeData.indexOf(this.mediaType)){case 1:this.videoAdd();break;case 2:e.index.showActionSheet({itemList:["相册","视频"],success:e=>{1==e.tapIndex?this.videoAdd():0==e.tapIndex&&this.imgAdd()},fail:e=>{console.log(e.errMsg)}});break;default:this.imgAdd()}},videoAdd(){let t=Math.abs(this.uploadLists.length-this.max);this.chooseNum>t||this.chooseNum,e.index.chooseVideo({compressed:this.compress,sourceType:this.sourceType,camera:this.camera,maxDuration:this.maxDuration,success:e=>{this.chooseSuccessMethod([e.tempFilePath],1)}})},imgAdd(){let t=Math.abs(this.uploadLists.length-this.max),i=this.chooseNum>t?t:this.chooseNum;e.index.chooseImage({count:i,sizeType:["original","compressed"],sourceType:this.sourceType,success:e=>{this.chooseSuccessMethod(e.tempFilePaths,0)}})},appCamera(){var e=plus.camera.getCamera(),t=e.supportedImageResolutions[0],i=e.supportedImageFormats[0];e.captureImage((e=>{this.chooseSuccessMethod([e],0)}),(e=>{console.log("Capture image failed: "+e.message)}),{resolution:t,format:i})},appGallery(e){plus.gallery.pick((e=>{this.chooseSuccessMethod(e.files,0)}),(function(e){}),{filter:"image",multiple:!0,maximum:e})},chooseSuccessMethod(e,t){""==this.action?this.$emit("chooseSuccess",e,t):1==t?this.imgUpload(e,t):this.compress?this.imgCompress(e,t):this.imgUpload(e,t)},imgCompress(t,i){e.index.showLoading({title:"压缩中..."});let s=[],a=[];t.forEach(((t,i)=>{s.push(new Promise(((i,s)=>{e.index.compressImage({src:t,quality:this.quality,success:e=>{a.push(e.tempFilePath),i(e.tempFilePath)},fail:e=>{s(e)},complete:()=>{}})})))})),Promise.all(s).then((t=>{e.index.hideLoading(),this.imgUpload(t,i)})).catch(((t,i)=>{e.index.hideLoading()}))},imgUpload(t,i){if("uniCloud"==this.action)return void this.uniCloudUpload(t,i);e.index.showLoading({title:"上传中"});let s=[];t.forEach(((t,a)=>{s.push(new Promise(((s,a)=>{e.index.uploadFile({url:this.action,filePath:t,name:this.name,fileType:"image",formData:this.formData,header:this.headers,success:e=>{if(e.fileType=i,"function"==typeof this.uploadSuccess){let t=this.uploadSuccess(e);if(t.success){let e="";e="modelValue",0==this.dataType?this[e].push(t.url):this[e].push({type:i,url:t.url,...t}),this.$emit("update:modelValue",this.uploadLists)}}s(e),this.$emit("uploadSuccess",e)},fail:e=>{console.log(e),a(e),this.$emit("uploadFail",e)},complete:()=>{}})})))})),Promise.all(s).then((t=>{e.index.hideLoading()})).catch(((t,i)=>{e.index.hideLoading(),this.$emit("uploadFail",t)}))},uniCloudUpload(t,i){e.index.showLoading({title:"上传中"}),console.log("uniCloudUpload",t);let s=[];t.forEach(((t,a)=>{s.push(new Promise(((s,a)=>{e.Ds.uploadFile({filePath:t,cloudPath:this.guid()+"."+this.getFileType(t,i),success(e){e.success&&s(e.fileID)},fail(e){console.log(e),a(e)},complete(){}})})))})),Promise.all(s).then((t=>{e.index.hideLoading(),e.Ds.getTempFileURL({fileList:t,success:e=>{e.fileList.forEach((e=>{this.modelValue.push(e.tempFileURL),this.$emit("update:modelValue",this.modelValue)}))},fail(){},complete(){}})})).catch(((t,i)=>{e.index.hideLoading()}))},getFileType(e,t){var i=e.split(".").pop().toLowerCase();return this.compress&&(i=0==t?"jpg":"mp4"),i},guid:()=>"xxxxxxxx-date-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})).replace(/date/g,(function(e){return Date.parse(new Date)})),canvasDataURL(e,t,i){var s=new Image;s.src=e,s.onload=function(){var e=this,s=e.width,a=e.height,o=s/a;s=t.width||s,a=t.height||s/o;var l=.8,d=document.createElement("canvas"),u=d.getContext("2d"),r=document.createAttribute("width");r.nodeValue=s;var c=document.createAttribute("height");c.nodeValue=a,d.setAttributeNode(r),d.setAttributeNode(c),u.drawImage(e,0,0,s,a),t.quality&&t.quality<=1&&t.quality>0&&(l=t.quality);var h=d.toDataURL("image/jpeg",l);i(h)}}}};const i=e._export_sfc(t,[["render",function(t,i,s,a,o,l){return e.e({a:e.f(o.uploadLists,((t,i,a)=>e.e({a:l.isVideo(t)},l.isVideo(t)?e.e({b:e.o((e=>l.previewVideo(l.getFileUrl(t))),i),c:s.remove&&""==o.previewVideoSrc},s.remove&&""==o.previewVideoSrc?{d:e.o((e=>l.imgDel(i)),i)}:{},{e:l.getFileUrl(t)}):{f:l.getFileUrl(t),g:e.o((e=>l.imgPreview(l.getFileUrl(t))),i)},s.remove?{h:e.o((e=>l.imgDel(i)),i)}:{},{i:i}))),b:s.remove,c:o.uploadLists.length<s.max&&s.add},o.uploadLists.length<s.max&&s.add?{d:e.o(((...e)=>l.chooseFile&&l.chooseFile(...e)))}:{},{e:""!=o.previewVideoSrc},""!=o.previewVideoSrc?{f:e.o(((...e)=>l.previewVideoClose&&l.previewVideoClose(...e))),g:o.previewVideoSrc}:{})}]]);wx.createComponent(i);
