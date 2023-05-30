"use strict";
const common_vendor = require("../../../../common/vendor.js");
const sRegionSlider = () => "../../../../components/s-region-slider/s-region-slider.js";
const _sfc_main = {
  components: {
    sRegionSlider
  },
  data() {
    return {
      classifyIndex: 0,
      classifyIndex2: 0,
      classifyIndex3: 0,
      classifyIndex4: 0,
      tankPressure: {
        minValue: 400,
        maxValue: 1e3,
        range: [
          {
            min: 400,
            max: 1e3
          },
          {
            min: 400,
            max: 600
          },
          {
            min: 400,
            max: 700
          },
          {
            min: 400,
            max: 800
          }
        ]
      },
      gasConcentration: {
        maxValue: 25,
        range: [
          {
            max: 10
          },
          {
            max: 20
          },
          {
            max: 25
          }
        ]
      },
      gGasConcentration: {
        maxValue: 25,
        range: [
          {
            max: 10
          },
          {
            max: 20
          },
          {
            max: 25
          }
        ]
      },
      Instantaneous: {
        minValue: 6,
        maxValue: 10,
        range: [{
          min: 1,
          max: 2
        }, {
          min: 4,
          max: 6
        }, {
          min: 6,
          max: 8
        }, {
          min: 6,
          max: 10
        }]
      }
    };
  },
  methods: {
    chage(minValue = 0, maxValue, index, position) {
      switch (position) {
        case 0:
          this.tankPressure.minValue = minValue;
          this.tankPressure.maxValue = maxValue;
          this.classifyIndex = index;
          break;
        case 1:
          this.gasConcentration.maxValue = maxValue;
          this.classifyIndex2 = index;
          break;
        case 2:
          this.gGasConcentration.maxValue = maxValue;
          this.classifyIndex3 = index;
          break;
        case 3:
          this.Instantaneous.minValue = minValue;
          this.Instantaneous.maxValue = maxValue;
          this.classifyIndex4 = index;
      }
      const obj = {
        "pressureUppere": this.tankPressure.maxValue,
        "pressureBelowe": this.tankPressure.minValue,
        "gas": this.gasConcentration.maxValue,
        "vaporizeGas": this.gGasConcentration.maxValue,
        "flowUppere": this.Instantaneous.maxValue,
        "flowBelow": this.Instantaneous.minValue
      };
      this.$emit("transfer", obj);
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tankPressure.range, (item, index, i0) => {
      return {
        a: common_vendor.t(item.min + "~" + item.max),
        b: index == $data.classifyIndex ? 1 : "",
        c: common_vendor.o(($event) => $options.chage(item.min, item.max, index, 0), index),
        d: index
      };
    }),
    b: common_vendor.p({
      title: "储罐压力上下限(kpa)",
      type: "line"
    }),
    c: common_vendor.f($data.gasConcentration.range, (item, index, i0) => {
      return {
        a: common_vendor.t(item.max),
        b: index == $data.classifyIndex2 ? 1 : "",
        c: common_vendor.o(($event) => $options.chage(0, item.max, index, 1), index),
        d: index
      };
    }),
    d: common_vendor.p({
      title: "燃气浓度上限(%LEL)",
      type: "line"
    }),
    e: common_vendor.f($data.gGasConcentration.range, (item, index, i0) => {
      return {
        a: common_vendor.t(item.max),
        b: index == $data.classifyIndex3 ? 1 : "",
        c: common_vendor.o(($event) => $options.chage(0, item.max, index, 2), index),
        d: index
      };
    }),
    f: common_vendor.p({
      title: "气化区燃气浓度上限(%LEL)",
      type: "line"
    }),
    g: common_vendor.f($data.Instantaneous.range, (item, index, i0) => {
      return {
        a: common_vendor.t(item.min + "~" + item.max),
        b: index == $data.classifyIndex4 ? 1 : "",
        c: common_vendor.o(($event) => $options.chage(item.min, item.max, index, 3), index),
        d: index
      };
    }),
    h: common_vendor.p({
      title: "瞬时流量上下限(m/s)",
      type: "line"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-62ca7eea"], ["__file", "E:/毕业设计/app/天然气监控APP/pages/equipment/area/eject/modify.vue"]]);
wx.createComponent(Component);
