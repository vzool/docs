# API Admin Guide

## Requirements

* HTTP/Web Server
* MySQL 5.2+
* PHP 5.6+
    * PDO+MySql extension
    * cUrl extension
    * GD extension
    * FileInfo extension
    * Multibyte String extension

::: tip
For local development environments you can use WAMP, XAMP or MAMP
:::

## Installation

Installing the Directus API requires only a few steps. However, with such a wide variety of Operating Systems and HTTP/Web Servers, configuring Directus may be accomplished in different ways. This guide with walk you through how to install the API using common Web Servers and Operating Systems such as Ubuntu and Apache 2.

You are welcome to contribute details on how best to install the API in other development environments.

[Install Using FTP: Build Version](./installing-build.md)

[Install Using Git: Source Version](./installing-source.md)

Another alternative is to use our Docker containers which contain everything you need to get up and running quickly.

[Install Using Docker: Image Version](https://github.com/directus/directus-docker)

### Specific HTTP Web Servers

Directus has been tested on Apache 2, NGINX, and Caddy. While in theory it should work on any HTTP Server, each has a unique process for configuration. If you'd like to try installing on a different server type, you can start by looking at our current [server configurations here](https://github.com/directus/server-configs). Also, we'd love any pull-requests outlining steps for new server-types – just add them to [our list](https://github.com/directus/server-configs).

The root directory for Directus API should be `/path/to/directus/public`.

[Configuring Directus on Different HTTP Servers](https://github.com/directus/server-configs)

* [Apache 2 Configuration](https://github.com/directus/server-configs-apache)
* [NGINX Configuration](https://github.com/directus/server-configs-nginx)
* [Caddy Configuration](https://github.com/directus/server-configs-caddy)

### PHP

The API requires PHP 5.6+ with the following extensions installed:

* **PDO + MySQL** – PHP Data Objects (PDO) enables safer _parameterized_ queries
* **cURL** – cURL fetches metadata (eg: title and thumbnail) from embed services like YouTube and Vimeo
* **GD** – GD allows the [Thumbnailer](https://github.com/directus/directus-thumbnailer) to generate images. To add thumbnail support for SVG, PDF, PSD and TIF/TIFF you must also install the `ImageMagick` extension.
* **FileInfo** – FileInfo fetches metadata (eg: charset and file-type) and [IPTC Info](https://iptc.org/standards/photo-metadata/) (eg: location and keywords) for uploaded files.
* **MultiByte String** – The multibyte string functions are used by the `StringUtil` class to get a string's length or check if a string is contained within another.

### Database

To install Directus you will first need a database and a database-user with access to it. Directus supports MySQL (v5.6+) and any drop-in alternatives like MariaDB (v10+) and Percona. Since Directus manages the database directly, it is possible to install Directus on top of an existing database that already has a schema and content.

[Learn more about MySQL Installation](https://dev.mysql.com/doc/refman/8.0/en/installing.html).

[Learn more about creating a database](./creating-a-database.md)

### Config File

This file contains the API configuration options, most noteably: the database credentials. Below are two different ways to generate the file:

[Configure Manually](./configure-manually.md)

[Configure with Script](./configure-with-script.md)

### Installation Complete

If you followed the steps above you have successfully installed the Directus API and can now access secure endpoints with your Admin credentials. To learn more about the many Directus API Endpoints you can browse our [API Reference](#).

## Configuring the API

### `app`

The API application settings

| Name          | Description   |
| ------------- | ------------- |
| `env`         | Defines the detail of PHP error reporting (errors, warning, and notices). Options: `development` (default) or `production` |
| `timezone`    | PHP default timezone  |

### `settings`

The settings for [Slim](https://www.slimframework.com/), the micro-framework used by Directus

| Name          | Description   |
| ------------- | ------------- |
| `logger`      | The Directus [Monolog]() logger configuration. Settings: `path` - where the log should be stored |

::: tip
Currently the logger only works on the server's filesystem
:::

### `database`

Settings for the database connection

| Name          | Description   |
| ------------- | ------------- |
| `type`        | Database type. `mysql` and any drop-in replacements (MariaDB, Percona) are supported |
| `host`        | Database server host |
| `port`        | Database server port number |
| `name`        | Database name |
| `username`    | Database user username |
| `password`    | Database user password |
| `engine`      | Database storage engine |
| `charset`     | Database connection charset |
| `socket`      | @TODO: Add an option to add a socket connection |

### `cache`

Enables caching to speed-up API responses

| Name          | Description   |
| ------------- | ------------- |
| `enabled`     | Whether or not the cache is enabled. Default: `false`
| `response_ttl`| How long the cache will exists in seconds
| `pool`        | Where the cache will be stored: `filesystem`, `redis`, `apc`, `apcu` or `memcached`


#### APC

| Name          | Description   |
| ------------- | ------------- |
| `adapter`     |  Name of the adapter. Must be `apc`

#### APCU

| Name          | Description   |
| ------------- | ------------- |
| `adapter`     |  Name of the adapter. Must be `apcu`

#### Filesystem

| Name          | Description   |
| ------------- | ------------- |
| `adapter`     |  Name of the adapter. Must be `filesystem`
| `path`        |  Where on the cache will be stored relative to the API root path. Prepend with `/` for absolute

#### Memcached

| Name          | Description   |
| ------------- | ------------- |
| `adapter`     |  Name of the adapter. Must be `memcached`
| `host`        |  Memcached host
| `port`        |  Memcached server port number

#### Redis

| Name          | Description   |
| ------------- | ------------- |
| `adapter`     |  Name of the adapter. Must be `redis`
| `host`        |  Redis server host
| `port`        |  Redis server port number

### `filesystem`

Choose where files can be uploaded. Currently we support local and Amazon-S3

| Name          | Description   |
| ------------- | ------------- |
| `adapter`     | `local` for local filesystem or `s3` for Amazon-S3
| `root`        | Root path where files are uploaded
| `root_url`    | Public URL with access to `root` files
| `key`         | S3 Bucket Key
| `secret`      | S3 Bucket Secret
| `region`      | S3 Bucket Region
| `version`     | S3 API version
| `bucket`      | S3 Bucket name

### `mail`

A list of key-value-pairs (array) mail configurations. Currently only the `default` key is supported. Each value must have at least the following information:

| Name          | Description   |
| ------------- | ------------- |
| `adapter`     | Only `swift_mailer` is supported at the moment
| `transport`   | `smtp`, `sendmail`, `simple_file` (dummy example) or your own class name resolution string
| `from`        | The global "from" email address

::: tip
You can extend `Directus\Mail\Transports\AbstractTransport` class to create your own Swift Mailer transport. All options that exists in your mailer config will be passed to your transport.
:::

### `cors`

Cross-Origin Resource Sharing (CORS) is a mechanism that allows you to restricted access of Directus API from other domains

| Name              | Description   |
| ----------------- | ------------- |
| `enabled`         | Indicate whether or not CORS is enabled
| `origin`          | One more more URI allowed access to the API resource. Default: `*` (All).
| `methods`         | Method or methods allowed to access the API resource. Default: `GET,PUT,PATCH,POST,DELETE,HEAD`.
| `headers`         | List of headers are allowed when making the actual request. Default: `Access-Control-Allow-Headers,Content-Type,Authorization`.
| `exposed_headers` | List of headers the browser are allowed to access. Default: `none`.
| `max_age`         | How long in seconds a preflight request can be cached. Default: `none`.
| `credentials`     | Indicate whether or not to include credentials in the request. Default: `false`.

### `hooks`

Hooks allow you to execute custom code when a Directus Event happens. You can register functions or classes to a hook name and when the event happens it will execute that code. FOr example:

```php
'hooks' => [
    'collection.insert.articles' => function ($data, $collectionName) {
        $content = 'New article was created with the title: ' . $data['title'];
        // pesudo function
        notify('admin@example.com', 'New Article', $content);
    }
]
```

The example above will execute the `notify` function after an item has been inserted into the `articles` table.

A class that implements the `__invoke` method or inherits from `\Directus\Hook\HookInterface` can also be used, and instead of passing a function you must pass the fully qualified class name resolution. For example: `\MyApplication\Events\NotifyNewArticles::class`.

### `filters`

Filters work the same as hooks except that you can manipulate the data being passed. This is a nice way to add, remove, or manipulate the data before it is sent to the database. Filters always pass a `\Directus\Hook\Payload` object as the first parameter and it must return a payload object. An example would be generating a new UUID every time an article is created:

```php
'filters' => [
    'collection.insert.articles:before' => function (\Directus\Hook\Payload $payload) {
        $payload->set('uuid', generate_uuid4());

        return $payload;
    }
]
```

### `feedback`

It doesn't do anything on version 2.0, but it was created to ping our server to understand approximately how many instances of Directus exists.

### `tableBlacklist`

It doesn't do anything, but it was meant to blacklist tables from being used by Directus.

### `auth`

| Name          | Description   |
| ------------- | ------------- |
| `secret_key`  | This key is used by the JWT encode function to encode tokens |
| `social_providers` | List of available third-party authentication providers |


Out-of-the-box Directus supports `Okta`, `GitHub`, `Facebook`, `Twitter` and `Google` Single-Sign-On (SSO), but also allows you to create your own providers.

#### Okta

| Name            | Description   |
| --------------- | ------------- |
| `client_id`     | Your Okta client id key |
| `client_secret` | Your Okta client secret key |
| `base_url`      | Your okta application base URL |

#### GitHub

| name            | Description   |
| --------------- | ------------- |
| `client_id`     | Your application client id |
| `client_secret` | Your application client secret key |

#### Facebook

| Name                | Description   |
| ------------------- | ------------- |
| `client_id`         | Your application client id |
| `client_secret`     | Your application client secret key |
| `graph_api_version` | Facebook graph API version |

#### Google

| Name                | Description   |
| ------------------- | ------------- |
| `client_id`         | Your application client id |
| `client_secret`     | Your application client secret key |
| `hosted_domain`     | Your application allowed hosted domain |

#### Twitter

| Name                | Description   |
| ------------------- | ------------- |
| `identifier`        | Your application identifier key |
| `secret`            | Your application secret key |

## Updating the API

### Versionless

## Storing Files

## Permissions

## Collections & Fields

## Extensions

The API has been designed to be extensible, allowing you to add more third-party auth providers, endpoints, hashers, hooks, mail templates, database migrations, and seeders.

### Auth Providers

TODO

### Endpoints

TODO

### Hashers

TODO

### Hooks

Directus provides a list of events hooks that are triggered when an actions occurs. For example: after an item is updated.

There are two type of hooks, `actions` and `filters`.

- **Actions** execute a piece of code _without_ altering the data being passed through it
- **Filters** are the same as Actions but _can_ change the data passed through it

For example: an Action might send an email to user when an new article is created. While a Filter might set a UUID for a new article before it's inserted.

TODO

### Web Hooks

TODO

### Mail template

TODO

## Migrations

TODO

