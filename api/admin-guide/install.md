# Install

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