# Admin Guide

## Installation

## Updating

## Terminology

* `project` – An external application using Database managed data
* `instance` – An API install managing one or more environments on a server
* `environment` or `env` – A SQL database (eg: `production`, `staging`, `development`, etc)
* `schema` – The SQL database's architecture, not including any content
* `boilerplate` – The base schema and system content included in a fresh/blank copy of Directus
* `collection` – A SQL table
* `item` – A SQL record
* `field` – A SQL column or _alias_ (see below)
* `alias` – A displayed field that does not map to an actual database column (eg: a divider)
* `datatype` – The SQL vendor-specific way that data is stored in the database (eg: `VARCHAR`, `BIGINT`, etc)
* `length` – The amount/size of data that can be stored in a field
* `directus type` – An extended and agnostic storage type mapped to SQL vendor datatypes (eg: `STRING`, `STATUS`, etc)
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

## Global Settings

These are settings that apply to the entire project environment.

* **Auto Sign Out** – TK
* **File Naming** – TK
* **Logo** – TK
* **Thumbnail Dimensions** – RENAME
* **Thumbnail Quality** – RENAME
* **Thumbnail Fit** – RENAME

## Collections & Fields

### Adding Collections

::: tip
Database vs Display Names
:::

#### Note

#### Item Name Tempalte

#### Hidden

#### Single

#### Translation

### Managing Collections

### Deleting Collections

::: warning
Whoa! Careful...
:::

### Adding Fields

#### Choosing an Interface

#### Schema Options

* **Name** – TK
* **Display Name** – TK
* **Note** – TK

::: tip
Database vs Display Names
:::

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

#### Relationship

##### Many-to-One (M2O)

@TODO: Show diagram

##### One-to-Many (O2M)

@TODO: Show diagram

##### Many-to-Many (M2M)

@TODO: Show diagram

##### Many-to-Many-Many (M2MM)

@TODO: Show diagram

#### Interface Options

### Reordering Fields

### Form Grid

### Deleting Fields

::: warning
Whoa! Careful...
:::

## Roles & Permissions

### Administrators

### Public

### Creating Roles

#### Inviting Users

TK

#### Description

#### IP Whitelist

#### Nav Override

### Permissions

#### Create

#### Read

#### Update

#### Delete

#### Comment

#### Explain

#### Field Read Blacklist

#### Field Write Blacklist

#### Status Blacklist

#### Workflow

#### Directus Collections

### Deleting Roles

## Extensions

### Interfaces

### Pages

### Layouts

### SSO Services

### Storage Adapters
