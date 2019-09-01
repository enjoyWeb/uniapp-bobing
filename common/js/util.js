var util = {};
var app = require('./config.js');
/**
	构造店不错地址, 
	@params action 店不错系统中的controller, action, do，格式为 'wxapp/home/navs'
	@params querystring 格式为 {参数名1 : 值1, 参数名2 : 值2}
*/
util.url = function(action, querystring) {
	var url = app.siteInfo.siteroot + action + '.html' + '?i=' + app.siteInfo.uniacid + '&t=' + app.siteInfo.multiid +
		'&v=' + app.siteInfo.version + '&from=wxapp';

	if (querystring) {
		for (param in querystring) {
			if (param && querystring[param]) {
				url += 'param=' + querystring[param] + '&';
			}
		}
	}
	return url;
}

function getQuery(url) {
	var theRequest = [];
	if (url.indexOf("?") != -1) {
		var str = url.split('?')[1];
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			if (strs[i].split("=")[0] && unescape(strs[i].split("=")[1])) {
				theRequest[i] = {
					'name': strs[i].split("=")[0],
					'value': unescape(strs[i].split("=")[1])
				}
			}
		}
	}
	return theRequest;
}
/*
 * 获取链接某个参数
 * url 链接地址
 * name 参数名称
 */
function getUrlParam(url, name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
	var r = url.split('?')[1].match(reg); //匹配目标参数  
	if (r != null) return unescape(r[2]);
	return null; //返回参数值  
}
/**
 * 获取签名 将链接地址的所有参数按字母排序后拼接加上token进行md5
 * url 链接地址
 * date 参数{参数名1 : 值1, 参数名2 : 值2} *
 * token 签名token 非必须
 */
function getSign(url, data, token) {
	var _ = require('./underscore.js');
	var md5 = require('./md5.js');
	var querystring = '';
	var sign = getUrlParam(url, 'sign');
	if (sign || (data && data.sign)) {
		return false;
	} else {
		if (url) {
			querystring = getQuery(url);
		}
		if (data) {
			var theRequest = [];
			for (let param in data) {
				if (param && data[param]) {
					theRequest = theRequest.concat({
						'name': param,
						'value': data[param]
					})
				}
			}
			querystring = querystring.concat(theRequest);
		}
		//排序
		querystring = _.sortBy(querystring, 'name');
		//去重
		querystring = _.uniq(querystring, true, 'name');
		var urlData = '';
		for (let i = 0; i < querystring.length; i++) {
			if (querystring[i] && querystring[i].name && querystring[i].value) {
				urlData += querystring[i].name + '=' + querystring[i].value;
				if (i < (querystring.length - 1)) {
					urlData += '&';
				}
			}
		}
		token = token ? token : app.siteInfo.token;
		sign = md5(urlData + token);
		return sign;
	}
}
/**
	二次封装微信wx.request函数、增加交互体全、配置缓存、以及配合店不错格式化返回数据

	@params option 弹出参数表，
	{
		url : 同微信,
		data : 同微信,
		header : 同微信,
		method : 同微信,
		success : 同微信,
		fail : 同微信,
		complete : 同微信,
		cachetime : 缓存周期，在此周期内不重复请求http，默认不缓存
	}
*/
util.uploadFile = function(option) {
	var _ = require('./underscore.js');
	var md5 = require('./md5.js');
	var option = option ? option : {};
	option.cachetime = option.cachetime ? option.cachetime : 0;
	var sessionid = wx.getStorageSync('userInfo').sessionid;
	var url = option.url;
	var name = option.name;
	var filePath = option.filePath;

	if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
		url = util.url(url);
	}
	var state = getUrlParam(url, 'state');
	if (!state && !(option.data && option.data.state) && sessionid) {
		url = url + '&state=dbcsid-' + sessionid
	}

	var sign = getSign(url, option.data);
	if (sign) {
		url = url + "&sign=" + sign;
	}
	if (!url) {
		return false;
	}
	wx.showNavigationBarLoading();
	if (option.cachetime) {
		var cachekey = md5(url);
		var cachedata = wx.getStorageSync(cachekey);
		var timestamp = Date.parse(new Date());

		if (cachedata && cachedata.data && cachedata.expire > timestamp) {
			if (option.success && typeof option.success == 'function') {
				option.success(cachedata);
			}
			console.log('cache:' + url);
			wx.hideNavigationBarLoading();
			return true;
		}
	}
	wx.uploadFile({
		'url': url,
		'formData': option.data ? option.data : {},
		'header': option.header ? option.header : {},
		'filePath': filePath,
		'name': name,
		// 'header': {
		//   'content-type': 'application/x-www-form-urlencoded'
		// },
		'success': function(response) {
			if (option.success && typeof option.success == 'function') {
				if (response.data.code == 10) {
					//超时了
					util.toast('', 'loading');
					wx.setStorageSync('userInfo', '');
					util.getUserInfo(function() {
						util.request(option);
					});
				} else {
					option.success(response);
				}
			}
			//写入缓存，减少HTTP请求，并且如果网络异常可以读取缓存数据
			option.cachetime = parseInt(option.cachetime);
			if (option.cachetime) {
				var cachedata = {
					'data': response.data,
					'expire': timestamp + option.cachetime * 1000
				};
				wx.setStorageSync(cachekey, cachedata);
			}
		},
		'fail': function() {
			if (option.fail && typeof option.fail == 'function') {
				option.fail();
			}
			//如果请求失败，尝试从缓存中读取数据
			var md5 = require('./md5.js');
			var cachekey = md5(url);
			var cachedata = wx.getStorageSync(cachekey);
			if (cachedata && cachedata.data) {
				if (option.success && typeof option.success == 'function') {
					option.success(cachedata);
				}
				console.log('failreadcache:' + url);
				wx.hideNavigationBarLoading();
				return true;
			}
		},
		'complete': function() {
			wx.hideNavigationBarLoading();
			if (option.complete && typeof option.complete == 'function') {
				option.complete();
			}
		}
	});
}
util.request = function(option) {
	var _ = require('./underscore.js');
	var md5 = require('./md5.js');
	var option = option ? option : {};
	option.cachetime = option.cachetime ? option.cachetime : 0;
	var sessionid = uni.getStorageSync('userInfo').sessionid;
	var url = option.url;
	if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
		url = util.url(url);
	}
	var state = getUrlParam(url, 'state');
	if (!state && !(option.data && option.data.state) && sessionid) {
		url = url + '&state=jmsid-' + sessionid
	}

	var s_id = uni.getStorageSync('s_id');
	if (s_id) {
		url = url + '&s_id=' + s_id
	}
	var sign = getSign(url, option.data);
	if (sign) {
		url = url + "&sign=" + sign;
	}
	if (!url) {
		return false;
	}
	uni.showNavigationBarLoading();
	if (option.cachetime) {
		var cachekey = md5(url);
		var cachedata = uni.getStorageSync(cachekey);
		var timestamp = Date.parse(new Date());

		if (cachedata && cachedata.data && cachedata.expire > timestamp) {
			if (option.success && typeof option.success == 'function') {
				option.success(cachedata);
			}
			console.log('cache:' + url);
			uni.hideNavigationBarLoading();
			return true;
		}
	}
	uni.request({
		'url': url,
		'data': option.data ? option.data : {},
		'header': option.header ? option.header : {},
		'method': option.method ? option.method : 'GET',
		'header': {
			'content-type': 'application/x-www-form-urlencoded'
		},
		'success': function(response) {
			if (option.success && typeof option.success == 'function') {
				if (response.data.code == 10) {
					//超时了
					util.toast('', 'loading');
					uni.setStorageSync('userInfo', '');
					util.getUserInfo(function() {
						util.request(option);
					});
				} else {
					option.success(response);
				}
			}
			//写入缓存，减少HTTP请求，并且如果网络异常可以读取缓存数据
			option.cachetime = parseInt(option.cachetime);
			if (option.cachetime) {
				var cachedata = {
					'data': response.data,
					'expire': timestamp + option.cachetime * 1000
				};
				uni.setStorageSync(cachekey, cachedata);
			}
		},
		'fail': function() {
			if (option.fail && typeof option.fail == 'function') {
				option.fail();
			}
			//如果请求失败，尝试从缓存中读取数据
			var md5 = require('./md5.js');
			var cachekey = md5(url);
			var cachedata = uni.getStorageSync(cachekey);
			if (cachedata && cachedata.data) {
				if (option.success && typeof option.success == 'function') {
					option.success(cachedata);
				}
				console.log('failreadcache:' + url);
				uni.hideNavigationBarLoading();
				return true;
			}
		},
		'complete': function() {
			uni.hideNavigationBarLoading();
			if (option.complete && typeof option.complete == 'function') {
				option.complete();
			}
		}
	});
}
/*
 * 获取用户信息
 */
util.getUserInfo = function(cb) {
	var expire = uni.getStorageSync('expire');
	var timestamp = Date.parse(new Date());
	/* 每个小时清理session */
	if (expire <= timestamp) {
		uni.removeStorageSync('userInfo');
	}
	var app = uni.getStorageSync('userInfo');
	if (app.sessionid) {
		typeof cb == "function" && cb(app.sessionid);
	} else {
		//调用登录接口
		var userInfo = {
			'sessionid': '',
			'wxInfo': '',
			'memberInfo': '',
		};
		uni.login({
			success: function(res) {
				console.log('res',res);
				util.request({
					url: 'session/openid',
					data: {
						code: res.code
					},
					cachetime: 0,
					success: function(session) {
						if (session.data.code == 0) {
							userInfo.sessionid = session.data.data.sessionid
							uni.setStorageSync('userInfo', userInfo);
							uni.getUserInfo({
								lang: 'zh_CN',
								success: function(wxInfo) {
									userInfo.wxInfo = wxInfo.userInfo
									uni.setStorageSync('userInfo', userInfo);
									var expire = Date.parse(new Date()) + 3600000;
									uni.setStorageSync('expire', expire);
									util.request({
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
											console.log('userInfo')
											if (res.data.code == 0) {
												userInfo.memberInfo = res.data.data
												uni.setStorageSync('userInfo', userInfo);
												uni.setStorageSync('check_login', true);
												//清除地理位置 重新定位
												util.refreshLocation(function() {

												});
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
									uni.setStorageSync('check_login', false);
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
							util.getUserInfo(cb);
						}
					}
				});
			}
		});
	}
}
/**
 * 重新定位刷新当前经纬度
 */
util.refreshLocation = function(cb) {
	var areaInfo = wx.getStorageSync('areaInfo');
	var locationAreaInfo = wx.getStorageSync('locationAreaInfo');
	console.log('refresh');
	if (!areaInfo.area_id) {
		return false;
	}
	wx.getLocation({
		type: 'gcj02',
		success: function(res) {
			//纬度
			var latitude = res.latitude;
			//经度
			var longitude = res.longitude;
			//刷新定位的经纬度
			areaInfo.latitude = latitude;
			areaInfo.longitude = longitude;
			wx.setStorageSync('areaInfo', areaInfo);
			wx.setStorageSync('locationAreaInfo', areaInfo);
			typeof cb == "function" && cb();
		},
		fail: function(res) {
			wx.showModal({
				content: '此应用需要您的授权或是否开启手机GPS，否则会员卡无法正常使用。',
				showCancel: false,
				success: function(res) {
					//打开设置
					wx.openSetting({});
				}
			});
		}
	});
}
/*
 * 获取位置,并获取对应地区id
 */
util.getUserAreaId = function(cb) {
	var areaInfo = wx.getStorageSync('areaInfo');
	if (areaInfo) {
		typeof cb == "function" && cb(areaInfo);
	} else {
		//调用定位接口
		var areaInfo = {
			'area_id': '',
			'area_name': '',
			'latitude': '',
			'longitude': '',
			'province': '',
			'city': '',
			'district': '',
			'address': ''
		};
		wx.getLocation({
			type: 'gcj02',
			success: function(res) {
				//纬度
				var latitude = res.latitude
				//经度
				var longitude = res.longitude
				util.request({
					'url': 'book/location',
					'cachetime': '0',
					'data': {
						latitude: latitude,
						longitude: longitude
					},
					success: function(res) {
						if (res.data.code == 0 || res.data.code == 1) {
							areaInfo.area_id = res.data.data.id;
							areaInfo.area_name = res.data.data.area_name;
							areaInfo.province = res.data.data.province;
							areaInfo.city = res.data.data.city;
							areaInfo.district = res.data.data.district;
							areaInfo.address = res.data.data.address;
							areaInfo.latitude = latitude;
							areaInfo.longitude = longitude;
							//缓存地址信息
							wx.setStorageSync('areaInfo', areaInfo);
							if (res.data.code == 0) {
								//缓存定位地址信息
								wx.setStorageSync('locationAreaInfo', areaInfo);
							}
							typeof cb == "function" && cb(areaInfo);
						} else {
							console.log('定位获取失败');
						}
					},
					fail: function() {
						console.log('请检查连接地址');
					}
				});
			},
			fail: function(res) {
				console.log(res);
				wx.showModal({
					content: '此应用需要您的授权是否开启手机GPS，否则定位无法正常使用。',
					showCancel: false,
					success: function(res) {
						//打开设置
						wx.openSetting({});
						// 用户拒绝定位 通过ip定位
						// util.request({
						//   'url': 'book/locationip',
						//   'cachetime': '0',
						//   'data': {
						//   },
						//   success: function (res) {
						//     if (res.data.code == 0) {
						//       areaInfo.area_id =0;
						//       areaInfo.area_name = res.data.data.area_name;
						//       areaInfo.province = res.data.data.province;
						//       areaInfo.city = res.data.data.city;
						//       areaInfo.district = res.data.data.district;
						//       areaInfo.address = res.data.data.address;
						//       areaInfo.latitude = latitude;
						//       areaInfo.longitude = longitude;
						//       //缓存地址信息
						//       wx.setStorageSync('areaInfo', areaInfo);
						//       if (res.data.code == 0) {
						//         //缓存定位地址信息
						//         wx.setStorageSync('locationAreaInfo', areaInfo);
						//       }
						//       typeof cb == "function" && cb(areaInfo.area_id);
						//     } else {
						//       console.log('定位获取失败');
						//     }
						//   },
						//   fail: function () {
						//     console.log('请检查连接地址');
						//   }
						// });
						typeof cb == "function" && cb(res);
					}
				});
			}
		})
	}
	//wx.setStorageSync('area_id', e.detail.value);
}

util.page = function() {
	const pages = getCurrentPages();
	//console.log(pages.length);
	wx.showModal({
		title: '获取信息失败',
		content: `当前页面数${pages.length}`,
		success: function(res) {
			if (res.confirm) {
				util.getUserInfo();
			}
		}
	})
}

util.toast = function(title = '', icon = 'success', cb) {
	wx.showToast({
		title: title,
		icon: icon,
		duration: 1500,
		mask: true,
		success: function(res) {
			typeof cb == "function" && cb();
		}
	})
}

util.navigateBack = function(obj) {
	let delta = obj.delta ? obj.delta : 1;
	if (obj.data) {
		let pages = getCurrentPages()
		let curPage = pages[pages.length - (delta + 1)];
		if (curPage.pageForResult) {
			curPage.pageForResult(obj.data);
		} else {
			console.log(obj.data)
			curPage.setData(obj.data);
		}
	}
	wx.navigateBack({
		delta: delta, // 回退前 delta(默认为1) 页面
		success: function(res) {
			// success
			typeof obj.success == "function" && obj.success(res);
		},
		fail: function(err) {
			// fail
			typeof obj.fail == "function" && obj.function(err);
		},
		complete: function() {
			// complete
			typeof obj.complete == "function" && obj.complete();
		}
	})
}
util.formatTime = function(time) {
	if (typeof time !== 'number' || time < 0) {
		return time;
	}
	var hour = parseInt(time / 3600);
	time = time % 3600;
	var minute = parseInt(time / 60);
	time = time % 60;
	var second = time;
	return ([hour, minute, second]).map(function(n) {
		n = n.toString();
		return n[1] ? n : '0' + n;
	}).join(':');
}

util.formatDate = function(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	return [year, month, day].map(formatNumber).join('-')
}

util.footer = function($this) {
	var that = $this;
	that.setData({
		tabBar: app.tabBar,
		'tabBar.thisurl': that.__route__
	})
}

util.user = util.getUserInfo;
var formatNumber = function(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

module.exports = util;
