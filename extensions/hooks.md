# Hooks

Directus provides a list of events hooks that are triggered when an actions occurs. For example: before an item is updated.

There are two type of hooks, `actions` and `filters`.

- **Actions** execute a piece of code _without_ altering the data being passed through it
- **Filters** are the same as Actions but _can_ change the data passed through it

For example: an Action might send an email to a user when an new article is created, on the other hand a Filter might set a UUID for a new article before it's stored in the database.

## Create a Hook

To create a hook a [callable](http://php.net/manual/en/language.types.callable.php) (function, class-method combination, or class that implements that `__invoke` method) must be added to a hook name.

### Using a function

```php
[
  'hooks' => [
    'collection.insert' => function ($collectionName, array $data) {
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

class InsertEvent
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
    'collection.insert' => '\App\Events\InsertEvent'
  ];
];
```

### Using a class implementing HookInterface

```php
<?php

// Improvised namespace, not required
namespace \App\Events;

class InsertEvent implements \Directus\Hook\HookInterface
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
    'collection.insert' => '\App\Events\InsertEvent'
  ]
];
```

## Create an Action Hook

```php
'hooks' => [
  'collection.insert.articles' => function ($data, $collectionName) {
    $content = 'New article was created with the title: ' . $data['title'];
    // pesudo function
    notify('admin@example.com', 'New Article', $content);
  }
]
```

## Create a Filter Hook

```php
'filters' => [
  'collection.insert.articles:before' => function (\Directus\Hook\Payload $payload) {
    $payload->set('uuid', \Directus\generate_uuid4());

    return $payload;
  }
]
```

The filters passes a `Payload` object as paramter, which contain the data and attribute information related to the filter hook, such as the collection name the item belong to.

### Payload Object

All filters hook now passes a `Payload` object as parameter instead of an array to represent the data being filtered. Using the `Payload` object make easier to pass the data over multiple filters. Each filter function must return the `Payload` so other filters can interact with the updated data.

### Useful methods

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

**NOTE:** `get()` and `has()` method can use dot-notation to access child elements. ex `get('data.email')`.

`Payload` object is `Arrayable` which means you can interact with the data as an array `$payload['data']['email]`, but you can't do `\Directus\Util\ArrayUtils::get($payload, 'data.email')`.

**IMPORTANT:** All these filters are triggered to Directus system collections as well, so make sure if you don't want to interact with directus collections omit them by checking for them first. All Directus system collections can be accesed from `\Directus\Database\Schema\SchemaManager::getSystemCollections()`.

```php

use Directus\Database\Schema\SchemaManager;

$collectionName = $payload->attribute('collection_name');
if (in_array($collectionName, SchemaManager::getSystemCollections())) {
    return $payload;
}
```

## Action Hooks List

@TODO

## Filter Hooks List

@TODO