<template>
	<view class="mine">
		<!-- 返回主页 -->
		<view :style="{'top': (nav_ioc_top) + 'px'}" class="nav_ioc">
			<view class="nav_box">
				<image class="nav_back" src="../../static/fanhui.png" @tap="back"></image>
				<view style="width: 2upx;height: 40upx; background-color: #ececec;"></view>
				<image class="nav_page" src="../../static/zhuye.png" @tap="pageback"></image>
			</view>
		</view>
		<scroll-view @scrolltolower="loadMore" windowHeight :style="{'height': (scrollerHeight) + 'px'}" class="mine_box"
		 scroll-y>
			<!-- 头部信息 -->
			<view class="head">
				<view class="head_graphic">图示</view>
				<view class="head_imperial_examinations">科举</view>
				<view class="head_time">时间</view>
				<view class="head_exchange">兑换码</view>
			</view>
			<!-- 博饼记录 内容 -->
			<view class="content" v-for="(item,key) in list">
				<view class="content_graphic">
					<view class="content_graphic_box">
						<image class="content_graphic_img" :src="'/static/shaizi{{item.gambling_dice[0]}}.png'"></image>
						<image class="content_graphic_img" :src="'/static/shaizi{{item.gambling_dice[1]}}.png'"></image>
						<image class="content_graphic_img" :src="'/static/shaizi{{item.gambling_dice[2]}}.png'"></image>
						<image class="content_graphic_img" :src="'/static/shaizi{{item.gambling_dice[3]}}.png'"></image>
						<image class="content_graphic_img" :src="'/static/shaizi{{item.gambling_dice[4]}}.png'"></image>
						<image class="content_graphic_img" :src="'/static/shaizi{{item.gambling_dice[5]}}.png'"></image>
					</view>
				</view>
				<view class="content_imperial_examinations">{{item.gambling_name}}</view>
				<view class="content_time">{{item.create_time}}</view>
				<view class="content_exchange">
					<view class="content_exchange_word" v-if="item.status==1">
						未中奖
					</view>
					<view v-if="item.status==2" class="content_exchange_btn1" hover-class="hover_content_exchange_btn"
					 hover-stay-time="200" @tap="exchange(item.id)"></view>
					<image v-if="item.status==3" class="content_exchange_btn" src="/static/hexiao2.png"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {

			return {
				change: 2,
				scrollerHeight: 700,
				list: [],
				page: 1,
				isLoading: true,
				nav_ioc_top: 0,
				exchange_id: 0,
			}

		},
		onShow() {
			console.log('onShow');
			var _this = this;
			if (this.page == 1) {
				var res = wx.getSystemInfoSync();
				console.log(res);
				this.scrollerHeight = res.windowHeight - 155;
				var titleBarHeight = 48;
				if (res.platform == "ios") {
					titleBarHeight = 44;
				}
				this.nav_ioc_top = res.statusBarHeight + (titleBarHeight - 32) / 2;
				var page = this.page;
				this.$api.getGamblingRecord({
					page: page
				}).then(res => {
					if (res.data.code == 1) {
						//摘除前三
						_this.list = _this.list.concat(res.data.info);
						_this.isLoading = true;
						_this.page = 2;
					} else {
						_this.isLoading = false;
					}
				})
			}
			console.log(this.exchange_id)
			if (this.exchange_id) {
				var id=this.exchange_id;
				this.$api.getRecordStatus({
					id:id
				}).then(res => {
					if (res.data.code == 1) {
						for (var i = 0; i < _this.list.length; i++) {
							if (_this.list[i].id == id && _this.list[i].status == 2) {
								_this.list[i].status = 3;
								break;
							}
						}
						_this.exchange_id = 0;
					}
				})
			}
		},
		onLoad() {

		},
		onHide() {
			console.log('onHide');
		},
		methods: {
			loadMore() {
				var _this = this;
				var page = this.page;
				if (!this.isLoading) {
					uni.showToast({
						title: '暂无更多',
						'icon': 'none'
					});
					return;
				}
				this.$api.getGamblingRecord({
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
			pageback() {
				uni.navigateBack({
					delta: 1
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			exchange(e) {
				console.log(e);
				// this.change = 1;
				var id = e;
				var _this = this;
				this.$api.createVerificationCode({
					id: id
				}).then(res => {
					if (res.data.code == 1) {
						_this.poster = res.data.info;
						_this.exchange_id = id;
						uni.previewImage({
							urls: [res.data.info],
						});
					} else {
						uni.showToast({
							title: res.data.message,
							'icon': 'none'
						});
					}
				})
			},
			exchange_code() {
				this.change = 2;
			}

		}
	}
</script>

<style>
	.mine {
		width: 100%;
		height: 2077upx;
		background: url(http://wx.rowin.xin/15621566148428_.pic_hd.jpg);
		background-size: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-attachment: fixed;
		font-family: "黑体";

	}


	/* 头部 开始 */
	.mine_box {
		display: flex;
		flex-direction: column;
		margin-top: 210upx;
		position: fixed;
		top: 0;
		width: 614upx;
		background: url(../../static/jilu3.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.head {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		display: flex;
		flex-direction: row;
	}

	.head_graphic {
		font-size: 26upx;
		color: #FFFFFF;
		text-align: center;
		width: 150upx;
		height: 50upx;
		border-top: 1upx solid #FFFFFF;
		border-bottom: 1upx solid #FFFFFF;
		border-right: 1upx solid #FFFFFF;

	}

	.head_imperial_examinations {
		font-size: 26upx;
		color: #FFFFFF;
		text-align: center;
		width: 128upx;
		height: 50upx;
		border-top: 1upx solid #FFFFFF;
		border-bottom: 1upx solid #FFFFFF;
		border-right: 1upx solid #FFFFFF;
	}

	.head_time {
		font-size: 26upx;
		color: #FFFFFF;
		text-align: center;
		width: 151upx;
		height: 50upx;
		border-top: 1upx solid #FFFFFF;
		border-bottom: 1upx solid #FFFFFF;
		border-right: 1upx solid #FFFFFF;
	}

	.head_exchange {
		font-size: 26upx;
		color: #FFFFFF;
		text-align: center;
		width: 180upx;
		height: 50upx;
		border-top: 1upx solid #FFFFFF;
		border-bottom: 1upx solid #FFFFFF;
	}

	/* 头部 结束 */

	/* 内容 开始 */
	.content {
		display: flex;
		flex-direction: row;
	}

	.content_graphic {
		width: 150upx;
		height: 100upx;
		border-bottom: 1upx solid #FFFFFF;
		border-right: 1upx solid #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content_graphic_box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 130upx;
		height: 90upx;
		padding-top: 10upx;
	}

	.content_graphic_img {
		width: 40upx;
		height: 40upx;
	}

	.content_imperial_examinations {
		font-size: 22upx;
		color: #FFFFFF;
		text-align: center;
		width: 128upx;
		height: 100upx;
		line-height: 100upx;
		border-bottom: 1upx solid #FFFFFF;
		border-right: 1upx solid #FFFFFF;
	}

	.content_time {
		font-size: 22upx;
		color: #FFFFFF;
		text-align: center;
		width: 151upx;
		height: 100upx;
		line-height: 100upx;
		border-bottom: 1upx solid #FFFFFF;
		border-right: 1upx solid #FFFFFF;
	}

	.content_exchange {
		font-size: 26upx;
		color: #FFFFFF;
		width: 180upx;
		height: 100upx;
		border-bottom: 1upx solid #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.content_exchange_word {
		width: 200upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		font-size: 26upx;
		color: #FFFFFF;
	}

	.content_exchange_btn1 {
		width: 163upx;
		height: 57upx;
		background: url(../../static/hexiao1.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.content_exchange_btn {
		padding-left: 15upx;
		width: 163upx;
		height: 57upx;
	}

	/* 内容 结束 */
	.exchange_code_box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.exchange_code_box_change {
		display: none;
	}

	.exchange_code {
		width: 571upx;
		height: 500upx;
		background-color: #FFFFFF;
		border-radius: 15upx;
		position: absolute;
		top: 400upx;
	}

	.exchange_word {
		width: 571upx;
		height: 80upx;
		position: absolute;
		top: 900upx;
	}

	.hover_content_exchange_btn {
		opacity: 0.5;
	}
</style>
