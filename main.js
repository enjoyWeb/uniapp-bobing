import Vue from 'vue'
import App from './App'
import api from './common/js/app.js';
import util from './common/js/util.js';
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$util = util;
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
