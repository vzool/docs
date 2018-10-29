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
  * [`/schema.sql`](#schema) – The empty database boilerplate
  * `/web.php` The http/web entry-point bootstrap
* `/tests` Response and code tests

### Dependencies

See [`composer.json`](https://github.com/directus/api/blob/master/composer.json) file for all dependencies.

## Tests

There are two types of tests: testing the API http response (actual requests) and code testing using PHPUnit.

## Migrations and Seeders

The migration files are created using [Phinx](https://phinx.org).

**Migrations** are a way to define a database schema programmatically, making it easier to make and apply changes.

Each migration file represents a table.

To create a new migration file use the following command: `vendor/bin/phinx create MyNewMigration -c config/migrations.php`, it will create a new migration in the format `YYYYMMDDHHMMSS_my_new_migration.php`, where the first 14 characters are replaced with the current timestamp down to the second.

**Seeders** are a way to insert data into tables. Read [How to Create Seeding](http://docs.phinx.org/en/latest/seeding.html#creating-a-new-seed-class).

Each seeder represents the default data for some tables.

To create a new seeding file use the following command: `php vendor/bin/phinx seed:create UsersSeeder`, it will create a new file in `migrations/db/seeds` named `UsersSeeder.php` with the similar template shown below:

```php
<?php

use Phinx\Seed\AbstractSeed;

class UsersSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     */
    public function run()
    {

    }
}
```

The example below show how to insert data into the `directus_users` table.

```php
<?php

use Phinx\Seed\AbstractSeed;

class UsersSeeder extends AbstractSeed
{
    public function run()
    {
        $data = [
            [
                'email'    => 'admin@example.com'
            ],[
                'email'    => 'user@example.com'
            ]
        ];

        $posts = $this->table('directus_users');
        $posts->insert($data)
              ->save();
    }
}
```

The seeder ran after the migrations when database install command is executed.

## Schema

The `schema.sql` is a MySQL database dump. There's no automatic way of creating this, but it's an manual export of the tables and rows created by the migrations and seeders on installation.

## Documentation

Documentation is generated using [VuePress](https://vuepress.vuejs.org).