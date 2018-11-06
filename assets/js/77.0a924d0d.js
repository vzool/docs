(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{224:function(e,t,s){"use strict";s.r(t);var a=s(0),i=Object(a.a)({},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[e._m(0),e._v(" "),s("p",[e._v("To keep the core codebase as simple and clean as possible, all edge-case ("),s("router-link",{attrs:{to:"./../feature-requests.html#80-20-rule"}},[e._v("80/20 rule")]),e._v(") functionality is added through extensions. There are many different types of extensions which we'll cover, but first let's clarify why extensions are displayed in the App but located in the API codebase.")],1),e._v(" "),e._m(1),e._v(" "),s("p",[e._v('Despite being an App resource, the Directus extensions are actually stored in the API codebase and repository. This seems counter-intuitive, but is neccesary because the Directus App supports multitenancy (you can connect to multiple APIs from one App). If you install a custom interface, like a "Seating Chart", you\'ll want that interface to be available within your project no matter which App you connect through.')]),e._v(" "),e._m(2),e._v(" "),s("div",{staticClass:"tip custom-block"},[s("p",{staticClass:"custom-block-title"},[e._v("Reporting Extension Issues")]),e._v(" "),s("p",[e._v("If you're adding a GitHub issue related to an extension, you still "),s("a",{attrs:{href:"https://github.com/directus/app/issues/new/choose",target:"_blank",rel:"noopener noreferrer"}},[e._v("add it to the App"),s("OutboundLink")],1),e._v(" since that is the logical place to discuss GUI components.")])]),e._v(" "),e._m(3),e._v(" "),s("p",[s("router-link",{attrs:{to:"./architecture.html"}},[e._v("Learn more about Extension Architecture")])],1),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),e._m(6),e._v(" "),s("p",[s("router-link",{attrs:{to:"./interfaces.html"}},[e._v("Learn more about Directus Interfaces")])],1),e._v(" "),e._m(7),e._v(" "),s("p",[e._v("Layouts are custom designs for the Browse Items page. The core layouts are the List view (system default), which shows items in a tabular format, and a Card view (default for Users and Files) for image-based collections.")]),e._v(" "),s("p",[s("router-link",{attrs:{to:"./layouts.html"}},[e._v("Learn more about Directus Layouts")])],1),e._v(" "),e._m(8),e._v(" "),s("p",[e._v("Pages handle everything not covered by Interfaces and Layouts. Pages allow anything to be built inside of Directus: custom dashboards, reports, point-of-sale systems, etc. Each page is protected within the auth gateway and can easily access instance data or global variables (eg: current user).")]),e._v(" "),s("p",[s("router-link",{attrs:{to:"./pages.html"}},[e._v("Learn more about Directus Pages")])],1),e._v(" "),e._m(9),e._v(" "),s("p",[s("router-link",{attrs:{to:"./hooks.html"}},[e._v("Learn more about Directus Hooks")])],1),e._v(" "),e._m(10),e._v(" "),s("p",[s("router-link",{attrs:{to:"./custom-endpoints.html"}},[e._v("Learn more about Directus Custom Endpoints")])],1),e._v(" "),e._m(11),e._v(" "),s("p",[e._v("Storage Adapters allow you to save Directus files anywhere. The default storage adapter is the API server's filesystem, but other adapters are available for other popular options. If you need to implement a proprietary or custom option, that is possible too.")]),e._v(" "),s("p",[s("router-link",{attrs:{to:"./storage-adapters.html"}},[e._v("Learn more about Directus Storage Adapters")])],1),e._v(" "),e._m(12),e._v(" "),s("p",[e._v("Users can use their Directus password to authenticate, or any enabled Single Sing-On (SSO) services.")]),e._v(" "),s("p",[s("router-link",{attrs:{to:"./auth-providers.html"}},[e._v("Learn more about Directus Auth Providers")])],1),e._v(" "),s("p",[e._v("// TODO:")]),e._v(" "),e._m(13)])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"extending-directus"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#extending-directus","aria-hidden":"true"}},[this._v("#")]),this._v(" Extending Directus")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"architecture-explanation"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#architecture-explanation","aria-hidden":"true"}},[this._v("#")]),this._v(" Architecture Explanation")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Because of this, we store all "),t("em",[this._v("custom")]),this._v(" extensions in the API Instance, and to keep things organized, we decided to also serve all "),t("em",[this._v("core")]),this._v(" extensions from the same place.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tip custom-block"},[t("p",{staticClass:"custom-block-title"},[this._v("Disabled Extensions")]),this._v(" "),t("p",[this._v("You can include an extension in your project but disable it from being used by prepending its container directory with an underscore ("),t("code",[this._v("_")]),this._v("). For example, the demo Page is included in the API codebase but is disabled by default: "),t("code",[this._v("api/extensions/core/pages/_demo/")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"interfaces"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#interfaces","aria-hidden":"true"}},[this._v("#")]),this._v(" Interfaces")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Interfaces customize how a field is presented to the user. For example a "),t("code",[this._v("STRING")]),this._v(" datatype would be shown as a text-input by default, but an interface could instead show that as a dropdown, Map, WYSIWYG Editor, or Color Picker.")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[e._v("Each interface also describes how a field's data should be shown on the Browse Items page. For example, you might want to show a boolean as a "),s("code",[e._v("✓")]),e._v(" or "),s("code",[e._v("×")]),e._v(" instead of "),s("code",[e._v("true")]),e._v(" or "),s("code",[e._v("false")]),e._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"layouts"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#layouts","aria-hidden":"true"}},[this._v("#")]),this._v(" Layouts")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"pages"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#pages","aria-hidden":"true"}},[this._v("#")]),this._v(" Pages")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"hooks"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#hooks","aria-hidden":"true"}},[this._v("#")]),this._v(" Hooks")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"custom-endpoints"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#custom-endpoints","aria-hidden":"true"}},[this._v("#")]),this._v(" Custom Endpoints")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"storage-adapters"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#storage-adapters","aria-hidden":"true"}},[this._v("#")]),this._v(" Storage Adapters")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"auth-providers"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#auth-providers","aria-hidden":"true"}},[this._v("#")]),this._v(" Auth Providers")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ul",[s("li",[e._v("Link to Install Wiki/Docs for getting up and running")]),e._v(" "),s("li",[e._v("How to create a new one (write from scratch, copy existing)")]),e._v(" "),s("li",[e._v("Maybe explain that the "),s("code",[e._v("value")]),e._v(" is the important variable to save to? (should be obvious, but might help)")]),e._v(" "),s("li",[e._v("How to work with validation, conditionals for styling, etc")]),e._v(" "),s("li",[e._v("Options! What are they? How to set them, how to fetch/use them in the code")]),e._v(" "),s("li",[e._v("Include link to full styleguide (Google Doc for now)")]),e._v(" "),s("li",[e._v("Maybe explain the Core components they can use? (eg: "),s("code",[e._v("v-input")]),e._v(" and "),s("code",[e._v("v-dropdown")]),e._v(")")]),e._v(" "),s("li",[e._v("Quick explanation of each item in meta.json")]),e._v(" "),s("li",[e._v("Rules for using/including external libraries (size, how to, license, etc)")]),e._v(" "),s("li",[e._v("Can they write code tests for these interfaces?")]),e._v(" "),s("li",[e._v('"Building" the interfaces... is this needed? When does it happen?')]),e._v(" "),s("li",[s("code",[e._v("npm")]),e._v(" commands... for some reason aI can't find them 😕")]),e._v(" "),s("li",[e._v("End with quick info on where/how to properly submit an interface PR to us")])])}],!1,null,null,null);i.options.__file="README.md";t.default=i.exports}}]);