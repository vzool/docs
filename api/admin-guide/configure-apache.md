# Apache Configuration

Directus API comes with `.htaccess` files for the required configuration. These `.htaccess` won't work until the `AllowOverride` directive is set within a Directory block.

1. Go to your Apache virtual host configuration
2. Create a `<Directory>` block that points to Directus API root
3. Add `AllowOverride All` inside the `<Directory>` block

## Example

```
<VirtualHost *:80>
    ServerAdmin admin@example.com
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/directus/public
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    <Directory /var/www/directus>
      AllowOverride All
    </Directory>
</VirtualHost>
```

::: tip
`.htaccess` is the default filename for the `AccessFileName` directive.
:::