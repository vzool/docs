# Configure with Script

## Create Config File

```bash
$ bin/directus install:config -n <database-name> -u <mysql-user> -p <mysql-password>
```

### Options

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

## Add System Schema and Data

```bash
$ bin/directus install:database
```

## Create Admin User

```bash
$ bin/directus install:install -e <admin-email> -p <admin-password> -t <project-title>
```

### Options

| Name    | Description                                                           |
|---------|-----------------------------------------------------------------------|
| `-e`    | Email of the Directus user (Default: `admin@example.com`)             |
| `-p`    | Password of the Directus user (Default: `password`)                   |
| `-T`    | Token of the Directus user                   |
| `-t`    | Title of the project (Default: `Directus`)                            |
| `-N`    | Name of the project (Default: `_`)                                    |

## Testing

Test that everything is working by making a request to the `users` endpoint using the `access_token`.

```
GET http://localhost/_/users?access_token=admin_token
```