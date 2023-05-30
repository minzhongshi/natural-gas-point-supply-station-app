<template>
	<view class="device">
			<view class="device-search">
			<view class="city">
				<uni-data-picker :localdata="items"  placeholder="点击选择地区" popup-title="请选择地区"
					v-model="area" @popupopened="getAreaList" :clear-icon="false" @change="bindPickerChange">
				</uni-data-picker>
			</view>
			<uni-search-bar placeholder="请输入关键字搜索"  @clear="searchClear" @confirm="search" cancelButton="none" bgColor="#EEEEEE" :focus="true" :radius="100"
				v-model="state.name" ></uni-search-bar>
				<!-- @blur="blur" -->
		</view>
		<view class="device-classification">
			<uni-grid :column="2" :showBorder="false" :square="false" :highlight="false">
				<uni-grid-item v-for="(item, index) in parameter" :key="index" class="classification-item">
					<view @click.native="clickContent(item)">
						<areaCard :parameter='item'></areaCard>
					</view>
				</uni-grid-item>
			</uni-grid>
			<!-- <uni-load-more :status="status" :content-text="contentText" /> -->
		</view>
		
		<zwy-popup :ishide='isshow' width="466rpx" height="500rpx" radius="16rpx">
			<!-- 自定义展示内容 -->
			<view class="content">
				<view class="title">{{this.message}}</view>
				<view class="info">该站点需要处理</view>
				<view class="btn" @click="goMessage">立即处理</view>
			</view>
			<!-- 自定义关闭按钮 -->
			<view class="close" @click="isshow=false">✕</view>
		</zwy-popup>
	</view>
</template>

<script>
	import areaCard from '@/pages/equipment/area/areaCard.vue'
	import ajax from '@/uni_modules/u-ajax/js_sdk'
	import URL from '@/api/user/device.js'
	import {userAccountStore} from '@/stores/counter.js'
	
	const counter = userAccountStore()
	export default {
		components: {
			areaCard
		},
		data() {
			return {
				isshow: false,
				timer:null,
				message:'',
				area: '',
				address: {
					province: '',
					city: '',
					county: ''
				},
				status: 'loading',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				state: {
					areaId : null,
					name: '',
					state: null
				},
				items: [],
				parameter: []
			};
		},
		created() {
			this.standList()		
		},
		onShow() {
			this.standList()
			this.getMessage()
		},
		// 上拉加载更多,onReachBottom上拉触底函数
		onReachBottom: function() {
			this.status = 'more';
			this.loadMoreFunc();
		},
		mounted() {
			// const interval = () => {
			//   this.timer = setTimeout(() => {
			//     // 执行代码块
			// 	this.getMessage()
			// 	console.log(1);
			//     interval()
			//   }, 7000)
			// }
			// interval()
		},
		destroyed(){
		   clearTimeout(this.timer)
		},
		onHide() {
			clearTimeout(this.timer)
		},
		methods: {
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {
				uni.showToast({
					title: 'blur事件，输入值为：' + res.value,
					icon: 'none'
				})
			},
			bindPickerChange(e) {
				this.state.areaId = e.detail.value[2].value
				this.standList()
			},
			onnodeclick(e) {
				console.log(e);
			},
			clickContent(item) {
				uni.navigateTo({
					// url: 'test?id=1&name=uniapp'  c传递参数
					url: '/pages/equipment/area/areaContent?data=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			standList() {
				uni.showLoading({
					title:'加载中'
				})
				ajax.post({
					url: URL.DEVIE_SITE,
				data: {
					...this.state
				},
				}).then(res => {
					if(res.data.code === 200){
						this.parameter = res.data.data
					}else {
						uni.showToast({
							icon:'error',
							title: res.data.msg,
							duration: 2000,
						})
					}
					
					uni.hideLoading()
				})
			},
			search(res) {
				this.state.name = res.value
				this.standList()
			},
			getAreaList(){
				uni.showLoading({
					title:'加载中'
				})
				ajax.get({
					url: URL.DEVIE_AREA,
				}).then(res => {
					if(res.data.code === 200){
						this.items = res.data.data
					}else {
						uni.showToast({
							icon:'error',
							title: res.data.msg,
							duration: 2000,
						})
					}
					
					uni.hideLoading()
				})
			},
			searchClear(e){
				this.state.name = '',
				this.state.areaId = null,
				this.state.state = null
				this.standList()
			},
			getMessage(){
				ajax.post({
					url: URL.DEVIE_MESSAGE,
				data: {
					id: counter.information.id
				},
				header: {
					"Content-type": "application/x-www-form-urlencoded" 
				}
				}).then(res => {
					if(res.data.code === 200){
						if(res.data.data.length !== 0) {
							let data = res.data.data
							this.isshow = true
							// #ifdef MP
							wx.vibrateLong({
								success(){
									console.log('微信震动');
								}
							})
							// #endif
							
							// #ifdef APP
							uni.vibrateLong({
								success() {
									console.log('震动');
								}
							})
							// #endif
							let message = ''
							data.forEach( e => {
								message=message+'('+e.site+')'
							})
							this.message = message
						}
					}else {
						uni.showToast({
							icon:'error',
							title: res.data.msg,
							duration: 2000,
						})
					}
					  this.timer = setTimeout(() => {
						clearTimeout(this.timer)
					    // 执行代码块
						this.getMessage()
					  }, 7000)
				})
			},
			goMessage(){
				uni.switchTab({
							url: '/pages/message/index',
							animationType: 'pop-in',
							animationDuration: 300
						})
			}
			// loadMoreFunc:function(){
			//                 //展示loading
			//                 this.status = 'loading';            
			//                 page++;// 当上拉触发页码++
			//                 uni.request({
			//                     url:url+page, 
			//                     method:'GET',
			//                     data:{},
			//                     success:res =>{
			//                         newData=res.data;
			//                         //concat() 把它们连接起来不懂的可以查一下哦
			//                         this.List = this.List.concat(newData);
			//                     }
			//                     ,fail: res => {
			//                         this.status = 'noMore';  //没有数据时显示‘没有更多’
			//                     }
			//                 })
			//             }
		}
	}
</script>

<style lang="scss" scoped>
	.device {
		.device-search {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			background-color: #F8F8F8;
			border-top: 4rpx #EEEEEE solid;
			border-bottom: 10rpx #EEEEEE solid;
			margin: 8rpx 0;

			.city {
				/* #ifndef APP-PLUS-NVUE */
				display: flex;
				/* #endif */
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				margin-left: 40rpx;
				margin-right: 40rpx;
			}
		}

		.device-classification {
			.classification-item {
				padding: 14rpx 0;
			}
		}
		
		.content {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
		}
		
		.image {
			width: 115rpx;
			height: 115rpx;
			border-radius: 50%;
			background: #4CD964;
		}
		
		.title {
			font-size: 36rpx;
			margin: 40rpx 0 20rpx 0;
		}
		
		.info {
			margin: 10rpx 0 100rpx 0 ;
			font-size: 24rpx;
			text-align: center;
			width: 100%;
			background: #F5F5F5;
			border-radius: 16rpx;
			padding: 16rpx 0rpx;
		}
		
		.btn {
			width: 210rpx;
			height: 60rpx;
			font-size: 26rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 30rpx;
			background: linear-gradient(#FF6F76, #FFA46A);
		}
		
		.close {
			width: 60rpx;
			height: 60rpx;
			color: #FFFFFF;
			line-height: 60rpx;
			text-align: center;
			border-radius: 50%;
			border: 1px solid #FFFFFF;
			position: relative;
			bottom: -10%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>