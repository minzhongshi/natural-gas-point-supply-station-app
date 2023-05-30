"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    name: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: ""
    },
    state: {
      type: String,
      default: ""
    },
    show: {
      type: String,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(this.name),
    b: common_vendor.t(this.price),
    c: $props.state !== "2"
  }, $props.state !== "2" ? {
    d: common_vendor.n("star" + $props.state)
  } : {}, {
    e: $props.state !== "2"
  }, $props.state !== "2" ? {
    f: common_vendor.n("star" + $props.state)
  } : {}, {
    g: $props.state !== "2"
  }, $props.state !== "2" ? {
    h: common_vendor.n("star" + $props.state)
  } : {}, {
    i: $props.state !== "2"
  }, $props.state !== "2" ? {
    j: common_vendor.n("star" + $props.state)
  } : {}, {
    k: $props.show
  }, $props.show ? {
    l: common_vendor.p({
      type: "settings",
      size: "20"
    })
  } : {}, {
    m: common_vendor.n("block_" + $props.state)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fb4987fd"], ["__file", "E:/毕业设计/app/天然气监控APP/pages/equipment/area/areaMonitor.vue"]]);
wx.createComponent(Component);
