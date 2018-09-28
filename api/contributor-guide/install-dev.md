# Setup Development Environment

In order to work on the API, you'll need to install the source version locally. The application sourcecode is being hosted in the [directus/api](https://github.com/directus/api) repo on GitHub.

## System Requirements

* PHP 5.6+ or 7.0+
* MySQL 5.6+
* A webserver (comes with .htaccess for Apache included) that supports URL rewrites
* [Node.js](https://nodejs.org) v8.11.3 or higher (preferably v10.6+)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to fetch the source code from GitHub
* [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx) to install dependencies

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

::: warning Fork
If you want to work on your fork of the project, remember to replace `directus` with your GitHub username in the url above
:::

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

On your local server, create a new database to use with the API.

### 5. Add a config file

The API uses a config file to know which database to connect to. Copy or rename the `/config/api_example.php` file to `/config/api.php` and edit the settings as indicated.

::: tip
You can [download a demo SQL schema](https://sql.directus.app/demo.sql) to skip the API's installation process.
:::