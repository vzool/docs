# Glossary

Definitions and other various terms that are exclusive to the Directus Ecosystem.

### Client

An external application using Database managed data.

### Instance

An API install managing one or more projects on a server.

### Project

A database, config, and file storage directory. Also used for deployment environments (eg: `prod`, `stage`, `dev`).

### Environment (env)

A flag set in the project config: either `production` or `staging` (not to be confused with deployment environments).

### Schema

The SQL database's architecture, not including any content.

### Boilerplate

The base schema and system content included in a fresh/blank copy of Directus.

### Collection

A set of items, saved as a SQL table

### Item

A single record of data. Contains values for the fields. Saved as a SQL row.

### Field

A single piece of information contained in an item. Saved as a SQL column or alias.

### Alias

A field that does not actually map to a database column (eg: a divider or the one side of a relationship).

### Datatype

The SQL vendor-specific database storage type (eg: `VARCHAR`, `BIGINT`, etc)

### Directus Type

An extended and agnostic storage type mapped to SQL vendor datatypes (eg: `string`, `number`, etc). Also includes non-DB style types that provide extra functionality into the system (eg `m2o`, `translation`, etc).

### Length

The amount/size of data that can be stored in a single field.

### Interface

The GUI for a field (the actual thing that the user interacts with to create and edit the data for the field).

### Layout

The GUI for a collection's items. Displays the items in the user-set way.

### Extension

Anything that extends the core codebase, including: Interfaces, Pages, Storage Adapters, SSO Services, etc. 

### Note 

Descriptive text displayed with a field.

### Display Template

A Mustache-style string used to format field values (eg: `{{first_name}} {{last_name}}, {{title}}`)
