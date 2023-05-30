"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user_device = require("../../api/user/device.js");
const uni_modules_uAjax_js_sdk_index = require("../../uni_modules/u-ajax/js_sdk/index.js");
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
const _sfc_main = {
  props: {
    standId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      data: 0,
      delayload: false,
      name: {
        "0": "储罐压强",
        "1": "储罐液位",
        "2": "燃气浓度",
        "3": "气化区燃气浓度"
      },
      price: {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0
      },
      price2: {
        "0": "0Kap",
        "1": "0mmH2o",
        "2": "0%LEL",
        "3": "0%LEL"
      },
      endNumber: {
        "0": 1e3,
        "1": 4e3,
        "2": 25,
        "3": 25
      },
      startNumber: {
        "0": 400,
        "1": 0,
        "2": 0,
        "3": 0
      },
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['gauge'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: [
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc"
        ],
        padding: void 0,
        title: {
          name: "430.80Kpa",
          fontSize: 25,
          color: "#2fc25b",
          offsetY: 50
        },
        subtitle: {
          name: "储罐压强",
          fontSize: 15,
          color: "#666666",
          offsetY: -50
        },
        extra: {
          gauge: {
            type: "default",
            width: 30,
            labelColor: "#666666",
            startAngle: 0.75,
            endAngle: 0.25,
            startNumber: 400,
            endNumber: 1e3,
            labelFormat: "",
            splitLine: {
              fixRadius: 0,
              splitNumber: 10,
              width: 30,
              color: "#FFFFFF",
              childNumber: 5,
              childWidth: 12
            },
            pointer: {
              width: 24,
              color: "auto"
            }
          }
        }
      }
    };
  },
  mounted() {
  },
  methods: {
    async open(index, chartShow) {
      common_vendor.index.showLoading();
      this.getDevice(index);
      await setTimeout(() => {
        this.delayload = true;
        common_vendor.index.hideLoading();
        let res = {
          categories: [{
            "value": 0.2,
            "color": "#1890ff"
          }, {
            "value": 0.8,
            "color": "#2fc25b"
          }, {
            "value": 1,
            "color": "#f04864"
          }],
          series: [{
            name: "",
            data: this.data
          }]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    getDevice(index) {
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_DEVICE,
        data: {
          standId: this.standId
        },
        header: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.price[0] = parseFloat(res.data.data.storageTank[0].price);
          this.price[1] = parseFloat(res.data.data.storageTank[1].price);
          this.price[2] = parseFloat(res.data.data.storageTank[2].price);
          this.price[3] = parseFloat(res.data.data.storageTank[3].price);
          this.price2[0] = res.data.data.storageTank[0].price + "Kap";
          this.price2[1] = parseFloat(res.data.data.storageTank[1].price) / 40 + "%";
          this.price2[2] = res.data.data.storageTank[2].price + "%LEL";
          this.price2[3] = res.data.data.storageTank[3].price + "%LEL";
          this.data = (this.price[index] - this.startNumber[index]) / (this.endNumber[index] - this.startNumber[index]);
          this.opts.subtitle.name = this.name[index];
          this.opts.extra.gauge.endNumber = this.endNumber[index];
          this.opts.extra.gauge.startNumber = this.startNumber[index];
          this.opts.title.name = this.price2[index];
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
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  _easycom_qiun_data_charts2();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "gauge",
      opts: $data.opts,
      chartData: $data.chartData,
      resshow: $data.delayload
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e62b4a81"], ["__file", "E:/毕业设计/app/天然气监控APP/components/chart/dashboard.vue"]]);
wx.createComponent(Component);
