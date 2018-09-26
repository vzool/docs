# Installing the Directus API

Installation will vary depending on your specific server and project goals. This guide with walk you through several of the most common installation methods.

## Requirements

Directus is quite flexible and can be installed on many different varieties of server/database setups. Learn more about the [Directus Requirements](./requirements.md).

* HTTP/Web Server
* MySQL 5.2+
    * Database (empty or existing)
    * Database User (with access to database)
* PHP 5.6+
    * `pdo` + `mysql`
    * `curl`
    * `gd`
    * `fileinfo`
    * `mbstring`

## Installation

The Directus API can be installed in three ways:

::: tip
For instructions on how to setup a local development copy, checkout our [dev install guide](../contributor-guide/install-dev.md)
:::

### Using Git

The easiest way of installing and updating the API is through Git. By using the build branch on our repo, you're assured to have the latest version pre-bundled and ready to go.

To install the pre-bundled build version through Git, run

```bash
git clone -b build https://github.com/directus/api.git
```

### Manually

If you don't have access to the command line for your server, you can download the static bundle manually as a zip. Head over to [the releases page](https://github.com/directus/api/releases) to download a fresh copy of the latest version.

### Using Docker

@TODO

Our Docker image includes the database and server setup to get you up-and-running even faster.

[Install Using Docker](https://github.com/directus/directus-docker)

Running the Directus API in Docker is a breeze. The API comes with its own Dockerfile, which you can use to to run it.

Download a copy of the latest release from the [Releases Page](https://github.com/directus/api/releases), `cd` into the directory and run

```bash
$ docker build . -t directus
```

After the image has been built, you can run it with

```bash
$ docker run -it -d -e API_URL=<url> -p <port>:80 <name>
```

Replace `<url>` with the API URL you'd like to connect to, `<port>` with the port you want the application to be exposed on, and `<name>` with a name of your choosing which Docker will use internally.

## Post-Installation

### Web Server Setup

Directus API should work on any HTTP Server, but most testing has been done on Apache 2, NGINX, and Caddy.

1. The root directory for Directus API should be `public` directory.
2. The following files/folders should have write permission:
    * `/logs`
    * `/public/uploads` (or your configured upload directory)
3. Make sure the directory ownership is set to user the web server is running under. Usually the user is `www-data`
    * eg: `sudo chown -R www-data:www-data /var/www/api`

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

### Configuration

Lastly, we need to generate a project config file and add the system boilerplate data to the database.

[Configure with App](./configure-with-app.md)

[Configure with Script](./configure-with-script.md)

[Configure Manually](./configure-manually.md)

### Installation Complete

If you followed the steps above you have successfully installed the Directus API and can now access secure endpoints with your Admin credentials. To learn more about the many Directus API endpoints you can browse our [API Reference](/api/reference.md).
