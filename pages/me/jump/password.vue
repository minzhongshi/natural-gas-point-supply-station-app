<template>
	<view class="content">
		<view class="list">
			<view class="tishi">若您忘记了密码，可在此重新设置新密码。</view>
			<view class="list-call">
				<image class="img" src="/static/img/shilu-login/4.png"></image>
				<input class="sl-input" type="number" v-model="jobNumber" maxlength="15" placeholder="请输入工号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/img/shilu-login/1.png"></image>
				<input class="sl-input" type="number" v-model="phone" maxlength="11" placeholder="请输入手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/img/shilu-login/2.png"></image>
				<input class="sl-input" type="text" v-model="password" maxlength="32" placeholder="请输入新密码"
					:password="!showPassword" />
				<image class="img" :src="showPassword?'/static/img/shilu-login/op.png':'/static/img/shilu-login/cl.png'"
					@tap="display"></image>
			</view>
			<view class="list-call">
				<image class="img" src="/static/img/shilu-login/3.png"></image>
				<input class="sl-input" type="number" v-model="code" maxlength="6" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: !send }" @tap="getcode">{{send?'发送验证码':second+'s重新发送'}}</view>
			</view>
		</view>
		<view class="button-login" hover-class="button-hover" @tap="bindLogin()">
			<text>修改密码</text>
		</view>

	</view>
</template>

<script>
	import URL from '@/api/user/index.js'
	var _this, js;
	export default {
		data() {
			return {
				jobNumber: '',
				phone: '',
				second: 0,
				send:true,
				s:60,
				code: '',
				showPassword: false,
				password: ''
			}
		},
		onLoad() {},
		computed: {
		},
		onUnload() {
			// this.clear()
		},
		methods: {
			display() {
				this.showPassword = !this.showPassword
			},
			getcode() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.jobNumber.length != 12) {
					uni.showToast({
						icon: 'none',
						title: '工号不正确'
					});
					return;
				}
				let that = this
				if(!that.send){
					return false
				}
				that.send = false
				uni.request({
				  url: URL.USER_VERIFYCODE, 
				  data: {
				    mobile: this.phone
				  },
				  method: 'POST',
				  header: {
					"Content-Type": "application/x-www-form-urlencoded" 
				  },
				  dataType: 'json',
				  success: (res) => {
				    if (res.data.code != 200) {
				      uni.showToast({
				        title: res.msg,
				        icon: 'none'
				      });
				    } else {
					this.time;
				      uni.showToast({
				        title: "发送成功",
						icon:'none',
						success: () => {
							this.time()
						}
				      });
				    }
				  }
				});
			},
			bindLogin() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.jobNumber.length != 12) {
					uni.showToast({
						icon: 'none',
						title: '工号不正确'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码不小于6位'
					});
					return;
				}
				if (this.code.length != 6) {
					uni.showToast({
						icon: 'none',
						title: '验证码不正确'
					});
					return;
				}
				uni.request({
				  url: URL.USER_PASSWORD,
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
				  method: 'POST',
				  dataType: 'json',
				  success: (res) => {
					  console.log(res);
				    if (res.data.code != 200) {
				      uni.showToast({
				        title: res.data.msg,
				        icon: 'none'
				      });
				    } else {
				      uni.showToast({
				        title: "修改成功"
				      });
				      setTimeout(function() {
				        uni.navigateBack({
							delta: 1
						});
				      }, 1500)
				    }
				  }
				});

			},
			//倒计时
			time(){
					let that = this;
					that.second = that.s;
					let interval = setInterval(function(){
						if(that.second == 1){
							that.send = true;
							that.second = that.s;
							clearInterval(interval);
						}else {
							that.second--;
						}
					},1000)
				}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.tishi {
		color: #999999;
		font-size: 28rpx;
		line-height: 50rpx;
		margin-bottom: 50rpx;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		border-radius: 50rpx;
		line-height: 100rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}

	.yzm {
		color: #FF7D13;
		font-size: 24rpx;
		line-height: 64rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: auto;
		height: 64rpx;
		border: 1rpx solid rgba(255, 131, 30, 1);
		border-radius: 50rpx;
	}

	.yzms {
		color: #999999 !important;
		border: 1rpx solid #999999;
	}
</style>