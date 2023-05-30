<template>
	<view class="eject">
		<view class="eject-statistics">
			<statistics :standId='standId' ref='child'></statistics>
		</view>
	</view>
</template>

<script>
	import statistics from '@/pages/equipment/area/eject/statistics.vue'
	export default {
		components: {
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
				index:'0',
				chartShow: false
			};
		},
		methods: {
			open: function(index) {
				this.index = index
				this.chartShow = true
				this.$refs.child.open(this.index, this.chartShow)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.eject {
		background-color: #fff;
		border-radius: 20px 20px 0 0;

		.eject-statistics {
			padding: 6%;
		}
	}
</style>