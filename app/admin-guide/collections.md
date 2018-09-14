### Adding Collections

Adding a collection is easy, simply click the New button ("+") in the header and enter a name. This is the technical name used in the database and API so you should follow the [schema naming convention](#). Display formatting will be handled automatically by App.

#### Note

This is for internal use only. It helps your administrators understand the purpose of each collection.

#### Hidden

Some helper collections are not used directly (eg: junctions) and can be globally hidden.

#### Single

In certain schema architectures, you may find it helpful to have a collection that can only contain one item. For example, the "About" or "Settings" of your project might be managed within the fields of a single item (also known as a "singleton"). When enabled, clicking the collection in the navigation will open the Item Detail page directly, skipping the Items Browse page.

### Managing Collections

Collections added through Directus are automatically managed, however collections added outside of Directus are unmanaged by default. This avoids issues with dynamically created temporary tables or any tables outside the scope of your project. Directus completely ignores any unmanaged collections.

### Deleting Collections

To destroy a collection and all of its data you can click the Delete Button ("×") in the header of the collection detail. You will be asked only once to confirm this permanent action.

::: warning
It is possible to irreverisbly delete massive amounts of data with this feature. Proceed with extreme caution.
:::