# Setup Development Environment

In order to work on the API, you'll need to install the source version locally. The application sourcecode is being hosted in the [directus/api](https://github.com/directus/api) repo on GitHub.

## Requirements

* A HTTP Web Server that supports URL rewrites
    * _Comes with .htaccess included for Apache_
* MySQL 5.2+
    * Database (empty or existing)
    * Database User (with access to database)
* PHP 5.6+ or 7.0+
    * `pdo` + `mysql`
    * `curl`
    * `gd`
    * `fileinfo`
    * `mbstring`
    * `xml` (Only if you are installing phpunit)
* [Node.js](https://nodejs.org) v8.11.3 or higher (preferably v10.6+)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to fetch the source code from GitHub
* [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx) to install dependencies

:::warning Important
[Click here to learn more about these system requirements, neccesary permissions, and other important and server-specific prerequisites.](/api/admin/requirements.md)
:::

## Setup Steps

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

If you don't want to install any development package use the `--no-dev` option.

```bash
composer install --no-dev
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

#### Boilerplate SQL

If you'd rather skip the installer (next step), you can simply import the boilerplate schema file from [the included schema.sql file](https://github.com/directus/api/blob/master/src/schema.sql).

#### Demo SQL

This file comes with the boilerplate schema as well as some dummy collections, fields, data, and Settings. You can [download a demo SQL schema](https://sql.directus.app/demo.sql) to skip the API's installation process.

::: tip Credentials
If you are skipping the installer and adding the SQL directly to your database, the default login credentials are:

* **User:** `admin@example.com`
* **Password:** `password`
:::

### 5. Config File Installer

The API uses a config file to know which database to connect to. Copy or rename the `/config/api_example.php` file to `/config/api.php` (default project) and edit the settings as indicated.

[Learn more about configuring the API](../admin/configure.md)
