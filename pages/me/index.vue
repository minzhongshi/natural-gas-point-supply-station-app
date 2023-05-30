<template>
  <view class="page">
    <view class="top">
      <view class="background"></view>
    </view>
    <view class="user-card">
      <view class="card">
        <view class="top">
          <view class="userImage">
            <view class="userName">{{this.imageChat}}</view>
          </view>
        </view>
        <view class="bottom">
          <view class="left">
            <view class="user-text">
				<view>{{this.hoursTip}},{{this.information.username}}!</view>
            </view>
            <view class="user-phone"> {{this.information.id}} </view>
          </view>
          <view class="right flex-center">
            <u-icon class="icon" name="arrow-right"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <view class="list-card">
      <view class="card">
        <view class="item item-bottom-solid" @click.native="gopege('escalation')">
          <view class="left flex-center">
            <image src="@/static/img/me/1.png" mode="aspectFit"></image>
          </view>
          <view class="center">
            <text>上报</text>
          </view>
          <view class="right flex-center">
           <uni-icons color="#96a1ae"  type="forward"></uni-icons>
          </view>
        </view>
      </view>
	  <view class="card">
	    <view class="item item-bottom-solid" @click.native="gopege('help')">
	      <view class="left flex-center">
	        <image src="@/static/img/me/qiu.png" mode="aspectFit"></image>
	      </view>
	      <view class="center">
	        <text>服务与帮助</text>
	      </view>
	      <view class="right flex-center">
	        <uni-icons color="#96a1ae"  type="forward"></uni-icons>
	      </view>
	    </view>
	  </view>
	  <view class="card">
	    <view class="item" @click.native="gopege('password')">
	      <view class="left flex-center">
	        <image src="@/static/img/me/2.png" mode="aspectFit"></image>
	      </view>
	      <view class="center">
	        <text>修改密码</text>
	      </view>
	      <view class="right flex-center">
	        <uni-icons  color="#96a1ae"  type="forward"></uni-icons>
	      </view>
	    </view>
	  </view>
    </view>
     <view class="quit flex-center">
        <view class="btn flex-center" @click.native="goExit">
          退出登录
        </view>
     </view>
  </view>
</template>
 
<script>
	import {userAccountStore, userToken} from '@/stores/counter.js'
	import ajax from '@/uni_modules/u-ajax/js_sdk'
	import URL from '@/api/user/index.js'
	
//import {  } from "@/common/api/{$}.js";
export default {
  data() {
    return {
		information:{},
		imageChat: '',
		hoursTip: '早上好'
	};
  },
  //监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad
  onInit() {},
  //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
  onLoad() { },
  //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady() { },
  //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
  beforeDestroy() {},
  //页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
  onReachBottom() {},
  onShareAppMessage(res) {},
  created() {
	  const store = userAccountStore()
	  this.information = store.information
	  this.imageChat = store.information.username.charAt(0)
	  this.gotime()
	  console.log(store.token);
  },
  methods: {
	  goExit(){
		  const token = userToken()
		  uni.showModal({
		  		title: '提示',
		  		content: '确定要退出登录吗？',
		  		success: function(res) {
		  		if (res.confirm) {
						ajax.get({
						url: URL.USER_LOGOUT,
						header: {
								token: token.token
						}
					}).then(res => {
						console.log(res);
						if(res.data.code === 200){
							uni.showToast({
								title: '退出成功',
								duration: 2000,
							})
							// 执行确认后的操作
							uni.clearStorage()
							 uni.redirectTo({
								// url: 'test?id=1&name=uniapp'  c传递参数
								url: '/pages/index/relaunch'
							})
						}else {
							uni.showToast({
								icon:'error',
								title: res.data.msg,
								duration: 2000,
							})
						}	
					})
					
		  		} 
		  		else {
		  			// 执行取消后的操作
		  		}
		  	}
		  })
		  
	  },
	  gotime(){
		  let date=new Date();

		  if(date.getHours()>=0&&date.getHours()<12){
		  
		  　　　　this.hoursTip="上午好"
		  
		  　　}else if(date.getHours()>=12&&date.getHours()<18){
		  
		  　　　　this.hoursTip="下午好"
		  
		  　　}else{
		  
		  　　　　this.hoursTip="晚上好"
		  
		  　　}
	  },
	  gopege(address) {
		  uni.navigateTo({
		  	// url: 'test?id=1&name=uniapp'  c传递参数
		  	url: `/pages/me/jump/${address}`
		  })
	  },
  },
};
</script>

 <style lang="scss" scoped>
.top {
  height: 250rpx;
  position: relative;
  .background {
    background-color: #5199ff;
    border-bottom-left-radius: 22px;
    border-bottom-right-radius: 22px;
    position: absolute;
    height: 180rpx;
    width: 100%;
  }
}
.icon {
  color: #96a1ae;
  font-size: 40rpx;
}
.user-card {
  height: 170rpx;
  padding: 0 15px;
  .card {
    position: relative;
    bottom: 62px;
    height: 250rpx;
    background-color: white;
    border-radius: 5px;
    .top {
      height: 30%;
      position: relative;
      .userImage {
		background-image: linear-gradient(125deg,#CB9FFE,#5894F7,#ABCDFA,#74A3F6,#CB9FFE);
		background-size: 400%;
		animation: bganimation 15s infinite;
        position: absolute;
        bottom: 24%;
        left: 10%;
        width: 150rpx;
        height: 150rpx;
        overflow: hidden;
        border-radius: 50%;
		.userName {
			color: #FFFFFF;
			text-align: center;
			font-size: 45rpx;
			line-height: 150rpx;
		}
      }
    }
    .bottom {
      display: flex;
      height: 70%;
      .left {
        width: 80%;
        height: 100%;
        position: relative;
        .user-text {
          width: 100%;
          font-size: 1.6em;
          padding-left: 80rpx;
          height: 50%;
        }
        .user-phone {
          color: #96a1ae;
          padding-left: 80rpx;
          height: 50%;
          width: 100%;
          font-size: 0.9em;
        }
      }
      .right {
        width: 20%;
        height: 50%;
      }
    }
  }
}
.list-card {
  padding: 0 15px;
  .card {
    border-radius: 5px;
    position: relative;
    background-color: white;
    border-radius: 5px;
    padding: 5px 30px;
    .item {
      display: flex;
      height: 120rpx;
      .left {
        width: 15%;
        image {
          width: 70rpx;
          height: 70rpx;
        }
      }
      .center {
        width: 65%;
        display: flex;
        justify-content: start;
        align-items: center;
        font-size: 1.1em;
      }
      .right {
        width: 20%;
        justify-content: flex-end;
      }
    }
  }
}
.item-bottom-solid {
  border-bottom: 1px solid #d4d6da;
}
.quit{
  height: 100rpx;
  margin-top: 50px;
  .btn{
    background-color: #4f99ff;
    border-radius: 30px;
    width: 80%;
    color: white;
    font-size: 1.2em;
    height: 100%;
  }
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes bganimation {
	  0%{
	    background-position: 0% 50%;
	  }
	  50%{
	    background-position: 100% 50%;
	  }
	  100%{
	    background-position: 0% 50%;
	  }
	}
</style>