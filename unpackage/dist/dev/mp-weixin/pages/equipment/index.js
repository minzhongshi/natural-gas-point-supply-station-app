"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uAjax_js_sdk_index = require("../../uni_modules/u-ajax/js_sdk/index.js");
const api_user_device = require("../../api/user/device.js");
const stores_counter = require("../../stores/counter.js");
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
const areaCard = () => "./area/areaCard.js";
const counter = stores_counter.userAccountStore();
const _sfc_main = {
  components: {
    areaCard
  },
  data() {
    return {
      isshow: false,
      timer: null,
      message: "",
      area: "",
      address: {
        province: "",
        city: "",
        county: ""
      },
      status: "loading",
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中",
        contentnomore: "没有更多"
      },
      state: {
        areaId: null,
        name: "",
        state: null
      },
      items: [],
      parameter: []
    };
  },
  created() {
    this.standList();
  },
  onShow() {
    this.standList();
    this.getMessage();
  },
  // 上拉加载更多,onReachBottom上拉触底函数
  onReachBottom: function() {
    this.status = "more";
    this.loadMoreFunc();
  },
  mounted() {
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  onHide() {
    clearTimeout(this.timer);
  },
  methods: {
    search(res) {
      common_vendor.index.showToast({
        title: "搜索：" + res.value,
        icon: "none"
      });
    },
    blur(res) {
      common_vendor.index.showToast({
        title: "blur事件，输入值为：" + res.value,
        icon: "none"
      });
    },
    bindPickerChange(e) {
      this.state.areaId = e.detail.value[2].value;
      this.standList();
    },
    onnodeclick(e) {
      console.log(e);
    },
    clickContent(item) {
      common_vendor.index.navigateTo({
        // url: 'test?id=1&name=uniapp'  c传递参数
        url: "/pages/equipment/area/areaContent?data=" + encodeURIComponent(JSON.stringify(item))
      });
    },
    standList() {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_SITE,
        data: {
          ...this.state
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.parameter = res.data.data;
        } else {
          common_vendor.index.showToast({
            icon: "error",
            title: res.data.msg,
            duration: 2e3
          });
        }
        common_vendor.index.hideLoading();
      });
    },
    search(res) {
      this.state.name = res.value;
      this.standList();
    },
    getAreaList() {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      uni_modules_uAjax_js_sdk_index.ajax.get({
        url: api_user_device.API.DEVIE_AREA
      }).then((res) => {
        if (res.data.code === 200) {
          this.items = res.data.data;
        } else {
          common_vendor.index.showToast({
            icon: "error",
            title: res.data.msg,
            duration: 2e3
          });
        }
        common_vendor.index.hideLoading();
      });
    },
    searchClear(e) {
      this.state.name = "", this.state.areaId = null, this.state.state = null;
      this.standList();
    },
    getMessage() {
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_MESSAGE,
        data: {
          id: counter.information.id
        },
        header: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      }).then((res) => {
        if (res.data.code === 200) {
          if (res.data.data.length !== 0) {
            let data = res.data.data;
            this.isshow = true;
            common_vendor.wx$1.vibrateLong({
              success() {
                console.log("微信震动");
              }
            });
            let message = "";
            data.forEach((e) => {
              message = message + "(" + e.site + ")";
            });
            this.message = message;
          }
        } else {
          common_vendor.index.showToast({
            icon: "error",
            title: res.data.msg,
            duration: 2e3
          });
        }
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.getMessage();
        }, 7e3);
      });
    },
    goMessage() {
      common_vendor.index.switchTab({
        url: "/pages/message/index",
        animationType: "pop-in",
        animationDuration: 300
      });
    }
    // loadMoreFunc:function(){
    //                 //展示loading
    //                 this.status = 'loading';            
    //                 page++;// 当上拉触发页码++
    //                 uni.request({
    //                     url:url+page, 
    //                     method:'GET',
    //                     data:{},
    //                     success:res =>{
    //                         newData=res.data;
    //                         //concat() 把它们连接起来不懂的可以查一下哦
    //                         this.List = this.List.concat(newData);
    //                     }
    //                     ,fail: res => {
    //                         this.status = 'noMore';  //没有数据时显示‘没有更多’
    //                     }
    //                 })
    //             }
  }
};
if (!Array) {
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _component_areaCard = common_vendor.resolveComponent("areaCard");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_zwy_popup2 = common_vendor.resolveComponent("zwy-popup");
  (_easycom_uni_data_picker2 + _easycom_uni_search_bar2 + _component_areaCard + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_zwy_popup2)();
}
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_zwy_popup = () => "../../uni_modules/zwy-popup/components/zwy-popup/zwy-popup.js";
if (!Math) {
  (_easycom_uni_data_picker + _easycom_uni_search_bar + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_zwy_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.getAreaList),
    b: common_vendor.o($options.bindPickerChange),
    c: common_vendor.o(($event) => $data.area = $event),
    d: common_vendor.p({
      localdata: $data.items,
      placeholder: "点击选择地区",
      ["popup-title"]: "请选择地区",
      ["clear-icon"]: false,
      modelValue: $data.area
    }),
    e: common_vendor.o($options.searchClear),
    f: common_vendor.o($options.search),
    g: common_vendor.o(($event) => $data.state.name = $event),
    h: common_vendor.p({
      placeholder: "请输入关键字搜索",
      cancelButton: "none",
      bgColor: "#EEEEEE",
      focus: true,
      radius: 100,
      modelValue: $data.state.name
    }),
    i: common_vendor.f($data.parameter, (item, index, i0) => {
      return {
        a: "c536a64d-4-" + i0 + "," + ("c536a64d-3-" + i0),
        b: common_vendor.p({
          parameter: item
        }),
        c: common_vendor.o(($event) => $options.clickContent(item), index),
        d: index,
        e: "c536a64d-3-" + i0 + ",c536a64d-2"
      };
    }),
    j: common_vendor.p({
      column: 2,
      showBorder: false,
      square: false,
      highlight: false
    }),
    k: common_vendor.t(this.message),
    l: common_vendor.o((...args) => $options.goMessage && $options.goMessage(...args)),
    m: common_vendor.o(($event) => $data.isshow = false),
    n: common_vendor.p({
      ishide: $data.isshow,
      width: "466rpx",
      height: "500rpx",
      radius: "16rpx"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c536a64d"], ["__file", "E:/毕业设计/app/天然气监控APP/pages/equipment/index.vue"]]);
wx.createPage(MiniProgramPage);
