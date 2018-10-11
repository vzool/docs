# Hooks

Directus provides a list of events hooks that are triggered when an actions occurs. For example: before an item is updated.

There are two type of hooks: `actions` and `filters`.

- **Actions** execute a piece of code _without_ altering the data being passed through it
- **Filters** are the same as Actions but _can_ change the data passed through it

For example: an Action might send an email to a user when an new article is created, on the other hand a Filter might set a UUID for a new article before it's stored in the database.

## Create a Hook

To create a hook a [callable](http://php.net/manual/en/language.types.callable.php) (function, class-method combination, or class that implements that `__invoke` method) must be added to a hook name.

### Using a function

```php
[
  'hooks' => [
    'item.create' => function ($collectionName, array $data) {
      // execute any code
    }
  ]
];
```

You can also you any class that implement the `__invoke` method instead of a function.

### Using a class implementing `__invoke`

```php
<?php

namespace \App\Events;

class CreateItemEvent
{
    public function __invoke($collectionName, array $data)
    {
        // execute any code
    }
}
```
```php
[
  'hooks' => [
    'item.create' => '\App\Events\CreateItemEvent'
  ];
];
```

### Using a class implementing HookInterface

```php
<?php

// Improvised namespace, not required
namespace \App\Events;

class CreateItemEvent implements \Directus\Hook\HookInterface
{
  public function handle($collectionName, array $data)
  {
    // execute any code
  }
}
```

```php
[
  'hooks' => [
    'item.create' => '\App\Events\CreateItemEvent'
  ]
];
```

## Create an Action Hook

```php
'hooks' => [
  'item.create.articles' => function ($data, $collectionName) {
    $content = 'New article was created with the title: ' . $data['title'];
    // pesudo function
    notify('admin@example.com', 'New Article', $content);
  }
]
```

## Create a Filter Hook

```php
'filters' => [
  'item.create.articles:before' => function (\Directus\Hook\Payload $payload) {
    $payload->set('uuid', \Directus\generate_uuid4());

    return $payload;
  }
]
```

The filter passes a `Payload` object which contain the data and attribute information related to the filter hook, such as the collection name the item belong to.

### Payload Object

All filter hooks pass a `Payload` object as a parameter to made it easier to pass the data over multiple filters. Each filter function must return the `Payload` so other filters can interact with the updated data.

### Useful Methods

Name                    | Description
----------------------- | ------------
`getData()`             | Get the payload data
`attribute($key)`       | Get an attribute key. Ex `$payload->attribute('collection_name')`
`get($key)`             | Get an element by its key
`set($key, $value)`     | Set or update new value into the given key
`has($key)`             | Check whether or not the payload data has the given key set
`remove($key)`          | Remove an element with the given key
`isEmpty()`             | Check whether the payload data is empty
`replace($newDataArray)`| Replace the payload data with a new data array
`clear()`               | Remove all data from the payload

:::tip NOTE
`get()` and `has()` method can use dot-notation to access child elements. eg: `get('data.email')`.

`Payload` object is `Arrayable` which means you can interact with the data as an array `$payload['data']['email]`, but you can't do `\Directus\Util\ArrayUtils::get($payload, 'data.email')`.
:::

:::warning IMPORTANT
Filters are also triggered by Directus _system_ collections as well, so make sure if you don't want to interact with Directus collections omit them by checking for them first. All Directus system collections can be accesed from `\Directus\Database\Schema\SchemaManager::getSystemCollections()`.

```php

use Directus\Database\Schema\SchemaManager;

$collectionName = $payload->attribute('collection_name');
if (in_array($collectionName, SchemaManager::getSystemCollections())) {
    return $payload;
}
```
:::

## Action Hooks List

Name                              | Description
--------------------------------- | ------------
`application.boot`                | Before all endpoints are set. The app object is passed.
`application.error`               | An app exception has been thrown. The exception object is passed.
`auth.request:credentials`        | User requested token via credentials. The user object is passed.
`auth.success`                    | User authenticated successfully. The user object is passed.
`auth.fail`                       | User authentication failed. @TODO is passed.
`collection.create`               | Collection is created. Collection's name passed. Supports `:before` and `:after` (default)
`collection.update`               | Collection is updated. Collection's name passed. Supports `:before` and `:after` (default)
`collection.delete`               | Collection is deleted. Collection's name passed. Supports `:before` and `:after` (default)
`field.create`                    | Field is created. Field's name passed. Supports `:before` and `:after` (default)
`field.update`                    | Field is updated. Field's name passed. Supports `:before` and `:after` (default)
`field.delete`                    | Field is deleted. Field's name passed. Supports `:before` and `:after` (default)
`item.create`                     | Item is created. You can also limit to a specific collection using `item.create.[collection-name]`. Item data passed. Supports `:before` and `:after` (default)
`item.read`                       | Item is read. You can also limit to a specific collection using `item.read.[collection-name]`. Item data passed. Supports `:before` and `:after` (default)
`item.update`                     | Item is updated. You can also limit to a specific collection using `item.update.[collection-name]`. Item data passed. Supports `:before` and `:after` (default)
`item.delete`                     | Item is deleted. You can also limit to a specific collection using `item.delete.[collection-name]`. Item data passed. Supports `:before` and `:after` (default)
`file.save`                       | File is saved. File data passed. Supports `:before` and `:after` (default)
`file.delete`                     | File is deleted. File data passed. Supports `:before` and `:after` (default)

:::tip Before or After Event
By default, the hooks above occur _after_ an event has happened. You can append `:before` and `:after` to the end to explicitely specify when the hook should fire.
:::

## Filter Hooks List

Name                                 | Description
------------------------------------ | ------------
`item.create`                        | Item is created. You can also limit to a specific collection using `item.create.[collection-name]`. Supports `:before` and `:after` (default)
`item.read`                          | Item is read. You can also limit to a specific collection using `item.read.[collection-name]`. Supports `:before` and `:after` (default)
`item.update`                        | Item is updated. You can also limit to a specific collection using `item.update.[collection-name]`. Supports `:before` and `:after` (default)
`response`                           | Before adding the content into the HTTP response body.  You can also limit to a specific collection using `response.[collection-name]`.
`response.[method]`                  | Same as `response` but only executes for a specific http method, such as `GET, POST, DELETE, PATCH, PUT, OPTIONS`. You can also limit to a specific collection using `response.[method].[collection-name]`.


@TODO Doesn't this mean you can't have a collection named the same as an HTTP method?