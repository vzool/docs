# System Database Overview

This document provides an explanation of all tables and fields within the Directus schema boilerplate.

## System Table Overview

| Name                          | Description
| ----------------------------- | -------------------------------
| `directus_activity`           | Log of all actions (eg: item updates) performed through the API (or App)
| `directus_activity_read`      | Tracks if a user has seen an Activity/Message item
| `directus_collection_presets` | User's collection preferences and bookmarks for Item Listing page
| `directus_collections`        | Information for database tables (collections) managed by Directus
| `directus_fields`             | Information for database columns (fields) and their interfaces
| `directus_files`              | Metadata for all files and embeds added to Directus
| `directus_folders`            | Nestable virtual directories used to organize Directus files
| `directus_migrations`         | Database schema changes for upgrades/downgrades created by Phinx
| `directus_permissions`        | Defines specific API access rules for a specific Role
| `directus_relations`          | Keys and junctions for field-level relationships between collections
| `directus_revisions`          | The delta and full data snapshot for all item Activity (eg: updates)
| `directus_roles`              | Listing of user roles that group together sets of permissions
| `directus_settings`           | Ad-hoc key-value-pairs for storing Global and Extension settings
| `directus_user_roles`         | Junction table allowing users to possess multiple roles
| `directus_users`              | Directory of all App and API Users

## System Field Overview

### directus_activity

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| action                      | What performed (authentication, create, update, delete, comment, etc)         |
| user                        | Who performed (Foreign Key: directus_users)                                   |
| datetime                    | When performed                                                                |
| ip                          | IP of who performed                                                           |
| user_agent                  | User Agent of who performed                                                   |
| collection                  | Collection affected                                                           |
| item                        | Item affected                                                                 |
| comment                     | Explanation left by who performed                                             |
| datetime_edited             | Comment last edited datetime                                                  |
| deleted_comment             | Whether the comment was deleted or not                                        |

### directus_activity_seen

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| activity                    | Referenced activity (Foreign Key: directus_activity)                          |
| user                        | User who saw (Foreign Key: directus_users)                                    |
| seen                        | If the user has seen this item                                                |

### directus_collection_presets

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| title                       | Title of bookmark, NULL values define default preset                          |
| user                        | Assigned user, NULL for global (Foreign Key: directus_users)                  |
| role                        | Assigned role, NULL for global (Foreign Key: directus_roles)                  |
| collection                  | Which collection this is for                                                  |
| search_query                | Search query string to filter on                                              |
| filters                     | JSON of filter options to apply                                               |
| view_type                   | Listing view type (eg: tabular)                                               |
| view_query                  | JSON of all query parameters (eg: sorting)                                    |
| view_options                | JSON of view options used                                                     |
| translation                 | JSON field of optional user translations for additional names of the field    |

### directus_collections

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| collection                  | Primary Key. Name of collection to manage, must match database table          |
| managed                     | If the table is managed by Directus. Otherwise it is ignored.                 |
| item_name_template          | A Mustache template that defines how items are labeled                        |
| preview_url                 | URL using Twig templating for previewing items in this collection             |
| hidden                      | If this collection is globally hidden                                         |
| single                      | If this collection will only ever have one item                               |
| translation                 | JSON of translations                                                          |
| note                        | A description of this collection                                              |
| icon                        | Material Design icon name for the collection                                  |

### directus_fields

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| collection                  | Name of parent Collection (Foreign Key: directus_collections)                 |
| field                       | Name of field, typically a database column name                               |
| type                        | Directus datatype, an extended set of SQL datatypes                           |
| interface                   | Interface id                                                                  |
| options                     | JSON of interface option values                                               |
| locked                      | If this field is locked from editing, typically system fields                 |
| translation                 | JSON of translations                                                          |
| validation                  | A RegEx to validate the input against                                         |
| readonly                    | If the field is globally read-only                                            |
| required                    | If the field is required                                                      |
| hidden_input                | If the field is hidden globally on the Item Detail page                       |
| hidden_list                 | If the field is hidden globally on the Item Listing page                      |
| sort                        | Used to order the fields on the item detail page                              |
| view_width                  | Width of field, makes masonry layouts possible (`1`, `2`, `3`, or `4`)        |
| note                        | A helpful note for users                                                      |
| group                       | Used for grouping fields (Foreign Key: directus_fields)                       |

### directus_files

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| filename                    | The asset's filesystem name                                                   |
| title                       | A label for the asset                                                         |
| description                 | A description of the asset                                                    |
| location                    | Where the image was taken                                                     |
| tags                        | Keywords to assist in searching                                               |
| width                       | The width in pixels (images only)                                             |
| height                      | The height in pixels (images only)                                            |
| filesize                    | The size of the file in bytes                                                 |
| duration                    | Length in seconds (videos and embeds only)                                    |
| metadata                    | JSON of additional metadata                                                   |
| type                        | MIME type of the file                                                         |
| charset                     |                                                                               |
| embed                       | Remote ID for external assets                                                 |
| folder                      | Name of parent Folder (Foreign Key: directus_folders)                         |
| upload_user                 | User who uploaded the file                                                    |
| upload_date                 | When the file was uploaded                                                    |
| storage_adapter             | Which storage adapter was used to store the file                              |

### directus_folders

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| name                        | Name of the folder                                                            |
| parent_folder               | Name of parent Folder (Foreign Key: directus_folders)                         |

### directus_migrations

Phinx migrations table, record all migrations executed.

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| version                     | Migration version                                                             |
| migration_name              | Migration name                                                                |
| start_time                  | Migration start datetime                                                      |
| end_time                    | Migration end datetime                                                        |
| breakpoint                  | ???                                                                           |

### directus_permissions

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| collection                  | Collection these permissions apply to (Foreign Key: directus_collections)     |
| role                        | Role these permissions apply to (Foreign Key: directus_roles)                 |
| status                      | Status these permissions apply to (from Collection's Status-Mapping)          |
| *allowed_statuses           | Which Status-Mapping options can be chosen                                    |
| create                      | Create Item access                                                            |
| read                        | Read/View Item access                                                         |
| update                      | Update/Edit Item access                                                       |
| delete                      | Hard-Delete Item access                                                       |
| comment                     | Ability to comment on items                                                   |
| explain                     | Ability to force a comment on when updating items                             |
| read_field_blacklist        | CSV of field names that can't be Read/Viewed                                  |
| write_field_blacklist       | CSV of field names that can't be Created/Updated/Edited                       |

### directus_relations

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| collection_a                | Collection name (A) for relationship                                          |
| field_a                     | Field name (A) for relationship                                               |
| junction_key_a              | Field name (A) for the junction table (M2M and M2MM only)                     |
| junction_collection         | Collection name for the junction table (M2M and M2MM only)                    |
| junction_mixed_collections  | CSV of collection names allowed in relationship (M2MM only)                   |
| junction_key_b              | Field name (B) for the junction table (M2M and M2MM only)                     |
| collection_b                | Collection name (B) for relationship                                          |
| field_b                     | Field name (B) for relationship                                               |

### directus_revisions

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| activity                    | Parent activity ID (Foreign Key: directus_activity)                           |
| collection                  | Name of Collection where item was updated (Foreign Key: directus_collections) |
| item                        | ID of Item that was updated (Foreign Key: directus_revisions.collection)      |
| data                        | JSON of this entire item after update                                         |
| delta                       | JSON of changes made to this item after update                                |
| parent_item                 | ID of parent Item (relational edits only)                                     |
| parent_collection           | ID of parent Collection (relational edits only)                               |
| parent_changed              | ???                                                                           |

### directus_roles

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| external_id                 | SCIM External ID                                                              |
| name                        | Name of this role                                                             |
| description                 | Description of this role                                                      |
| ip_whitelist                | CSV of IPs allowed to connect to the API/App                                  |
| nav_blacklist               | CSV of navigation items IDs to hide                                           |

### directus_settings

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| scope                       | The scope of the setting (global, an extension id, etc)                       |
| key                         | The key (name) of the settings option. Must be unique within scope            |
| value                       | The value of the settings option                                              |

### directus_user_roles

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| user                        | User's ID (Foreign Key: directus_users)                                       |
| role                        | Role's ID (Foreign Key: directus_roles)                                       |

### directus_users

| Field                       | Notes                                                                         |
|-----------------------------|-------------------------------------------------------------------------------|
| id                          | Primary Key                                                                   |
| status                      | Status of the user (active, draft, suspended, deleted)                        |
| first_name                  | First name (given) of the user                                                |
| last_name                   | Last name (surname) of the user                                               |
| email                       | Email of the user. Must be unique within users                                |
| email_notifications         | If the user should recieve email updates from this instance                   |
| password                    | Hashed password of user                                                       |
| avatar                      | ID of file/image used as user's avatar (Foreign Key: directus_files)          |
| company                     | Company the user works for                                                    |
| title                       | Title/Position of user                                                        |
| locale                      | Locale of user for multilingual support in App                                |
| theme                       | JSON of CSS colors to use (eg: dark-mode or high-contrast-mode                |
| locale_options              | Provides additional support for languages, etc                                |
| timezone                    | Timezone of the user                                                          |
| last_access                 | Datetime of user's last access. Used to check if online                       |
| last_page                   | Last page user accessed. Used to return user to same page during next session |
| last_ip                     | Last IP user used to access                                                   |
| last_login                  | Datetime of user's last login                                                 |
| token                       | Static API token for connecting to the API with this user's permissions       |
| external_id                 | SCIM External ID                                                              |