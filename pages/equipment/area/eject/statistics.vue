<template>
	<view class="scroll">
		<scroll-view class="scroll1" scroll-x="true">
			<view :class="currentTab==index ? 'select' : ''" :data-current="index" @click="swichNav"
				v-for="(item,index) in scoll" :key='index'>{{item.txt}}
			</view>
		</scroll-view>
		<swiper :current="currentTab" @change="bindChange" class='swp'>
			<swiper-item>
				<view class="swiper-item">
					<dashboard :standId="standId" ref='child'></dashboard>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item1">
					<statistics :standId="standId" ref='child2'></statistics>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import dashboard from '@/components/chart/dashboard.vue'
	import statistics from '@/components/chart/statistics.vue'
	export default {
		components: {
			dashboard,
			statistics
		},
		props: {
			standId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				index: '0',
				chartShow: false,
				currentTab: 0,
				scoll: [{
					txt: '实时数据'
				}, {
					txt: '一周统计'
				}],
			}
		},
		onShow() {
			// 动态获取滑动页面高度
			const query = uni.createSelectorQuery().in(this);
			query.select('.list').boundingClientRect(data => {
				this.aheight = data.height
			}).exec();
		},
		methods: {
			open: function(index, chartShow) {
				this.chartShow = chartShow
				this.index =index
				this.$refs.child.open(this.index, this.chartShow)
				this.$refs.child2.open(this.index, this.chartShow)
			},
			// 滑动页面同步tab栏
			bindChange: function(e) {
				this.currentTab = e.detail.current
			},
			//点击tab切换
			swichNav: function(e) {
				var that = this;
				if (this.currentTab === e.target.dataset.current) {
					return false;
				} else {
					this.currentTab = e.target.dataset.current
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll {
		height: 800rpx;
		.scroll1 {
			width: 100%;
			white-space: nowrap;
			padding: 25rpx 0;

			& view {
				white-space: normal;
				display: inline-block;
			}

			& view:before {
				content: '|';
				color: #f4f4f4;
				margin: 0 30rpx;
			}

			& view:first-child:before {
				display: none;
			}

			.select {
				color: #fb6583;
			}
		}

		.swp {
			height: 650rpx;
			.swiper-item {
				height: 650rpx;
			}

			.swiper-item1 {
				width: 100%;
			}
		}
	}
</style>