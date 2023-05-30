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
      delayload: false,
      categories: [],
      minPrice: [],
      maxPrice: [],
      device: {
        "0": "pressure",
        "1": "level",
        "2": "concentration",
        "3": "gconcentration"
      },
      name: {
        "0": "Kpa",
        "1": "%",
        "2": "%LEL",
        "3": "%LEL"
      },
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
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
        padding: [15, 10, 0, 15],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "curve",
            width: 2,
            activeType: "hollow"
          }
        }
      }
    };
  },
  onReady() {
  },
  methods: {
    async open(index, chartShow) {
      common_vendor.index.showLoading();
      this.getDays(index);
      await setTimeout(() => {
        this.delayload = true;
        common_vendor.index.hideLoading();
        let res = {
          categories: this.categories,
          series: [
            {
              name: `最低(${this.name[index]})`,
              lineType: "dash",
              data: this.minPrice
            },
            {
              name: `最高(${this.name[index]})`,
              lineType: "dash",
              data: this.maxPrice
            }
          ]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 1e3);
    },
    getDays(index) {
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_DAYS,
        data: {
          siteId: this.standId,
          deviceName: this.device[index]
        },
        header: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          let arrold = res.data.data;
          let time = [];
          let minPrice = [];
          let maxPrice = [];
          arrold.forEach((e) => {
            time.push(e.time.slice(5));
            minPrice.push(parseFloat(e.minimum));
            maxPrice.push(parseFloat(e.highest));
          });
          this.categories = time;
          this.minPrice = minPrice;
          this.maxPrice = maxPrice;
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
      type: "line",
      opts: $data.opts,
      chartData: $data.chartData,
      resshow: $data.delayload
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4519a472"], ["__file", "E:/毕业设计/app/天然气监控APP/components/chart/statistics.vue"]]);
wx.createComponent(Component);
