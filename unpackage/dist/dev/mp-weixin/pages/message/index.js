"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uAjax_js_sdk_index = require("../../uni_modules/u-ajax/js_sdk/index.js");
const api_user_device = require("../../api/user/device.js");
const stores_counter = require("../../stores/counter.js");
require("../../uni_modules/u-ajax/js_sdk/lib/core/Ajax.js");
require("../../uni_modules/u-ajax/js_sdk/lib/core/InterceptorManager.js");
require("../../uni_modules/u-ajax/js_sdk/lib/helpers/buildURL.js");
require("../../uni_modules/u-ajax/js_sdk/lib/utils.js");
require("../../uni_modules/u-ajax/js_sdk/lib/helpers/mergeConfig.js");
require("../../uni_modules/u-ajax/js_sdk/lib/core/dispatchRequest.js");
require("../../uni_modules/u-ajax/js_sdk/lib/helpers/isCallback.js");
require("../../uni_modules/u-ajax/js_sdk/lib/defaults.js");
require("../../uni_modules/u-ajax/js_sdk/lib/adapters/http.js");
require("../../uni_modules/u-ajax/js_sdk/lib/core/handleCancel.js");
require("../../uni_modules/u-ajax/js_sdk/lib/adapters/Fetcher.js");
const counter = stores_counter.userAccountStore();
const _sfc_main = {
  data() {
    return {
      messageData: []
    };
  },
  onHide() {
  },
  onShow() {
    this.getMessage();
  },
  created() {
    this.getMessage();
    stores_counter.userAccountStore();
  },
  methods: {
    messageGo(item) {
      common_vendor.index.navigateTo({
        // url: 'test?id=1&name=uniapp'  c传递参数
        url: "/pages/message/details/details?data=" + encodeURIComponent(JSON.stringify(item))
      });
    },
    getMessage() {
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_MESSAGE,
        data: {
          id: counter.information.id
        },
        header: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      }).then((res) => {
        if (res.data.code === 200) {
          if (res.data.data !== []) {
            this.messageData = res.data.data;
          }
        } else {
          common_vendor.index.showToast({
            icon: "error",
            title: res.data.msg,
            duration: 2e3
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_leruge_empty2 = common_vendor.resolveComponent("leruge-empty");
  _easycom_leruge_empty2();
}
const _easycom_leruge_empty = () => "../../uni_modules/leruge-empty/components/leruge-empty/leruge-empty.js";
if (!Math) {
  _easycom_leruge_empty();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.messageData.length > 0
  }, $data.messageData.length > 0 ? {
    b: common_vendor.f($data.messageData, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name === "系统" ? "系统消息" : "推送消息"),
        b: common_vendor.t(item.site),
        c: common_vendor.t(item.type),
        d: common_vendor.t(item.name),
        e: common_vendor.t(item.time),
        f: common_vendor.o(($event) => $options.messageGo(item))
      };
    })
  } : {
    c: common_vendor.p({
      text: "暂无数据",
      type: "minus"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/毕业设计/app/天然气监控APP/pages/message/index.vue"]]);
wx.createPage(MiniProgramPage);
