"use strict";
const API = {
  //登录
  "USER_LOGIN": "http://192.168.1.7:8002/user/login",
  //登出
  "USER_LOGOUT": "http://192.168.1.7:8002/user/logout",
  //修改密码
  "USER_PASSWORD": "http://192.168.1.7:8006/auth/oauth/password",
  //验证码
  "USER_VERIFYCODE": "http://192.168.1.7:8006/auth/authentication/getVerifyCode"
};
exports.API = API;
