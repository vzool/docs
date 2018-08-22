# Configure with Script

Create the config file:

```bash
$ bin/directus install:config -n <database-name> -u <mysql-user> -p <mysql-password>
```

Create the Directus system tables and data:

```bash
$ bin/directus install:database
```

Create the Directus default settings and user:

```bash
$ bin/directus install:install -e <admin-email> -p <admin-password> -t <project-title>
```

Test by requesting to view all users (the default `access_token` is `admin_token`):

```
GET http://localhost/_/users?access_token=admin_token
```