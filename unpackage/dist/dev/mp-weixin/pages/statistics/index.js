"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uAjax_js_sdk_index = require("../../uni_modules/u-ajax/js_sdk/index.js");
const api_user_device = require("../../api/user/device.js");
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
const ProgressBar = () => "../../components/chart/progress-bar.js";
const _sfc_main = {
  components: {
    ProgressBar
  },
  data() {
    return {
      info: "",
      //用户数据
      showDataTime: "today",
      //选中的时间
      scrollHeight: "600px",
      //数据展示体高度
      RankData: [],
      ProductRateData: [],
      isCanvas2d: true,
      delayload: false
      //延时加载图表，否则会出现图表加载完后定位错乱
    };
  },
  created() {
    this.useList();
  },
  onShow() {
    this.useList();
  },
  computed: {
    locationArray() {
      return [{ value: "GDBJ-ENTRY-1", text: "天猫" }, { value: "GDBJ-ENTRY-201", text: "京东" }];
    }
  },
  methods: {
    async getData() {
      common_vendor.index.showLoading();
      await setTimeout(() => {
        this.delayload = true;
        common_vendor.index.hideLoading();
      }, 1e3);
    },
    //获取设备信息
    getTelephoneInfo() {
    },
    updateRanking(nVal) {
      this.RankData = nVal;
    },
    color() {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      return color;
    },
    useList() {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_USE,
        data: {}
      }).then((res) => {
        if (res.data.code === 200) {
          let data = [];
          let data2 = [];
          res.data.data.forEach((e) => {
            let obj = {
              "name": e.name,
              "num": e.turnover,
              "width": "",
              "background": this.color()
            };
            let obj2 = {
              "name": e.name,
              "value": e.used,
              "color": this.color()
            };
            data.push(obj);
            data2.push(obj2);
          });
          this.RankData = data;
          this.ProductRateData = {
            "series": [
              {
                "data": [
                  ...data2
                ]
              }
            ]
          };
        } else {
          common_vendor.index.showToast({
            icon: "error",
            title: res.data.msg,
            duration: 2e3
          });
        }
        common_vendor.index.hideLoading();
      });
    }
  },
  onLoad() {
    common_vendor.index.showShareMenu();
    this.getData();
    this.getTelephoneInfo();
  }
};
if (!Array) {
  const _component_progress_bar = common_vendor.resolveComponent("progress-bar");
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  (_component_progress_bar + _easycom_qiun_data_charts2)();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.updateRanking),
    b: common_vendor.p({
      content: $data.RankData
    }),
    c: common_vendor.p({
      type: "rose",
      chartData: $data.ProductRateData,
      canvasId: "school_a",
      canvas2d: $data.isCanvas2d,
      resshow: $data.delayload
    }),
    d: $data.scrollHeight
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6e199430"], ["__file", "E:/毕业设计/app/天然气监控APP/pages/statistics/index.vue"]]);
wx.createPage(MiniProgramPage);
