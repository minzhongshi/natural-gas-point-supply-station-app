"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_uAjax_js_sdk_index = require("../../../uni_modules/u-ajax/js_sdk/index.js");
const api_user_dictionary = require("../../../api/user/dictionary.js");
const api_user_device = require("../../../api/user/device.js");
const stores_counter = require("../../../stores/counter.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/core/Ajax.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/core/InterceptorManager.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/helpers/buildURL.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/utils.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/helpers/mergeConfig.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/core/dispatchRequest.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/helpers/isCallback.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/defaults.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/adapters/http.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/core/handleCancel.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/adapters/Fetcher.js");
const htzImageUpload = () => "../../../components/htz-image-upload/htz-image-upload.js";
const counter = stores_counter.userAccountStore();
const _sfc_main = {
  components: {
    htzImageUpload
  },
  data() {
    return {
      range: [],
      dataTree: [],
      uri: api_user_dictionary.API.PUSH_VEDIO,
      headers: { "Content-Type": "multipart/form-data" },
      baseFormData: {
        typesOf: "",
        site: "",
        textDescription: "",
        video: [],
        siteId: ""
      },
      rules: {
        typesOf: {
          rules: [{
            required: true,
            errorMessage: "类型不能为空"
          }]
        },
        site: {
          rules: [{
            required: true,
            errorMessage: "站点不能为空"
          }]
        },
        textDescription: {
          rules: [{
            required: true,
            errorMessage: "文字描述不能为空"
          }]
        }
      }
    };
  },
  created() {
    this.reportType();
  },
  methods: {
    submit(ref) {
      this.$refs[ref].validate().then((res) => {
        uni_modules_uAjax_js_sdk_index.ajax.post({
          url: api_user_dictionary.API.PUSH_MESSAGE,
          data: {
            accountId: counter.information.id,
            name: counter.information.username,
            content: this.baseFormData.textDescription,
            video: this.baseFormData.video[0],
            type: this.baseFormData.typesOf,
            site: this.baseFormData.site,
            siteId: this.baseFormData.siteId
          }
        }).then((res2) => {
          if (res2.data.code === 200) {
            this.getLog("上报了一条消息", this.baseFormData.textDescription, this.baseFormData.video[0]);
            common_vendor.index.showToast({
              title: "上报成功",
              duration: 1e3
            });
            common_vendor.index.navigateBack({
              delta: 1
            });
          } else {
            common_vendor.index.showToast({
              title: res2.data.msg,
              duration: 1e3
            });
          }
        });
      }).catch((err) => {
        console.log("err", err);
      });
    },
    ceshiUploadSuccess(res) {
      var _res = JSON.parse(res.data);
      if (_res.code == 200) {
        let video = [];
        video.push("http://192.168.1.7:8006" + _res.data);
        console.log(video);
        this.baseFormData.video = video;
      }
    },
    uploadFail(res) {
      common_vendor.index.showToast({
        title: "上传失败",
        icon: "none",
        duration: 1e3
      });
    },
    reportType() {
      uni_modules_uAjax_js_sdk_index.ajax.get({
        url: `${api_user_dictionary.API.PUSH_DICTIONARY}report-type`
      }).then((res) => {
        if (res.data.code === 200) {
          for (let i in res.data.data) {
            let obj = {
              text: res.data.data[i].dictLabel,
              value: res.data.data[i].dictLabel
            };
            this.range.push(obj);
          }
        } else {
          common_vendor.index.showToast({
            title: res.data.msg,
            duration: 1e3
          });
        }
      });
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_SITE,
        data: {}
      }).then((res) => {
        if (res.data.code === 200) {
          let data = [];
          for (let i in res.data.data) {
            let obj = {
              text: res.data.data[i].name,
              value: res.data.data[i].standId
            };
            data.push(obj);
          }
          this.dataTree = data;
          console.log(this.dataTree);
        } else {
          common_vendor.index.showToast({
            title: res.data.msg,
            duration: 1e3
          });
        }
      });
    },
    //站点选择
    onchange(e) {
      this.baseFormData.siteId = e.detail.value[0].value;
      this.baseFormData.site = e.detail.value[0].text;
    },
    getLog(msg, content, video) {
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_LOG,
        data: {
          siteId: this.baseFormData.siteId,
          siteName: this.baseFormData.site,
          operationContent: msg,
          operationName: counter.information.username,
          content,
          video
        }
      }).then((res) => {
        if (res.data.code === 200)
          ;
        else {
          common_vendor.index.showToast({
            icon: "error",
            title: "日志记录失败",
            duration: 2e3
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_htz_image_upload2 = common_vendor.resolveComponent("htz-image-upload");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_data_select2 + _easycom_uni_forms_item2 + _easycom_uni_data_picker2 + _easycom_uni_easyinput2 + _easycom_htz_image_upload2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_htz_image_upload = () => "../../../components/htz-image-upload/htz-image-upload.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_forms_item + _easycom_uni_data_picker + _easycom_uni_easyinput + _easycom_htz_image_upload + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.baseFormData.typesOf = $event),
    b: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.baseFormData.typesOf
    }),
    c: common_vendor.p({
      label: "上报类型",
      required: true,
      name: "typesOf"
    }),
    d: common_vendor.o($options.onchange),
    e: common_vendor.o(($event) => $data.baseFormData.site = $event),
    f: common_vendor.p({
      ["popup-title"]: "请选择站点",
      placeholder: "请选择站点",
      localdata: $data.dataTree,
      modelValue: $data.baseFormData.site
    }),
    g: common_vendor.p({
      label: "上报站点",
      required: true,
      name: "site"
    }),
    h: common_vendor.o(($event) => $data.baseFormData.textDescription = $event),
    i: common_vendor.p({
      type: "textarea",
      placeholder: "请输入文字描述",
      modelValue: $data.baseFormData.textDescription
    }),
    j: common_vendor.p({
      label: "文字描述",
      required: true,
      name: "textDescription"
    }),
    k: common_vendor.o($options.ceshiUploadSuccess),
    l: common_vendor.o($options.uploadFail),
    m: common_vendor.o(($event) => $data.baseFormData.video = $event),
    n: common_vendor.p({
      dataType: "0",
      mediaType: "video",
      name: "vide",
      max: 1,
      action: $data.uri,
      headers: $data.headers,
      modelValue: $data.baseFormData.video
    }),
    o: common_vendor.p({
      label: "上报视频"
    }),
    p: common_vendor.sr("valiForm", "6588f97c-1,6588f97c-0"),
    q: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.baseFormData,
      ["label-position"]: "top"
    }),
    r: common_vendor.o(($event) => $options.submit("valiForm")),
    s: common_vendor.p({
      title: "信息上报",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/毕业设计/app/天然气监控APP/pages/me/jump/escalation.vue"]]);
wx.createPage(MiniProgramPage);
