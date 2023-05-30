"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "leruge-empty",
  props: {
    // 提示文字
    text: {
      type: String,
      default: "暂无数据"
    },
    // 选择uni-icons图片
    type: {
      type: String,
      default: "minus"
    },
    // 组件距离上一个元素之间的距离
    marginTop: {
      type: [String, Number],
      default: 0
    },
    // 是否显示组件
    show: {
      type: Boolean,
      default: true
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? {
    b: common_vendor.p({
      size: "43",
      type: $props.type,
      color: "#c0c4cc"
    }),
    c: common_vendor.t($props.text),
    d: $props.marginTop + "rpx"
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1e7c5d68"], ["__file", "E:/毕业设计/app/天然气监控APP/uni_modules/leruge-empty/components/leruge-empty/leruge-empty.vue"]]);
wx.createComponent(Component);
