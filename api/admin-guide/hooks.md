# Creating Hooks

Directus provides a list of events hooks that are triggered when an actions occurs. For example: after an item is updated.

There are two type of hooks, `actions` and `filters`.

- **Actions** execute a piece of code _without_ altering the data being passed through it
- **Filters** are the same as Actions but _can_ change the data passed through it

For example: an Action might send an email to user when an new article is created. While a Filter might set a UUID for a new article before it's inserted.

TODO
