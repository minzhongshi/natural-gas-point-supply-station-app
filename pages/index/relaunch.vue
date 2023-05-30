<template>
	<view class="relaunch-page">
		<!-- <view class="relaunch-place">定位占位</view> -->
		<button plain class="relaunch-logn" @click="login()">{{phone}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '工 号 登 录',
				nowlocation: '',
				key: "1932a3ccce6d40ce7f5a613c263e28f7",
				amapPlugin: null,
			};
		},
		onLoad(options) {
			// this.prelogin();
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '/pages/login/work'
				})
			}
		},
		mounted() {},
		created() {}
	}
</script>

<style lang="scss">
	page {
		background-image: url('@/static/relaunch.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}

	.relaunch-page {
		width: 100%;
		height: 100%;
		position: relative;

		.relaunch-place {
			width: 150rpx;
			text-align: center;
			border: 2rpx aliceblue solid;
			border-radius: 25rpx;
			margin-left: 20rpx;
			color: aliceblue;
			justify-content: center;
		}

		.relaunch-logn {
			width: 70%;
			color: aliceblue;
			box-shadow: 0rpx 0rpx 10rpx 10rpx;
			margin-top: 130%;
			border-radius: 50rpx;
		}
	}
</style>