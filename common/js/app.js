var app = require('./util.js');

export default {
	login(cb) {
		app.request({
			url: 'session/openid',
			'data': {

			},
			success: function(res) {
				// if (res.data.code == 0) {
				//   typeof cb == "function" && cb(res);
				// } else {
				//   doAlert(res.data.message);
				// }
				console.log(1)
			},
			fail: function() {
				failGo('你的网络可能有点问题！请重试一下！');
			}
		})
	},
	getStoreInfo() {
		return new Promise((resolve, reject) => {
			app.request({
				url: 'gambling/getStoreInfo',
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})
	},
	getUserRank(data) {
		return new Promise((resolve, reject) => {
			app.request({
				url: 'gambling/getUserRank',
				data: data,
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})
	},
	getGamblingRecord(data) {
		return new Promise((resolve, reject) => {
			app.request({
				url: 'gambling/getGamblingRecord',
				data: data,
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})
	},
	addUserInvite(data) {
		return new Promise((resolve, reject) => {
			app.request({
				url: 'gambling/addUserInvite',
				data: data,
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})
	},
	createVerificationCode(data) {
		return new Promise((resolve, reject) => {
			app.request({
				url: 'gambling/createVerificationCode',
				data: data,
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})
	},
	getRecordStatus(data) {
		return new Promise((resolve, reject) => {
			app.request({
				url: 'gambling/getRecordStatus',
				data: data,
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})
	},
	updateStoreViews() {
		return new Promise((resolve, reject) => {
			app.request({
				url: 'gambling/updateStoreViews',
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})
	},
	createStorePoster() {
		return new Promise((resolve, reject) => {
			app.request({
				url: 'gambling/createStorePoster',
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})
	},
	addPlayTimes() {
		return new Promise((resolve, reject) => {
			app.request({
				url: 'gambling/addPlayTimes',
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})
	},
	getUserInfo() {
		return new Promise((resolve, reject) => {
			app.request({
				url: 'gambling/getUserInfo',
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})
	},
	play() {
		return new Promise((resolve, reject) => {
			app.request({
				url: 'gambling/play',
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})
	},
	contains(a, obj) {
		var i = a.length;
		while (i--) {
			if (a[i] === obj) {
				return true;
			}
		}
		return false;
	},
	uploadImage(data) {
		return new Promise((resolve, reject) => {
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function(e) {
					var tempFilePaths = e.tempFilePaths;
					app.util.uploadFile({
						url: 'book/uploadImage',
						filePath: tempFilePaths[0],
						name: 'file',
						success: function(res) {
							resolve(res);
						},
						fail: function(res) {
							app.util.toast('上传失败', 'fail')
						}
					})
				}
			})
		})
	},
	failGo(content) {
		wx.showModal({
			content: content ? content : '',
			showCancel: false,
			success: function(res) {
				if (res.confirm) {
					wx.redirectTo({
						url: '/pages/index/index'
					})
				}
			}
		})
	},
	doAlert(content, cb = '') {
		return new Promise((resolve, reject) => {
			wx.showModal({
				content: content ? content : '',
				showCancel: true,
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				}
			})
		})

	},
}
