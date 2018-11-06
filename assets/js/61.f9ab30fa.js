(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{240:function(t,e,s){"use strict";s.r(e);var a=s(0),r=Object(a.a)({},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),s("p",[t._v("In order to work on the app, you'll need to install the application locally.")]),t._v(" "),s("div",{staticClass:"tip custom-block"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("To quickly debug the application you can use "),s("a",{attrs:{href:"https://next.demo-api.directus.app",target:"_blank",rel:"noopener noreferrer"}},[t._v("our demo API"),s("OutboundLink")],1),t._v(" by authenticating with the credentials: "),s("code",[t._v("admin@example.com")]),t._v(" and "),s("code",[t._v("password")]),t._v(".")])]),t._v(" "),s("div",{staticClass:"warning custom-block"},[s("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),s("p",[t._v("Directus extensions are served from the API ("),s("router-link",{attrs:{to:"/extensions/architecture.html"}},[t._v("learn why")]),t._v("). Therefore, if you want to work on extensions you'll need "),s("router-link",{attrs:{to:"/api/contributor/install-dev.html"}},[t._v("a local installation of the API")]),t._v(" as well.")],1)]),t._v(" "),t._m(1),t._v(" "),s("p",[t._v("The application is built with "),s("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue.js"),s("OutboundLink")],1),t._v(" and heavily relies on "),s("a",{attrs:{href:"https://nodejs.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js"),s("OutboundLink")],1),t._v(" to be bundled / transpiled to browser-usable code. In order to work on Directus, you need "),s("a",{attrs:{href:"https://nodejs.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js"),s("OutboundLink")],1),t._v(" v8.11.3 or higher (preferably v10.6+).")]),t._v(" "),s("p",[t._v("The application source code is being hosted in the "),s("a",{attrs:{href:"https://github.com/directus/app",target:"_blank",rel:"noopener noreferrer"}},[t._v("directus/app"),s("OutboundLink")],1),t._v(" repo on GitHub.")]),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),s("p",[t._v("Clone the repo by running")]),t._v(" "),t._m(4),s("p",[t._v("OR")]),t._v(" "),t._m(5),t._m(6),t._v(" "),s("h4",{attrs:{id:"_2-install-the-npm-dependencies"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-install-the-npm-dependencies","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. Install the "),s("a",{attrs:{href:"https://npmjs.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("npm"),s("OutboundLink")],1),t._v(" dependencies")]),t._v(" "),t._m(7),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),s("p",[t._v("The production version of the application is a static html file that can be hosted on any static file server. In order to build the app for production, run")]),t._v(" "),t._m(12),s("p",[t._v("To checkout the app itself, you'll need a static file server. Any static file server, like MAMP, local Apache or Caddy, should work. If you don't have a quick server at hand, I recommend using "),s("a",{attrs:{href:"https://www.npmjs.com/package/http-server",target:"_blank",rel:"noopener noreferrer"}},[s("code",[t._v("http-server")]),s("OutboundLink")],1),t._v(".")]),t._v(" "),t._m(13),t._v(" "),t._m(14),t._m(15),t._v(" "),t._m(16),t._m(17)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"setup-development-environment"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#setup-development-environment","aria-hidden":"true"}},[this._v("#")]),this._v(" Setup Development Environment")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"system-requirements"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#system-requirements","aria-hidden":"true"}},[this._v("#")]),this._v(" System Requirements")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"steps"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#steps","aria-hidden":"true"}},[this._v("#")]),this._v(" Steps")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"_1-clone-the-repo"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-clone-the-repo","aria-hidden":"true"}},[this._v("#")]),this._v(" 1. Clone the repo")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token function"}},[this._v("git")]),this._v(" clone https://github.com/directus/app.git\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token function"}},[this._v("git")]),this._v(" clone git@github.com:directus/app.git\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"warning custom-block"},[e("p",{staticClass:"custom-block-title"},[this._v("Fork")]),this._v(" "),e("p",[this._v("If you want to work on your fork of the project, remember to replace "),e("code",[this._v("directus")]),this._v(" with your GitHub username in the url above.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),e("span",{attrs:{class:"token function"}},[this._v("install")]),this._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"_3-add-a-config-file"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-add-a-config-file","aria-hidden":"true"}},[this._v("#")]),this._v(" 3. Add a config file")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The application makes use of a config file that's found in the "),e("code",[this._v("public")]),this._v(" folder in the root of the folder. To prevent issues when upgrading the app, we decided to ignore the default version of this config file. We do provide an example that you can duplicate. Move or rename the "),e("code",[this._v("/public/config_example.js")]),this._v(" file to "),e("code",[this._v("/public/config.js")]),this._v(" file to your hearts content.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[this._v("TIP")]),this._v(" "),e("p",[this._v("The default config file lets you test the app using the live Directus Demo API. Don't forget to add the address of your local API in order to test it.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"_4-build-run-the-app"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-build-run-the-app","aria-hidden":"true"}},[this._v("#")]),this._v(" 4. Build / run the app")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" run build\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Install "),e("code",[this._v("http-server")]),this._v(" globally, run")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),e("span",{attrs:{class:"token function"}},[this._v("install")]),this._v(" --global http-server\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("When it's installed, you can serve the app by running "),e("code",[this._v("http-server")]),this._v(" from the "),e("code",[this._v("dist")]),this._v(" folder that has been created by the "),e("code",[this._v("build")]),this._v(" command:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token function"}},[this._v("cd")]),this._v(" dist\nhttp-server\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[this._v("Development mode")]),this._v(" "),e("p",[this._v("If you're actively working on the application, I recommend using the development mode. By using "),e("code",[this._v("npm run dev")]),this._v(" instead of "),e("code",[this._v("npm run build")]),this._v(", the buildchain will launch a local file server and will auto-rebuild the code and auto-refresh the browser on save of a file.")])])}],!1,null,null,null);r.options.__file="install-dev.md";e.default=r.exports}}]);