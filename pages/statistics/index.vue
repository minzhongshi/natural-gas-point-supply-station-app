<template>
	<view class="body window">	
		<view class="data_body">
			<scroll-view class="scroll_list" scroll-y :style="{height:scrollHeight}">
				<!--站点用气盈利 -->
				<view class="view_block">
					<view class="title">盈利情况
					<text class="font-small" style="color: #ccc;">(站点)</text>
					</view>
					<progress-bar :content="RankData" @updateRanking="updateRanking"></progress-bar>
				</view>
				<!-- 站点用气占比 -->
				<view class="view_block">
					<view class="title">用气状况
						<text class="font-small" style="color: #ccc;">(站点)</text>
					</view>
					<view class="charts-box">
						<qiun-data-charts 
						type="rose" 
						:chartData="ProductRateData" 
						canvasId="school_a" 
						:canvas2d="isCanvas2d" 
						:resshow="delayload" />
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import ProgressBar from "@/components/chart/progress-bar.vue"
	import ajax from '@/uni_modules/u-ajax/js_sdk'
	import URL from '@/api/user/device.js'
	export default{
		components: {
			ProgressBar
		},  
		data() {
			return {
				info:'', //用户数据
				showDataTime: "today", //选中的时间
				scrollHeight:"600px", //数据展示体高度
				RankData:[],
				ProductRateData:[],
				isCanvas2d:true,
				delayload: false, //延时加载图表，否则会出现图表加载完后定位错乱
			};
		},
		created() {
			this.useList()
		},
		onShow() {
			this.useList()
		},
		computed: {
			locationArray() {
				return [{value:"GDBJ-ENTRY-1",text:"天猫"},{value:"GDBJ-ENTRY-201",text:"京东"}];
			}
		},
		methods: {
			async getData(){
				uni.showLoading();
				await setTimeout(() => {
					this.delayload = true;
					uni.hideLoading();
				}, 1000)
			},
			//获取设备信息
			 getTelephoneInfo() {},
			updateRanking(nVal){
				this.RankData = nVal;
			},
			color(){
				let r = Math.floor(Math.random()*256);
							let g = Math.floor(Math.random()*256);
							let b = Math.floor(Math.random()*256);
							let color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
							return color
			},
			useList(){
				uni.showLoading({
					title:'加载中'
				})
				ajax.post({
					url: URL.DEVIE_USE,
				data: {},
				}).then(res => {
					if(res.data.code === 200){
						let data = []
						let data2 = []
						let series = []
						// let res = res.data.data
						res.data.data.forEach(e =>{
							let obj = {
									"name": e.name,
									"num": e.turnover,
									"width":"",
									"background":this.color()
							}
							let obj2 = {
								"name": e.name,
								"value": e.used,
								"color": this.color()
							}
							data.push(obj)
							data2.push(obj2)
						})
						this.RankData = data
						this.ProductRateData = {
							"series": [
								{
									"data":[
										...data2
									]
								}
							]
						}

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
		},
		onLoad() {
			//#ifndef H5
			uni.showShareMenu();
			//#endif
			this.getData()
			this.getTelephoneInfo();
		}
	}
</script>

<style scoped lang="scss">
	.body{
		height: 100vh;
		margin: 0;
		padding: 0 20rpx;
		font-family: "montserrat";
		background-image: linear-gradient(125deg,#CB9FFE,#5894F7,#ABCDFA,#74A3F6,#CB9FFE);
		background-size: 400%;
		animation: bganimation 15s infinite;
	}
	li{
		list-style-type: none;
	}
	page,body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
	.window{
		height: 100vh;
		overflow: hidden;
		.topLine{
			width: 100%;
		}
		
		scroll-view {
			box-sizing: border-box;
		}
		.swiper {
			box-sizing: border-box;
		}
		
		.nav {
			background-size: 100% 100%;
		
			.back {
				font-size: 54rpx;
				padding: 20rpx 14rpx 15rpx 14rpx;
				color:#fff;
			}
			.title {
				color: #fff;
				font-size: 30rpx;
				flex: 1;
				text-align: center;
			}
			.hidden {
				visibility: hidden;
			}
		}
		
		.head {
			padding: 0 16rpx 14rpx 16rpx;
			color: #fff;
			background-color: #40A2ED;
			justify-content: space-between;
			font-size:26rpx!important;
			.calendar_drag{
				width: 340rpx;
				display: flex;
				justify-content: center;
				align-items:center;
				
				.calendar_name{
					margin-right: 10rpx;
				}
				.icon-calendar{
					font-size:26rpx;
					margin-top:4rpx;
				}
			}
		}
		
		.data_body {
			overflow: auto;
			text-align: center;
			color: #333333;
			background-repeat: repeat;
			margin-top: 60rpx;
			height: 100%;
			.scroll_list{
				height: 100%;
				.view_block{
					background-color: #fff;
					padding: 16rpx 20rpx 10rpx 20rpx;
					border-radius: 20rpx;
					margin-bottom: 40rpx;
					.title{
						text-align:left;
						margin-bottom: 30rpx;
						font-size: 30rpx;
					}
					.trend_title{
						text-align: right;
						font-size: 22rpx;
						color: #ff9900;
						margin-top: 50rpx;
					}
				}
			}
		}
	}
	@keyframes bganimation {
	  0%{
	    background-position: 0% 50%;
	  }
	  50%{
	    background-position: 100% 50%;
	  }
	  100%{
	    background-position: 0% 50%;
	  }
	}
</style>
