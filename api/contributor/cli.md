# Directus CLI

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

#### Upgrade Directus Schema

```
$ bin/directus db:upgrade
```

The command above will upgrade the default project database, to update an specific project the option `N` can be used.

```
$ bin/directus db:upgrade -N <project-name>
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
