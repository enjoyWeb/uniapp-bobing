<template>
	<view class="ranking">
		<!-- 返回主页 -->
		<view :style="{'top': (nav_ioc_top) + 'px'}" class="nav_ioc">
			<view class="nav_box">
				<image class="nav_back" src="../../static/fanhui.png" @tap="back"></image>
				<view style="width: 2upx;height: 40upx; background-color: #ececec;"></view>
				<image class="nav_page" src="../../static/zhuye.png" @tap="backpage"></image>
			</view>
		</view>
		<view class="ranking_top">
			<!-- 第一 -->
			<image class="one_img" :src="topList[0].avatar"></image>
			<view class="one_name">{{topList[0].nickname}}</view>
			<view class="one_number">{{topList[0].prize_times}}次</view>
			<!-- 第二 -->
			<image class="two_img" :src="topList[1].avatar"></image>
			<view class="two_name">{{topList[1].nickname}}</view>
			<view class="two_number">{{topList[1].prize_times}}次</view>
			<!-- 第三 -->
			<image class="there_img" :src="topList[2].avatar"></image>
			<view class="there_name">{{topList[2].nickname}}</view>
			<view class="there_number">{{topList[2].prize_times}}次</view>
		</view>
		<view class="ranking_content">
			<!-- 后续排名 -->
			<view class="ranking_bottom">
				<view class="ranking_bottom_box" v-for="(item,key) in list">
					<view class="serial_number">{{key+4}}</view>
					<view class="box">
						<view class="box_left">
							<image class="box_img" :src="item.avatar"></image>
							<view class="box_word">{{item.nickname}}</view>
						</view>
						<view class="box_right">{{item.prize_times}}次</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				topList: [
					{
						avatar:'',
						nickname:'',
						prize_times:0
					},{
						avatar:'',
						nickname:'',
						prize_times:0
					},{
						avatar:'',
						nickname:'',
						prize_times:0
					}
				],
				list: [],
				page: 1,
				isLoading: true,
				nav_ioc_top:0,
			}
		},
		onReachBottom(){
			var _this = this;
			var page = this.page;
			if (!this.isLoading) {
				uni.showToast({
					title: '暂无更多',
					'icon': 'none'
				});
				return;
			}
			this.$api.getUserRank({
				page: page
			}).then(res => {
				if (res.data.code == 1) {
					_this.list = _this.list.concat(res.data.info);
					_this.page = _this.page + 1;
					_this.isLoading = true;
				} else {
					_this.isLoading = false;
				}
			})
		},
		onLoad() {
			var res = wx.getSystemInfoSync();
			console.log(res);
			this.scrollerHeight = res.windowHeight - 155;
			var titleBarHeight=48;
			if (res.platform == "ios") {
				titleBarHeight=44;
			} 
			this.nav_ioc_top = res.statusBarHeight + (titleBarHeight - 32) / 2;
		},
		onShow() {
			var _this = this;
			var page = this.page;
			if(page==1){
				this.$api.getUserRank({
					page: page
				}).then(res => {
					if (res.data.code == 1) {
						//摘除前三
						if (page == 1) {
							_this.topList=[];
							for (var i = 0; i < 15; i++) {
								if (i < 3) {
									if (res.data.info[i] != undefined) {
										_this.topList.push(res.data.info[i]);
									} else {
										_this.topList.push({
											'avatar': '',
											'nickname': '',
											'prize_times': 0
										})
									}
								} else {
									if (res.data.info[i] != undefined) {
										_this.list.push(res.data.info[i]);
									}
								}
				
							}
							_this.page = 2;
							_this.isLoading = true;
						}
					} else {
						_this.isLoading = false;
					}
				})
			}
		},
		methods: {

			backpage() {
				uni.navigateBack({
					delta: 1
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			}

		}
	}
</script>

<style>
	.ranking {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #333333;
		font-family: "黑体";

	}

	.ranking_top {
		background: url(http://test.chinajishu.com/WechatIMG1795.jpeg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 607upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* 前三 开始 */
	.one_img {
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
		position: absolute;
		top: 91upx;
		left: 296upx;
	}

	.one_name {
		width: 140upx;
		font-size: 26upx;
		color: #FFFFFF;
		position: absolute;
		top: 319upx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		text-align: center;
	}

	.one_number {
		font-size: 26upx;
		color: #FFFFFF;
		position: absolute;
		top: 383upx;
		left: 345upx;
	}

	.two_img {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		position: absolute;
		top: 215upx;
		left: 90upx;
	}

	.two_name {
		width: 140upx;
		font-size: 26upx;
		color: #FFFFFF;
		position: absolute;
		top: 385upx;
		left: 70upx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		text-align: center;
	}

	.two_number {
		font-size: 26upx;
		color: #FFFFFF;
		position: absolute;
		top: 440upx;
		left: 120upx;
	}

	.there_img {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
		position: absolute;
		top: 249upx;
		right: 95upx;
	}

	.there_name {
		width: 140upx;
		font-size: 26upx;
		color: #FFFFFF;
		position: absolute;
		top: 378upx;
		right: 75upx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		text-align: center;
	}

	.there_number {
		width: 100upx;
		font-size: 26upx;
		color: #FFFFFF;
		position: absolute;
		top: 437upx;
		right: 70upx;
	}

	/* 前三 结束 */
	.ranking_content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		background-color: #FFFFFF;
	}

	.ranking_bottom {
		padding-top: 70upx;
		width: 92%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.ranking_bottom_box {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		display: flex;
		flex-direction: row;
		padding-bottom: 20upx;
	}

	.serial_number {
		font-size: 26upx;
		color: #333333;
		width: 50upx;
		text-align: center;
	}

	.box {
		padding-left: 20upx;
		width: 660upx;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1upx solid #F1F1F1;
	}

	.box_left {
		width: 310upx;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.box_right {
		width: 100upx;
		text-align: center;
		font-size: 26upx;
		color: #333333;
	}

	.box_img {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
	}

	.box_word {
		width: 170upx;
		font-size: 28upx;
		color: #333333;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
