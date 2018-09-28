# Directus Requirements

## HTTP Web Server

Directus has been tested on Apache 2, NGINX, and Caddy. In theory, it should work on any HTTP Server.

The API requires the web server to support URL rewriting for routing the request.

### Server Specific

Depending on the HTTP web server you are using, you may need to ensure proper setup for Directus to work as expected. Any edge-case server configurations are outlined below:

* **Apache 2** – [View Setup Details](./setup-apache.md)
* **NGINX** – [View Setup Details](./setup-nginx.md)
* **Caddy** – [View Setup Details](./setup-caddy.md)

### Permissions

1. The root directory for Directus API should be `public` directory.
2. Make sure the directory ownership is set to user the web server is running under. Usually the user is `www-data`
    * eg: `sudo chown -R www-data:www-data /var/www/api`
3. The following files/folders should have write permission:
    * `/logs`
    * `/public/uploads` (or your configured upload directory)

## SQL

Directus requires MySQL 5.2+ or any drop-in alternatives such as MariaDB or Percona Server.

### Database

To install Directus you will first need a database and a database-user with access to it. You can create a blank database, or install Directus on an existing database that already has a schema and content.

Directus can manage your database's schema, this requires the user to have privileges to create, alter and drop tables in your database. Also the user must have the privilege to insert, update and delete items in the database.

[Learn more about creating a database](./creating-a-database.md)

## PHP

Directus requires PHP 5.6+, though we recommend using the most recent/stable version possible.

## PHP Extensions

While most of these PHP extensions are typically included by default, you should confirm that all are installed by checking the `php.ini` of your php (_not CLI_) installation, or using `phpinfo()`.

* `pdo` + `mysql` – PHP Data Objects (PDO) enables safer _parameterized_ queries
* `curl` – cURL fetches metadata (eg: title and thumbnail) from embed services like YouTube and Vimeo
* `gd` – GD allows the [Thumbnailer](https://github.com/directus/directus-thumbnailer) to generate images. To add thumbnail support for SVG, PDF, PSD and TIF/TIFF you must also install the `imagick` extension.
* `fileinfo` – Fetches metadata (eg: charset and file-type) and [IPTC Info](https://iptc.org/standards/photo-metadata/) (eg: location and keywords) for uploaded images.
* `mbstring` – The multibyte string functions helps php to work multibyte encoding. These functions are used by Directus to get the correct string's length or a correct comparison with another string.
* `xml` - Used by PHPUnit (Only required if you are installing PHPUnit)