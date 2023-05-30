"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user_device = require("../../../api/user/device.js");
const uni_modules_uAjax_js_sdk_index = require("../../../uni_modules/u-ajax/js_sdk/index.js");
const stores_counter = require("../../../stores/counter.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/core/Ajax.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/core/InterceptorManager.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/helpers/buildURL.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/utils.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/helpers/mergeConfig.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/core/dispatchRequest.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/helpers/isCallback.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/defaults.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/adapters/http.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/core/handleCancel.js");
require("../../../uni_modules/u-ajax/js_sdk/lib/adapters/Fetcher.js");
const areaMonitor = () => "./areaMonitor.js";
const eject = () => "./eject/eject.js";
const modify = () => "./eject/modify.js";
const counter = stores_counter.userAccountStore();
const _sfc_main = {
  components: {
    areaMonitor,
    eject,
    modify
  },
  data() {
    return {
      data: [],
      partition: [],
      modify: {},
      index: "0",
      checked: false,
      isShow: true,
      device: "",
      standId: "",
      time: "",
      name: "",
      btext: {
        "0": "正常",
        "1": "异常",
        "2": "离线"
      },
      bcolor: {
        "0": "#42B983",
        "1": "#E32631",
        "2": "#505050"
      }
    };
  },
  onLoad(option) {
    let data = JSON.parse(decodeURIComponent(option.data));
    this.standId = data.standId;
    this.time = data.time;
    this.checked = data.state === "2" ? false : true;
    this.device = data.state === "2" ? "设备离线" : "启用中";
    this.name = data.name;
    common_vendor.index.setNavigationBarTitle({
      title: data.name || "燃气站"
    });
  },
  created() {
  },
  onShow() {
    this.getDevice();
    this.getPartition();
  },
  methods: {
    open(index) {
      this.$refs.popup.open();
      this.$refs.child.open(index);
    },
    // 打开右侧窗口
    showDrawer(e) {
      this.$refs[e].open();
    },
    // 关闭窗口
    closeDrawer(e) {
      this.$refs[e].close();
    },
    // 修改参数确定按钮
    openConfirm() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确认修改参数吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "修改中"
            });
            uni_modules_uAjax_js_sdk_index.ajax.post({
              url: api_user_device.API.DEVIE_MODIFY,
              data: {
                standId: this.standId,
                ...this.modify
              }
            }).then((res2) => {
              if (res2.data.code === 200) {
                this.getLog("修改了设备阈值");
                this.partition = res2.data.data;
              } else {
                common_vendor.index.showToast({
                  icon: "error",
                  title: res2.data.msg,
                  duration: 2e3
                });
              }
              common_vendor.index.hideLoading();
            });
          }
        }
      });
      this.getDevice();
      this.getPartition();
    },
    // 设备开启与关闭
    switchChange: function(e) {
      let value = e.detail.value;
      if (!value) {
        common_vendor.index.showModal({
          title: "提示",
          content: "确定要关闭设备吗？",
          success: (res) => {
            if (res.confirm) {
              uni_modules_uAjax_js_sdk_index.ajax.post({
                url: api_user_device.API.DEVIE_CONTROLLER,
                data: {
                  standId: this.standId,
                  state: "2"
                }
              }).then((res2) => {
                if (res2.data.code === 200) {
                  this.getLog("关闭了设备");
                  this.device = "设备离线";
                  this.checked = false;
                  common_vendor.index.showToast({
                    title: "关闭成功",
                    icon: "success",
                    duration: 2e3
                  });
                } else {
                  common_vendor.index.showToast({
                    title: res2.data.msg,
                    duration: 1e3
                  });
                }
              });
              this.getDevice();
              this.getPartition();
            } else {
              this.isShow = false;
              this.checked = true;
              this.$nextTick(() => {
                this.isShow = true;
              });
            }
          }
        });
      } else {
        uni_modules_uAjax_js_sdk_index.ajax.post({
          url: api_user_device.API.DEVIE_CONTROLLER,
          data: {
            standId: this.standId,
            state: "0"
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.getLog("启动了设备");
            this.device = "启用中";
            this.checked = true;
            common_vendor.index.showToast({
              title: "开启成功",
              icon: "success",
              duration: 2e3
            });
          } else {
            common_vendor.index.showToast({
              title: res.data.msg,
              duration: 1e3
            });
          }
        });
        this.getDevice();
        this.getPartition();
      }
    },
    getDevice() {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_DEVICE,
        data: {
          standId: this.standId
        },
        header: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.data = res.data.data;
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
    getPartition() {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_PARTITION,
        data: {
          standId: this.standId
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.partition = res.data.data;
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
    //子组件传值
    getMsg(msg) {
      this.modify = msg;
    },
    getLog(msg) {
      const mod = { ...this.modify };
      const string = `瞬时流量下限:${mod.flowBelow} 瞬时流量上限:${mod.flowUppere} 气化区燃气浓度上限:${mod.vaporizeGas} 燃气浓度上限:${mod.gas} 压力下限:${mod.pressureBelowe} 压力上限:${mod.pressureUppere}`;
      uni_modules_uAjax_js_sdk_index.ajax.post({
        url: api_user_device.API.DEVIE_LOG,
        data: {
          siteId: this.standId,
          siteName: this.name,
          operationContent: msg,
          operationName: counter.information.username,
          content: string,
          video: ""
        }
      }).then((res) => {
        if (res.data.code === 200)
          ;
        else {
          common_vendor.index.showToast({
            icon: "error",
            title: "日志记录失败",
            duration: 2e3
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_areaMonitor = common_vendor.resolveComponent("areaMonitor");
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_eject = common_vendor.resolveComponent("eject");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_modify = common_vendor.resolveComponent("modify");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  (_easycom_uni_icons2 + _component_areaMonitor + _easycom_uni_group2 + _easycom_uni_section2 + _component_eject + _easycom_uni_popup2 + _component_modify + _easycom_uni_drawer2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_group = () => "../../../uni_modules/uni-group/components/uni-group/uni-group.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_drawer = () => "../../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_group + _easycom_uni_section + _easycom_uni_popup + _easycom_uni_drawer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "circle-filled",
      color: $data.bcolor[this.partition[0].state]
    }),
    b: common_vendor.t($data.btext[this.partition[0].state]),
    c: $data.bcolor[this.partition[0].state],
    d: common_vendor.o(($event) => $options.showDrawer("showRight")),
    e: common_vendor.o(($event) => $options.open("0")),
    f: common_vendor.p({
      name: "储罐压力",
      price: this.data.storageTank[0].price + " kpa",
      state: $data.data.storageTank[0].state,
      show: "true"
    }),
    g: common_vendor.o(($event) => $options.open("1")),
    h: common_vendor.p({
      name: "储罐液位",
      price: $data.data.storageTank[1].price + " mmH2o",
      state: $data.data.storageTank[1].state,
      show: "true"
    }),
    i: common_vendor.o(($event) => $options.open("2")),
    j: common_vendor.p({
      name: "燃气浓度",
      price: $data.data.storageTank[2].price + " %LEL",
      state: $data.data.storageTank[2].state,
      show: "true"
    }),
    k: common_vendor.o(($event) => $options.open("3")),
    l: common_vendor.p({
      name: "气化区燃气浓度",
      price: $data.data.storageTank[3].price + " %LEL",
      state: $data.data.storageTank[3].state,
      show: "true"
    }),
    m: common_vendor.p({
      name: "当前体积",
      price: $data.data.storageTank[4].price + " m³",
      state: $data.data.storageTank[4].state
    }),
    n: common_vendor.p({
      name: "当前气体体积",
      price: $data.data.storageTank[5].price + " m³",
      state: $data.data.storageTank[5].state
    }),
    o: common_vendor.p({
      name: "当前质量",
      price: $data.data.storageTank[6].price + " t",
      state: $data.data.storageTank[6].state
    }),
    p: common_vendor.p({
      name: "最大补液体积",
      price: $data.data.storageTank[7].price + " m³",
      state: $data.data.storageTank[7].state
    }),
    q: common_vendor.p({
      name: "最大补液质量",
      price: $data.data.storageTank[8].price + " t",
      state: $data.data.storageTank[8].state
    }),
    r: common_vendor.p({
      name: "剩余液位",
      price: $data.data.storageTank[9].price + " %",
      state: $data.data.storageTank[9].state
    }),
    s: common_vendor.p({
      mode: "card"
    }),
    t: common_vendor.p({
      title: "储罐区",
      ["sub-title"]: $data.time || "时间未统计",
      titleFontSize: "18px",
      titleColor: "#2979FF",
      subTitleFontSize: "16px",
      type: "circle"
    }),
    v: common_vendor.p({
      type: "circle-filled",
      color: $data.bcolor[this.partition[1].state]
    }),
    w: common_vendor.t($data.btext[this.partition[1].state]),
    x: $data.bcolor[this.partition[1].state],
    y: common_vendor.p({
      name: "瞬时流量",
      price: $data.data.flowmeter[10].price + " m/s",
      state: $data.data.flowmeter[10].state
    }),
    z: common_vendor.p({
      name: "流量计温度",
      price: $data.data.flowmeter[11].price + " ℃",
      state: $data.data.flowmeter[11].state
    }),
    A: common_vendor.p({
      mode: "card"
    }),
    B: common_vendor.p({
      title: "流量计区",
      ["sub-title"]: $data.time || "时间未统计",
      titleFontSize: "18px",
      titleColor: "#2979FF",
      subTitleFontSize: "16px",
      type: "circle"
    }),
    C: common_vendor.sr("child", "c4c53277-19,c4c53277-18"),
    D: common_vendor.p({
      standId: $data.standId
    }),
    E: common_vendor.sr("popup", "c4c53277-18"),
    F: common_vendor.p({
      type: "bottom"
    }),
    G: common_vendor.t(this.device),
    H: $data.isShow
  }, $data.isShow ? {
    I: common_vendor.o((...args) => $options.switchChange && $options.switchChange(...args)),
    J: $data.checked
  } : {}, {
    K: common_vendor.o($options.getMsg),
    L: $data.checked,
    M: common_vendor.o(($event) => $options.closeDrawer("showRight")),
    N: $data.checked,
    O: common_vendor.o((...args) => $options.openConfirm && $options.openConfirm(...args)),
    P: common_vendor.sr("showRight", "c4c53277-20"),
    Q: common_vendor.p({
      mode: "right"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c4c53277"], ["__file", "E:/毕业设计/app/天然气监控APP/pages/equipment/area/areaContent.vue"]]);
wx.createPage(MiniProgramPage);
