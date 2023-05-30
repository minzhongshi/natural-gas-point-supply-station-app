<template>
	<view class="leruge-empty" v-if="show" :style="{
		marginTop: marginTop + 'rpx'
	}">
		<uni-icons size="43" :type="type" color="#c0c4cc"></uni-icons>
		<view style="margin-top: 20rpx;">
			<text style="color: #c0c4cc;font-size: 28rpx;">{{text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "leruge-empty",
		props: {
			// 提示文字
			text: {
				type: String,
				default: '暂无数据'
			},
			// 选择uni-icons图片
			type: {
				type: String,
				default: 'minus'
			},
			// 组件距离上一个元素之间的距离
			marginTop: {
				type: [String, Number],
				default: 0
			},
			// 是否显示组件
			show: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style scoped lang="scss">
	.leruge-empty {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding-bottom: 100rpx;
	}
</style>
