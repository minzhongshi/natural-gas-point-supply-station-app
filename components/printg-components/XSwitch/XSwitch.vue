<template>
	<view class="switchWrap">
		<switch :checked="value" @change="switchChange" color="#5677fc" style="transform:scale(0.7);transform-origin: left;" :disabled="disabled"/>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			value: {
				handler: function(val){
					this.switchValue = val;
				},
				immediate: true
			}
		},
		data(){
			return {
				switchValue: false
			}
		},
		methods: {
			switchChange(e){
				let val = e.detail.value;
				this.switchValue = val;
				this.$emit('input', val)
				
				this.$emit('change', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>