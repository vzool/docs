# Installing the Directus Suite

The easiest way to get up-and-running with Directus is with our [combined release](https://github.com/directus/directus), which includes the [Directus API](https://github.com/directus/api), the [Directus Application](https://github.com/directus/app), and all required dependencies. Check that your server meets the requirements, install Directus, and then configure it with the installer.

::: warning Legacy Upgrades
Directus 7 is a major release with significant breaking changes from previous versions. Therefore there is no automated way to migrate your settings and configuration from v6 to v7. However, because Directus stores your content as pure SQL, that data is always portable between versions.
:::

## Requirements

Learn more about these system requirements, neccesary permissions, and other server-specific prerequisites on our [dedicated requirements page](/api/admin/requirements.md).

* HTTP/Web Server
* MySQL 5.2+
    * Database (empty or existing)
    * Database User (with access to database)
* PHP 5.6+
    * Extensions:  `pdo`, `mysql`, `curl`, `gd`, `fileinfo`, and `mbstring`

## Install

The preferred method of installing is through Git by running the following command from your server's command line. If your server doesn't allow for this method then you can [install manually too](#install-manually).

```bash
git clone https://github.com/directus/directus.git
```

## Configure

1. Set your document root to the `/public` directory
2. Navigate your browser to the App at `/admin`
3. Follow the prompts to complete configuration (see steps below)

Field          | Description
:------------- | :-----------
Project Name   | The name of your project
Project Key    | For now, only the `_` default is available through the installer
Admin Email    | The email address of your first administrator
Admin Password | The password for your first administrator
Host           | The server/host of your database
Port           | The port for the database (default is 3306)
Database User  | The database user
Database Password | The database user's password
Database Name  | The name of the database
Database Type  | As of now, Directus only supports MySQL

:::tip Manual Config
If you would rather setup your project manually you can [follow these instructions](./api/admin/configure.md). This method creates the default config file (`/config/api.php`) from our sample (`/config/api_sample.php`) and installs the boilerplate database using the included schema file (`/src/schema.sql`).
:::

## Logging In

Once you've finished with the installer, you will automatically be taken to the login page of the Directus App (again, at `/admin`). You can then login with the credentials you provided during the configuration process, or the default credentials if configured manually: `admin@example.com` and `password`

## Other Install Options

### Install Manually

If you don't have access to the command line or would rather do things manually, you can download the static bundle manually as a [zip](https://github.com/directus/directus/archive/master.zip) or [tar](https://github.com/directus/directus/archive/master.tar.gz) file from [our releases page](https://github.com/directus/directus/releases).

#### Zip File

```bash
# Get the zip file from GitHub
wget https://github.com/directus/directus/archive/master.zip

# Decompress the file
unzip master.zip
```

#### Tar File

```bash
# Get the zip file from GitHub
wget https://github.com/directus/directus/archive/master.tar.gz

# Decompress the file
tar -xzf master.tar.gz
```

#### Using FTP

If you don't have access to the command line then you'll need to decompress the files on your local computer before uploading to the remote server, though this will take _much_ longer.

### Install Individually

If you prefer, you can choose to only [install the Directus API](./api/admin/install.md), or only [install the Directus App](./app/admin/install.md). This is useful for multitenancy, such as when you need many instances of the API but only one App to manage them all.

### Install from Source

If you would like to extend or make contributions to the core codebase then you can [install the Directus API Source](./api/contributor/install-dev.md), or [install the Directus App Source](./app/contributor/install-dev.md). This process involves more steps, so we recommend using the combined build for normal usage.
