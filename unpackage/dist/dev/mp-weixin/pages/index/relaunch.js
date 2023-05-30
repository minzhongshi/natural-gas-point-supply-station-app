"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      phone: "工 号 登 录",
      nowlocation: "",
      key: "1932a3ccce6d40ce7f5a613c263e28f7",
      amapPlugin: null
    };
  },
  onLoad(options) {
  },
  methods: {
    login() {
      common_vendor.index.navigateTo({
        url: "/pages/login/work"
      });
    }
  },
  mounted() {
  },
  created() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.phone),
    b: common_vendor.o(($event) => $options.login())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/毕业设计/app/天然气监控APP/pages/index/relaunch.vue"]]);
wx.createPage(MiniProgramPage);
