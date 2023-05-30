"use strict";
const API = {
  //设备启用和停止
  "DEVIE_CONTROLLER": "http://192.168.1.7:8007/mqtt/state",
  //点供站查询
  "DEVIE_SITE": "http://192.168.1.7:8006/station/pointSupplyStationQuery",
  //省市区查询
  "DEVIE_AREA": "http://192.168.1.7:8001/locality/list",
  //设备参数查询
  "DEVIE_DEVICE": "http://192.168.1.7:8006/station/deviceQuery",
  //设备分区查询
  "DEVIE_PARTITION": "http://192.168.1.7:8007/mqtt/redion",
  //设备修改参数
  "DEVIE_MODIFY": "http://192.168.1.7:8006/device/modify",
  //七天统计
  "DEVIE_DAYS": "http://192.168.1.7:8006/device/days",
  //消息查看
  "DEVIE_MESSAGE": "http://192.168.1.7:8006/message/see",
  //消息处理
  "DEVIE_DMESSAGE": "http://192.168.1.7:8007/message/delete",
  //盈利和使用情况
  "DEVIE_USE": "http://192.168.1.7:8007/statistics/list",
  //日志记录
  "DEVIE_LOG": "http://192.168.1.7:8006/message/record"
};
exports.API = API;
