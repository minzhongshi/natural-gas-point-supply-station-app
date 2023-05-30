"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  props: {
    // 控制弹窗显隐
    ishide: {
      type: Boolean,
      required: true
    },
    // 设置弹窗层级
    zindex: {
      type: Number,
      default: 99
    },
    // 设置遮罩透明度
    opacity: {
      type: Number,
      default: 0.6
    },
    // 设置内容区宽度
    width: {
      type: String,
      default: "500rpx"
    },
    // 设置内容区高度
    height: {
      type: String,
      default: "500rpx"
    },
    // 设置内容区圆角
    radius: {
      type: String
    },
    // 设置内容区底色
    bgcolor: {
      type: String,
      default: "#FFFFFF"
    }
  },
  computed: {
    // 遮罩样式
    maskStyle() {
      return `
					z-index:${this.zindex};
					background:rgba(0,0,0,${this.opacity});
				`;
    },
    // 内容样式
    tipStyle() {
      return `
					width:${this.width};
					height:${this.height};
					z-index:${this.zindex + 1};
					border-radius:${this.radius};
					background-color:${this.bgcolor};
				`;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.maskStyle),
    b: common_vendor.s($options.tipStyle),
    c: $props.ishide,
    d: common_vendor.o(() => {
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-53dfd3f4"], ["__file", "E:/毕业设计/app/天然气监控APP/uni_modules/zwy-popup/components/zwy-popup/zwy-popup.vue"]]);
wx.createComponent(Component);
