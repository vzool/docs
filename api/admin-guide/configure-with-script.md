# Configure with Script

Create the config file:

```bash
$ bin/directus install:config -n <database-name> -u <mysql-user> -p <mysql-password>
```

## Options

| Name    | Description                                                           |
|---------|-----------------------------------------------------------------------|
| `-h`    | Hostname or IP address of the database server (Default: `localhost`)  |
| `-P`    | Port of the database server (Default: `3306`)                         |
| `-t`    | Type of the database (Default: `mysql`)                               |
| `-n`    | Name of the database                                                  |
| `-u`    | Username for the database connection                                  |
| `-p`    | Password for the database connection                                  |
| `-c`    | Tell to enable or disable CORS (Default: `false`)                     |
| `-e`    | Email used by the Mailer as From/Sender (Default: `admin@example.com`)|
| `-N`    | Name of the project (Default: `_`)                                    |

Create the Directus system tables and data:

```bash
$ bin/directus install:database
```

Create the Directus default settings and user:

```bash
$ bin/directus install:install -e <admin-email> -p <admin-password> -t <project-title>
```

## Options

| Name    | Description                                                           |
|---------|-----------------------------------------------------------------------|
| `-e`    | Email of the Directus user (Default: `admin@example.com`)             |
| `-p`    | Password of the Directus user (Default: `password`)                   |
| `-t`    | Token of the Directus user (Default: `admin_token`)                   |
| `-T`    | Title of the project (Default: `Directus`)                            |
| `-N`    | Name of the project (Default: `_`)                                    |

Test by requesting to view all users (the default `access_token` is `admin_token`):

```
GET http://localhost/_/users?access_token=admin_token
```