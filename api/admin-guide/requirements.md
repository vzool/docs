# Directus Requirements

## HTTP Web Server

Directus has been tested on Apache 2, NGINX, and Caddy. In theory, it should work on any HTTP Server.

## SQL

Directus requires MySQL 5.2+ and drop-in alternatives like MariaDB (v10+) or Percona.

### Database

To install Directus you will first need a database and a database-user with access to it. You can create a blank database, or install Directus on an existing database that already has a schema and content.

[Learn more about creating a database](./creating-a-database.md)

## PHP

Directus requires PHP 5.6+, though we recommend using the most recent/stable version possible.

## PHP Extensions

While most of these PHP extensions are typically included by default, you should confirm that all are installed using `php -m`.

* `pdo` + `mysql` – PHP Data Objects (PDO) enables safer _parameterized_ queries
* `curl` – cURL fetches metadata (eg: title and thumbnail) from embed services like YouTube and Vimeo
* `gd` – GD allows the [Thumbnailer](https://github.com/directus/directus-thumbnailer) to generate images. To add thumbnail support for SVG, PDF, PSD and TIF/TIFF you must also install the `imagick` extension.
* `fileinfo` – Fetches metadata (eg: charset and file-type) and [IPTC Info](https://iptc.org/standards/photo-metadata/) (eg: location and keywords) for uploaded files.
* `mbstring` – The multibyte string functions are used by the `StringUtil` class to get a string's length or check if a string is contained within another.