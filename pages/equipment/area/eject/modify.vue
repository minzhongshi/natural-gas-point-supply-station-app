<template>
	<view class="modify">
		<uni-section title="储罐压力上下限(kpa)" type="line">
			<view class="tabs">
				<view class="button" v-for="(item,index) in tankPressure.range" :key="index">
					<view :class="{'activity':index == classifyIndex}" class="btn"
						@click="chage(item.min,item.max,index,0)">
						{{item.min+'~'+item.max }}
					</view>
				</view>
			</view>
		</uni-section>

		<uni-section title="燃气浓度上限(%LEL)" type="line">
			<view class="tabs">
				<view class="button" v-for="(item,index) in gasConcentration.range" :key="index">
					<view :class="{'activity':index == classifyIndex2}" class="btn" @click="chage( 0,item.max,index,1)">
						{{item.max }}
					</view>
				</view>
			</view>
		</uni-section>

		<uni-section title="气化区燃气浓度上限(%LEL)" type="line">
			<view class="tabs">
				<view class="button" v-for="(item,index) in gGasConcentration.range" :key="index">
					<view :class="{'activity':index == classifyIndex3}" class="btn" @click="chage(0,item.max,index,2)">
						{{item.max }}
					</view>
				</view>
			</view>
		</uni-section>
		<uni-section title="瞬时流量上下限(m/s)" type="line">
			<view class="tabs">
				<view class="button" v-for="(item,index) in Instantaneous.range" :key="index">
					<view :class="{'activity':index == classifyIndex4}" class="btn"
						@click="chage(item.min,item.max,index,3)">
						{{item.min+'~'+item.max }}
					</view>
				</view>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import sRegionSlider from '@/components/s-region-slider/s-region-slider.vue'
	export default {
		components: {
			sRegionSlider
		},
		data() {
			return {
				classifyIndex: 0,
				classifyIndex2: 0,
				classifyIndex3: 0,
				classifyIndex4: 0,
				tankPressure: {
					minValue: 400,
					maxValue: 1000,
					range: [{
							min: 400,
							max: 1000
						},
						{
							min: 400,
							max: 600
						},
						{
							min: 400,
							max: 700
						},
						{
							min: 400,
							max: 800
						}
					]

				},
				gasConcentration: {
					maxValue: 25,
					range: [{
							max: 10,
						},
						{
							max: 20,
						},
						{
							max: 25,
						}
					]
				},
				gGasConcentration: {
					maxValue: 25,
					range: [{
							max: 10,
						},
						{
							max: 20,
						},
						{
							max: 25,
						}
					]
				},
				Instantaneous: {
					minValue: 6,
					maxValue: 10,
					range: [{
						min: 1,
						max: 2,
					}, {
						min: 4,
						max: 6,
					}, {
						min: 6,
						max: 8,
					},{
						min: 6,
						max: 10,
					}]
				},
			};
		},
		methods: {
			chage(minValue = 0, maxValue, index, position) {
				switch (position) {
					case 0:
						this.tankPressure.minValue = minValue;
						this.tankPressure.maxValue = maxValue;
						this.classifyIndex = index;
						break;
					case 1:
						this.gasConcentration.maxValue = maxValue;
						this.classifyIndex2 = index;
						break;
					case 2:
						this.gGasConcentration.maxValue = maxValue;
						this.classifyIndex3 = index;
						break;
					case 3:
						this.Instantaneous.minValue = minValue;
						this.Instantaneous.maxValue = maxValue;
						this.classifyIndex4 = index;
				}
				const obj = {
					'pressureUppere': this.tankPressure.maxValue,
					'pressureBelowe': this.tankPressure.minValue,
					'gas': this.gasConcentration.maxValue,
					'vaporizeGas': this.gGasConcentration.maxValue,
					'flowUppere': this.Instantaneous.maxValue,
					'flowBelow': this.Instantaneous.minValue
				}
				this.$emit('transfer',obj)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modify {
		.tabs {

			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-around;

			.button {
				padding: 20rpx 0;

				.btn {
					height: 55rpx;
					padding: 0 20rpx;
					text-align: center;
					line-height: 55rpx;
					border-radius: 15rpx;
					background-color: #F8F8F8;
				}

				.activity {
					background: linear-gradient(#FF6F76, #FFA46A);
					color: #FFFFFF;
				}
			}
		}
	}
</style>