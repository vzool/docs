# Configure Manually

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

Finally, we must import the Directus system tables and data primer into the database by importing this SQL file: `/src/schema.sql`. With this method, your initial Admin user credentials will be:

* **User:** `admin@example.com`
* **Password:** `password`