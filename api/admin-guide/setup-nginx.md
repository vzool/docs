# NGINX Setup

To get Directus working on NGINX servers all you need to do is ensure that traffic is routed to the correct files. Below are some sample configurations:

### `directus.conf`

```
location /api {
  if (!-e $request_filename) {
    rewrite ^/api/extensions/([^/]+) /api/api.php?run_extension=$1 last;
  }
  rewrite ^ /api/api.php?run_api_router=1 last;
}

location / {
  try_files $uri $uri/ /index.php$args;
}

location /thumbnail {
  rewrite ^ /thumbnail/index.php last;
}

# Force file extensions to output as text
location ~ ^/(media|storage)/.*\.(php|phps|php5|htm|shtml|xhtml|cgi.+)?$ {
  add_header Content-Type text/plain;
}

# No direct access to extension files
location ~* [^/]+/customs/extensions/api\.php$ {
  return 403;
}

# No direct access to custom API endpoint files
location ~* /customs/endpoints/ {
  deny all;
}

include pagespeed.conf;
```

### `pagespeed.conf`

```
# Prevent PageSpeed module from rewriting/breaking the templates files
pagespeed Disallow */app/**/*.html;
```