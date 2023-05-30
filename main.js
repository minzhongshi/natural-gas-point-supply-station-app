
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import Common from './static/js/common.js'
import Config from './static/js/config.js'



Vue.prototype.$Common = Common
Vue.prototype.$Config = Config
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import * as Pinia from 'pinia'
import { createUnistorage } from './uni_modules/pinia-plugin-unistorage'
// import ajax from './components/ajax/ajax.js'
//  app.config.globalProperties.$ajax = ajax


export function createApp() {
  const app = createSSRApp(App)
  const store = Pinia.createPinia()
  
  store.use(createUnistorage())
  
  app.use(store)
  return {
    app,
	Pinia
  }
}
// #endif