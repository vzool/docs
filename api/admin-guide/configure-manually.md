# Manual Configuration

Create a copy of `config/api_sample.php` and change the name to `config/api.php`. Next, update the `database` values with your own:

```php
'database' => [
    'type' => 'mysql',
    'host' => 'localhost',
    'port' => 3306,
    'name' => 'directus_test',
    'username' => 'root',
    'password' => 'root',
    'engine' => 'InnoDB',
    'charset' => 'utf8mb4'
]
```

## Auth Keys

These keys can be anything, but we recommend a “strong” and unique value. They are unique identifiers that ensure your auth tokens are only able to be used within this project.

```
'auth' => [
  'secret_key' => '<secret-authentication-key>',
  'public_key' => '<public-authentication-key>',
  'social_providers' => [ ... ]
```

## System Schema

Finally, we must import the Directus system tables and data primer into the database by importing this SQL file: `/src/schema.sql`. With this method, your initial Admin user credentials will be:

* **User:** `admin@example.com`
* **Password:** `password`