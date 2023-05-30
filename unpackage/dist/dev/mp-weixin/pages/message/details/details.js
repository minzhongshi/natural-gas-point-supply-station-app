"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_uAjax_js_sdk_index = require("../../../uni_modules/u-ajax/js_sdk/index.js");
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
const counter = stores_counter.userAccountStore();
const _sfc_main = {
  data() {
    return {
      data: []
    };
  },
  methods: {
    deleteMessage() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确认已处理了吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "清除中"
            });
            uni_modules_uAjax_js_sdk_index.ajax.post({
              url: api_user_device.API.DEVIE_DMESSAGE,
              data: {
                id: this.data.id
              }
            }).then((res2) => {
              if (res2.data.code === 200) {
                this.getLog();
                common_vendor.index.showToast({
                  title: "处理成功",
                  duration: 2e3
                });
                common_vendor.index.navigateBack({
                  delta: 1
                });
              } else {
                common_vendor.index.showToast({
                  icon: "error",
                  title: res2.data.msg,
                  duration: 2e3
                });
              }
              common_vendor.index.hideLoading();
            });
          }
        }
      });
    },
    getLog() {
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_LOG,
        data: {
          siteId: this.data.id,
          siteName: this.data.content,
          operationContent: `处理了一条来自${this.data.name}的消息`,
          operationName: counter.information.username
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
  },
  onLoad(option) {
    let data = JSON.parse(decodeURIComponent(option.data));
    this.data = data;
    console.log(this.data);
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(this.data.content),
    b: this.data.video
  }, this.data.video ? {
    c: this.data.video,
    d: common_vendor.o((...args) => _ctx.videoErrorCallback && _ctx.videoErrorCallback(...args))
  } : {}, {
    e: common_vendor.t(this.data.name),
    f: common_vendor.t(this.data.time),
    g: common_vendor.p({
      title: $data.data.site,
      ["sub-title"]: $data.data.type,
      padding: "10px 0"
    }),
    h: common_vendor.o(($event) => $options.deleteMessage())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8ce3f376"], ["__file", "E:/毕业设计/app/天然气监控APP/pages/message/details/details.vue"]]);
wx.createPage(MiniProgramPage);
