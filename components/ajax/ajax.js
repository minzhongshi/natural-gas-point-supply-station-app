// ajax.js
import {userAccountStore} from '@/stores/counter.js'

// 引入 uni-ajax 模块
import ajax from 'uni-ajax'

// 创建请求实例
const instance = ajax.create({
	// 初始配置
	userURL: 'http://192.168.1.7'
})

// 添加请求拦截器
instance.interceptors.request.use(
	config => {
		// 在发送请求前做些什么
		// const token = uni.getStorageSync('token').information.token
		// token && (config.header['Authorization'] = token)
		return config
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
instance.interceptors.response.use(
	response => {
		// 对响应数据做些什么
		if (response.data.code !== 1) {
		    uni.showToast({
		      title: response.data.msg,
		      icon: 'none'
		    })
		  }
		return response
	},
	error => {
		// 对响应错误做些什么
		return Promise.reject(error)
	}
)

// 导出 create 创建后的实例
export default instance