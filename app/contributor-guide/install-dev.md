# Getting up and running locally

In order to work on the API and or application, it's highly recommended to get a (development) version of both the api and application up and running.

While you technically don't need one to work on the other, it's often easier to have both the app and the api running locally before you start working on either one of them.

## Decoupled

The API and the application are two separate entities, and both have their own repo. This means that the application can connect to any API. This also means that you will have to install two separate projects in order to work on the full Directus project.

### Extensions

Extensions, like _listings_, _interfaces_, and _pages_, are being served from the API. This means that multiple instances of the application have access to the extensions that are installed on a single API. In order to work on extensions for use in the application, you actually have to have a local instance of the API running.

## Application

### System Requirements

The application is built with [Vue.js](https://vuejs.org) and heavily relies on [Node.js](https://nodejs.org) to be bundled / transpiled to browser-usable code. In order to work on Directus, you need [Node.js](https://nodejs.org) v8.11.3 or higher (preferably v10.6+).

The application sourcecode is being hosted in the [directus/app](https://github.com/directus/app) repo on GitHub. 

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
If you want to work on your fork of the project, remember to replace `directus` with your GitHub username in the url above
:::

#### 2. Install the [npm](https://npmjs.com) dependencies

```bash
npm install
```

#### 3. Add a config file

The application makes use of a config file that's found in the `public` folder in the root of the folder. To prevent issues when upgrading the app, we decided to ignore the default version of this config file. We do provide an example that you can duplicate. Move or rename the `/public/config_example.js` file to `/public/config.js` file to your hearts content.

::: tip
The default config file lets you test the app using the live Directus Demo API. Don't forget to add the address of your lcal API in order to test it.
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

## API

Seeing the current version of the API runs on PHP, it's installation and requirements are a little more involved. If you solely want to work on the application, and not the extensions, you can choose to use the live demo api instead.

The API sourcecode is being hosted in the [directus/api](https://github.com/directus/api) repo on GitHub. 

### System Requirements

* PHP 5.6+ or 7.0+
* MySQL 5.6+
* A webserver (comes with .htaccess for Apache included) that supports URL rewrites
* [Node.js](https://nodejs.org) v8.11.3 or higher (preferably v10.6+)
* [Composer](https://getcomposer.org/)

I personally use [MAMP](https://www.mamp.info/en/) (or WAMP / XAMP) for local development.

### Steps

#### 1. Clone the repo

Clone the repo by running

```bash
git clone https://github.com/directus/api.git
```

OR

```bash
git clone git@github.com:directus/api.git
```

#### 2. Install the Composer dependencies

```bash
composer install
```

#### 3. Install the npm dependencies of and build the extensions

```bash
cd extensions
npm install
npm run build
```

::: tip Development mode
Just like the app, if you'd like to actively work on Extensions, use `npm run dev` instead of `npm run build`.
:::

#### 4. Create a database

In your local database, create a new database to use with the API.

::: tip
You can [download a demo SQL schema](https://sql.directus.app/demo.sql) to skip the api's installation process.
:::

#### 4. Add a config file

The api uses a config file to know what database to connect to. Copy or rename the `/config/api_example.php` file to `/config/api.php` and edit the settings as indicated.

::: warning
By default, **CORS is turned off**. This means that only applications that share the same domain name are allowed access to the API. Seeing it's very likely the application won't be served from the same domain locally, it's highly recommended to turn CORS on. This setting is managed in the same config file mentioned above.
:::
