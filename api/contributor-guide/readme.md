# API Contributor Guide

## Understanding Directus API Internals

- Install locally from source
- Database Overview
- Directories structure
- Dependencies
- API Request flow

## Install Locally from Source

* [Installing the app locally](#)

## Requirements

* PHP 5.6+
* MySQL 5.6+
* A webserver (comes with `.htaccess` for Apache included)

## Steps

1. Clone [the repo](http://github.com/directus/api)
2. Install the composer dependencies
  `composer install`
3. Rename `/config/api_example.php` to `/config/api.php`
4. Enter the correct MySQL information in `/config/api.php`
5. [Download a demo database setup](https://sql.directus.app/demo.sql) so you have something to work with
6. Build the core extensions for production by going into the `extensions` folder and running `npm install && npm run build`

## Database Overview

[The Directus Core Database Overview](./core-database-overview.md)

## Codebase Overview

[The Directus API Core Codebase Overview](./core-codebase-overview.md)

## Role Overview

There are two fixed user roles that can not be changed:

* Admin – (ID `1`) Have full permissions for everything in the system
* Public – (ID `2`) Users can not be assigned to the Public role, it only determines which endpoints can be accessed without authentication

:::tip
Currently, a user can only have a single role, but the goal is to add the ability for merging _multiple_ roles per user with the highest permissions taking affect.
:::

## Permissions Overview

[Role Permissions](/api/contributor-guide/#Permissions)

### Seeding

To function properly, Directus needs to fill the blank database with an initial set of system records. The process of adding this data is called seeding. These seeds are stored in the [seeds folder](https://github.com/directus/api/tree/master/migrations/db/seeds).

## Common Installation Errors

Below are explanations of common installation issues that you may encounter and solutions to help you resolve them.

### Problem

`Undefined class constant 'MYSQL_ATTR_USE_BUFFERED_QUERY'`

#### Reason

PDO MySQL client is not installed/enabled

#### Solution

Install PHP MySQL client

```shell
# PHP 5
sudo apt-get install php5-mysql

# PHP 7
sudo apt-get install php7.0-mysql
```

## Deploying Versions

1. Clone repo fresh (or remove any previous configs from an existing copy)
2. Update the version number in `package.json` and `src/core/Directus/Application/Application.php` (`DIRECTUS_VERSION` constant)
3. Install vendor dependencies using optimization flag
  * `composer install -a`
4. Install and build extensions
  * `cd extensions && npm install && npm run build`
5. Remove everything that's not needed in production. Things that need to stay:
  * `bin`
  * `config`
  * `logs `
  * `migrations`
  * `public`
  * `src`
  * `vendor`

:::tip
Remember to push to `build` instead of overwriting
:::

6. ~Remove `.git` folder(s) recursively:~
  ~`( find . -type d -name ".git" && find . -name ".gitignore" && find . -name ".gitmodules" ) | xargs rm -rf`~
7. ~Create new git history `git init`~
8. ~Add everything `git add -A`~
9. ~Commit with the tag name `git commit -m '7.0.0-alpha.3'`~
10. ~Force push to build branch `git push -f git@github.com:directus/api.git master:build`~

@TODO Above list needs to be cleaned up

## Reserved Project Names

The following project names are reserved by Directus Core and can not be used. Each represents a root-level API endpoint that exists now or may exist in the future.

- `server`
- `instances`
- `interfaces`
- `pages`
- `layouts`
- `types`

## Soft-Delete Flow

To `soft delete` an item, the API does the following:

1. Check if the collection has a status field
2. Check if the delta data has the status field (_Meaning the status was changed_)
3. Look for all status values with `soft_delete = true`
4. Checks if the new status value (_from delta data_) is one of status values from Step 3
5. Sets `action` to `SOFT_DELETE`

## Single Sign-On Flow

When the application attempts to log a user in using Single Sign-On (SSO):

1. The application will redirect to the API at `/auth/sso/<provider>`
2. The API redirects to the provider (e.g. GitHub/Facebook)
3. The user logs in on the providers website
4. Provider redirects back to the API
5. The API checks the authentication
6. The API redirects back to the application using the referral domain from the initial step 1 request. The API adds the data to the query string. If it's an error, it's going to be in the `?error` parameter, if it's successful it will add the Request Token in the `token` parameter.
7. The client will need to use the Request Token from Step 6 to make a `POST` request to the API to `/auth/access_token` with a `request_token` as a required param to fetch the Access Token.

## Global Settings

These are the Core key-value-pairs within `directus_settings`.

Scope     | Key             | Description
--------- | --------------- | -----------------------------------------------------------------------------
global    | project_name    | The title of the project
global    | auto_sign_out   | Seconds until the auth token to expire after creation
global    | default_limit   | Number of items per request
global    | logo            | The project image logo url
global    | sort_null_last  | Set the null values at last when sorting. Default `1`.
files     | file_naming     | uploaded image naming. `id`, `uuid`, otherwise the original sanitized name. Replacing spaces with `_` (underscore) and leading `.` (dots) with `dot-`.
files     | youtube_api_key | Youtube API key used by to fetch video information when upload a youtube link
thumbnail | not_found_location | This image will be used when trying to generate a thumbnail with invalid options or an error happens on the server trying to create the image) | Returns 404
thumbnail | dimensions      | Comma separate value of dimensions in [width]x[height] format | 200x200
thumbnail | quality_tags    | Key-Value json string of qualities tagged with a name. Ex: `{"best": 100}`. Ranging from 0 to 100. 0 = Worst quality and smaller file size to 100 best quality biggest file size. | `{"poor": 25, "good": 50, "better":  75, "best": 100}`
thumbnail | actions         | **WIP**; List options to perform different thumbnail generation actions. | `contain` and `crop`
thumbnail | cache_ttl       | Cache time to live in seconds. It sets HTTP `max-age` and `Expires` datetime. Default: `86400` seconds = 1 day

 **NOTE**: The file naming `uuid`, uses UUID v5, and `6ba7b810-9dad-11d1-80b4-00c04fd430c8` as the namespace DNS. A constant value defined in [ramsey/uuid](https://github.com/ramsey/uuid/blob/5cadea8447ea1734b66e402aeb1a1739957d59f6/src/Uuid.php#L44) package.

## Directus Datatypes

These are the different types of data that Directus can store, they extend the common SQL datatypes, adding support for additional flavors and system types.

* `VARCHAR`
* `CHAR`
* `TINYTEXT`
* `TEXT`
* `MEDIUMTEXT`
* `LONGTEXT`

* `INT`
* `TINYINT`
* `SMALLINT`
* `MEDIUMINT`
* `BIGINT`

* `DATE`
* `TIME`
* `DATETIME`
* `TIMESTAMP`
* `YEAR`

* `BLOB`
* `CSV`
* `GROUP`
* `ALIAS`
* `BOOLEAN`
* `JSON`

* `PRIMARYKEY`
* `STATUS`
* `SORT`

## Thumbnailer

[Learn more about the Thumbnailer here](/api/admin-guide/thumbnailer.md)

### Options:

See Settings on [API Settings](#)

## Directus CLI

Directus Command-Line Interface (CLI) provides commands that allow you to perform various tasks such as installation, resetting a user's email, or upgrading the database to the most recent Directus schema.

You can use the `help` command at any time to learn about available CLI actions:

```bash
# this will provide information about the current modules
php bin/directus help
```

To get more information on an specific command you can type "help" followed by the command:

```bash
# this provide information about the **install** module
php bin/directus help install
```

### Install Module

Includes commands to install and configure Directus.

#### Configure Directus:

Creates the `config.api.php` file.

:::warning
This command will overwrite the default `config.api.php` configuration file.
:::

```bash
php bin/directus install:config -h <db_host> -n <db_name> -u <db_user> -p <db_pass> -e <directus_email>
```

* `db_host` - The database host
* `db_name` - The database name (it must already exist)
* `db_user` - The database user's name
* `db_pass` - The database user's password
* `directus_email` - (Optional) The Directus email that will be used as sender in the mailing process

Example: http://example.local

```bash
php bin/directus install:config -h localhost -n directus -u root -p pass
```

Example: http://example.local/directus

```bash
php bin/directus install:config -h localhost -n directus -u root -p pass -d directus
```

#### Populate the Database Schema:

Creates all of the Directus Core tables based on the configuration files: `/config/api.php`.

```bash
php bin/directus install:database
```

#### Install Initial Configurations:

Create the default admin user and the site's default settings.

```bash
php bin/directus install:install -e <admin_email> -p <admin_password> -t <site_name>
```

* `admin_email` - The admin email
* `admin_password` - The admin password
* `site_name` - The project title

Example:

```bash
php bin/directus install:install -e admin@directus.local -p password -t "Directus Example"
```

### User Module

Includes commands to manage Directus users

#### Change User Password:

```bash
php bin/directus user:password -e <user_email> -p <new_password>
```

* `user_email` - The user's email
* `new_password` - The user's new password

Example:

```bash
php bin/directus user:password -e admin@directus.local -p newpassword
```

### Database Module

Includes commands to manage Directus database schema

:::tip
This requires that Directus has a valid connection configured in `config/api.php`.
:::

:::warning
Always backup your database before running the database module to prevent data loss.
:::

#### Install Directus Schema:

```bash
php bin/directus db:install
```

### Log Module

#### Prune Old Log Files

```bash
php bin/directus log:prune <days>
```

`<days>` is optional. The default value is `30` days.

Removes all the logs that were last modified `<days>` ago. it uses [`filemtime`](http://php.net/manual/en/function.filemtime.php) function to determine the last modified time.

:::tip
You can setup a cronjob to clean old files at a set frequency
:::
