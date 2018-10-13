# Installing the Directus Suite

The easiest way to get up-and-running with Directus is with our [combined release](https://github.com/directus/directus), which includes the [Directus API](https://github.com/directus/api), the [Directus Application](https://github.com/directus/app), and all required dependencies. Check that your server meets the requirements, then choose one of the three ways to install the combined release.

## Requirements

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

:::warning Important
[Click here to learn more about these system requirements, neccesary permissions, and other important and server-specific prerequisites.](/api/admin-guide/requirements.md)
:::

## Install

### Install Using Git

The preferred method of installing is through Git by running the following command from your server's command line.

```bash
git clone https://github.com/directus/directus.git
```

:::tip
Don't have git? You can [install it with one command](https://git-scm.com/book/en/v1/Getting-Started-Installing-Git).
:::

### Install Manually

If you don't have access to the command line or would rather do things manually, you can download the static bundle manually as a [zip](https://github.com/directus/directus/archive/master.zip) or [tar](https://github.com/directus/directus/archive/master.tar.gz) file from [our releases page](https://github.com/directus/directus/releases).

:::tip
If your server doesn't have `gzip` then you can usually install it by running `sudo apt-get install zip`.
:::

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

## Configure

Now that you have Directus on your server, navigate to the App at: `/admin` to finish setup. Just click "Install" and follow the prompts to complete configuration.

Field          | Description
-------------- | ------------
Project Name   | The name of your project
Project Key    | For now, only the default project key (`_`) is available through the installer
Admin Email    | The email address of your first administrator
Admin Password | The password for your first administrator
Host           | The server/host of your database
Port           | The port for the database (default is 3306)
Database User  | The database user
Database Password | The database user's password
Database Name  | The name of the database
Database Type  | As of now, Directus only supports MySQL

:::tip Manual Config
If you would rather setup your project manually you can [follow these instructions](./api/admin-guide/configure.md)).
:::

---

## Other Options

### Install Individually

If you prefer, you can choose to only [install the Directus API](./api/admin-guide/install.md), or only [install the Directus App](./app/admin-guide/install.md). This is useful for multitenancy, such as when you need many instances of the API but only one App to manage them all.

### Install from Source

If you would like to extend or make contributions to the core codebase then you can [install the Directus API Source](./api/contributor-guide/install-dev.md), or [install the Directus App Source](./app/contributor-guide/install-dev.md). This process involves more steps, so we recommend using the combined build for normal usage.
