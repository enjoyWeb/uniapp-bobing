<template>
	<view class="dice">
		<view v-if="storeInfo.isFollow">
			<official-account></official-account>
		</view>
		<!-- 中奖轮播 -->
		<swiper class="affiche_box" vertical interval="2000" autoplay circular>
			<swiper-item v-for="(new1,key) in news">
				<view class="news">{{new1}}</view>
			</swiper-item>
		</swiper>
		<view class="block"></view>

		<!-- 骰子 -->
		<view class='game-area'>
			<view class='wan'>
				<image v-for="(item,key) in dice_list" :src="item.image" :class="[item.move,item.class]"></image>
			</view>
			<view class='game-start'>
				<button v-if="!isLogin" open-type="getUserInfo" @getuserinfo="authorLogin" class="start-button">博一博 剩余{{userInfo.play_times}}次</button>
				<button v-else @tap="gameStart" class="start-button" hover-class="hover_start-button" hover-stay-time="200">博一博 剩余{{userInfo.play_times}}次</button>
				<button class="start-button" hover-class="hover_start-button" open-type="share">邀请好友助力</button>
			</view>
		</view>

		<!-- 规则 -->
		<view class="rule_box">
			<image class="rule" src="/static/guize.png"></image>
			<!-- 规则底下文字 -->

			<scroll-view class="rule_box_bg" scroll-y>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<view style="display: flex;flex-direction: row; width: 610upx;height: 40upx;line-height:40upx;border-top: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
						<view style="width: 210upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;">图示</view>
						<view style="width: 105upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;">常用名</view>
						<view style="width: 105upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;">科举</view>
						<view style="width: 192upx; text-align: center;font-size: 18upx;color: #FFFFFF;">奖励</view>
					</view>
					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai1.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai1.png"></image>
						</view>
						<view style="line-height:29upx; height: 29upx; width: 105upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">状元插金花</view>
						<view style="width: 105upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;"></view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[0]}}</view>
					</view>
					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx;line-height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
						</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">六杯红</view>
						<view style="width: 105upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;"></view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[1]}}</view>
					</view>
					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx;line-height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai6.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai6.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai6.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai6.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai6.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai6.png"></image>
						</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx;text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">六杯黑</view>
						<view style="width: 105upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;"></view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[2]}}</view>
					</view>
					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx;line-height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
						</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">五王</view>
						<view style="width: 105upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;">状元</view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[3]}}</view>
					</view>
					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx;line-height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai3.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai3.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai3.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai3.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai3.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
						</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">五子爱一秀</view>
						<view style="width: 105upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;"></view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[4]}}</view>
					</view>
					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx;line-height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai3.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai3.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai3.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai3.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai3.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
						</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">五子登科</view>
						<view style="width: 105upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;"></view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[5]}}</view>
					</view>
					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx;line-height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
						</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">状元</view>
						<view style="width: 105upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;"></view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[6]}}</view>
					</view>
					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx;line-height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai1.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai2.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai3.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai5.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai6.png"></image>
						</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">对堂</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">榜眼</view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[7]}}</view>
					</view>
					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx;line-height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
						</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">三红</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">探花</view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[8]}}</view>
					</view>

					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx;line-height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai2.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai2.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai2.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai2.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
						</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">四进</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">进士</view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[9]}}</view>
					</view>


					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx;line-height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
						</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">二举</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">举人</view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[10]}}</view>
					</view>
					<view style="width: 610upx;display: flex;flex-direction: row;">
						<view style="width: 210upx;height: 29upx;line-height: 29upx; display: flex;flex-direction: row;align-items: center;justify-content: center; border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai4.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
							<image style="width: 20upx;height: 20upx;" src="/static/guizeshai.png"></image>
						</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">一秀</view>
						<view style="width: 105upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-right: 1upx solid #fde1b6;border-bottom: 1upx solid #fde1b6;">秀才</view>
						<view style="width: 192upx;line-height:29upx; height: 29upx; text-align: center;font-size: 18upx;color: #FFFFFF;border-bottom: 1upx solid #fde1b6;">{{prizes[11]}}</view>
					</view>
					<rich-text class="rule_box_word" :nodes="storeInfo.gambling_rule"></rich-text>
				</view>
			</scroll-view>

		</view>
		<!-- 招商悬浮 -->
		<!-- <movable-area style="width: 130upx;">
			<movable-view class="merchant" direction="all" inertia out-of-bounds friction="1.5">
				<image style="height:100upx;width:100upx;border-radius:50%" src="/static/zhaoshang.png"></image>
			</movable-view>
		</movable-area> -->

		<!-- 右边 三个 浮窗 -->
		<view class="ranking" @tap="ranking" hover-class="hover_rangking" hover-stay-time="200"></view>
		<view class="share" @tap="createPoster" hover-class="hover_share" hover-stay-time="200"></view>
		<view class="mine" @tap="mine" hover-class="hover_mine" hover-stay-time="200"></view>
		<!-- 蒙层 黑 -->
		<view :class="bgBlack?'dice_bgBlack':'dice_bgBlack_change'"></view>
		<!-- 蒙层 白 -->
		<view :class="bgWhite?'dice_bgWhite':'dice_bgWhite_change'"></view>
		<!-- 摇一摇 浮窗 -->
		<view :class="shake==false?'shake_change':'shake'">
			<image class="shake_img" src="/static/yaohuang.png"></image>
			<view class="shake_word">摇一摇开奖！</view>
		</view>

		<!-- 开奖结果 浮窗 -->
		<view :class="open_prize?'open_prize':'open_prize_change'">
			<view class="open_prize_top">
				<view style="display: inline-block;" v-if="rid!=13">恭喜</view>你博到了
			</view>
			<view class="open_prize_concent">
				<view class="open_prize_imgs">
					<image class="open_prize_img" :src="'/static/shaizi{{item}}.png'" v-for="item in  dice_result"></image>
				</view>
				<view class="open_prize_word">{{dice_name}}</view>
			</view>
			<view v-if="rid==13" style="justify-content: center;" class="open_prize_bottom">
				<view class="open_prize_bnt" hover-class="hover_open_prize_bnt" hover-stay-time="200" @tap="showResultModel">我知道了</view>
			</view>
			<view v-else class="open_prize_bottom">
				<view class="open_prize_bnt" hover-class="hover_open_prize_bnt" hover-stay-time="200" @tap="showResultModel">我知道了</view>
				<view class="open_prize_bnt" hover-class="hover_open_prize_bnt" hover-stay-time="200" @tap="exchange">去兑换</view>
			</view>
		</view>
	</view>
</template>

<script>
	var preventTimer;
	export default {
		data() {
			return {
				// 中奖信息
				news: [],
				dice_list: [{
						image: '',
						class: 'img-1',
						move: ''
					},
					{
						image: '',
						class: 'img-2',
						move: ''
					},
					{
						image: '',
						class: 'img-3',
						move: ''
					},
					{
						image: '',
						class: 'img-4',

						move: ''
					},
					{
						image: '',
						class: 'img-5',
						move: ''
					},
					{
						image: '',
						class: 'img-6',
						move: ''
					}
				],
				//对应奖品
				prizes: ['', '', '', '', '', '', '', '', '', '', '', ''],
				//提示摇一摇样式
				shake: false,
				//开奖结果样式
				open_prize: false,
				//博饼剩余次数
				//开奖结果
				dice_result: [],
				// 可以点击博一博按钮
				playStatus: true,
				//中奖恭贺词
				dice_name: '',
				//蒙层 黑
				bgBlack: false,
				//蒙层 白
				bgWhite: false,
				storeInfo: {},
				userInfo: {
					play_times: 0,
				},
				isLogin: false,
				isShow: false,
				start_time: 0,
				continue_time: 0,
				current_time: 0,
				s_id: 1,
				poster: '',
				rid: 1,
			}
		},
		onShareAppMessage(options) {
			var _this = this;
			var s_id = this.s_id;
			var uid = this.userInfo.uid;
			if (options.from == 'button') {
				this.$api.addPlayTimes().then(res => {
					if (res.data.code == 1) {
						_this.userInfo.play_times = _this.userInfo.play_times + 1;
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				})
			}
			return {
				title: _this.storeInfo.store_share_text ? _this.storeInfo.store_share_text : '金秋博饼，免费赢大奖！',
				path: `/pages/index/index?s_id=${s_id}&invite_uid=${uid}`,
				imageUrl: _this.storeInfo.store_share_image ? _this.storeInfo.store_share_image : '',
			}

		},
		onLoad(options) {
			console.log(options);
			var s_id = options.s_id != null ? options.s_id : 1;
			this.s_id = s_id;
			var _this = this;
			uni.setStorageSync('s_id', s_id);
			options.invite_uid != null ? this.$api.addUserInvite({
				invite_uid: options.invite_uid || 0,
				s_id: s_id,
			}).then(res => {
				this.$api.getStoreInfo().then(res => {
					console.log(res);
					if (res.data.code == 1) {
						_this.storeInfo = res.data.info.info;
						_this.news = res.data.info.list;
						_this.prizes = res.data.info.prize;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				})
				this.$api.getUserInfo().then(res => {
					console.log(res);
					if (res.data.code == 1) {
						_this.userInfo = res.data.info;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				})
			}) : (this.$api.getStoreInfo().then(res => {
				console.log(res);
				if (res.data.code == 1) {
					_this.storeInfo = res.data.info.info;
					_this.news = res.data.info.list;
					_this.prizes = res.data.info.prize;
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000
					});
				}
			}), this.$api.getUserInfo().then(res => {
				console.log(res);
				if (res.data.code == 1) {
					_this.userInfo = res.data.info;
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000
					});
				}
			}));


		},
		onShow() {

			// this.$api.login();
			// console.log(this.$api.getStoreInfo());
			//检查活动是否开始
			this.isLogin = uni.getStorageSync('check_login') ? true : false;
		},
		methods: {
			createPoster() {
				var _this = this;
				if (this.poster) {
					uni.previewImage({
						urls: [_this.poster],
					});
				} else {
					this.$api.createStorePoster().then(res => {
						if (res.data.code == 1) {
							_this.poster = res.data.info;
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
				}
			},
			authorLogin(e) {
				console.log(e);
				var app = getApp();
				console.log(app);
				let _this = this;
				if (e.detail.errMsg !== 'getUserInfo:ok') {
					return false;
				}
				uni.showLoading({
					title: "正在登录",
					mask: true
				});
				// 执行微信登录 
				var expire = uni.getStorageSync('expire');
				var timestamp = Date.parse(new Date()); /* 每个小时清理session */
				if (expire <= timestamp) {
					uni.removeStorageSync('userInfo');
				} //调用登录接口   
				var userInfo = {
					'sessionid': '',
					'wxInfo': '',
					'memberInfo': '',
				};
				uni.login({
					success: function(res) {
						_this.$util.request({
							url: 'session/openid',
							data: {
								code: res.code
							},
							cachetime: 0,
							success: function(session) {
								if (session.data.code == 0) {
									userInfo.sessionid = session.data.data.sessionid;
									uni.setStorageSync('userInfo', userInfo);
									uni.getUserInfo({
										lang: 'zh_CN',
										success: function(wxInfo) {
											userInfo.wxInfo = wxInfo.userInfo;
											uni.setStorageSync('userInfo', userInfo);
											var expire = Date.parse(new Date()) + 3600000;
											uni.setStorageSync('expire', expire);
											_this.$util.request({
												url: 'session/userinfo',
												data: {
													signature: wxInfo.signature,
													rawData: wxInfo.rawData,
													iv: wxInfo.iv,
													encryptedData: wxInfo.encryptedData
												},
												method: 'POST',
												header: {
													'content-type': 'application/x-www-form-urlencoded'
												},
												cachetime: 0,
												success: function(res) {
													if (res.data.code == 0) {
														userInfo.memberInfo = res.data.data;
														uni.setStorageSync('userInfo', userInfo);
														uni.setStorageSync('check_login', true);
														_this.isLogin = true;
														uni.hideLoading();
														_this.gameStart();
													} else {
														console.log('获取用户信息失败')
													}
												}
											})
										},
										fail: function() {
											var expire = Date.parse(new Date()) + 3600000;
											uni.setStorageSync('expire', expire);
											console.log('fail')
										},
										complete: function() {
											typeof cb == "function" && cb(app.userInfo);
										}
									})
								} else {
									console.log('获取openid失败')
								}
							}
						});
					},
					fail: function() {
						uni.showModal({
							title: '获取信息失败',
							content: '请允许授权以便为您提供给服务',
							success: function(res) {
								if (res.confirm) {
									_this.$util.getUserInfo(cb);
								}
							}
						});
					}
				});
			},
			//跳转排行榜
			ranking() {
				uni.navigateTo({
					url: '/pages/ranking/ranking'
				});
			},
			//我的跳转我的页面
			mine() {
				uni.navigateTo({
					url: '/pages/my/my'
				});
			},
			//去兑换跳转我的页面
			exchange() {
				uni.navigateTo({
					url: '/pages/my/my'
				});
			},
			showYaoyiYao() {
				if (this.shake && this.bgBlack) {
					this.shake = false;
					this.bgBlack = false;
				} else {
					this.shake = true;
					this.bgBlack = true;
				}
			},
			showResultModel() {
				if (this.open_prize && this.bgBlack) {
					this.open_prize = false;
					this.bgBlack = false;
					this.bgWhite = false;
				} else {
					this.open_prize = true;
					this.bgBlack = true;
				}
			},
			//搏一搏点击
			gameStart() {
				//正在执行博饼
				// 不可以点击博一博按钮直接返回
				if (!this.playStatus) return;
				if (this.storeInfo.user_share_times <= 0 && this.userInfo.play_times <= 0) {
					uni.showToast({
						title: '请明日再来博饼吧～',
						icon: 'none',
					});
					return;
				}
				if (this.userInfo.play_times <= 0) {
					var addPlayTimes = this.storeInfo.user_share_times;
					uni.showModal({
						title: '提示',
						content: `邀请好友助力可增加${addPlayTimes}次`,
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {

						}
					});
					return;
				}
				//次数大于0才能执行定时器
				if (this.userInfo.play_times > 0) {
					// 禁止点击博一博按钮
					var _this = this;
					this.playStatus = false;
					//0.2秒 监听一次加速度计
					uni.startAccelerometer({
						'interval': 'normal'
					});
					//显示摇一摇
					this.showYaoyiYao();
					uni.vibrateLong();
					//持续时间
					this.continue_time = 0;
					this.start_time = new Date().getTime();
					this.isShow = true;
					preventTimer = setTimeout(function() {
						if (!_this.playStatus && _this.isShow) {
							_this.continue_time = 0;
							_this.start_time = 0;
							_this.isShow = false;
							_this.showYaoyiYao();
							_this.open();
						}
						clearTimeout(preventTimer);
					}, 6000);
					uni.onAccelerometerChange(function(res) {
						console.log(res.x);
						if (!_this.isShow) {
							return
						}
						//符合摇晃幅度且时间满足  或者已经超过5s
						// console.log('continue_time', continue_time)
						_this.current_time = new Date().getTime();
						// console.log('current_time', current_time)
						// console.log('start_time', _this.start_time)
						if (Math.abs(res.x) > 0.6 || (_this.current_time - _this.start_time >= 4000)) {
							if (_this.current_time - _this.continue_time > 500 || (_this.current_time - _this.start_time >= 4000)) {
								console.log('开奖');
								uni.stopAccelerometer();
								_this.continue_time = 0;
								_this.start_time = 0;
								_this.isShow = false;
								_this.showYaoyiYao();
								_this.open();
							} else {
								_this.continue_time = new Date().getTime()
							}
						} else {
							// console.log('不符合摇晃幅度')
							//不符合摇晃幅度
							if (_this.continue_time) {
								_this.continue_time = 0;
							}
						}
					});

				}
			},
			//摇奖
			open() {
				var _this = this
				var timer;
				this.$api.play().then(res => {
					if (res.data.code == 1) {
						//骰子结果
						var dice = res.data.info.dice;
						_this.playAudio('/static/yao.mp3');
						for (var i = 0; i < _this.dice_list.length; i++) {
							_this.bgWhite = true;
							//摇骰子动画
							var newi = i + 1;
							var newdiceIndex = dice[i] + 1;
							_this.dice_list[i].move = `image-${newi}`;
							//改变碗里的骰子
							_this.dice_list[i].image = `/static/shaizi_${newdiceIndex}.png`;
						}
						_this.rid = res.data.info.rid;
						_this.dice_result = res.data.info.dice;
						_this.dice_name = res.data.info.dice_name;
						//显示弹框

						timer = setTimeout(function() {
							//播放结果声音
							_this.playAudio(`/static/audio${res.data.info.dice_audio}.mp3`);
							//渲染结果
							_this.playStatus = true;
							_this.userInfo.play_times = _this.userInfo.play_times - 1;
							//显示
							_this.showResultModel();
							//清空动画
							for (var i = 0; i < _this.dice_list.length; i++) {
								//摇骰子动画
								_this.dice_list[i].move = "";
							}
							clearTimeout(timer);
						}, 1500);

					}
				});

			},
			playAudio(src) {
				var audio = uni.createInnerAudioContext();
				audio.autoplay = true;
				audio.src = src;
			}
		},
	}
</script>

<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.rule_box_word {
		width: 560upx;
		font-size: 30upx;
		color: #FFFFFF;
		font-family: "arial 微软雅黑";
		word-wrap: break-word;
		padding: 30upx;
	}

	.rules {
		color: #FFFFFF;
		padding: 30upx;
		font-family: "微软雅黑";
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.merchant {
		position: fixed;
		top: 900upx;
		left: 10upx;
		height: 850upx;
		width: 100upx;
		border-radius: 50%;
	}

	.dice {
		width: 100%;
		height: 2055upx;
		background: url(http://wx.rowin.xin/WechatIMG2026.jpeg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.dice_bgBlack {
		width: 100%;
		height: 2055upx;
		position: absolute;
		top: 0;
		left: 0;
		background-color: #333333;
		opacity: 0.5;
	}

	.dice_bgBlack_change {
		display: none;
	}

	.dice_bgWhite {
		width: 100%;
		height: 2055upx;
		position: absolute;
		top: 0;
		left: 0;
		background-color: #FFFFFF;
		opacity: 0.00;
	}

	.dice_bgWhite_change {
		display: none;
	}

	.affiche_box {
		height: 36upx;
		width: 520upx;
		position: absolute;
		top: 455rpx;
		font-family: "黑体";
		font-size: 22rpx;
	}

	.block {
		height: 36upx;
		width: 300upx;
		position: absolute;
		top: 415upx;
	}

	.news {
		height: 100%;
		font-size: 24upx;
		color: #FFFFFF;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		text-align: center;
		font-family: "黑体";
	}

	.ranking {
		width: 96upx;
		height: 96upx;
		position: fixed;
		right: 30upx;
		top: 600upx;
		background: url(../../static/paihang.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.share {
		width: 96upx;
		height: 96upx;
		position: fixed;
		right: 30upx;
		top: 718upx;
		background: url(../../static/fenxiang.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.mine {
		width: 96upx;
		height: 96upx;
		position: fixed;
		right: 30upx;
		top: 836upx;
		background: url(../../static/wode.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.shake {
		width: 500upx;
		height: 500upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: fixed;
		top: 400upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.shake_img {
		width: 200upx;
		height: 189upx;
		padding-top: 100upx;
	}

	.shake_word {
		color: #333333;
		font-size: 30upx;
		text-align: center;
		padding-top: 50upx;
	}

	.shake_change {
		display: none;
	}

	.open_prize {
		background: url('../../static/gongxi.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 575upx;
		height: 442upx;
		position: fixed;
		top: 500upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.open_prize_change {
		display: none;
	}

	.open_prize_top {
		color: #333333;
		font-size: 30upx;
		text-align: center;
		padding-top: 50upx;
	}

	.open_prize_concent {
		display: flex;
		flex-direction: column;
		padding-top: 20upx;
	}

	.open_prize_imgs {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.open_prize_img {
		width: 85upx;
		height: 85upx;
	}

	.open_prize_word {
		font-size: 30upx;
		color: #F0AD4E;
		text-align: center;
		padding-top: 50upx;
	}

	.open_prize_bottom {
		width: 500upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 50upx;
	}

	.open_prize_bnt {
		background: url('../../static/zhidaole.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 197upx;
		height: 62upx;
		line-height: 62upx;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
	}


	/* 骰子区域  开始 */
	.game-area {
		padding-top: 520upx;
	}

	.wan {
		background: url('http://app.rxtcl.com/addons/vkeyi_bbmulti/template/mobile/images/wan.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-size: contain;
		width: 500upx;
		height: 411upx;
		position: relative;
		top: 40upx;
	}

	.wan image {
		width: 63upx;
		height: 64upx;
	}

	.img-1 {
		position: absolute;
		top: 47%;
		left: 28%;
	}

	.image-1 {
		animation: rotateMove-1 1s linear;
	}

	.img-2 {
		position: absolute;
		top: 40%;
		left: 40%;
	}

	.image-2 {
		animation: rotateMove-2 1s linear;
	}

	.img-3 {
		position: absolute;
		top: 42%;
		left: 56%;
	}

	.image-3 {
		animation: rotateMove-3 1s linear;
	}

	.img-4 {
		position: absolute;
		top: 60%;
		left: 30%;
	}

	.image-4 {
		animation: rotateMove-4 1s linear;
	}

	.img-5 {
		position: absolute;
		top: 56%;
		left: 45%;
	}

	.image-5 {
		animation: rotateMove-5 1s linear;
	}

	.img-6 {
		position: absolute;
		top: 55%;
		left: 63%;
	}

	.image-6 {
		animation: rotateMove-6 1s linear;
	}

	.game-start {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding-top: 60rpx;
		width: 100%;
		height: 160upx;
	}

	.start-button {
		width: 279upx;
		height: 66upx;
		line-height: 66upx;
		text-align: center;
		font-size: 30upx;
		color: #FFFFFF;
		background: url('../../static/anniu.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	@keyframes rotateMove-1 {
		0% {
			top: 0%;
			left: 60%;
			transform: rotate(0deg);
		}

		10% {
			top: 40%;
			left: 20%;
			transform: rotate(0deg);
		}

		25% {
			top: 20%;
			left: 40%;
			transform: rotate(180deg);
		}

		40% {
			top: 26%;
			left: 50%;
			transform: rotate(360deg);
		}

		60% {
			top: 40%;
			left: 55%;
			transform: rotate(720deg);
		}

		80% {
			top: 57%;
			left: 40%;
			transform: rotate(1080deg);
		}

		100% {
			top: 45%;
			left: 25%;
			transform: rotate(1440deg);
		}
	}

	@keyframes rotateMove-2 {
		0% {
			top: 0%;
			left: 60%;
			transform: rotate(0deg);
		}

		10% {
			top: 40%;
			left: 35%;
			transform: rotate(0deg);
		}

		25% {
			top: 45%;
			left: 20%;
			transform: rotate(180deg);
		}

		40% {
			top: 51%;
			left: 40%;
			transform: rotate(360deg);
		}

		60% {
			top: 45%;
			left: 55%;
			transform: rotate(720deg);
		}

		80% {
			top: 40%;
			left: 40%;
			transform: rotate(1080deg);
		}

		100% {
			top: 40%;
			left: 40%;
			transform: rotate(1440deg);
		}
	}

	@keyframes rotateMove-3 {
		0% {
			top: 0%;
			left: 60%;
			transform: rotate(0deg);
		}

		10% {
			top: 40%;
			left: 50%;
			transform: rotate(0deg);
		}

		25% {
			top: 45%;
			left: 20%;
			transform: rotate(180deg);
		}

		40% {
			top: 28%;
			left: 40%;
			transform: rotate(360deg);
		}

		60% {
			top: 37%;
			left: 55%;
			transform: rotate(720deg);
		}

		80% {
			top: 45%;
			left: 40%;
			transform: rotate(1080deg);
		}

		100% {
			top: 42%;
			left: 56%;
			transform: rotate(1440deg);
		}
	}

	@keyframes rotateMove-4 {
		0% {
			top: 0%;
			left: 60%;
			transform: rotate(0deg);
		}

		10% {
			top: 52%;
			left: 20%;
			transform: rotate(0deg);
		}

		25% {
			top: 34%;
			left: 40%;
			transform: rotate(180deg);
		}

		40% {
			top: 43%;
			left: 50%;
			transform: rotate(360deg);
		}

		60% {
			top: 54%;
			left: 35%;
			transform: rotate(720deg);
		}

		80% {
			top: 45%;
			left: 20%;
			transform: rotate(1080deg);
		}

		100% {
			top: 60%;
			left: 30%;
			transform: rotate(1440deg);
		}
	}

	@keyframes rotateMove-5 {
		0% {
			top: 0%;
			left: 60%;
			transform: rotate(0deg);
		}

		10% {
			top: 52%;
			left: 35%;
			transform: rotate(0deg);
		}

		25% {
			top: 54%;
			left: 50%;
			transform: rotate(180deg);
		}

		40% {
			top: 34%;
			left: 40%;
			transform: rotate(360deg);
		}

		60% {
			top: 45%;
			left: 35%;
			transform: rotate(720deg);
		}

		80% {
			top: 55%;
			left: 50%;
			transform: rotate(1080deg);
		}

		100% {
			top: 56%;
			left: 45%;
			transform: rotate(1440deg);
		}
	}

	@keyframes rotateMove-6 {
		0% {
			top: 0%;
			left: 60%;
			transform: rotate(0deg);
		}

		10% {
			top: 52%;
			left: 50%;
			transform: rotate(0deg);
		}

		25% {
			top: 40%;
			left: 60%;
			transform: rotate(180deg);
		}

		40% {
			top: 43%;
			left: 30%;
			transform: rotate(360deg);
		}

		60% {
			top: 57%;
			left: 55%;
			transform: rotate(720deg);
		}

		80% {
			top: 55%;
			left: 30%;
			transform: rotate(1080deg);
		}

		100% {
			top: 55%;
			left: 63%;
			transform: rotate(1440deg);
		}
	}

	/* 骰子区域  结束 */

	/* 规则 开始 */
	.rule_box {
		margin-top: 30upx;
		display: flex;
		flex-direction: column;

	}

	.rule_box_bg {
		background: url(../../static/guize1.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 684upx;
		height: 700upx;
		padding-top: 30upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}


	.rule {
		width: 684upx;
		height: 65upx;
	}

	.often_box {
		width: 105upx;
		height: 349upx;
		position: absolute;
		top: 115upx;
		left: 250upx;
		display: flex;
		flex-direction: column;
	}

	.imperial_examinations {
		width: 106upx;
		height: 150upx;
		position: absolute;
		top: 316upx;
		left: 357upx;
		display: flex;
		flex-direction: column;
	}

	.prize_box {
		width: 187upx;
		height: 349upx;
		position: absolute;
		top: 140upx;
		left: 459upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.prize {
		width: 100%;
		height: 29upx;
		line-height: 29upx;
		font-size: 18upx;
		text-align: center;
		color: #FFFFFF;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		border-bottom: 1upx solid #fde1b6;
	}

	/* 规则 结束 */

	.hover_share {
		opacity: 0.5;
	}

	.hover_rangking {
		opacity: 0.5;
	}

	.hover_mine {
		opacity: 0.5;
	}

	.hover_start-button {
		opacity: 0.5;
	}

	.hover_open_prize_bnt {
		opacity: 0.5;
	}
</style>
