(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ranking/ranking"],{"0418":function(t,a,n){"use strict";n.r(a);var i=n("7797"),e=n("14b4");for(var o in e)"default"!==o&&function(t){n.d(a,t,function(){return e[t]})}(o);n("d33b");var s=n("2877"),c=Object(s["a"])(e["default"],i["a"],i["b"],!1,null,null,null);a["default"]=c.exports},"14b4":function(t,a,n){"use strict";n.r(a);var i=n("bc32"),e=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(a,t,function(){return i[t]})}(o);a["default"]=e.a},"52bd":function(t,a,n){},7797:function(t,a,n){"use strict";var i=function(){var t=this,a=t.$createElement;t._self._c},e=[];n.d(a,"a",function(){return i}),n.d(a,"b",function(){return e})},bc32:function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{topList:[{avatar:"",nickname:"",prize_times:0},{avatar:"",nickname:"",prize_times:0},{avatar:"",nickname:"",prize_times:0}],list:[],page:1,isLoading:!0,nav_ioc_top:0}},onReachBottom:function(){var a=this,n=this.page;this.isLoading?this.$api.getUserRank({page:n}).then(function(t){1==t.data.code?(a.list=a.list.concat(t.data.info),a.page=a.page+1,a.isLoading=!0):a.isLoading=!1}):t.showToast({title:"暂无更多",icon:"none"})},onLoad:function(){var t=wx.getSystemInfoSync();console.log(t),this.scrollerHeight=t.windowHeight-155;var a=48;"ios"==t.platform&&(a=44),this.nav_ioc_top=t.statusBarHeight+(a-32)/2},onShow:function(){var t=this,a=this.page;1==a&&this.$api.getUserRank({page:a}).then(function(n){if(1==n.data.code){if(1==a){t.topList=[];for(var i=0;i<15;i++)i<3?void 0!=n.data.info[i]?t.topList.push(n.data.info[i]):t.topList.push({avatar:"",nickname:"",prize_times:0}):void 0!=n.data.info[i]&&t.list.push(n.data.info[i]);t.page=2,t.isLoading=!0}}else t.isLoading=!1})},methods:{backpage:function(){t.navigateBack({delta:1})},back:function(){t.navigateBack({delta:1})}}};a.default=n}).call(this,n("543d")["default"])},d33b:function(t,a,n){"use strict";var i=n("52bd"),e=n.n(i);e.a}},[["048c","common/runtime","common/vendor"]]]);