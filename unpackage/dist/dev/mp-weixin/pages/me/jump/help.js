"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      temp: {
        name: "QQ邮箱",
        pname: "com.tencent.qqbizmailDistribute2",
        scheme: "qqbizmailDistribute2://"
      }
    };
  },
  methods: {
    goContact(contact) {
      common_vendor.index.makePhoneCall({
        phoneNumber: contact
      });
    },
    launchApp(e) {
      if (plus.os.name) {
        if (plus.os.name == "Android") {
          plus.runtime.launchApplication(
            {
              pname: e.pname
            },
            function(e2) {
              console.log("Open system default browser failed: " + e2.message);
            }
          );
        } else if (plus.os.name == "iOS") {
          plus.runtime.launchApplication({
            action: e.scheme
          }, function(e2) {
            console.log("Open system default browser failed: " + e2.message);
          });
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_leruge_empty2 = common_vendor.resolveComponent("leruge-empty");
  _easycom_leruge_empty2();
}
const _easycom_leruge_empty = () => "../../../uni_modules/leruge-empty/components/leruge-empty/leruge-empty.js";
if (!Math) {
  _easycom_leruge_empty();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: "系统问题请联系我们",
      type: ""
    }),
    b: common_vendor.p({
      text: "13208798001",
      type: "phone"
    }),
    c: common_vendor.o(($event) => $options.goContact("13208798001")),
    d: common_vendor.p({
      text: "2240941938@qq.com",
      type: "email"
    }),
    e: common_vendor.o(($event) => $options.launchApp($data.temp)),
    f: common_vendor.p({
      text: "点击图标联系我们",
      type: ""
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/毕业设计/app/天然气监控APP/pages/me/jump/help.vue"]]);
wx.createPage(MiniProgramPage);
