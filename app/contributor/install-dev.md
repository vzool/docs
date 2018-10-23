# Setup Development Environment

In order to work on the app, you'll need to install the application locally.

::: tip
To quickly debug the application you can use [our demo API](https://next.demo-api.directus.app) by authenticating with the credentials: `admin@example.com` and `password`.
:::

::: warning
Directus extensions are served from the API ([learn why](/extensions/architecture.md)). Therefore, if you want to work on extensions you'll need [a local installation of the API](/api/contributor/install-dev.md) as well.
:::

### System Requirements

The application is built with [Vue.js](https://vuejs.org) and heavily relies on [Node.js](https://nodejs.org) to be bundled / transpiled to browser-usable code. In order to work on Directus, you need [Node.js](https://nodejs.org) v8.11.3 or higher (preferably v10.6+).

The application source code is being hosted in the [directus/app](https://github.com/directus/app) repo on GitHub.

### Steps

#### 1. Clone the repo

Clone the repo by running

```bash
git clone https://github.com/directus/app.git
```

OR

```bash
git clone git@github.com:directus/app.git
```

::: warning Fork
If you want to work on your fork of the project, remember to replace `directus` with your GitHub username in the url above.
:::

#### 2. Install the [npm](https://npmjs.com) dependencies

```bash
npm install
```

#### 3. Add a config file

The application makes use of a config file that's found in the `public` folder in the root of the folder. To prevent issues when upgrading the app, we decided to ignore the default version of this config file. We do provide an example that you can duplicate. Move or rename the `/public/config_example.js` file to `/public/config.js` file to your hearts content.

::: tip
The default config file lets you test the app using the live Directus Demo API. Don't forget to add the address of your local API in order to test it.
:::

#### 4. Build / run the app

The production version of the application is a static html file that can be hosted on any static file server. In order to build the app for production, run

```bash
npm run build
```

To checkout the app itself, you'll need a static file server. Any static file server, like MAMP, local Apache or Caddy, should work. If you don't have a quick server at hand, I recommend using [`http-server`](https://www.npmjs.com/package/http-server).

Install `http-server` globally, run

```bash
npm install --global http-server
```

When it's installed, you can serve the app by running `http-server` from the `dist` folder that has been created by the `build` command:

```bash
cd dist
http-server
```

::: tip Development mode
If you're actively working on the application, I recommend using the development mode. By using `npm run dev` instead of `npm run build`, the buildchain will launch a local file server and will auto-rebuild the code and auto-refresh the browser on save of a file.
:::