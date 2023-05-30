"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user_index = require("../../../api/user/index.js");
const _sfc_main = {
  data() {
    return {
      jobNumber: "",
      phone: "",
      second: 0,
      send: true,
      s: 60,
      code: "",
      showPassword: false,
      password: ""
    };
  },
  onLoad() {
  },
  computed: {},
  onUnload() {
  },
  methods: {
    display() {
      this.showPassword = !this.showPassword;
    },
    getcode() {
      if (this.phone.length != 11) {
        common_vendor.index.showToast({
          icon: "none",
          title: "手机号不正确"
        });
        return;
      }
      if (this.jobNumber.length != 12) {
        common_vendor.index.showToast({
          icon: "none",
          title: "工号不正确"
        });
        return;
      }
      let that = this;
      if (!that.send) {
        return false;
      }
      that.send = false;
      common_vendor.index.request({
        url: api_user_index.API.USER_VERIFYCODE,
        data: {
          mobile: this.phone
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: (res) => {
          if (res.data.code != 200) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
          } else {
            this.time;
            common_vendor.index.showToast({
              title: "发送成功",
              icon: "none",
              success: () => {
                this.time();
              }
            });
          }
        }
      });
    },
    bindLogin() {
      if (this.phone.length != 11) {
        common_vendor.index.showToast({
          icon: "none",
          title: "手机号不正确"
        });
        return;
      }
      if (this.jobNumber.length != 12) {
        common_vendor.index.showToast({
          icon: "none",
          title: "工号不正确"
        });
        return;
      }
      if (this.password.length < 6) {
        common_vendor.index.showToast({
          icon: "none",
          title: "密码不小于6位"
        });
        return;
      }
      if (this.code.length != 6) {
        common_vendor.index.showToast({
          icon: "none",
          title: "验证码不正确"
        });
        return;
      }
      common_vendor.index.request({
        url: api_user_index.API.USER_PASSWORD,
        data: {
          accountType: "APP",
          accountNumber: this.jobNumber,
          mobile: this.phone,
          password: this.password,
          verifyCoder: this.code
        },
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        dataType: "json",
        success: (res) => {
          console.log(res);
          if (res.data.code != 200) {
            common_vendor.index.showToast({
              title: res.data.msg,
              icon: "none"
            });
          } else {
            common_vendor.index.showToast({
              title: "修改成功"
            });
            setTimeout(function() {
              common_vendor.index.navigateBack({
                delta: 1
              });
            }, 1500);
          }
        }
      });
    },
    //倒计时
    time() {
      let that = this;
      that.second = that.s;
      let interval = setInterval(function() {
        if (that.second == 1) {
          that.send = true;
          that.second = that.s;
          clearInterval(interval);
        } else {
          that.second--;
        }
      }, 1e3);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.jobNumber,
    b: common_vendor.o(($event) => $data.jobNumber = $event.detail.value),
    c: $data.phone,
    d: common_vendor.o(($event) => $data.phone = $event.detail.value),
    e: !$data.showPassword,
    f: $data.password,
    g: common_vendor.o(($event) => $data.password = $event.detail.value),
    h: $data.showPassword ? "/static/img/shilu-login/op.png" : "/static/img/shilu-login/cl.png",
    i: common_vendor.o((...args) => $options.display && $options.display(...args)),
    j: $data.code,
    k: common_vendor.o(($event) => $data.code = $event.detail.value),
    l: common_vendor.t($data.send ? "发送验证码" : $data.second + "s重新发送"),
    m: !$data.send ? 1 : "",
    n: common_vendor.o((...args) => $options.getcode && $options.getcode(...args)),
    o: common_vendor.o(($event) => $options.bindLogin())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/毕业设计/app/天然气监控APP/pages/me/jump/password.vue"]]);
wx.createPage(MiniProgramPage);
