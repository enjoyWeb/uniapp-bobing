(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{"0d99":function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{change:2,scrollerHeight:700,list:[],page:1,isLoading:!0,nav_ioc_top:0,exchange_id:0}},onShow:function(){console.log("onShow");var t=this;if(1==this.page){var n=wx.getSystemInfoSync();console.log(n),this.scrollerHeight=n.windowHeight-155;var a=48;"ios"==n.platform&&(a=44),this.nav_ioc_top=n.statusBarHeight+(a-32)/2;var e=this.page;this.$api.getGamblingRecord({page:e}).then(function(n){1==n.data.code?(t.list=t.list.concat(n.data.info),t.isLoading=!0,t.page=2):t.isLoading=!1})}if(console.log(this.exchange_id),this.exchange_id){var i=this.exchange_id;this.$api.getRecordStatus({id:i}).then(function(n){if(1==n.data.code){for(var a=0;a<t.list.length;a++)if(t.list[a].id==i&&2==t.list[a].status){t.list[a].status=3;break}t.exchange_id=0}})}},onLoad:function(){},onHide:function(){console.log("onHide")},methods:{loadMore:function(){var n=this,a=this.page;this.isLoading?this.$api.getGamblingRecord({page:a}).then(function(t){1==t.data.code?(n.list=n.list.concat(t.data.info),n.page=n.page+1,n.isLoading=!0):n.isLoading=!1}):t.showToast({title:"暂无更多",icon:"none"})},pageback:function(){t.navigateBack({delta:1})},back:function(){t.navigateBack({delta:1})},exchange:function(n){console.log(n);var a=n,e=this;this.$api.createVerificationCode({id:a}).then(function(n){1==n.data.code?(e.poster=n.data.info,e.exchange_id=a,t.previewImage({urls:[n.data.info]})):t.showToast({title:n.data.message,icon:"none"})})},exchange_code:function(){this.change=2}}};n.default=a}).call(this,a("543d")["default"])},"47f3":function(t,n,a){"use strict";a.r(n);var e=a("0d99"),i=a.n(e);for(var o in e)"default"!==o&&function(t){a.d(n,t,function(){return e[t]})}(o);n["default"]=i.a},a7e0:function(t,n,a){"use strict";var e=a("c36a"),i=a.n(e);i.a},ae52:function(t,n,a){"use strict";a.r(n);var e=a("c552"),i=a("47f3");for(var o in i)"default"!==o&&function(t){a.d(n,t,function(){return i[t]})}(o);a("a7e0");var c=a("2877"),s=Object(c["a"])(i["default"],e["a"],e["b"],!1,null,null,null);n["default"]=s.exports},c36a:function(t,n,a){},c552:function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},i=[];a.d(n,"a",function(){return e}),a.d(n,"b",function(){return i})}},[["62df","common/runtime","common/vendor"]]]);