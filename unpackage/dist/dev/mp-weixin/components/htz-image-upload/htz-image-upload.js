"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "htz-image-upload",
  props: {
    max: {
      //展示图片最大值
      type: Number,
      default: 1
    },
    chooseNum: {
      //选择图片数
      type: Number,
      default: 9
    },
    name: {
      //发到后台的文件参数名
      type: String,
      default: "file"
    },
    dataType: {
      //v-model的数据结构类型
      type: Number,
      default: 0
      // 0: ['http://xxxx.jpg','http://xxxx.jpg'] 1:[{type:0,url:'http://xxxx.jpg'}]  type 0 图片 1 视频 url 文件地址 此类型是为了给没有文件后缀的状况使用的
    },
    remove: {
      //是否展示删除按钮
      type: Boolean,
      default: true
    },
    add: {
      //是否展示添加按钮
      type: Boolean,
      default: true
    },
    disabled: {
      //是否禁用
      type: Boolean,
      default: false
    },
    sourceType: {
      //选择照片来源 【ps：H5就别费劲了，设置了也没用。不是我说的，官方文档就这样！！！】
      type: Array,
      default: () => ["album", "camera"]
    },
    action: {
      //上传地址 如需使用uniCloud服务，设置为uniCloud即可
      type: String,
      default: ""
    },
    headers: {
      //上传的请求头部
      type: Object,
      default: () => {
      }
    },
    formData: {
      //HTTP 请求中其他额外的 form data
      type: Object,
      default: () => {
      }
    },
    compress: {
      //是否需要压缩
      type: Boolean,
      default: true
    },
    quality: {
      //压缩质量，范围0～100
      type: Number,
      default: 80
    },
    modelValue: {
      //受控图片列表
      type: Array,
      default: () => []
    },
    uploadSuccess: {
      default: (res) => {
        return {
          success: false,
          url: ""
        };
      }
    },
    mediaType: {
      //文件类型 image/video/all
      type: String,
      default: "image"
    },
    maxDuration: {
      //拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。 (只针对拍摄视频有用)
      type: Number,
      default: 60
    },
    camera: {
      //'front'、'back'，默认'back'(只针对拍摄视频有用)
      type: String,
      default: "back"
    },
    appVideoPoster: {
      //app端视频展示封面 只对app有效
      type: String,
      default: "/static/htz-image-upload/play.png"
    }
  },
  data() {
    return {
      uploadLists: [],
      mediaTypeData: ["image", "video", "all"],
      previewVideoSrc: ""
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.uploadLists = this.modelValue;
      if (this.mediaTypeData.indexOf(this.mediaType) == -1) {
        common_vendor.index.showModal({
          title: "提示",
          content: "mediaType参数不正确",
          showCancel: false,
          success: function(res) {
            if (res.confirm)
              ;
            else if (res.cancel)
              ;
          }
        });
      }
    });
  },
  watch: {
    modelValue(val, oldVal) {
      this.uploadLists = val;
    }
  },
  methods: {
    isVideo(item) {
      let isPass = false;
      if (!/.(gif|jpg|jpeg|png|gif|jpg|png)$/i.test(item) && this.dataType == 0 || this.dataType == 1 && item.type == 1) {
        isPass = true;
      }
      return isPass;
    },
    getFileUrl(item) {
      var url = item;
      if (this.dataType == 1) {
        url = item.url;
      }
      return url;
    },
    previewVideo(src) {
      this.previewVideoSrc = src;
    },
    previewVideoClose() {
      this.previewVideoSrc = "";
    },
    imgDel(index) {
      common_vendor.index.showModal({
        title: "提示",
        content: "您确定要删除么?",
        success: (res) => {
          if (res.confirm) {
            let delUrl = this.uploadLists[index];
            this.uploadLists.splice(index, 1);
            this.$emit("update:modelValue", this.uploadLists);
            this.$emit("imgDelete", {
              del: delUrl,
              tempFilePaths: this.uploadLists
            });
          } else if (res.cancel)
            ;
        }
      });
    },
    imgPreview(index) {
      var imgData = [];
      this.uploadLists.forEach((item) => {
        if (!this.isVideo(item)) {
          imgData.push(this.getFileUrl(item));
        }
      });
      common_vendor.index.previewImage({
        urls: imgData,
        current: index,
        loop: true
      });
    },
    chooseFile() {
      if (this.disabled) {
        return false;
      }
      switch (this.mediaTypeData.indexOf(this.mediaType)) {
        case 1:
          this.videoAdd();
          break;
        case 2:
          common_vendor.index.showActionSheet({
            itemList: ["相册", "视频"],
            success: (res) => {
              if (res.tapIndex == 1) {
                this.videoAdd();
              } else if (res.tapIndex == 0) {
                this.imgAdd();
              }
            },
            fail: (res) => {
              console.log(res.errMsg);
            }
          });
          break;
        default:
          this.imgAdd();
          break;
      }
    },
    videoAdd() {
      let nowNum = Math.abs(this.uploadLists.length - this.max);
      this.chooseNum > nowNum ? nowNum : this.chooseNum;
      common_vendor.index.chooseVideo({
        compressed: this.compress,
        sourceType: this.sourceType,
        camera: this.camera,
        maxDuration: this.maxDuration,
        success: (res) => {
          this.chooseSuccessMethod([res.tempFilePath], 1);
        }
      });
    },
    imgAdd() {
      let nowNum = Math.abs(this.uploadLists.length - this.max);
      let thisNum = this.chooseNum > nowNum ? nowNum : this.chooseNum;
      common_vendor.index.chooseImage({
        count: thisNum,
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        sourceType: this.sourceType,
        success: (res) => {
          this.chooseSuccessMethod(res.tempFilePaths, 0);
        }
      });
    },
    appCamera() {
      var cmr = plus.camera.getCamera();
      var res = cmr.supportedImageResolutions[0];
      var fmt = cmr.supportedImageFormats[0];
      cmr.captureImage(
        (path) => {
          this.chooseSuccessMethod([path], 0);
        },
        (error) => {
          console.log("Capture image failed: " + error.message);
        },
        {
          resolution: res,
          format: fmt
        }
      );
    },
    appGallery(maxNum) {
      plus.gallery.pick((res) => {
        this.chooseSuccessMethod(res.files, 0);
      }, function(e) {
      }, {
        filter: "image",
        multiple: true,
        maximum: maxNum
      });
    },
    chooseSuccessMethod(filePaths, type) {
      if (this.action == "") {
        this.$emit("chooseSuccess", filePaths, type);
      } else {
        if (type == 1) {
          this.imgUpload(filePaths, type);
        } else {
          if (this.compress) {
            this.imgCompress(filePaths, type);
          } else {
            this.imgUpload(filePaths, type);
          }
        }
      }
    },
    imgCompress(tempFilePaths, type) {
      common_vendor.index.showLoading({
        title: "压缩中..."
      });
      let compressImgs = [];
      let results = [];
      tempFilePaths.forEach((item, index) => {
        compressImgs.push(new Promise((resolve, reject) => {
          common_vendor.index.compressImage({
            src: item,
            quality: this.quality,
            success: (res) => {
              results.push(res.tempFilePath);
              resolve(res.tempFilePath);
            },
            fail: (err) => {
              reject(err);
            },
            complete: () => {
            }
          });
        }));
      });
      Promise.all(compressImgs).then((results2) => {
        common_vendor.index.hideLoading();
        this.imgUpload(results2, type);
      }).catch((res, object) => {
        common_vendor.index.hideLoading();
      });
    },
    imgUpload(tempFilePaths, type) {
      if (this.action == "uniCloud") {
        this.uniCloudUpload(tempFilePaths, type);
        return;
      }
      common_vendor.index.showLoading({
        title: "上传中"
      });
      let uploadImgs = [];
      tempFilePaths.forEach((item, index) => {
        uploadImgs.push(new Promise((resolve, reject) => {
          common_vendor.index.uploadFile({
            url: this.action,
            //仅为示例，非真实的接口地址
            filePath: item,
            name: this.name,
            fileType: "image",
            formData: this.formData,
            header: this.headers,
            success: (uploadFileRes) => {
              uploadFileRes.fileType = type;
              if (typeof this.uploadSuccess == "function") {
                let thisUploadSuccess = this.uploadSuccess(
                  uploadFileRes
                );
                if (thisUploadSuccess.success) {
                  let keyName = "";
                  keyName = "modelValue";
                  if (this.dataType == 0) {
                    this[keyName].push(thisUploadSuccess.url);
                  } else {
                    this[keyName].push({
                      type,
                      url: thisUploadSuccess.url,
                      ...thisUploadSuccess
                    });
                  }
                  this.$emit("update:modelValue", this.uploadLists);
                }
              }
              resolve(uploadFileRes);
              this.$emit("uploadSuccess", uploadFileRes);
            },
            fail: (err) => {
              console.log(err);
              reject(err);
              this.$emit("uploadFail", err);
            },
            complete: () => {
            }
          });
        }));
      });
      Promise.all(uploadImgs).then((results) => {
        common_vendor.index.hideLoading();
      }).catch((res, object) => {
        common_vendor.index.hideLoading();
        this.$emit("uploadFail", res);
      });
    },
    uniCloudUpload(tempFilePaths, type) {
      common_vendor.index.showLoading({
        title: "上传中"
      });
      console.log("uniCloudUpload", tempFilePaths);
      let uploadImgs = [];
      tempFilePaths.forEach((item, index) => {
        uploadImgs.push(new Promise((resolve, reject) => {
          common_vendor.Ds.uploadFile({
            filePath: item,
            cloudPath: this.guid() + "." + this.getFileType(item, type),
            success(uploadFileRes) {
              if (uploadFileRes.success) {
                resolve(uploadFileRes.fileID);
              }
            },
            fail(err) {
              console.log(err);
              reject(err);
            },
            complete() {
            }
          });
        }));
      });
      Promise.all(uploadImgs).then((results) => {
        common_vendor.index.hideLoading();
        common_vendor.Ds.getTempFileURL({
          fileList: results,
          success: (res) => {
            res.fileList.forEach((item) => {
              this.modelValue.push(item.tempFileURL);
              this.$emit("update:modelValue", this.modelValue);
            });
          },
          fail() {
          },
          complete() {
          }
        });
      }).catch((res, object) => {
        common_vendor.index.hideLoading();
      });
    },
    getFileType(path, type) {
      var result = path.split(".").pop().toLowerCase();
      if (this.compress) {
        result = type == 0 ? "jpg" : "mp4";
      }
      return result;
    },
    guid() {
      return "xxxxxxxx-date-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
        return v.toString(16);
      }).replace(/date/g, function(c) {
        return Date.parse(new Date());
      });
    },
    canvasDataURL(path, obj, callback) {
      var img = new Image();
      img.src = path;
      img.onload = function() {
        var that = this;
        var w = that.width, h = that.height, scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        var quality = 0.8;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        var base64 = canvas.toDataURL("image/jpeg", quality);
        callback(base64);
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.uploadLists, (item, index, i0) => {
      return common_vendor.e({
        a: $options.isVideo(item)
      }, $options.isVideo(item) ? common_vendor.e({
        b: common_vendor.o(($event) => $options.previewVideo($options.getFileUrl(item)), index),
        c: $props.remove && $data.previewVideoSrc == ""
      }, $props.remove && $data.previewVideoSrc == "" ? {
        d: common_vendor.o(($event) => $options.imgDel(index), index)
      } : {}, {
        e: $options.getFileUrl(item)
      }) : {
        f: $options.getFileUrl(item),
        g: common_vendor.o(($event) => $options.imgPreview($options.getFileUrl(item)), index)
      }, $props.remove ? {
        h: common_vendor.o(($event) => $options.imgDel(index), index)
      } : {}, {
        i: index
      });
    }),
    b: $props.remove,
    c: $data.uploadLists.length < $props.max && $props.add
  }, $data.uploadLists.length < $props.max && $props.add ? {
    d: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args))
  } : {}, {
    e: $data.previewVideoSrc != ""
  }, $data.previewVideoSrc != "" ? {
    f: common_vendor.o((...args) => $options.previewVideoClose && $options.previewVideoClose(...args)),
    g: $data.previewVideoSrc
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/毕业设计/app/天然气监控APP/components/htz-image-upload/htz-image-upload.vue"]]);
wx.createComponent(Component);
