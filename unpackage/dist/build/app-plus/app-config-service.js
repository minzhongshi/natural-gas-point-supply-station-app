
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","background":"#efeff4","navigationBar":{"backgroundColor":"#F8F8F8","titleText":"uni-app","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"天然气监控","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.7.11","entryPagePath":"pages/index/relaunch","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#999","selectedColor":"#007aff","borderStyle":"white","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/equipment/index","iconPath":"/static/tabBar/shebei.png","selectedIconPath":"/static/tabBar/slshebei.png","text":""},{"pagePath":"pages/statistics/index","iconPath":"/static/tabBar/tongji.png","selectedIconPath":"/static/tabBar/sltongji.png","text":""},{"pagePath":"pages/message/index","iconPath":"/static/tabBar/xiaoxi.png","selectedIconPath":"/static/tabBar/slxiaoxi.png","text":""},{"pagePath":"pages/me/index","iconPath":"/static/tabBar/wode.png","selectedIconPath":"/static/tabBar/slwode.png","text":""}],"midButton":{"iconPath":"static/tabBar/zenjia.png","iconWidth":"120rpx","height":"155rpx"},"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/index/relaunch","meta":{"isQuit":true,"isEntry":true,"enablePullDownRefresh":false,"disableScroll":true,"autoBackButton":"false","navigationBar":{"backgroundColor":"#5f4ac1","titleText":"","type":"default"},"isNVue":false}},{"path":"pages/login/work","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/equipment/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":0,"enablePullDownRefresh":false,"navigationBar":{"titleText":"设备","type":"default"},"isNVue":false}},{"path":"pages/statistics/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"enablePullDownRefresh":false,"navigationBar":{"titleText":"统计","type":"default"},"isNVue":false}},{"path":"pages/me/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":3,"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#5199ff","titleText":"我的","type":"default","titleColor":"#ffffff"},"isNVue":false}},{"path":"pages/message/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"enablePullDownRefresh":false,"navigationBar":{"titleText":"消息","type":"default"},"isNVue":false}},{"path":"pages/equipment/area/areaContent","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/message/details/details","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/me/jump/escalation","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/me/jump/password","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/me/jump/help","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  