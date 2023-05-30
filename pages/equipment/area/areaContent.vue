<template>
	<view>
		<view>
			<uni-section title="储罐区" :sub-title="time || '时间未统计'" titleFontSize="18px"
				titleColor="#2979FF" subTitleFontSize="16px" type="circle">
				<template v-slot:right>
					<view style="display: flex; align-items:center;">
						<view style="display: flex; margin-right: 50rpx; align-items:center;">
							<uni-icons type="circle-filled" :color="bcolor[this.partition[0].state]"></uni-icons>
							<text
								:style="{'color':bcolor[this.partition[0].state], 'font-size':'18px'}">{{btext[this.partition[0].state]}}</text>
						</view>
						<button style="background: linear-gradient(#FF6F76, #FFA46A);color: #FFFFFF; "
							@click="showDrawer('showRight')">打开设置</button>
					</view>
				</template>
				<uni-group mode="card">
					<view style="display: flex;  justify-content: space-between;flex-wrap: wrap; ">
						<areaMonitor @tap.native="open('0')" name='储罐压力' :price="this.data.storageTank[0].price+' kpa'" :state="data.storageTank[0].state"
							show=true />
						<areaMonitor @tap.native="open('1')" name='储罐液位' :price="data.storageTank[1].price+' mmH2o'" :state="data.storageTank[1].state" show=true />
						<areaMonitor @tap.native="open('2')" name='燃气浓度' :price="data.storageTank[2].price+' %LEL'" :state="data.storageTank[2].state" show=true />
						<areaMonitor @tap.native="open('3')" name='气化区燃气浓度' :price="data.storageTank[3].price+' %LEL'" :state="data.storageTank[3].state" show=true />
						<areaMonitor name='当前体积' :price="data.storageTank[4].price+' m³'" :state="data.storageTank[4].state"/>
						<areaMonitor name='当前气体体积' :price="data.storageTank[5].price+' m³'" :state="data.storageTank[5].state"/>
						<areaMonitor name='当前质量' :price="data.storageTank[6].price+' t'" :state="data.storageTank[6].state"/>
						<areaMonitor name='最大补液体积' :price="data.storageTank[7].price+' m³'" :state="data.storageTank[7].state"/>
						<areaMonitor name='最大补液质量' :price="data.storageTank[8].price+' t'" :state="data.storageTank[8].state"/>
						<areaMonitor name='剩余液位' :price="data.storageTank[9].price+' %'" :state="data.storageTank[9].state"/>
					</view>
				</uni-group>
				<view style="height: 20rpx;"></view>
			</uni-section>
			<uni-section title="流量计区" :sub-title="time || '时间未统计'" titleFontSize="18px"
				titleColor="#2979FF" subTitleFontSize="16px" type="circle">
				<template v-slot:right>
					<view style="display: flex; align-items:center;">
						<view style="display: flex; margin-right: 50rpx; align-items:center;">
							<uni-icons type="circle-filled" :color="bcolor[this.partition[1].state]"></uni-icons>
							<text
								:style="{'color':bcolor[this.partition[1].state], 'font-size':'18px'}">{{btext[this.partition[1].state]}}</text>
						</view>
					</view>
				</template>
				<uni-group mode="card">
					<view style="display: flex;  justify-content: space-between;flex-wrap: wrap;">
						<areaMonitor name='瞬时流量' :price="data.flowmeter[10].price+' m/s'" :state="data.flowmeter[10].state"/>
						<areaMonitor name='流量计温度' :price="data.flowmeter[11].price+' ℃'" :state="data.flowmeter[11].state"/>
					</view>
				</uni-group>
				<view style="height: 20rpx;"></view>
			</uni-section>		
		</view>
		<uni-popup ref="popup" type="bottom">
			<view>
				<eject :standId="standId" ref="child"></eject>
			</view>
		</uni-popup>
		<uni-drawer ref="showRight" mode="right">
			<view class="scroll-view">
				<scroll-view class="scroll-view-box" scroll-y="true">
					<view class="switch">
						<view class="uni-list-cell-db">{{this.device}}</view>
						<view v-if="isShow">
							<switch @change="switchChange" color="#FF6F76" :checked="checked" />
						</view>

					</view>
					<view v-show="checked" >
						<modify @transfer="getMsg"></modify>
					</view>	
					<view class="close">
						<button @click="closeDrawer('showRight')">关闭</button>
						<button v-show="checked" @click="openConfirm"
							style="background: linear-gradient(#FF6F76, #FFA46A);color: #FFFFFF; ">确认</button>
					</view>
					<view style="height: 30rpx;"></view>
				</scroll-view>
			</view>
		</uni-drawer>
	</view>
</template>
<script>
	import areaMonitor from '@/pages/equipment/area/areaMonitor.vue'
	import eject from '@/pages/equipment/area/eject/eject.vue'
	import modify from '@/pages/equipment/area/eject/modify.vue'
	import URL from '@/api/user/device.js'
	import ajax from '@/uni_modules/u-ajax/js_sdk'
	import {userAccountStore} from '@/stores/counter.js'
	const counter = userAccountStore()
	export default {
		components: {
			areaMonitor,
			eject,
			modify
		},
		data() {
			return {
				data: [],
				partition: [],
				modify: {},
				index:'0',
				checked: false,
				isShow: true,
				device: '',
				standId: '',
				time: '',
				name: '',
				btext: {
					'0': '正常',
					'1': '异常',
					'2': '离线'
				},
				bcolor: {
					'0': '#42B983',
					'1': '#E32631',
					'2': '#505050'
				},
			};
		},
		onLoad(option) {
			let data = JSON.parse(decodeURIComponent(option.data))
			this.standId = data.standId
			this.time = data.time
			this.checked = data.state === '2' ? false : true
			this.device = data.state === '2' ? '设备离线' : '启用中'
			this.name = data.name
			uni.setNavigationBarTitle({
				title: data.name || '燃气站'
			});
		},
		created() {
			// this.getDevice()
			// this.getPartition()
		},
		onShow() {
			this.getDevice()
			this.getPartition()
		},
		methods: {
			open(index) {
				this.$refs.popup.open()
				this.$refs.child.open(index)
			},
			// 打开右侧窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 修改参数确定按钮
			openConfirm() {
				uni.showModal({
					title: '提示',
					content: '确认修改参数吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title:'修改中'
							});
							ajax.post({
								url: URL.DEVIE_MODIFY,
							data: {
								standId: this.standId,
								...this.modify
							}
							}).then(res => {
								if(res.data.code === 200){
									this.getLog('修改了设备阈值')
									this.partition  = res.data.data
								}else {
									uni.showToast({
										icon:'error',
										title: res.data.msg,
										duration: 2000,
									})
								}
								uni.hideLoading()
							})
						} else {

						}
					}
				})
				this.getDevice()
				this.getPartition()
			},
			// 设备开启与关闭
			switchChange: function(e) {
				let value = e.detail.value
				if (!value) {
					uni.showModal({
						title: '提示',
						content: '确定要关闭设备吗？',
						success: (res) => {
							if (res.confirm) {
								ajax.post({
									url: URL.DEVIE_CONTROLLER,
								data: {
									standId: this.standId,
									state: "2"
								},
								}).then(res => {
									if(res.data.code === 200){
										this.getLog('关闭了设备')
									this.device = '设备离线'
									this.checked = false
									uni.showToast({
										title: '关闭成功',
										icon: 'success',
										duration: 2000,
									})
									}else {
										uni.showToast({
											title: res.data.msg,
											duration: 1000,
										})
									}
								})
								this.getDevice()
								this.getPartition()
							} else {
								this.isShow = false
								this.checked = true
								this.$nextTick(() => {
									this.isShow = true
								})
							}
						}
					})
				} 
				else {
					ajax.post({
					url: URL.DEVIE_CONTROLLER,
					data: {
						standId: this.standId,
						state: "0"
					}
					}).then(res => {
						if(res.data.code === 200){
						this.getLog('启动了设备')
						this.device = '启用中'
						this.checked = true
						uni.showToast({
							title: '开启成功',
							icon: 'success',
							duration: 2000,
						})
						}else {
							uni.showToast({
								title: res.data.msg,
								duration: 1000,
							})
						}
					})
					this.getDevice()
					this.getPartition()
				}
			},
			getDevice(){
				uni.showLoading({
					title:'加载中'
				})
				ajax.post({
					url: URL.DEVIE_DEVICE,
				data: {
					standId: this.standId
				},
				header: {
					"Content-type": "application/x-www-form-urlencoded" 
				},
				}).then(res => {
					if(res.data.code === 200){
						this.data  = res.data.data
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
			getPartition(){
				uni.showLoading({
					title:'加载中'
				})
				ajax.post({
					url: URL.DEVIE_PARTITION,
				data: {
					standId: this.standId
				}
				}).then(res => {
					if(res.data.code === 200){
						this.partition  = res.data.data
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
			//子组件传值
			getMsg(msg){
				this.modify = msg
			},
			getLog(msg){
				const mod ={...this.modify};
				const string = `瞬时流量下限:${mod.flowBelow} 瞬时流量上限:${mod.flowUppere} 气化区燃气浓度上限:${mod.vaporizeGas} 燃气浓度上限:${mod.gas} 压力下限:${mod.pressureBelowe} 压力上限:${mod.pressureUppere}`
				ajax.post({
					url: URL.DEVIE_LOG,
					data: {
						siteId: this.standId,
						siteName: this.name,
						operationContent: msg,
						operationName: counter.information.username,
						content: string,
						video:''
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
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}

	.scroll-view {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1
	}

	.scroll-view-box {
		flex: 1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.info {
		padding: 15px;
		color: #666;
	}

	.info-text {
		font-size: 14px;
		color: #666;
	}

	.info-content {
		padding: 5px 15px;
	}

	.close {
		padding: 10px;
		display: flex;
	}

	.switch {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 30rpx;
	}
</style>