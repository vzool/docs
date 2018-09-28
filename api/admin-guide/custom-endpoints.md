# Creating Custom Endpoints

Custom endpoints are easy to create files that return an array with the endpoint path, method, and handler. All custom endpoints are scoped within `/custom` to avoid conflicts with the Core functionality.

**Global** endpoints are defined in files within `/public/extension/custom/endpoints` ([link](https://github.com/directus/api/tree/master/public/extensions/custom/endpoints)). You can use any file-names or sub-directories to help keep things organized.

**Extension** endpoints are defined in the `endpoints.php` file within that extension's directory.

```php
<?php

use Directus\Application\Http\Request;
use Directus\Application\Http\Response;

return [
  // The endpoint path:
  // '' means it is located at: `/custom/<endpoint-id>`
  // '/` means it is located at: `/custom/<endpoint-id>/`
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

## Nesting Endpoints

Endpoints can also be nested, or grouped, under a parent path name.

```php
<?php

return [
  '/articles' => [
    'group' => true,
    'endpoints' => [
      // `/custom/articles
      '' => [
          'method' => 'GET',
          'handler' => function ($request, $response) {

          }
      ],
      // `/custom/articles/category
      '/category' => [
        'method' => 'GET',
        'handler' => function ($request, $response) {

        }
      ],
      // `/custom/articles/preview
      '/preview' => [
        'method' => 'GET',
        'handler' => function ($request, $response) {

        }
      ]
    ]
  ]
];
```