# Install

## Requirements

* HTTP/Web Server
* MySQL 5.2+
* PHP 5.6+
    * `pdo` + `mysql`
    * `curl`
    * `gd`
    * `fileinfo`
    * `mbstring`

::: tip
Learn more about the [Directus Requirements](./requirements.md).
:::

## Installation

Installation will vary depending on your specific server and project goals. This guide with walk you through several of the most common installation methods.

### Get Directus

The first step is to decide on how we want to get Directus.

#### Build Version

This is everything you need, pre-built and ready to go.

[Install Build](./installing-build.md)

#### Docker Container

Our Docker image includes the database and server setup to get you up-and-running even faster.

[Install Using Docker](https://github.com/directus/directus-docker)

#### From Source

Use this source version if you'd like to customize, extend, or contribute to the actual Directus codebase. This is a more advanced method, so make sure you're first familiar with things like `composer` and `npm`.

[Install Source](./installing-source.md)

### Web Server Setup

Directus API should work on any HTTP Server, but it has been tested on Apache 2, NGINX, and Caddy.

The root directory for Directus API should be `/path/to/directus/public`.

The following files/folders should have write permission:

* `/logs`
* `/public/uploads` (or your configured upload directory)

#### Specific Server Setup

[Apache 2 Setup](./setup-apache.md)

[NGINX Setup](./setup-nginx.md)

[Caddy Setup](./setup-caddy.md)

::: tip
For local development environments you can use WAMP, XAMP or MAMP
:::

::: tip
We appreciate any pull-requests outlining steps for new server-types. Just submit them to [these Docs on GitHub](https://github.com/directus/docs).
:::

### Database

To install Directus you will first need a database and a database-user with access to it. You can create a blank database, or install Directus on an existing database that already has a schema and content.

[Learn more about creating a database](./creating-a-database.md)

### Configuration

Lastly, we need to generate a project config file and add the system boilerplate data to the database.

[Configure with App](./configure-with-app.md)

[Configure with Script](./configure-with-script.md)

[Configure Manually](./configure-manually.md)

### Installation Complete

If you followed the steps above you have successfully installed the Directus API and can now access secure endpoints with your Admin credentials. To learn more about the many Directus API endpoints you can browse our [API Reference](/api/reference.md).
