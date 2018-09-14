## Updating the API

### Versionless

With a versionless API, nothing is removed or changed... only added. This means that you never have to worry about breaking your integrations when upgrading to the latest version of the API. We've thoroughly vetted every endpoint and parameter in our new decoupled API to ensure there is no need for deprecations in the foreseeable future. You'll also notice that our API URLs don't include a version number, but you can still reference the technical API version in code to know which new features are available.

## Storing Files

### Thumbnailer

[Thumbnailer](./thumbnailer.md)

## Permissions

### Create

* `none` (or `NULL`, default) Can not create any items
* `full` Can create items

### Read

* `none` (or `NULL`, default) Can not view any items
* `mine` Can only view _their_ items
* `role` Can only view items created by members of this role
* `full` Can view all items

### Update

* `none` (or `NULL`, default) Can not update any items
* `mine` Can only update _their_ items
* `role` Can only update items created by members of this role
* `full` Can update all items

### Delete

* `none` (or `NULL`, default) Can not delete any items
* `mine` Can only delete _their_ items
* `role` Can only delete items created by members of this role
* `full` Can delete all items

### Comment

* `none` Can not comment
* `read` Can only see comments
* `create` Can add comments
* `update` (or `NULL`, default) Can add, edit and delete their comments
* `full` Can add, edit and delete any comments (including other users)

### Explain (Force)

* `none` (or `NULL`, default) Never requires "commit" comment
* `on_create` Requires a "commit" comment on Create
* `on_update` Requires a "commit" comment on Update
* `always` Requires a "commit" comment on Create and Update