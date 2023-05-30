"use strict";
const common_vendor = require("../../../../common/vendor.js");
const dashboard = () => "../../../../components/chart/dashboard.js";
const statistics = () => "../../../../components/chart/statistics.js";
const _sfc_main = {
  components: {
    dashboard,
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
      chartShow: false,
      currentTab: 0,
      scoll: [{
        txt: "实时数据"
      }, {
        txt: "一周统计"
      }]
    };
  },
  onShow() {
    const query = common_vendor.index.createSelectorQuery().in(this);
    query.select(".list").boundingClientRect((data) => {
      this.aheight = data.height;
    }).exec();
  },
  methods: {
    open: function(index, chartShow) {
      this.chartShow = chartShow;
      this.index = index;
      this.$refs.child.open(this.index, this.chartShow);
      this.$refs.child2.open(this.index, this.chartShow);
    },
    // 滑动页面同步tab栏
    bindChange: function(e) {
      this.currentTab = e.detail.current;
    },
    //点击tab切换
    swichNav: function(e) {
      if (this.currentTab === e.target.dataset.current) {
        return false;
      } else {
        this.currentTab = e.target.dataset.current;
      }
    }
  }
};
if (!Array) {
  const _component_dashboard = common_vendor.resolveComponent("dashboard");
  const _component_statistics = common_vendor.resolveComponent("statistics");
  (_component_dashboard + _component_statistics)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.scoll, (item, index, i0) => {
      return {
        a: common_vendor.t(item.txt),
        b: common_vendor.n($data.currentTab == index ? "select" : ""),
        c: index,
        d: common_vendor.o((...args) => $options.swichNav && $options.swichNav(...args), index),
        e: index
      };
    }),
    b: common_vendor.sr("child", "9d3299a7-0"),
    c: common_vendor.p({
      standId: $props.standId
    }),
    d: common_vendor.sr("child2", "9d3299a7-1"),
    e: common_vendor.p({
      standId: $props.standId
    }),
    f: $data.currentTab,
    g: common_vendor.o((...args) => $options.bindChange && $options.bindChange(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9d3299a7"], ["__file", "E:/毕业设计/app/天然气监控APP/pages/equipment/area/eject/statistics.vue"]]);
wx.createComponent(Component);
