<template>
	<view class="charts-box">
		<qiun-data-charts type="gauge" :opts="opts" :chartData="chartData" :resshow="delayload"/>
	</view>
</template>

<script>
	import URL from '@/api/user/device.js'
	import ajax from '@/uni_modules/u-ajax/js_sdk'
	export default {
		props: {
			standId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				data: 0,
				delayload: false,
				name: {
					'0': '储罐压强',
					'1': '储罐液位',
					'2': '燃气浓度',
					'3': '气化区燃气浓度'
				},
				price: {
					'0': 0,
					'1': 0,
					'2': 0,
					'3': 0
				},
				price2: {
					'0': '0Kap',
					'1': '0mmH2o',
					'2': '0%LEL',
					'3': '0%LEL'
				},
				endNumber: {
					'0': 1000,
					'1': 4000,
					'2': 25,
					'3': 25
				},
				startNumber: {
					'0': 400,
					'1': 0,
					'2': 0,
					'3': 0
				},
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['gauge'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: undefined,
					title: {
						name: "430.80Kpa",
						fontSize: 25,
						color: "#2fc25b",
						offsetY: 50
					},
					subtitle: {
						name: "储罐压强",
						fontSize: 15,
						color: "#666666",
						offsetY: -50
					},
					extra: {
						gauge: {
							type: "default",
							width: 30,
							labelColor: "#666666",
							startAngle: 0.75,
							endAngle: 0.25,
							startNumber: 400,
							endNumber: 1000,
							labelFormat: "",
							splitLine: {
								fixRadius: 0,
								splitNumber: 10,
								width: 30,
								color: "#FFFFFF",
								childNumber: 5,
								childWidth: 12
							},
							pointer: {
								width: 24,
								color: "auto"
							}
						}
					}
				}
			};
		},
		mounted() {
			// this.getServerData();
		},
		methods: {
			 async open(index, chartShow) {
				uni.showLoading();
			   this.getDevice(index)
				await setTimeout(()=>{
					//模拟从服务器获取数据时的延时
					this.delayload = true;
					uni.hideLoading();
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					 let res = {
						categories: [{
							"value": 0.2,
							"color": "#1890ff"
						}, {
							"value": 0.8,
							"color": "#2fc25b"
						}, {
							"value": 1,
							"color": "#f04864"
						}],
						series: [{
							name: "",
							data: this.data
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				},500)
			
			},
			getDevice(index){
				ajax.post({
					url: URL.DEVIE_DEVICE,
				data: {
					standId: this.standId
				},
				header: {
					"Content-type": "application/x-www-form-urlencoded" 
				},
				}).then(res => {
					console.log(res);
					if(res.data.code === 200){

						this.price[0] =  parseFloat(res.data.data.storageTank[0].price)
						this.price[1] =  parseFloat(res.data.data.storageTank[1].price)
						this.price[2] =  parseFloat(res.data.data.storageTank[2].price)
						this.price[3] =  parseFloat(res.data.data.storageTank[3].price)
						
						this.price2[0] =  res.data.data.storageTank[0].price+'Kap'
						this.price2[1] =  parseFloat(res.data.data.storageTank[1].price)/40+'%'
						this.price2[2] =  res.data.data.storageTank[2].price+'%LEL'
						this.price2[3] =  res.data.data.storageTank[3].price+'%LEL'
						
						this.data = (this.price[index] - this.startNumber[index]) / (this.endNumber[index] -this.startNumber[index])
						this.opts.subtitle.name = this.name[index]
						this.opts.extra.gauge.endNumber = this.endNumber[index]
						this.opts.extra.gauge.startNumber = this.startNumber[index]
						this.opts.title.name = this.price2[index]
					}else {
						uni.showToast({
							icon:'error',
							title: res.data.msg,
							duration: 2000,
						})
					}
					
				})
			},
		}
		
	};
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 650rpx;
	}
</style>