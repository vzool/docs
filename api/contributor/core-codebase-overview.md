# Core Codebase Overview

The Directus API core codebase is written in PHP.

* `/bin` – All Directus-specific script files used on the command line (eg: running tests or installing)
* `/config` – Database configuration
* `/logs` – Error and access logs
* [`/migrations`](#migrations-and-seeders) Database migrations and seeders used in version upgrades
* `/public` – The entry point of the API (index.php) and public files (assets, uploads, and extensions)
* [`/src`](#core) – The main Directus API codebase
  * `/core/Directus` – Core libraries
  * `/endpoints` – Endpoint controllers
  * `/helpers` – Function helpers
  * `/mail` – Email templates
  * `/services` – Business logic (service-layer)
  * `/schema.sql` – The empty database boilerplate
  * `/web.php` The http/web entry-point bootstrap
* `/tests` Response and code tests

### Dependencies

See [`composer.json`](https://github.com/directus/api/blob/master/composer.json) file for all dependencies.

## Tests

There are two types of tests: testing the API http response (actual requests) and code testing using PHPUnit.

## Migrations and Seeders

The migration files are created using [Phinx](https://phinx.org).

**Migrations** are a way to define a database schema programmatically, making it easier to make and apply changes. Read [How to Create Migrations](http://docs.phinx.org/en/latest/migrations.html#creating-a-new-migration).

**Seeders** are a way to insert data into tables. Read [How to Create Seeding](http://docs.phinx.org/en/latest/seeding.html#creating-a-new-seed-class).

## Documentation

Documentation is generated using [VuePress](https://vuepress.vuejs.org).