# Install Locally

## System Requirements

* PHP 5.6+ or 7.0+
* MySQL 5.6+
* A webserver (comes with .htaccess for Apache included) that supports URL rewrites
* [Node.js](https://nodejs.org) v8.11.3 or higher (preferably v10.6+)
* [Composer](https://getcomposer.org/)

## Steps

### 1. Clone the repo

Clone the repo by running

```bash
git clone https://github.com/directus/api.git
```

OR

```bash
git clone git@github.com:directus/api.git
```

### 2. Install the Composer dependencies

```bash
composer install
```

### 3. Install the npm dependencies of and build the extensions

```bash
cd extensions
npm install
npm run build
```

::: tip Development mode
Just like the app, if you'd like to actively work on Extensions, use `npm run dev` instead of `npm run build`.
:::

### 4. Create a database

In your local database, create a new database to use with the API.

::: tip
You can [download a demo SQL schema](https://sql.directus.app/demo.sql) to skip the api's installation process.
:::

### 5. Add a config file

The api uses a config file to know what database to connect to. Copy or rename the `/config/api_example.php` file to `/config/api.php` and edit the settings as indicated.

::: warning
By default, **CORS is turned off**. This means that only applications that share the same domain name are allowed access to the API. Seeing it's very likely the application won't be served from the same domain locally, it's highly recommended to turn CORS on. This setting is managed in the same config file mentioned above.
:::