<template>
	<view class="monitor">
	<!-- 	<view class="monitor-name">
			<uni-title type="h2" :title="name" align="left"></uni-title>
		</view>
		<view class="monitor-price">
			<uni-title type="h2" :title="price" align="center"></uni-title>
		</view> -->
		<view :class="['progress_block','block_'+state]">
			<view class="name">{{this.name}}</view>
			<view class="value">{{this.price}}</view>
			<view class="planet">
				<view class="planet_shadow"></view>
				<view class="crater1"></view>
				<view class="crater2"></view>
				<view class="crater3"></view>
				<view class="crater4"></view>
			</view>
			<view v-if="state !== '2'" class="star" :class="['star'+state]"></view>
			<view v-if="state !== '2'" class="star pink" :class="['star'+state]"></view>
			<view v-if="state !== '2'" class="star blue" :class="['star'+state]"></view>
			<view v-if="state !== '2'" class="star yellow" :class="['star'+state]"></view>
			<view v-if="show" class="monitor-icon">
				<uni-icons type="settings" size="20"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ''
			},
			price: {
				type: String,
				default: ''
			},
			state: {
				type: String,
				default: ''
			},
			show: {
				type: String,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.monitor {
		width: 312rpx;
		height: 250rpx;
		box-shadow: 2rpx 2rpx 4rpx 4rpx rgba(0, 0, 0, 0.1);
		border-radius: 20rpx;
		margin-bottom: 25rpx;

		.monitor-name {
			margin-left: 20rpx;
			height: 80rpx;
		}

		.monitor-price {
			height: 125rpx;
		}
	}
	.progress_block{
		width: 100%;
		border-radius: 20rpx;
		height: 250rpx;
		position: relative;
		overflow: hidden;
		
		.name{
			color: #fff;
			font-size: 35rpx;
			position: absolute;
			top: 20rpx;
			left: 10rpx;
			max-width: 300rpx;
		}
		.value{
			color: #fff;
			font-size: 40rpx;
			position: absolute;
			top: 40%;
			left: 25%;
			max-width: 300rpx;
		}
		.monitor-icon {
			position: absolute;
			bottom: 5%;
			right: 5%;
		}
		
		.circle{
			position: absolute;
			right: 8rpx;
			top: 16rpx;
		}
		.arcbar{
			position: absolute;
			right: -4rpx;
			top: 8rpx;
		}
	}
	.block_0{
		background-color: #3BDCAA;
	}
	.block_1{
		background-color: #FF6B8B;
	}
	.block_2{
		background-color: #DEE1E6;
	}
	.planet {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: #333;
		position: absolute;
		left: -13px;
		bottom: -26px;
		overflow: hidden;
		opacity: 0.5;
		z-index: 0;
	}
	
	.planet_shadow {
		position: absolute;
		border-radius: 50%;
		height: 100%;
		width: 100%;
		top: -40%;
		right: -10%;
		border: 35px solid rgba(0, 0, 0, .15);
	}
	
	.crater1,
	.crater2,
	.crater3,
	.crater4 {
		position: absolute;
		border-radius: 50%;
		background: rgba(0, 0, 0, .3);
		box-shadow: inset 3px 3px 0 rgba(0, 0, 0, .2);
	}
	
	.crater1 {
		width: 20px;
		height: 20px;
		left: 25%;
		top: 20%;
	}
	
	.crater2 {
		width: 10px;
		height: 10px;
		left: 50%;
		top: 60%;
	}
	
	.crater3 {
		width: 15px;
		height: 15px;
		left: 30%;
		top: 65%;
	}
	
	.crater4 {
		width: 15px;
		height: 15px;
		left: 60%;
		top: 35%;
	}
	
	.star {
		display: block;
		width: 23rpx;
		height: 23rpx;
		border-radius: 50%;
		background: #FFF;
		top: 20rpx;
		left: 50rpx;
		position: relative;
		transform-origin: 100% 0;
		box-shadow: 0 0 10rpx 10rpx rgba(255, 255, 255, .3);
		opacity: 0;
		z-index: 2;
	}
	.star0{
		animation: star-ani 4s infinite ease-out;
	}
	.star1{
		animation: star-ani 5s infinite ease-out;
	}
	.star2{
		animation: star-ani 6s infinite ease-out;
	}
	.star3{
		animation: star-ani 7s infinite ease-out;
	}
	
	.star:after {
		content: '';
		display: block;
		top: 40rpx;
		left: 100rpx;
		border: 0rpx solid #fff;
		border-width: 0px 180rpx 4rpx 180rpx;
		border-color: transparent transparent transparent rgba(255, 255, 255, .3);
		transform: rotate(-45deg) translate3d(2rpx, 6rpx, 0);
		box-shadow: 0 0 2rpx 0 rgba(255, 255, 255, .1);
		transform-origin: 0% 100%;
		animation: shooting-ani 100s infinite ease-out;
	}
	
	.pink {
		top: 20rpx;
		left: 100rpx;
		background: #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}
	
	.pink:after {
		border-color: transparent transparent transparent #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}
	
	.blue {
		top: 30rpx;
		left: 140rpx;
		background: cyan;
		animation-delay: 7s;
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
	}
	
	.blue:after {
		border-color: 'transpareanimation-delay: 12s';
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
		animation-delay: 7s;
	}
	
	.yellow {
		top: 0rpx;
		left: 160rpx;
		background: #ffcd5c;
		animation-delay: 5.8s;
	}
	
	.yellow:after {
		border-color: transparent transparent transparent #ffcd5c;
		animation-delay: 5.8s;
	}
	@keyframes star-ani {
		0% {
			opacity: 0;
			transform: scale(0) rotate(0) translate3d(0, 0, 0);
			-webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
			-moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
		}
	
		50% {
			opacity: 0.5;
			transform: scale(1) rotate(0) translate3d(-20px, 20px, 0);
			-webkit-transform: scale(1) rotate(0) translate3d(-20px, 20px, 0);
			-moz-transform: scale(1) rotate(0) translate3d(-20px, 20px, 0);
		}
	
		100% {
			opacity: 0;
			transform: scale(1) rotate(0) translate3d(-30px, 30px, 0);
			-webkit-transform: scale(1) rotate(0) translate3d(-30px, 30px, 0);
			-moz-transform: scale(1) rotate(0) translate3d(-30px, 30px, 0);
		}
	}
</style>