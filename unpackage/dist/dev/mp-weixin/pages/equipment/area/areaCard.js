"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: ["parameter"],
  data() {
    return {
      bcolor: {
        "0": "#E5F8FE",
        "1": "#FFEDED",
        "2": "#E9E9E9"
      },
      btext: {
        "0": "正常",
        "1": "异常",
        "2": "离线"
      },
      btype: {
        "0": "success",
        "1": "error",
        "2": ""
      }
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_tag2 + _easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_tag = () => "../../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      text: $data.btext[$props.parameter.state],
      type: $data.btype[$props.parameter.state],
      ["custom-style"]: "border-radius: 35%;"
    }),
    b: common_vendor.t($props.parameter.name),
    c: $props.parameter.state === "2"
  }, $props.parameter.state === "2" ? {
    d: common_vendor.p({
      bColor: "#E9E9E9",
      title: "最近上传",
      ["sub-title"]: $props.parameter.time || "无",
      type: "line"
    })
  } : $props.parameter.state === "1" ? {
    f: common_vendor.p({
      bColor: "#FFEDED",
      title: "设备异常",
      ["sub-title"]: $props.parameter.error || "设备存在未检测到的异常",
      type: "line"
    })
  } : {
    g: common_vendor.p({
      bColor: "#E5F8FE",
      border: false,
      title: "所在区域",
      rightText: $props.parameter.area || "未获取到数据"
    }),
    h: common_vendor.p({
      bColor: "#E5F8FE",
      border: false,
      title: "负责人",
      rightText: $props.parameter.headName || "未获取到数据"
    }),
    i: common_vendor.p({
      border: false
    })
  }, {
    e: $props.parameter.state === "1",
    j: common_vendor.s({
      backgroundColor: $data.bcolor[$props.parameter.state]
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-73ded2fe"], ["__file", "E:/毕业设计/app/天然气监控APP/pages/equipment/area/areaCard.vue"]]);
wx.createComponent(Component);
