<template>
	<view class="areaCard" :style="[{backgroundColor: bcolor[parameter.state]}]">
		<uni-tag :text="btext[parameter.state]" :type="btype[parameter.state]" custom-style="border-radius: 35%;" />
		<view class="areaCard-text">{{parameter.name}}</view>
		<view class="areaCard-parameter">
			<view class="areaCard-2" v-if="parameter.state === '2'">
				<uni-section class="mb-10" bColor='#E9E9E9'  title="最近上传" :sub-title="parameter.time || '无'"
					type="line"></uni-section>
			</view>
			<view class="areaCard-1" v-else-if="parameter.state === '1'">
				<uni-section class="mb-10" bColor='#FFEDED' title="设备异常" :sub-title="parameter.error || '设备存在未检测到的异常'"
					type="line"></uni-section>
			</view>
			<view class="areaCard-0" v-else>
				<uni-list :border="false">
					<uni-list-item bColor="#E5F8FE" :border="false" title="所在区域"
						:rightText="parameter.area  || '未获取到数据'" />
					<uni-list-item bColor="#E5F8FE" :border="false" title="负责人"
						:rightText="parameter.headName || '未获取到数据'" />
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["parameter"],
		data() {
			return {
				bcolor: {
					'0': '#E5F8FE',
					'1': '#FFEDED',
					'2': '#E9E9E9'
				},
				btext: {
					'0': '正常',
					'1': '异常',
					'2': '离线'
				},
				btype: {
					'0': 'success',
					'1': 'error',
					'2': ''
				}
			};
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.areaCard {
		width: 342rpx;
		height: 270rpx;
		border-radius: 10%;
		margin: 0 auto;
		box-shadow: 2rpx 2rpx 4rpx 4rpx rgba(0, 0, 0, 0.1);

		.areaCard-text {
			font-weight: bold;
			margin: auto;
			width: 6em;
			text-overflow: ellipsis;
			overflow: hidden;
			word-break: break-all;
			white-space: nowrap;
		}

		.areaCard-parameter {
			.areaCard-0 {}

			.areaCard-1 {

				.mb-10 {}
			}
		}
	}
</style>