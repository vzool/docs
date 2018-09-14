### Adding Fields

Adding a field to Directus is straightforward, but the process varies depending on what type of field you are creating. Let's walk through the four possible steps in order.

#### Choosing an Interface

Do you want a Toggle? Text Input? Map? Dropdown? Relationship? There are many Core Interfaces available here, with even more Extension Interfaces available. This is always the first step when creating a new field, and dictates the rest of the process.

#### Schema Options

Only the "Name" is required for this step, but it's good to familiarize yourself with the other options to get the most out of each field.

* **Name** – The technical name used in the database and API. It should be letters only, lowercase, with underscores for spaces.
* **Display Name** – You can not edit this value, it is just a preview of the above technical name in a more human readable format. This is how users will see the field name throughout the App.
* **Note** – This optional note will appear beside the field on the Item Detail page to give helpful context to users.

##### Advanced

* **Datatype** – TK
* **Length** – TK
* **Default** – TK
* **Validation** – TK
* **Validation Message** – ADD
* **Required** – TK
* **Readonly** – TK
* **Unique** – TK
* **Hidden on Detail** – RENAME
* **Hidden on Items** – RENAME


## Relationships

See relationships.md

#### Interface Options

Interfaces are highly customizable with options that allow you to tailor them to individual uses. These vary depending on interface complexity, with more edge-case options collapsed within an "Advanced" accordion.

### Reordering Fields

Reordering fields provides a natural default order within the Items page and can be an important part of database optimization.

### Form Grid

Meaningful 2D forms can be designed by assigning dimensions and coordinates to each field. This provides the ability to create a more intuitive user flow, group related fields, and tailor field size to the interface needs.

Field widths are set to one of the standardized Directus options to maintain a proper grid system.

### Deleting Fields

Clicking the "×" icon on the right side of the Fields interface will completely delete the field from the schema as well as all its Item data. You are prompted to confirm this action, however once the field delete is executed the change takes place immediately.

::: warning
It is possible to irreverisbly delete massive amounts of data with this feature. Proceed with extreme caution.
:::