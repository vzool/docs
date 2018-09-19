# Directus Field Types

In order to support multiple SQL vendors (MySQL, PostgreSQL, MS-SQL, etc) Directus has a generalized set of field types allowing for more control over API output (`array`, `json`, `boolean`, etc) and to better define system data (`m2o`, `alias`, `group`, etc). When creating or updating fields within the API, you also send a vendor-specific datatype for more granular DBA control over data storage.

* `alias` – Fields that do not save data or do not have corresponding database columns
* `array` – Standard array format in API response
* `boolean` – `true` or `false`
* `datetime` – A date and time in ISO format, eg: `2018-09-19T14:00:43.381Z`
* `date` – Date, eg: `2018-09-19`
* `time` – Time, eg: `14:09:22`
* `file` – Foreign key to `directus_files.id`
* `group` – Groups fields together visually, children save group into `directus_fields.group`
* `integer` – Whole number
* `decimal` – Number that includes a decimal
* `json` – Standard JSON format in API response
* `lang` – Specific to translation interfaces, this stores the language key
* `m2o` – Many-to-One Relationship
* `o2m` – One-to-Many Relationship
* `sort` – System field used in drag-and-drop item reordering
* `status` – System field used for publishing workflows
* `string` – Any text or characters, defined and limited by the length
* `translation` – Specific to translation interfaces, this `o2m` is stores multi-lingual content
* `uuid` – A Universally Unique Identifier
* `datetime_created` – System field to track the datetime an item was created, used by revisions
* `datetime_modified` – System field to track the datetime an item was updated, used by revisions
* `user_created` – System field to track the user who created an item, used by revisions
* `user_modified` – System field to track the user who updated an item, used by revisions