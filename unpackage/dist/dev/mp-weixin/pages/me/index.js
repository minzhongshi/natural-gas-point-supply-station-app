"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_counter = require("../../stores/counter.js");
const uni_modules_uAjax_js_sdk_index = require("../../uni_modules/u-ajax/js_sdk/index.js");
const api_user_index = require("../../api/user/index.js");
const common_assets = require("../../common/assets.js");
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
  data() {
    return {
      information: {},
      imageChat: "",
      hoursTip: "早上好"
    };
  },
  //监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad
  onInit() {
  },
  //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
  onLoad() {
  },
  //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady() {
  },
  //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
  beforeDestroy() {
  },
  //页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
  onReachBottom() {
  },
  onShareAppMessage(res) {
  },
  created() {
    const store = stores_counter.userAccountStore();
    this.information = store.information;
    this.imageChat = store.information.username.charAt(0);
    this.gotime();
    console.log(store.token);
  },
  methods: {
    goExit() {
      const token = stores_counter.userToken();
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: function(res) {
          if (res.confirm) {
            uni_modules_uAjax_js_sdk_index.ajax.get({
              url: api_user_index.API.USER_LOGOUT,
              header: {
                token: token.token
              }
            }).then((res2) => {
              console.log(res2);
              if (res2.data.code === 200) {
                common_vendor.index.showToast({
                  title: "退出成功",
                  duration: 2e3
                });
                common_vendor.index.clearStorage();
                common_vendor.index.redirectTo({
                  // url: 'test?id=1&name=uniapp'  c传递参数
                  url: "/pages/index/relaunch"
                });
              } else {
                common_vendor.index.showToast({
                  icon: "error",
                  title: res2.data.msg,
                  duration: 2e3
                });
              }
            });
          }
        }
      });
    },
    gotime() {
      let date = new Date();
      if (date.getHours() >= 0 && date.getHours() < 12) {
        this.hoursTip = "上午好";
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        this.hoursTip = "下午好";
      } else {
        this.hoursTip = "晚上好";
      }
    },
    gopege(address) {
      common_vendor.index.navigateTo({
        // url: 'test?id=1&name=uniapp'  c传递参数
        url: `/pages/me/jump/${address}`
      });
    }
  }
};
if (!Array) {
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_u_icon + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(this.imageChat),
    b: common_vendor.t(this.hoursTip),
    c: common_vendor.t(this.information.username),
    d: common_vendor.t(this.information.id),
    e: common_vendor.p({
      name: "arrow-right"
    }),
    f: common_assets._imports_0,
    g: common_vendor.p({
      color: "#96a1ae",
      type: "forward"
    }),
    h: common_vendor.o(($event) => $options.gopege("escalation")),
    i: common_assets._imports_1,
    j: common_vendor.p({
      color: "#96a1ae",
      type: "forward"
    }),
    k: common_vendor.o(($event) => $options.gopege("help")),
    l: common_assets._imports_2,
    m: common_vendor.p({
      color: "#96a1ae",
      type: "forward"
    }),
    n: common_vendor.o(($event) => $options.gopege("password")),
    o: common_vendor.o((...args) => $options.goExit && $options.goExit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c8e26b33"], ["__file", "E:/毕业设计/app/天然气监控APP/pages/me/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
