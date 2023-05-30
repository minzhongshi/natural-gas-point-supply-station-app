"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_counter = require("../../stores/counter.js");
const uni_modules_uAjax_js_sdk_index = require("../../uni_modules/u-ajax/js_sdk/index.js");
const api_user_index = require("../../api/user/index.js");
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
      // ------------- 其他 -------------
      userLoginInfo: {
        id: "",
        password: "",
        role: "APP"
      },
      // 整体容器高度，单位 rpx
      // containerHeight: 1000,
      containerHeight: {
        focus: "height:800rpx;transition:0.2s",
        blur: "height:1300rpx;transition:0.2s"
      },
      // 获取焦点时，整体上移的动画效果
      animationData: {},
      // 登录界面的用户图标
      userImg: "../../static/img/user.png",
      // 是否正在清除
      isClearing: false,
      // ------------- 输入框 -------------
      pdMaxLength: 10,
      // 输入框是否获取到焦点
      isuserFocus: false,
      ispdFocus: false,
      // 输入框自定义样式
      customStyle: {
        "padding-left": "40rpx",
        // 使光标消失（iOS无效果）
        "color": "transparent",
        "text-shadow": "0 0 0 #000"
      },
      // 清除按钮图标
      clearImg: "../../static/img/clear.png",
      // 输入框 label 样式
      label_style: {
        focus: "width:100rpx;display:flex;justify-content:center;color:#FF5242;font-weight:bold;transform:scale(1.1)",
        blur: "width:100rpx;display:flex;justify-content:center;color:#aaaaaa;transform:scale(1)"
      },
      input_boder_style: {
        focus: "border-bottom: 1px solid #FF5242;",
        blur: "border-bottom: 1px solid #e4e4e4;"
      },
      // ------------- 登录按钮 -------------
      // 登录按钮自定义样式
      login_btn_style: {
        able: {
          "width": "100%",
          "height": "100rpx",
          "border-radius": "20rpx",
          "border": "#e4e4e4",
          "background-color": "#FF5242",
          "color": "#fff"
        },
        disabled: {
          "width": "100%",
          "height": "100rpx",
          "border-radius": "20rpx",
          "border": "#e4e4e4",
          "background-color": "#FF5242",
          "color": "#fff",
          "opacity": "0.5"
        }
      },
      // 点击登录按钮后，接口返回数据前，对该操作上锁
      isLogining: false,
      un: false,
      pd: false,
      isDisabledBtn: true
    };
  },
  onShow() {
    plus.navigator.setFullscreen(true);
  },
  methods: {
    userFocus() {
      this.isuserFocus = true;
    },
    userBlur() {
      setTimeout(() => {
        this.isuserFocus = false;
      }, 1);
    },
    pdFocus() {
      this.ispdFocus = true;
    },
    pdBlur() {
      setTimeout(() => {
        this.ispdFocus = false;
      }, 1);
    },
    // 清除 input 内容
    clearInput(value) {
      switch (value) {
        case "id":
          this.userLoginInfo.id = "";
          this.un = false;
          this.$nextTick(() => {
            this.un = true;
          });
          break;
        case "password":
          this.userLoginInfo.password = "";
          this.pd = false;
          this.$nextTick(() => {
            this.pd = true;
          });
          break;
      }
    },
    login() {
      this.isLogining = true;
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_index.API.USER_LOGIN,
        data: {
          ...this.userLoginInfo
        }
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          const store = stores_counter.userAccountStore();
          const token = stores_counter.userToken();
          store.$patch({
            information: res.data.data
          });
          token.$patch({
            token: res.data.token
          });
          common_vendor.index.showToast({
            title: "登录成功",
            duration: 2e3
          });
          common_vendor.index.switchTab({
            url: "/pages/equipment/index"
          });
        } else {
          common_vendor.index.showToast({
            icon: "error",
            title: res.data.msg,
            duration: 2e3
          });
        }
        this.isLogining = false;
      });
      this.isLogining = false;
    }
  },
  watch: {
    userLoginInfo: {
      handler(newVal, oldVal) {
        if (newVal.userName !== "" && newVal.password !== "") {
          this.isDisabledBtn = false;
        } else {
          this.isDisabledBtn = true;
        }
      },
      deep: true
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _component_u_toast = common_vendor.resolveComponent("u-toast");
  (_easycom_uni_easyinput2 + _component_u_toast)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userImg,
    b: common_vendor.s($data.isDisabledBtn ? "opacity:0.5" : "opacity:1"),
    c: common_vendor.s($data.isuserFocus ? $data.label_style.focus : $data.label_style.blur),
    d: common_vendor.o(_ctx.input),
    e: common_vendor.o(($event) => $data.userLoginInfo.id = $event),
    f: common_vendor.p({
      inputBorder: false,
      focus: true,
      placeholder: "请输入工号",
      modelValue: $data.userLoginInfo.id
    }),
    g: common_vendor.s($data.isuserFocus ? $data.input_boder_style.focus : $data.input_boder_style.blur),
    h: common_vendor.s($data.ispdFocus ? $data.label_style.focus : $data.label_style.blur),
    i: common_vendor.o(($event) => $data.userLoginInfo.password = $event),
    j: common_vendor.p({
      inputBorder: false,
      type: "password",
      placeholder: "请输入密码",
      modelValue: $data.userLoginInfo.password
    }),
    k: common_vendor.s($data.ispdFocus ? $data.input_boder_style.focus : $data.input_boder_style.blur),
    l: common_vendor.t($data.isLogining ? "" : "登 录"),
    m: $data.isLogining,
    n: common_vendor.s($data.isDisabledBtn ? $data.login_btn_style.disabled : $data.login_btn_style.able),
    o: $data.isDisabledBtn,
    p: common_vendor.o((...args) => $options.login && $options.login(...args)),
    q: common_vendor.sr("uToast", "61a6ebd4-2"),
    r: common_vendor.s($data.ispdFocus || $data.isuserFocus ? $data.containerHeight.focus : $data.containerHeight.blur)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/毕业设计/app/天然气监控APP/pages/login/work.vue"]]);
wx.createPage(MiniProgramPage);
