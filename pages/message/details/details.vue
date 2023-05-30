<template>
	<view>
		<view class="details">
			<uni-card :title="data.site" :sub-title="data.type"  padding="10px 0">
				<text class="uni-body uni-mt-5">{{this.data.content}}</text>
				<view  slot="actions" class="card-actions">
					<view>
						<view v-if="this.data.video">
							<video :src="this.data.video" @error="videoErrorCallback" controls></video>
						</view>
						<view>上传人：{{this.data.name}}</view>
						<view>上传时间：{{this.data.time}}</view>
					</view>
				</view>
			</uni-card>
			<button style="background: linear-gradient(#FF6F76, #FFA46A);color: #FFFFFF; width: 80%;"
				@click="deleteMessage()">已处理</button>
		</view>
	</view>
</template>

<script>
	import ajax from '@/uni_modules/u-ajax/js_sdk'
	import URL from '@/api/user/device.js'
	import {userAccountStore} from '@/stores/counter.js'
	const counter = userAccountStore()
	export default {
		data() {
			return {
				data: []
			};
		},
		methods: {
			deleteMessage(){
				uni.showModal({
					title: '提示',
					content: '确认已处理了吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
					title:'清除中'
				})
				ajax.post({
					url: URL.DEVIE_DMESSAGE,
					data: {
						id: this.data.id
					}
				}).then(res => {
					if(res.data.code === 200){
						this.getLog()
						uni.showToast({
							title: '处理成功',
							duration: 2000,
						});
						uni.navigateBack({
							delta:1
						});
					}else {
						uni.showToast({
							icon:'error',
							title: res.data.msg,
							duration: 2000,
						})
					}
					
					uni.hideLoading()
				})
						}
					}
				})
				
			},
			getLog(){
				ajax.post({
					url: URL.DEVIE_LOG,
					data: {
						siteId: this.data.id,
						siteName: this.data.content,
						operationContent: `处理了一条来自${this.data.name}的消息`,
						operationName: counter.information.username,
					}
				}).then(res => {
					if(res.data.code === 200){
						
					}else {
						uni.showToast({
							icon:'error',
							title: '日志记录失败',
							duration: 2000,
						})
					}
					
				})
			}
		},
		onLoad(option) {
			let data = JSON.parse(decodeURIComponent(option.data))
			this.data = data
			console.log(this.data);
		},
	}
</script>

<style lang="scss" scoped>
	.details {
		.uni-body {
			width: 95%;
			word-break: break-all
		}

		.card-actions {
			display: flex;
			justify-content: center;
			margin-bottom: 50rpx;
		}
	}
</style>