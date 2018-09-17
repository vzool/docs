# Endpoints

Users can create custom endpoints. The custom endpoints can be created inside extensions (page, interfaces) or as a standalone.

All custom endpoints are created equally, the only difference is where the file is located. The name of the file can be anything when the file is located in the root of the custom endpoints directory. When the endpoints are created inside an extension (page or interface) or a directory inside the custom endpoints path, the name must be `endpoints.php`.

These files must return an array with the endpoint path, method and handler.

```php
<?php

use Directus\Application\Http\Request;
use Directus\Application\Http\Response;

return [
  // endpoint path
  // '' means it's ran when `/custom/<endpoint-id>`
  // '/` means `/custom/<endpoint-id>/`
  '' => [
    'method' => 'GET',
    'handler' => function (Request $request, Response $response) {

      return $response->withJson([
          'data' => [
              'item 1',
              'item 2'
          ]
      ]);
    }
  ]
]
```

Endpoints can be grouped to prepend a name/path. It heps when there's multiple endpoints that share the same prefix name.

```php
<?php

return [
  '/users' => [
    'group' => true,
    'endpoints' => [
      '' => [
          'method' => 'GET',
          'handler' => function ($request, $response) {

          }
      ],
      '/invite' => [
        'method' => 'GET',
        'handler' => function ($request, $response) {

        }
      ]
    ]
  ]
];
```

The standalone endpoints must be stored in `public/extension/custom/endpoints`. The endpoints can be file in the root of the directory or a directory to keep together all the related files.