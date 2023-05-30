"use strict";
const common_vendor = require("../../../../common/vendor.js");
const statistics = () => "./statistics.js";
const _sfc_main = {
  components: {
    statistics
  },
  props: {
    standId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      index: "0",
      chartShow: false
    };
  },
  methods: {
    open: function(index) {
      this.index = index;
      this.chartShow = true;
      this.$refs.child.open(this.index, this.chartShow);
    }
  }
};
if (!Array) {
  const _component_statistics = common_vendor.resolveComponent("statistics");
  _component_statistics();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("child", "893ceb2f-0"),
    b: common_vendor.p({
      standId: $props.standId
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-893ceb2f"], ["__file", "E:/毕业设计/app/天然气监控APP/pages/equipment/area/eject/eject.vue"]]);
wx.createComponent(Component);
