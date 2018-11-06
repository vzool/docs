(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{244:function(t,e,s){"use strict";s.r(e);var n=s(0),a=Object(n.a)({},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),s("div",{staticClass:"danger custom-block"},[s("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),s("p",[t._v("Global events should be used only as a last resort when working with "),s("router-link",{attrs:{to:"./store.html"}},[t._v("the store")]),t._v(" or regular Vue events between child and parent components doesn't work for your usecase.")],1)]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),s("p",[t._v("The following events are globally in use:")]),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),s("p",[t._v("Something went wrong somewhere in the system")]),t._v(" "),t._m(11),t._v(" "),s("p",[t._v("The global parent app will console.error the error and optionally show a notification to the user")]),t._v(" "),t._m(12),t._v(" "),t._m(13)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"events"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#events","aria-hidden":"true"}},[this._v("#")]),this._v(" Events")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The Directus app has a global event-bus you can use to send messages across the system. Right now, the only global event that's being used in this fashion is "),e("code",[this._v("error")]),this._v(".")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"usage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#usage","aria-hidden":"true"}},[this._v("#")]),this._v(" Usage")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The EventBus can be imported directly from the "),e("code",[this._v("./events/index.js")]),this._v(" file, or can be used in "),e("code",[this._v("this.$events")]),this._v(".")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" EventBus "),s("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"./events/"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nEventBus"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("on")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v('"event"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" handlerFunction"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nEventBus"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("off")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v('"event"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" handlerFunction"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nEventBus"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("once")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v('"event"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" handlerFunction"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nEventBus"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("emit")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v('"event"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"value"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"creating-a-new-global-event"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#creating-a-new-global-event","aria-hidden":"true"}},[this._v("#")]),this._v(" Creating a new global event")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("You should put all event handlers in the "),e("code",[this._v("/events")]),this._v(" folder and put all "),e("code",[this._v("EventBus.on")]),this._v(" statements in "),e("code",[this._v("./events/index.js")]),this._v(". It's near impossible to keep track of all global events if you don't.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("If for whatever reason you need to listen to a global event from within a component, please add a note to the "),e("code",[this._v("./events/index.js")]),this._v(" file so we can keep track of when and why an event is used.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"used-events"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#used-events","aria-hidden":"true"}},[this._v("#")]),this._v(" Used Events")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"error"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#error","aria-hidden":"true"}},[this._v("#")]),this._v(" Error")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"when"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#when","aria-hidden":"true"}},[this._v("#")]),this._v(" When")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"what"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#what","aria-hidden":"true"}},[this._v("#")]),this._v(" What")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#options","aria-hidden":"true"}},[this._v("#")]),this._v(" Options")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("table",[s("thead",[s("tr",[s("th",[t._v("name")]),t._v(" "),s("th",[t._v("type")]),t._v(" "),s("th",[t._v("default")]),t._v(" "),s("th",[t._v("description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("notify")]),t._v(" "),s("td",[t._v("Boolean")]),t._v(" "),s("td",[t._v("false")]),t._v(" "),s("td",[t._v("Show a notification to the user")])]),t._v(" "),s("tr",[s("td",[t._v("message")]),t._v(" "),s("td",[t._v("[String]")]),t._v(" "),s("td",[t._v("$t('something_went_wrong')")]),t._v(" "),s("td",[t._v("Message to show in the console / notification")])]),t._v(" "),s("tr",[s("td",[t._v("error")]),t._v(" "),s("td",[t._v("Object")]),t._v(" "),s("td",[t._v("null")]),t._v(" "),s("td",[t._v("The error stacktrace or whatever error you want logged")])])])])}],!1,null,null,null);a.options.__file="events.md";e.default=a.exports}}]);