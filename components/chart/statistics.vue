<template>
	<view class="charts-box">
		<qiun-data-charts type="line" :opts="opts" :chartData="chartData" :resshow="delayload"/>
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
				delayload: false,
				categories:[],
				minPrice:[],
				maxPrice:[],
				device: {
					'0':'pressure',
					'1':'level',
					'2':'concentration',
					'3':'gconcentration'
				},
				name: {
					'0': 'Kpa',
					'1': '%',
					'2': '%LEL',
					'3': '%LEL'
				},
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					extra: {
						line: {
							type: "curve",
							width: 2,
							activeType: "hollow"
						}
					}
				}
			};
		},
		onReady() {
			// this.getServerData();
		},
		methods: {
			async open(index, chartShow) {
				uni.showLoading();
				this.getDays(index)
				//模拟从服务器获取数据时的延时
				await setTimeout(() => {
					this.delayload = true;
					uni.hideLoading();
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: this.categories,
						series: [{
								name: `最低(${this.name[index]})`,
								lineType: "dash",
								data: this.minPrice
							},
							{
								name: `最高(${this.name[index]})`,
								lineType: "dash",
								data: this.maxPrice
							}
						]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
					
				}, 1000);
			},
			getDays(index){
				ajax.post({
					url: URL.DEVIE_DAYS,
				data: {
					siteId: this.standId,
					deviceName: this.device[index]
				},
				header: {
					"Content-type": "application/x-www-form-urlencoded" 
				},
				}).then(res => {
					console.log(res);
					if(res.data.code === 200){
						let arrold = res.data.data
						let time = []
						let minPrice = []
						let maxPrice = []
						arrold.forEach(e => {
							time.push(e.time.slice(5))
							minPrice.push(parseFloat(e.minimum))
							maxPrice.push(parseFloat(e.highest))
						})
						this.categories = time
						this.minPrice = minPrice
						this.maxPrice = maxPrice
					}else {
						uni.showToast({
							icon:'error',
							title: res.data.msg,
							duration: 2000,
						})
					}
					
				})
			}
		}
	};
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>