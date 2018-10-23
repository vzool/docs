# Fields

## Adding Fields

Adding a field to Directus is straightforward, but the process varies depending on what type of field you are creating. Let's walk through the four possible steps in order.

### Choosing an Interface

Do you want a Toggle? Text Input? Map? Dropdown? Relationship? There are many Core Interfaces available here, with even more Extension Interfaces available. This is always the first step when creating a new field, and dictates the rest of the process.

### Schema Options

Only the "Name" is required for this step, but it's good to familiarize yourself with the other options to get the most out of each field.

* **Name**
  The technical name used in the database and API. It should be letters only, lowercase, with underscores for spaces.
* **Display Name**
  You can not edit this value, it is just a preview of the above technical name in a more human readable format. This is how users will see the field name throughout the App.
* **Note**
  This optional note will appear beside the field on the Item Detail page to give helpful context to users.

#### Advanced

* **Directus Type**
  Directus specific type that the interface supports (eg `string`, `number`).
* **Datatype**
  The database-specific type to use (eg `VARCHAR`, `DATETIME`, etc).
* **Length**
  The max length of the field. For example, a string-type field with `length` is 10 only allows values up to 10 characters.
* **Default**
  The default value for this field. Will be added when an item is created but the field left blank.
* **Validation**
  RegEX string that will be used to validate the value on save and upload.
* **Validation Message**
  A custom validation message that will be returned if the validation fails according to the RegEX string in the _Validation_ option.
* **Required**
  Whether or not a value is required in this field.
* **Readonly**
  Makes the interface non-interactive on the item detail page, resulting in the value only being readable by the user.
* **Unique**
  Makes sure the value is unique before saving. Will error out if it's not.
* **Hidden on Detail**
  Hides the field on the item detail pages.
* **Hidden on Items**
  Hides the field on the item layout pages.


### Relationships

If you selected a relational interface, like _Many to Many_ or _Translations_, you're required to setup the relationship.

::: tip
Learn more about [relationships and how they work](./relationships.md)
:::

### Interface Options

Interfaces are highly customizable with options that allow you to tailor them to individual uses. These vary depending on interface complexity, with more edge-case options collapsed within an "Advanced" accordion.

## Reordering Fields

Reordering fields provides a natural default order within the Items page. This order will be reflected in the column order in the database.

## Deleting Fields

Clicking the "×" icon on the right side of the Fields interface will completely delete the field from the schema as well as all its Item data. You are prompted to confirm this action, however once the field delete is executed the change takes place immediately.

::: warning
It is possible to irreverisbly delete massive amounts of data with this feature. Proceed with extreme caution.
:::