<template>
	<view class="escalation">
		<uni-section title="信息上报" type="line">
			<view class="example">
				<uni-forms ref="valiForm" :rules="rules" :modelValue="baseFormData" label-position="top">
					<uni-forms-item label="上报类型" required name="typesOf">
						<uni-data-select v-model="baseFormData.typesOf" :localdata="range"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="上报站点" required name="site">
						<uni-data-picker popup-title="请选择站点" placeholder="请选择站点" :localdata="dataTree"
							v-model="baseFormData.site" @change="onchange">
						</uni-data-picker>
					</uni-forms-item>
					<uni-forms-item label="文字描述" required name="textDescription">
						<uni-easyinput type="textarea" v-model="baseFormData.textDescription" placeholder="请输入文字描述" />
					</uni-forms-item>
					<uni-forms-item label="上报视频">
						<htz-image-upload 
						dataType=0 mediaType='video' 
						name="vide"
						:max="1" v-model="baseFormData.video" @uploadSuccess="ceshiUploadSuccess" @uploadFail="uploadFail"
							:action="uri"
							:headers='headers'
							></htz-image-upload>
					</uni-forms-item>
				</uni-forms>
				<button style="margin-top: 150rpx;" type="primary" @click="submit('valiForm')">提交</button>
			</view>
		</uni-section>

	</view>
</template>

<script>
	import htzImageUpload from '@/components/htz-image-upload/htz-image-upload.vue'
	import ajax from '@/uni_modules/u-ajax/js_sdk'
	import URL from '@/api/user/dictionary.js'
	import URL2 from '@/api/user/device.js'
	import {userAccountStore} from '@/stores/counter.js'
	
	const counter = userAccountStore()
	export default {
		
		components: {
			htzImageUpload,
		},
		data() {
			return {
				range: [],
				dataTree: [],
				uri: URL.PUSH_VEDIO,
				headers:{"Content-Type": "multipart/form-data"},
				baseFormData: {
					typesOf: '',
					site: '',
					textDescription: '',
					video: [],
					siteId:''
				},
				rules: {
					typesOf: {
						rules: [{
							required: true,
							errorMessage: '类型不能为空'
						}]
					},
					site: {
						rules: [{
							required: true,
							errorMessage: '站点不能为空'
						}]
					},
					textDescription: {
						rules: [{
							required: true,
							errorMessage: '文字描述不能为空'
						}]
					},
				},
			};
		},
		created() {
			this.reportType();
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					//请求
					ajax.post({
								url: URL.PUSH_MESSAGE,
							data: {
								accountId: counter.information.id,
								   name: counter.information.username,
								   content: this.baseFormData.textDescription,
								   video: this.baseFormData.video[0],
								   type: this.baseFormData.typesOf,
								   site: this.baseFormData.site,
								   siteId: this.baseFormData.siteId
							},
							}).then(res => {
								if(res.data.code === 200){
									this.getLog('上报了一条消息',this.baseFormData.textDescription,this.baseFormData.video[0])
								uni.showToast({
									title: '上报成功',
									duration: 1000,
								})
								uni.navigateBack({
									delta: 1
								})
								}else {
									uni.showToast({
										title: res.data.msg,
										duration: 1000,
									})
								}	
							})
					
				}).catch(err => {
					console.log('err', err);
				})
			},
			ceshiUploadSuccess(res) { //上传成功
				/****************
				因为上传接口返回的结构不一致，所以以下代码需要根据实际的接口返回结构开发，在此只是展示如果给数组里添加的过程，仅供参考
				***************/
				var _res = JSON.parse(res.data);
				if (_res.code == 200) {
					let video = []
					video.push('http://192.168.1.7:8006'+_res.data);
					console.log(video);
					this.baseFormData.video = video;
				}
				/*******************************/
			},
			uploadFail(res) {
				uni.showToast({
					title: '上传失败',
					icon: 'none',
					duration: 1000
				}) 
			},
			reportType(){
				ajax.get({
							url: `${URL.PUSH_DICTIONARY}report-type`,
						}).then(res => {
							if(res.data.code === 200){
								for(let i in res.data.data){
									let obj = {
										text: res.data.data[i].dictLabel,
										value: res.data.data[i].dictLabel
										
									}
									this.range.push(obj)
								}
								
							
							}else {
								uni.showToast({
									title: res.data.msg,
									duration: 1000,
								})
							}
						});
						ajax.post({
									url: URL2.DEVIE_SITE,
									data:{},
								}).then(res => {
									if(res.data.code === 200){
										let data = []
										for(let i in res.data.data){
											let obj = {
												text: res.data.data[i].name,
												value: res.data.data[i].standId
												
											}
											data.push(obj)
										}
										this.dataTree = data;
										console.log(this.dataTree);
								
									}else {
										uni.showToast({
											title: res.data.msg,
											duration: 1000,
										})
									}
								})
			},
			//站点选择
			onchange(e){
				this.baseFormData.siteId = e.detail.value[0].value
				this.baseFormData.site = e.detail.value[0].text
			},
			getLog(msg,content,video){
				ajax.post({
					url: URL2.DEVIE_LOG,
					data: {
						siteId: this.baseFormData.siteId,
						siteName: this.baseFormData.site,
						operationContent: msg,
						operationName: counter.information.username,
						content:content,
						video:video
					}
				}).then(res => {
					
					if(res.data.code === 200){
						
					}else {
						uni.showToast({
							icon:'error',
							title: '日志记录失败',
							duration: 2000,
						})
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.escalation {
		height: 100vh;
		font-family: "montserrat";
		background-color: #fff;
	}

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>