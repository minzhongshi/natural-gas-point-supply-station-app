<template>
	<view class="container" :class="[disabled?'disabled':'']">
		<picker @change="pickerChange" :value="selectIndex" :range="options" :range-key="labelKey" :disabled="disabled">
			<view class="pickerText">{{ options[selectIndex] && options[selectIndex][labelKey] || '请选择' }}</view>
		</picker>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [String,Number],
				default: ''
			},
			options: {
				type: Array,
				default: () => []
			},
			disabled: {
				type: Boolean,
				default: false
			},
			labelKey: {
				type: String,
				default: 'label'
			},
			valueKey: {
				type: String,
				default: 'value'
			}
		},
		watch: {
			optionsChange: {
				handler: function(nval){
					let findIndex = null;
					nval.options.map((item,index) => {
						if(item[nval.valueKey] == nval.value){
							findIndex = index;
						}
					})
					
					this.selectIndex = findIndex;
				},
				immediate: true,
				deep: true
			}
		},
		computed: {
			optionsChange(){
				let {
					value,
					options,
					labelKey,
					valueKey
				} = this;
				return {
					value,
					options,
					labelKey,
					valueKey
				};
			}
		},
		data(){
			return {
				pickerShow: false,
				selectIndex: null,
			}
		},
		methods: {
			pickerChange(e) {
				let value = e.detail.value;
				this.selectIndex = value;
				this.$emit('input', this.options[value][this.valueKey])
				this.$emit('change', this.options[value])
			}
			// ,
			// change(e){
			// 	let val = e.detail.value;
			// 	this.$emit('input', val)
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		
		&.disabled{
			.pickerText{
				color: #8f8f94;
			}
		}
		
		.pickerText{
			font-size: 28rpx;
		}
	}
</style>