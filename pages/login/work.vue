<template>
	<view class="container" :style="(ispdFocus || isuserFocus)?containerHeight.focus:containerHeight.blur">
		<view class="input-area">
			<view class="user-icon">
				<image :src="userImg" :style="isDisabledBtn?'opacity:0.5':'opacity:1'"></image>
			</view>
			<!-- 用户名输入框 -->
			<view class="input-text" :style="isuserFocus?input_boder_style.focus:input_boder_style.blur">
				<view :style="isuserFocus?label_style.focus:label_style.blur">
					帐 号
				</view>
				<uni-easyinput :inputBorder="false" v-model="userLoginInfo.id" focus placeholder="请输入工号"
					@input="input"></uni-easyinput>
			</view>
			<!-- 密码输入框 -->
			<view class="input-text" :style="ispdFocus?input_boder_style.focus:input_boder_style.blur">
				<view :style="ispdFocus?label_style.focus:label_style.blur">
					密 码
				</view>
				<uni-easyinput :inputBorder="false" type="password" v-model="userLoginInfo.password"
					placeholder="请输入密码"></uni-easyinput>
			</view>

			<!-- 登录按钮 -->
			<view class="btn">
				<button size="default" :loading="isLogining" :ripple="true"
					:style="isDisabledBtn? login_btn_style.disabled: login_btn_style.able" :disabled="isDisabledBtn"
					@click="login">{{isLogining?'':'登 录'}}</button>
			</view>

			<u-toast ref="uToast"></u-toast>
		</view>
		<!-- <view class="copy-right">天然气点供站检测平台</view> -->
		<view class="agreenment copy-right">
		  <navigator url="/pages/me/jump/password" open-type="navigate">忘记密码</navigator>
		</view>
	</view>
</template>

<script>
	import {userAccountStore, userToken} from '@/stores/counter.js'
	import ajax from '@/uni_modules/u-ajax/js_sdk'
	import URL from '@/api/user/index.js'
	export default {
		data() {
			return {
				// ------------- 其他 -------------
				userLoginInfo: {
					id: '',
					password: '',
					role: 'APP'
				},

				// 整体容器高度，单位 rpx

				// containerHeight: 1000,
				containerHeight: {
					focus: 'height:800rpx;transition:0.2s',
					blur: 'height:1300rpx;transition:0.2s'
				},

				// 获取焦点时，整体上移的动画效果
				animationData: {},

				// 登录界面的用户图标
				userImg: '../../static/img/user.png',

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
				clearImg: '../../static/img/clear.png',

				// 输入框 label 样式
				label_style: {
					focus: 'width:100rpx;display:flex;justify-content:center;color:#FF5242;font-weight:bold;transform:scale(1.1)',
					blur: 'width:100rpx;display:flex;justify-content:center;color:#aaaaaa;transform:scale(1)'
				},

				input_boder_style: {
					focus: 'border-bottom: 1px solid #FF5242;',
					blur: 'border-bottom: 1px solid #e4e4e4;'
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
			}
		},
		onShow() {
			// 去除状态栏
			plus.navigator.setFullscreen(true);
		},
		methods: {
			userFocus() {
				// 是否在焦点上
				this.isuserFocus = true
			},
			userBlur() {
				setTimeout(() => {
					this.isuserFocus = false
				}, 1)
			},

			pdFocus() {
				this.ispdFocus = true
			},
			pdBlur() {
				// 失去焦点事件先于清除事件触发，因此让其延迟即可先触发 clearInput 事件
				setTimeout(() => {
					this.ispdFocus = false
				}, 1)
			},

			// 清除 input 内容
			clearInput(value) {
				switch (value) {
					case 'id':
						// setTimeout(() => {
						this.userLoginInfo.id = ''
						// 清空内容之后保持焦点
						this.un = false
						this.$nextTick(() => {
							this.un = true
						})
						// }, 2)
						break
					case 'password':
						// setTimeout(() => {
						this.userLoginInfo.password = ''
						this.pd = false
						this.$nextTick(() => {
							this.pd = true
						})
						// }, 2)
						break
				}
			},
			login() {
				this.isLogining = true
								ajax.post({
									url: URL.USER_LOGIN,
								data: {
									...this.userLoginInfo
								},
								}).then(res => {
									console.log(res);
									if(res.data.code === 200){
										const store = userAccountStore()
										const token = userToken()
									store.$patch({
										information: res.data.data,
									})
									token.$patch({
										token:res.data.token
									})
									uni.showToast({
										title: '登录成功',
										duration: 2000,
									})
									// console.log(store.information);
									uni.switchTab({
										url: '/pages/equipment/index'
									})
									}else {
										uni.showToast({
											icon:'error',
											title: res.data.msg,
											duration: 2000,
										})
									}
									
									this.isLogining = false
								})
								this.isLogining = false
			}
		},
		watch: {
			userLoginInfo: {
				handler(newVal, oldVal) {
					if ((newVal.userName !== '') && (newVal.password !== '')) {
						this.isDisabledBtn = false
					} else {
						this.isDisabledBtn = true
					}
				},
				deep: true
			}
		}
	}
</script>

<style lang="scss">
	$screen-height: 1334rpx;

	page {
		background-color: #F8F8F8;
	}

	.container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		width: 100%;

		.input-area {
			width: 80%;

			.user-icon {
				width: 100%;
				display: flex;
				justify-content: center;

				>image {
					width: 150rpx;
					height: 150rpx;
				}
			}

			.input-text {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				margin-top: 100rpx;

				.clear {
					height: 100rpx;
					display: flex;
					align-items: center;

					.img {
						height: 36rpx;
						width: 36rpx;
					}
				}
			}

			.btn {
				margin-top: 100rpx;

				.login-btn {
					width: 100%;
					border-radius: 20rpx;
					border: $uni-primary;
					background-color: $uni-primary;
					color: $uni-main-color;
				}

				.able {
					width: 100%;
					height: 100rpx;
					border-radius: 20rpx;
					border: #e4e4e4;
					background-color: #FF5242;
					color: #fff
				}

				.disabled {
					width: 100%;
					height: 100rpx;
					border-radius: 20rpx;
					border: #e4e4e4;
					background-color: #FF5242;
					color: #fff;
					opacity: 0.5;
				}
			}
		}

		.copy-right {
			// bottom: 100rpx;
			bottom: 0;
			width: 100%;
			color: $uni-text-color-grey;
			text-align: center;
			font-size: 24rpx;
		}
		.agreenment {
		  display: flex;
		  flex-direction: row;
		  justify-content: center;
		  align-items: center;
		  font-size: 30rpx;
		  margin-top: 80rpx;
		  color: #FFA800;
		  text-align: center;
		  height: 40rpx;
		  line-height: 40rpx;
		}
		
		.agreenment text {
		  font-size: 24rpx;
		  margin-left: 15rpx;
		  margin-right: 15rpx;
		}
	}
</style>