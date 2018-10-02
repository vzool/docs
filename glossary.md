# Glossary

Definitions and other various terms that are exclusive to the Directus Ecosystem.

### Directus

Directus [duh REKT iss](./img/directus.mp3) is latin, and means _laid straight, arranged in lines, having been arranged in lines_.

-----

### Alias

A field that does not actually map to a database column (eg: a divider or the one side of a relationship).

### Boilerplate

The base schema and system content included in a fresh/blank copy of Directus.

### Client

An external application using Database managed data.

### Collection

A set of items, saved as a SQL table

### Collection Preset

Also known as a "bookmark", this is a specific view of a collection assigned to an individual user, a role, or global. It includes:

* Search query
* Filters
* View Type
* Sort Field and Direction
* Layout Query (eg: visible fields)
* Layout Options (eg: tabular column widths)

### Datatype

The SQL vendor-specific database storage type (eg: `VARCHAR`, `BIGINT`, etc)

### Display Template

A Mustache-style string used to format field values. For example:

```
{{first_name}} {{last_name}}, {{title}}
```

### Environment (env)

A flag set in the project config: either `production` or `staging` (not to be confused with deployment environments).

### Extension

Anything that extends the core codebase, including: Interfaces, Pages, Storage Adapters, SSO Services, etc.

### Field

A single piece of information contained in an item. Saved as a SQL column or alias.

### Field Type

An extended and agnostic storage type mapped to SQL vendor datatypes (eg: `string`, `number`, etc). Also includes non-DB style types that provide extra functionality into the system (eg `m2o`, `translation`, etc).

### Instance

An API install managing one or more projects on a server.

### Interface

The GUI for a field (the actual thing that the user interacts with to create and edit the data for the field).

### Item

A single record of data. Contains values for the fields. Saved as a SQL row.

### Length

The amount/size of data that can be stored in a single field.

### Layout

The GUI for a collection's items. Displays the items in the user-set way.

### Note

Descriptive text displayed with a field.

### Project

A database, config, and file storage directory. Also used for deployment environments (eg: `prod`, `stage`, `dev`).

### Schema

The SQL database's architecture, not including any content.
