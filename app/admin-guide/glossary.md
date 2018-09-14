
## Terminology

* `client` – An external application using Database managed data
* `instance` – An API install managing one or more environments on a server
* `project` – A database, config, and file storage directory. Also used for deployment environments (eg: `prod`, `stage`, `dev`)
* `env` - A flag set in the project config: either `production` or `staging` (not to be confused with deployment environments)
* `schema` – The SQL database's architecture, not including any content
* `boilerplate` – The base schema and system content included in a fresh/blank copy of Directus
* `collection` – A SQL table
* `item` – A SQL record
* `field` – A SQL column or _alias_ (see below)
* `alias` – A field that does not actually map to a database column (eg: a divider)
* `datatype` – The SQL vendor-specific database storage type (eg: `VARCHAR`, `BIGINT`, etc)
* `directus type` – An extended and agnostic storage type mapped to SQL vendor datatypes (eg: `M2O`, `STATUS`, etc)
* `length` – The amount/size of data that can be stored in a field
* `interface` – The GUI for a field
* `layout` – The GUI for a collection's items
* `extension` – Components outside of the Core codebase, including: Interfaces, Pages, Storage Adapters, SSO Services, etc
* `single collection` – A collection limited to only one item
* `comment` – A message left on an item
* `note` – Descriptive text displayed with a field
* `template` – A Mustache string used to format field values (eg: `{{first_name}} {{last_name}}, {{title}}`)


* **Collections** – Page displaying a listing of of collections within an instance/env
* **Items** – Page displaying a listing of of items within a collection
* **Item** – Page displaying field interfaces used for creating, viewing, and updating an item