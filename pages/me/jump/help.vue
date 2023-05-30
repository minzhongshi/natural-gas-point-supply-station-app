<template>
	<view>
		<leruge-empty text="系统问题请联系我们" type=""></leruge-empty>
		<view>
			<view @click.native="goContact('13208798001')">
				<leruge-empty text="13208798001" type="phone"></leruge-empty>
			</view>
			<view @click.native="launchApp(temp)">
				<leruge-empty text="2240941938@qq.com" type="email"></leruge-empty>
			</view>
		</view>
		<leruge-empty text="点击图标联系我们" type=""></leruge-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				temp: {
					name: 'QQ邮箱',
					pname: 'com.tencent.qqbizmailDistribute2',
					scheme: 'qqbizmailDistribute2://'
				}
			};
		},
		methods: {
			goContact(contact) {
				//#ifdef MP-WEIXIN
				uni.makePhoneCall({
					phoneNumber: contact
				});
				//#endif
				//#ifdef APP-PLUS
				plus.device.dial(contact, true);
				//#endif
			},
			launchApp(e) {
				let _this = this;
				// 判断平台
				if (plus.os.name) {
					if (plus.os.name == 'Android') {
						plus.runtime.launchApplication({
								pname: e.pname
							},
							function(e) {
								console.log('Open system default browser failed: ' + e.message);
							}
						);
					} else if (plus.os.name == 'iOS') {
						plus.runtime.launchApplication({
							action: e.scheme
						}, function(e) {
							console.log('Open system default browser failed: ' + e.message);
						});
					}
				} 
			}
		}
	}
</script>

<style lang="scss">

</style>