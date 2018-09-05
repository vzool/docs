# API Reference

## Introduction

### Versioning

The Directus API uses SemVer for version labeling within the repo and for files which mention a specific version (eg: `package.json`). The API will _not_ include the version in the URL because the API is "versionless". Being versionless means that API behavior will not be removed or changed, only new features and enhancements will be added. Therefore, no breaking changes will ever be introduced and you can safely keep your APIs up-to-date.

### Projects

All endpoints are prefixed with the a project  name (based on a configuration file name). The API will try to find a configuration file that matches a given project name and use it as the request configuration. The underscore (`_`) is reserved as the default project name.

Below are few examples of API requests when your API is located in an `/api` sub-directory:

*   `/api/_/collections` (uses default config file `api.php`)
*   `/api/prod/items/projects` (uses prod config file `api.prod.php`)

::: tip
The naming format of the configuration file is `api.<project-name>.php`
:::

::: warning NOTE
A default api project (`api.php`) is required in order for the api to work.
:::

### Response Format

All output will adhere to the same general JSON structure:

```json
{
    "error": {
        "code": [Number],
        "message": [String]
    },
    "data": [Object | Array],
    "meta": [Object]
}
```

### HTTP Status Codes

The API uses HTTP status codes in addition to the message value. Everything in the 200 range is a valid response. The API does not serve translated error messages based on locale.

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Unprocessable Entity  |
| 500  | Internal Server Error |
| 503  | Service Unavailable   |

The `error` property is only present when an error has occurred.

### Error Codes

#### General error codes

- **0000** - Internal Error (500)
- **0001** - Not Found (404)
- **0002** - Bad Request (400)
- **0003** - Unauthorized (401)
- **0004** - Invalid Request (400) (_Validation_)
- **0005** - Endpoint Not Found (404)
- **0006** - Method Not Allowed (405)
- **0007** - Too Many Requests (429)
- **0008** - API Project Configuration Not Found (404)
- **0009** - Failed generating a SQL Query (500)
- **0010** - Forbidden (403)
- **0011** - Failed to connect to the database (500)
- **0012** - Unprocessable Entity (422)
- **0013** - Invalid or Empty Payload (400)
- **0014** - Default Instance not configured properly (503)
- **0015** - Batch upload not allowed (400)
- **0016** - Invalid filesystem path (500)
- **0017** - Invalid configuration path (422)
- **0018** - Project name already exists (409)
- **0018** - Unauthorized location access (401)

#### Authentication Error Codes

- **0100** - Invalid Credentials (404)
- **0101** - Invalid Token (401)
- **0102** - Expired Token (401)
- **0103** - Inactive User (401)
- **0104** - Invalid Reset Password Token (401)
- **0105** - Expired Reset Password Token (401)
- **0106** - User Not Found (404)
- **0107** - User with a given email Not Found (404)
- **0108** - User not authenticated (401)

#### Items Error Codes

- **0200** - Collection Not Found (404)
- **0201** - Not Allow Direct Access To System Table (401)
- **0202** - Field Not Found (404)
- **0203** - Item Not Found (404)
- **0204** - Duplicate Item (409)
- **0205** - Collection not being managed by Directus
- **0206** - Field not being managed by Directus
- **0207** - Revision Not Found (404)
- **0208** - Revision has an invalid delta
- **0209** - Field Invalid (400) - Trying to use a field that doesn't exists for actions such as filtering and sorting
- **0210** - Cannot add a comment to an item
- **0211** - Cannot edit a comment from an item
- **0212** - Cannot delete a comment from an item

#### Collections Error Codes

- **0300** - Reading items denied (403)
- **0301** - Creating items denied (403)
- **0302** - Updating items denied (403)
- **0303** - Deleting items denied (403)
- **0304** - Reading field denied (403)
- **0305** - Writing to field denied (403)
- **0306** - Altering collection was denied (403)
- **0307** - Collection already exists (422)
- **0308** - Field already exists (422)
- **0309** - Unable to find items owned by an specific user (403)

#### Schema Error Codes

- **0400** - Unknown Error (500)
- **0401** - Unknown data type (400)

#### Mail Error Codes

- **0500** - Mailer Transport not found (500)
- **0501** - Invalid Transport option (500)
- **0502** - Invalid Transport instance (500)

#### Filesystem Error Codes

- **0600** - Unknown Error (500)
- **0601** - The uploaded file exceeds max upload size that was specified on the server (500)
- **0602** - The uploaded file exceeds the max upload size that was specified in the client (500)
- **0603** - The uploaded file was only partially uploaded (500)
- **0604** - No file was uploaded (500)
- **0605** - _Not defined yet_
- **0606** - Missing temporary upload folder (500)
- **0607** - Failed to write file to disk (500)
- **0608** - A PHP extension stopped the file upload (500)

#### Utils Error Codes

- **1000** - Hasher not found (400)

### Validation

The API performs two types of validation on submitted data:

*   **Data Type** – The API checks the submitted value's type against the directus or database's field type. For example, a String submitted for an INT field will result in an error.
*   **RegEx** – The API checks the submitted value against its column's `directus_fields.validation` RegEx. If the value doesn't match then an error will be returned.


### Create Instance

Create a new instance connection.

```http
POST /instances
```

#### Body

| Attribute       | Description                            | Required
| --------------- | -------------------------------------- | ---------
| `project`       | The project name. Default: `_`         | No
| `force`         | Force the installation                 | No
| `db_type`       | Database type. Only `mysql` supported  | No
| `db_host`       | Database host. Default: `localhost`    | No
| `db_port`       | Database port. Default: `3306`         | No
| `db_name`       | Database name                          | Yes
| `db_user`       | Database username                      | Yes
| `db_password`   | Database user password                 | No
| `user_email`    | Admin email                            | Yes
| `user_password` | Admin password                         | Yes
| `user_token`    | Admin token. Default: `null`           | No
| `mail_from`     | Default mailer `from` email            | No
| `project_name`  | The project title. Default: `Directus` | No
| `cors_enabled`  | Enable CORS. Default `true`            | No
| `auth_secret`   | Sets the authentication secret key     | No

::: warning
When `project` is not specified it will create the default configuration.
:::

```json
{
    "db_name": "directus",
    "db_user": "root",
    "db_password": "pass",
    "user_email": "admin@example.com",
    "user_password": "password"
}
```

## Authentication

Most endpoints are checked against the permissions settings. If a user is not authenticated or isn’t allowed to access certain endpoints then API will respond with either a `401 Unauthorized` or a `403 Forbidden` respectively. In addition to these status codes, the API returns a specific reason in the `error.message` field.

### Tokens

To gain access to protected data, you must include an access token with every request.

There are two types of tokens.

#### "Static" tokens

These tokens never expired and they could be assigned to an user.

#### Temporary tokens

These tokens are generated on user request and follows the [JWT spec](https://jwt.io).

The JWT token payload contains the user id, type of token (`auth`), and an expiration date, which is signed with a secret key using `HS256` hashing algorithm.

There are several ways to include this access token:

#### 1. Bearer Token in Authorization Header

```
curl -H "Authorization: Bearer Py8Rumu.LD7HE5j.uFrOR5" https://example.com/api/`
curl -H "Authorization: Bearer staticToken" https://example.com/api/`
```

::: warning NOTE
For security reason Apache hide the Authorization header to prevent other scripts from seeing the credentials used to access the server. Make sure your Apache passes the `Authentication` header. [Read more](https://httpd.apache.org/docs/2.4/en/mod/core.html#cgipassauth)
:::

#### 2. HTTP Basic Auth

```
curl -u Py8Ru.muLD7HE.5juFrOR5: https://example.com/api/
curl -u staticToken: https://example.com/api/
```

Notice that the token is `Py8Ru.muLD7HE.5juFrOR5` and has a colon `:` at the end. Using the Basic auth, the auth user is the token and the auth password should be either blank or the same token.

#### 3. Query `access_token` Parameter

```
curl https://example.com/api/?access_token=Py8RumuLD.7HE5j.uFrOR5
curl https://example.com/api/?access_token=staticToken
```

### Get Auth Token

Gets a token from a Directus user's credentials.

```http
POST /[project]/auth/authenticate
```

#### Body

The users credentials.

```json
{
    "email": "rijk@directus.io",
    "password": "supergeheimwachtwoord"
}
```

::: warning
The access token that is returned through this endpoint must be used with any subsequent requests except for endpoints that don’t require auth.
:::


#### Protected Endpoints

| Endpoint                       | Protected
| ------------------------------ | -----------------------
| /[project]/                    | Yes
| /[project]/activity            | Yes
| /[project]/auth                | No
| /[project]/collections         | Yes
| /[project]/collection_presets  | Yes
| /[project]/custom              | No
| /[project]/fields              | Yes
| /[project]/files               | Yes
| /[project]/items               | Yes
| /[project]/interfaces          | Yes
| /[project]/mail                | Yes
| /[project]/pages               | Yes
| /[project]/permissions         | Yes
| /[project]/relations           | Yes
| /[project]/revisions           | Yes
| /[project]/roles               | Yes
| /[project]/scim/v2             | Yes
| /[project]/settings            | Yes
| /[project]/users               | Yes
| /[project]/utils               | Yes
| /                              | Yes
| /instances                     | No
| /interfaces                    | Yes
| /layouts                       | Yes
| /pages                         | Yes
| /server/ping                   | No
| /types                         | Yes

### Refresh Auth Token

Gets a new fresh token using a valid JWT auth token.

```http
POST /[project]/auth/refresh
```

#### Body

A valid token

```json
{
    "token": "123abc456def"
}
```

::: warning
The access token that is returned through this endpoint must be used with any subsequent requests except for endpoints that don’t require authentication.
:::

### Password Reset Request

The API will send an email to the requested user’s email containing a link with a short-lived reset token. This reset token can be used to finish the password reset flow.

The reset token is a JWT token that include the user id, email, type (`reset_password`) and expiration time.

```http
POST /[project]/auth/password/request
```

#### Body

The user's email address and the app URL from which the reset is requested.

```json
{
    "email": "rijk@directus.io"
}
```

### Password Reset

The API checks the validity of the reset token, that it hasn't expired, and the email address contained in the token payload matches one in the database.

It uses a GET request so user can be requested from email clients.

This endpoint generates a random password for the user and sends it to their email address. The user is encourage to change this password as soon as possible.

```http
GET /[project]/auth/password/reset/[reset-token]
```

### Get SSO Services

```http
GET /[project]/auth/sso
```

A list of third-party Single Sign-On (SSO) authentication services, such as Google and Facebook.

### Authorization Redirect

```http
GET /[project]/auth/sso/[provider]
```

Automatically redirects to the authorization url if the origin host is allowed by the API, otherwise it will return the authorization url.

### OAuth Authentication

::: warning
This endpoint is only useful when the callback is not handled by the API. See: /[project]/auth/sso/[provider]/callback.
:::

When the server authorized the user after authenticated it returns a `oauth_token` and `oauth_verifier` (version 1.0) or `code` (version 2.0).

```http
POST /[project]/auth/sso/[provider]
```

#### Body

The user's email address and the app URL from which the reset is requested.

##### OAuth 1.0

```json
{
    "oauth_token": "[oauth-token]",
    "oauth_verifier": "[oauth-verifier]"
}
```

##### OAuth 2.0

```json
{
    "code": "[verification-code]"
}
```

### SSO Callback

```http
GET /[project]/auth/sso/[provider]/callback
```

Set this url as the callback for the Single Sign-On (SSO) OAuth service and it will return a "request token" that the client can use to request the access token.

### Get Access Token

```http
POST /[project]/auth/sso/access_token
```

Using the request token that was returned by the `/[project]/auth/sso/[provider]/callback` endpoint to get the access token.

#### Body

```json
{
    "request_token": "<request-token>"
}
```

## Query Parameters

The API have a set of query parameters that can be used for specific actions, such as filter, sort, limit and choose the fields from a result.

The supported query parameters are listed below:

| Name          | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `fields`      | Include the specific fields in the result
| `limit`       | The maximum number of items in the result
| `meta`        | Include metadata related to the result
| `offset`      | The results offset in combination with `limit`
| `single`      | Returns the first item
| `sort`        | Sorting the results by one or multiple fields
| `status`      | Search for items status with the given statuses
| `filter`      | Search for items that matches the filters
| `lang`        | Include translation information
| `q`           | Search for items that matches the given string in any of their fields*
| `groups`      | Groups the items by one or more fields
| `joins`       | Joins the result with another collection using SQL Joins

### Fields

`fields` is a CSV of columns to include in the result. This parameter supports dot notation to request nested relational fields. You can also use a wildcard (`*`) for "all fields".

#### Examples

*   `fields=*` Gets all top-level fields
*   `fields=*.*` Gets all top-level fields and all relational fields one-level deep
*   `fields=*,images.*` Gets all top-level fields and all relational fields within `images`
*   `fields=first_name,last_name` Gets only the `first_name` and `last_name` fields
*   `fields=*.*,images.thumbnails.*` Get all fields for top level and one level deep, as well as three levels deep within `images.thumbnails`

### Limit

Using `limit` can be set the maximum number of items that will be returned.

#### Examples

*   `limit=10` Returns a maximum of 10 items.

### Metadata

The `meta` parameter is a CSV of metadata fields to include. This parameter supports the wildcard (`*`) to return all metadata fields.

#### Options

*   `result_count` - Number of items returned in this response
*   `total_count` - Total number of items in this collection
*   `status` - Collection item count by statuses
*   `collection` - The collection name
*   `type`
    *   `collection` if it is a collection of items
    *   `item` if it is a single item

### Offset

Using `offset` the first `offset` number of items can be skipped.

#### Examples

*   `offset=3&limit=10` Returns a maximum of 10 items, but skips the first 3 items on the list.

### Single

Using `single` the first element will be returned.

::: tip NOTE
Instead of returning a list, the result data will be an object representing the first item.
:::

#### Examples

*   `single=1&offset=3&limit=10` Returns the first item of the result.

### Sorting

`sort` is a CSV of fields used to sort fetched items. Sorting defaults to ascending (ASC) order but a minus sign (`-`) can be used to reverse this to descending (DESC) order. Fields are prioritized by their order in the CSV. You can use a `?` to sort randomly.

#### Examples

*   `sort=?` Sorts randomly
*   `sort=name` Sorts by `name` ASC
*   `&sort=name,-age` Sorts by `name` ASC followed by `age` DESC
*   `sort=name,-age,?` Sorts by `name` ASC followed by `age` DESC, followed by random sorting

### Filtering

Used to search items from a collection that matches the filters conditions. Filters follow the syntax `filter[<field-name>][<operator>]=<value>`. The `field-name` supports dot-notation to filter on nested relational fields.

#### Filter Operators

| Operator             | Description                            |
| -------------------- | -------------------------------------- |
| `=`, `eq`            | Equal to                               |
| `<>`, `!=`, `neq`    | Not Equal to                           |
| `<`, `lt`            | Less than                              |
| `<=`, `lte`          | Less than or equal to                  |
| `>`, `gt`            | Greater than                           |
| `>=`, `gte`          | Greater than or equal to               |
| `in`                 | Exists in one of the values            |
| `nin`                | Not exists in one of the values        |
| `null`               | It is null                             |
| `nnull`              | It is not null                         |
| `contains`, `like`   | Contains the substring                 |
| `ncontains`, `nlike` | Doesn't contain this substring         |
| `between`            | The value is between two values        |
| `nbetween`           | The value is not between two values    |
| `empty`              | The value is empty (null or falsy)     |
| `nempty`             | The value is not empty (null or falsy) |
| `all`                | Contains all given related items's IDs |
| `has`                | Has one or more related items's IDs    |

#### AND vs OR

By default, all chained filters are treated as ANDs, which means all conditions should match. To create an OR combination, you can add the `logical` operator, as shown below:

```
GET /items/projects?filter[category][eq]=development&filter[title][logical]=or&filter[title][like]=design
```

::: tip
In nearly all cases, it makes more sense to use the `in` operator instead of going with the logical-or. For example, the above example can be rewritten as

```
GET /items/projects?filter[category][in]=development,design
```

:::

#### Filtering by Date/DateTime

The format for date type is `YYYY-MM-DD` and for datetime is `YYYY-MM-DD HH:MM:SS`. This formats translate to `2018-08-29 14:51:22`.

- Year in `4` digits
- Months, days, minutes and seconds in two digits, adding leading zero padding when it's a one digit month
- Hour in 24 hour format

@TODO: Soon to implement

Alias for current datetime `now` and current date `today`.

```
# Equals to
GET /items/comments?filter[datetime]=2018-05-21 15:48:03

# Greater than
GET /items/comments?filter[datetime][gt]=2018-05-21 15:48:03

# Greater than or equal to
GET /items/comments?filter[datetime][gte]=2018-05-21 15:48:03

# Less than
GET /items/comments?filter[datetime][lt]=2018-05-21 15:48:03

# Less than or equal to
GET /items/comments?filter[datetime][lte]=2018-05-21 15:48:03

# Between two date
GET /items/comments?filter[datetime][lte]=2018-05-21 15:48:03,2018-05-21 15:49:03
```

### Language

The `lang` parameter is a CSV of languages that should be returned with the response. This parameter can only be used when a Translation field has been included in the collection. This parameter supports the wildcard (`*`) to return all translations.

### Search Query

The `q` parameter allows you to perform a search on all numeric or string-based fields within the collection (see list below). It's an easy way to search for an item without creating complex field filters – though it is far less optimized.

#### Searched Datatypes

* `CHAR`
* `VARCHAR`
* `TINYTEXT`
* `TEXT`
* `MEDIUMTEXT`
* `LONGTEXT`
* `TINYJSON`
* `JSON`
* `MEDIUMJSON`
* `LONGJSON`
* `ARRAY`
* `LANG`
* `UUID`
* `TINYINT`
* `SMALLINT`
* `INTEGER`
* `INT`
* `MEDIUMINT`
* `BIGINT`
* `SERIAL`
* `FLOAT`
* `DOUBLE`
* `DECIMAL`
* `REAL`
* `NUMERIC`
* `CURRENCY`
* `SET`
* `ENUM`

### Groups

The `groups` parameter allows to group the result for one or more fields.

#### Examples

* `groups=id,name` Groups the result by `id` and `name` fields

### Joins

The `joins` parameter allows to join items from a collection to the main result.

#### Examples

@TODO: Add examples and useful examples behind this feature


## Items

Items are essentially individual database records which each contain one or more fields (database columns). Each item belongs to a specific collection (database table) and is identified by the value of its primary key field. In this section we describe the different ways you can manage items.

This endpoint is dedicated to all user-defined collections only. Accessing system tables are forbidden. See [Systems endpoints](#system) for more information.

### Create Items

Creates one or more items in a given collection.

```http
POST /[project]/items/[collection-name]
```

#### Body

A single item or an array of multiple items to be created. Field keys must match the collection's column names.

##### Single Item (Regular)

```json
{
    "title": "Project One",
    "category": "Design"
}
```

##### Multiple Items (Batch)

```json
[
    {
        "title": "Project One",
        "category": "Design"
    },
    {
        "title": "Project Two",
        "category": "Development"
    }
]
```

::: tip
The API may not return any data for successful requests if the user doesn't have adequate read permission. `204 NO CONTENT` is returned instead.
:::

### Get Items

Get one or more single items from a given collection.

```http
GET /[project]/items/[collection-name]/[id]
GET /[project]/items/[collection-name]/[id1],[id2],[id3]
```

#### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `status`      |
| `lang`        |

#### Examples

*   Return the project item with an ID of `1`
    ```bash
    curl -u <token>: https://api.directus.io/_/items/projects/1
    ```
    *   Return project items with IDs of `1`, `3`, `11`
    ```bash
    curl -u <token>: https://api.directus.io/_/items/projects/1,3,11
    ```

### List Items

Get an array of items from a given collection.

```http
GET /[project]/items/[collection-name]
```

#### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `limit`       |
| `meta`        |
| `offset`      |
| `single`      |
| `sort`        |
| `status`      |
| `filter`      |
| `lang`        |
| `q`           |
| `groups`      |
| `joins`       |

#### Examples

*   Search for all projects in the `design` category
    ```bash
    curl -u [token]: -g https://api.directus.io/_/items/projects?filter[category][eq]=design
    ```

### Get Item Revision

Get a specific revision from a given item. This endpoint uses a zero-based offset to select a revision, where `0` is the creation revision. Negative offsets are allowed, and select as if `0` is the current revisions.

```http
GET /[project]/items/[collection-name]/[id]/revisions/[offset]
```

#### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `status`      |
| `lang`        |

#### Examples

*   Return the 2nd revision (from creation) for the project item with a primary key of 1
    ```bash
    curl -u <token>: https://api.directus.io/_/items/projects/1/revisions/2
    ```
*   Return the 2nd from current revision for the project item with a primary key of 1
    ```bash
    curl -u <token>: https://api.directus.io/_/items/projects/1/revisions/-2
    ```

### Get Item Revisions

Get an array of revisions from a given item.

```http
GET /[project]/items/[collection-name]/[id]/revisions
```

#### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `limit`       |
| `meta`        |
| `offset`      |
| `single`      |
| `sort`        |
| `status`      |
| `filter`      |
| `lang`        |
| `q`           |
| `groups`      |
| `joins`       |

#### Examples

*   Get all revisions from the project item with a primary key of 1
    ```bash
    curl https://api.directus.io/_/items/projects/1/revisions
    ```

### Update Items

Update or replace a single item from a given collection.

@TODO LOOK INTO ALLOWING FILTER PARAM FOR UPDATES, EG: `PUT /[project]/items/projects?filter[title][eq]=title`

```http
PATCH /[project]/items/[collection-name]/[id]
```

::: warning

*   **PATCH** partially updates the item with the provided data, any missing data is ignored

:::

#### Body

A single item to be updated. Field keys must match the collection's column names.

#### Examples

*   Return the project item with an ID of `1`
    ```bash
    curl -u <token>: -d "title=new title" https://api.directus.io/_/items/projects/1
    ```

### Update Items

Update multiple items in a given collection.

```http
PATCH /[project]/items/[collection-name]
PATCH /[project]/items/[collection-name]/[id1],[id2],...
```

::: warning PATCH

*   **PATCH** partially updates the item with the provided data, any missing data is ignored

:::

::: danger WARNING
Batch Update can quickly overwrite large amounts of data. Please be careful when implementing this request.
:::

#### Body

Update multiple items with the same data: `PATCH /items/projects/1,2`


```json
{
  "title": "Unknown Title"
}
```

Update multiple items, each with its dataset: `PATCH /items/projects`. Each items requires its primary key fields to identify where the dataset will belongs to.


```json
[{
  "id": 1,
  "title": "Unknown Title 1"
}, {
  "id": 2,
  "title": "Unknown Title 2"
}]
```

### Revert Item

Reverts a single item to a previous revision state.

```http
PATCH /[project]/items/[collection-name]/[item-id]/revert/[revision-id]
```

#### Body

There is no need for a body to do this request.

#### Examples

*   Revert the project item (ID:`1`) to its previous state in revision (ID:`2`)
    ```bash
    curl -u <token>: https://api.directus.io/_/items/projects/1/revert/2
    ```

### Delete Items

Deletes one or more items from a specific collection. This endpoint also accepts CSV of primary key values, and would then return an array of items.

```http
DELETE /[project]/items/[collection-name]/[id]
DELETE /[project]/items/[collection-name]/[id1],[id2],[id3]
```

::: danger WARNING
Batch Delete can quickly destroy large amounts of data. Please be careful when implementing this request.
:::

## System

@TODO All these endpoints need to have the same reference as listed above

All system tables (`directus_*`) are blocked from being used through the regular `/items` endpoint to prevent security leaks or because they require additional processing before sending to the end user. This means that any requests to `/items/directus_*` will always return `401 Unauthorized`.

These system endpoints still follow the same spec as a “regular” `/items/[collection-name]` endpoint but require the additional processing outlined below:

### Activity

#### Activity Actions

| Name           | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `authenticate` | User authenticated using credentials                       |
| `comment`      | Comment was added to an item                               |
| `create`       | Item was created                                           |
| `upload`       | File item was created                                      |
| `update`       | Item was updated                                           |
| `delete`       | Item was deleted                                           |
| `soft-delete`  | Item was soft-deleted. Update to a soft-deleted status     |
| `revert`       | Item was updated using a revision data                     |

#### List Activity

Returns a list of activity.

```http
GET /[project]/activity
```

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `limit`       |
| `meta`        |
| `offset`      |
| `single`      |
| `sort`        |
| `filter`      |
| `q`           |
| `groups`      |
| `joins`       |

#### Get Activity Event

Get one or more activity events.

```http
GET /[project]/activity/[id]
```

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `status`      |
| `lang`        |

#### Create Comment

Create a new comment, which needs to be related to a collection/item.

```http
POST /[project]/activity/comment
```

##### Body

A single object representing the new comment.

```json
{
    "collection": "projects",
    "item": 1,
    "comment": "A new comment"
}
```

#### Update Comment

Update a comment using a comment id.

```http
POST /[project]/activity/comment/[id]
```

##### Body

A single object representing the new comment. The collection and item fields are not required.

```json
{
    "comment": "An updated comment"
}
```

#### Delete Comment

Delete a comment using a comment id.

```http
DELETE /[project]/activity/comment/[id]
```

### Collections

These endpoints are used for creating, reading, updating, or deleting collections. Similar to `/fields`, it alters the database schema directly when needed.

#### List Collections

```http
GET /[project]/collections
```

Returns the list of all collections in the database.

#### Get Collection

```http
GET /[project]/collections/[name]
```

Returns the details of a single collection.

#### Create Collection

```http
POST /[project]/collections
```

Creates a new collection.

In the top-level object `collection` fields is required.

In the `fields` list, `field`, `type`, and `interface` are required.

There's time when `datatype` is required because `type` supports different types, such as `primary_key` type that supports string and number type, and It is required to set the `datatype` to a numeric or string data type.

Also when the `type` requires a length, such as a string or numeric type, a `length` attribute is needed.

```json
{
    "collection": "projects",
    "item_name_template": null,
    "managed": true,
    "hidden": false,
    "single": false,
    "translation": null,
    "note": "This collection will stored all our projects",
    "icon": null,
    "fields": [
        {
            "field": "id",
            "type": "primary_key",
            "datatype": "int",
            "interface": "primary_key",
            "primary_key": true,
            "auto_increment": true,
            "length": 10,
            "signed": false
        },
        {
            "field": "title",
            "type": "varchar",
            "interface": "text-input",
            "length": 255,
            "readonly": false,
            "required": true,
            "note": "The project title"
        }
    ]
}
```

#### Update Collection

```http
PATCH /[project]/collections/[name]
```

Updates the details, add or update fields of a given collection.

```json
{
    "note": "This collection stores all our clients projects",
    "fields": [
        {
            "field": "title",
            "length": 128
        }
    ]
}
```

#### Delete Collection

```http
DELETE /[project]/collections/[name]
```

Permanently deletes a collection information, the table and all its contents.

### Collection Presets

These endpoints are used for creating, reading, updating, or deleting collection presets.

#### List Collection Presets

```http
GET /[project]/collection_presets
```

Returns the list of collection presets.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `limit`       |
| `meta`        |
| `offset`      |
| `single`      |
| `sort`        |
| `filter`      |
| `q`           |
| `groups`      |
| `joins`       |

#### Get Collection Presets

```http
GET /[project]/collection_presets/[id]
GET /[project]/collection_presets/[id1],[id2],[idN]
```

Returns the details of one or more collection presets.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Create Collection Presets

```http
POST /[project]/collection_presets
```

Creates a new collection preset.

#### Update Collection Presets

```http
PATCH /[project]/collection_presets
PATCH /[project]/collection_presets/[id]
PATCH /[project]/collection_presets/[id1],[id2],[idN]
```

Updates the details of one or more collection presets.

#### Delete Collection Presets

```http
DELETE /[project]/collection_presets/[id]
DELETE /[project]/collection_presets/[id1],[id2],[idN]
```

Permanently deletes a collection_presets.

### Fields

These endpoints are used for creating, reading, updating, or deleting fields from a collection. It alters the database schema directly when needed. Similar to `/collections`.

#### List Fields

```http
GET /[project]/fields/[collection]
```

Returns the list of all fields that belongs to a given collection.

#### Get Field

```http
GET /[project]/fields/[collection]/[field]
```

Returns the details of a single field.

#### Create Fields

```http
POST /[project]/fields/[collection]
```

Creates a new field in a given collection.

```json
{
  "field": "description",
  "type": "text",
  "interface": "textarea"
}
```

#### Update Fields

```http
PATCH /[project]/fields/[collection]/[field]
```

Updates the details of a given field.

```json
{
  "required": true
}
```

#### Delete Field

```http
DELETE /[project]/fields/[collection]
```

Permanently deletes a field and its content.

### Files

These endpoints are used for uploading, updating, and deleting files and virtual folders.

#### List Files

```http
GET /[project]/files
```

Returns the list of files.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `limit`       |
| `meta`        |
| `offset`      |
| `single`      |
| `sort`        |
| `filter`      |
| `q`           |
| `groups`      |
| `joins`       |

#### Get Files

```http
GET /[project]/files/[id]
GET /[project]/files/[id1],[id2],[idN]
```

Returns the details of one or more files.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Upload File

```http
POST /[project]/files
```

Uploads a new file.

There's two way to upload a file:

##### Using Base64 content

Using passing a base64 file content to the `data` field.

```json
{
  "filename": "image.jpg",
  "data": "<base64-content>"
}
```

##### Using `multipart/form-data` Content Type

Passing the file form data set to the `data` field when making the `multipart/form-data` `POST` request.

It allows for easier uploading file when using a HTML form element with a `enctype` (encoding type) set to `multipart/form-data`.


#### Update Files

```http
PATCH /[project]/files/[id]
```

Updates the details of a given field, or replacing the current file.

```json
{
  "data": "<base64-content>",
  "description" : "new description"
}
```

#### Update Multiple Files

```http
PATCH /[project]/files
PATCH /[project]/files/[id1],[id2],[idN]
```

Updates the details of a given field, or replacing the current file of one or more files.

##### Multiple files with different data

Each file object requires the `id` field to identify which record the new data will belongs to.

```
PATCH /_/files
```

```json
[{
  "id": 1,
  "data": "<base64-content>",
  "description" : "new description"
}, {
  "id": 2,
  "title" : "new title"
}]
```

##### Multiple files with same data

```
PATCH /_/files/1,2,3
```

```json
{
  "tags": ["christmas", "2017"]
}
```

#### Delete Files

```http
DELETE /[project]/files/[id]
DELETE /[project]/files/[id1],[id2],[idn]
```

Permanently deletes one or more files and its record.

#### List File Revisions

```http
GET /[project]/files/[id]/revisions
```

Returns a list of a single file revisions.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `limit`       |
| `meta`        |
| `offset`      |
| `single`      |
| `sort`        |
| `q`           |
| `groups`      |
| `joins`       |

#### Get File Revision

```http
GET /[project]/files/[id]/revisions/[offset]
```

Returns the revision of a single item using a 0-index based offset.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

### Folders

These endpoints are used for creating, reading, updating, or deleting a virtual folders.

#### List Folders

```http
GET /[project]/files/folders
```

Returns the list of your virtual folders.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `limit`       |
| `meta`        |
| `offset`      |
| `single`      |
| `sort`        |
| `filter`      |
| `q`           |
| `groups`      |
| `joins`       |

#### Get Folders

```http
GET /[project]/files/folders/[id]
GET /[project]/files/folders/[id1],[id2],[idN]
```

Returns the details of one or more virtual folders.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Create Folders

```http
POST /[project]/files/folders
```

Creates a new virtual folder.

```json
{
  "name": "Christmas 2017",
  "parent_folder": null
}
```

#### Update Folders

```http
PATCH /[project]/files/folders/[id]
```

Updates the details of a given folder.

```json
{
  "name": "Christmas Photos 2017"
}
```

#### Delete Folders

```http
DELETE /[project]/files/[id]
DELETE /[project]/files/[id1],[id2],[idN]
```

Permanently deletes one or more virtual folders. Leaving its sub-folder and files orphan.

### Permissions

These endpoints are used for creating, reading, updating, or deleting permissions.

#### List Permissions

```http
GET /[project]/permissions
```

Returns the list of permissions.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `limit`       |
| `meta`        |
| `offset`      |
| `single`      |
| `sort`        |
| `filter`      |
| `q`           |
| `groups`      |
| `joins`       |

#### Get Permissions

```http
GET /[project]/permissions/[id]
GET /[project]/permissions/[id1],[id2],[idN]
```

Returns the details of a single permission.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Get Authenticated User Permissions

```http
GET /[project]/permissions/me
```

Returns a list of permissions that belongs to the authenticated user.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `limit`       |
| `meta`        |
| `offset`      |
| `single`      |
| `sort`        |
| `filter`      |
| `q`           |
| `groups`      |
| `joins`       |

#### Get Authenticated User's Collection Permissions

```http
GET /[project]/permissions/me/[collection-name]
```

Returns a a collection's permissions that belongs to the authenticated user.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Create Permissions

```http
POST /[project]/permissions
```

Creates one or more permissions.

##### One permission

```json
{
  "collection": "projects",
  "role": 3,
  "create": "full",
  "read": "full",
  "update": "mine",
  "delete": "none"
}
```

##### Multiple Permissions

```json
[{
  "collection": "projects",
  "role": 3,
  "create": "full",
  "read": "full",
  "update": "mine",
  "delete": "none"
}, {
  "collection": "projects",
  "role": 4,
  "create": "none",
  "read": "full",
  "update": "none",
  "delete": "none"
}]
```

#### Update Permissions

```http
PATCH /[project]/permissions
PATCH /[project]/permissions/[id]
PATCH /[project]/permissions/[id1],[id2],[idN]
```

Updates the details of one or more permissions

##### One Permission

```http
PATCH /_/permissions/1
```

```json
{
  "create": "none"
}
```

##### Multiple Permission with same data

```http
PATCH /_/permissions/1,2,3
```

```json
{
  "create": "none",
  "delete": "none"
}
```

##### Multiple Permission with different data

```http
PATCH /_/permissions
```

```json
[{
  "id": 1,
  "create": "none",
  "delete": "none"
}, {
  "id": 2,
  "create": "mine",
  "delte": "mine"
}]
```

#### Delete Permissions

```http
DELETE /[project]/permissions/[id]
DELETE /[project]/permissions/[id1],[id2],[idN]
```

Permanently deletes one or more permissions.

### Relations

These endpoints are used for creating, reading, updating, or deleting collection's relations.

#### List Relations

```http
GET /[project]/relations
```

Returns the list of relations.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `limit`       |
| `meta`        |
| `offset`      |
| `single`      |
| `sort`        |
| `filter`      |
| `q`           |
| `groups`      |
| `joins`       |

#### Get Relations

```http
GET /[project]/relations/[id]
GET /[project]/relations/[id1],[id2],[idN]
```

Returns the details of one or more relations.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Create Relations

```http
POST /[project]/relations
```

Creates one or more relations.

##### One Relation

```json
{
  "collection_many": "projects",
  "field_many": "author",
  "collection_one": "directus_users",
  "field_one": null
}
```

##### Multiple Relations

```json
[
  {
    "collection_many": "projects",
    "field_many": "author",
    "collection_one": "directus_users",
    "field_one": null
  },
  {
    "collection_many": "projects",
    "field_many": "category",
    "collection_one": "categories",
    "field_one": null
  }
]
```

#### Update Relations

```http
PATCH /[project]/relations
PATCH /[project]/relations/[id]
PATCH /[project]/relations/[id1],[id2],[idN]
```

Updates the details of one or more relations.

##### One Relation

```http
PATCH /_/relations/1
```

```json
{
  "field_one": "projects"
}
```

##### Multiple Relations with same data

```http
PATCH /_/relations/1,2
```

```json
{
  "field_one": null
}
```

##### Multiple Relations with different data

```http
PATCH /_/permissions
```

```json
[{
  "id": 1,
  "field_one": "projects"
}, {
  "id": 2,
  "field_one": "categories"
}]
```

#### Delete Relations

```http
DELETE /[project]/relations/[id]
DELETE /[project]/relations/[id1],[id2],[idN]
```

Permanently deletes one or more relations.

### Revisions

These endpoints are used for fetching one or a list of revisions.

#### List Revisions

```http
GET /[project]/revisions
```

Get a list of all revisions.

::: warning NOTE
All these information are fetched from the `directus_revisions` table.
:::

#### Get Revisions

```http
GET /[project]/revisions/[id]
GET /[project]/revisions/[id1],[id2],[idN]
```

Get the details of one or more revisions by their IDs.

### Roles

These endpoints are used for creating, reading, updating, or deleting roles.

#### List Roles

```http
GET /[project]/roles
```

Returns the list of roles.

#### Get Roles

```http
GET /[project]/roles/[id]
GET /[project]/roles/[id1],[id2],[idN]
```

Returns the details of one or multiple roles.

#### Create Roles

```http
POST /[project]/roles
```

Creates a one or more roles.

::: warning NOTE
Directus is compatible with System for Cross-domain Identity Management (SCIM) protocol. All roles has an `external_id` to represent the group outside and it must be unique within Directus. if left empty on creation, Directus will generate an UUID v4.
:::


##### Create one Role

```json
{
  "name": "Interns"
}
```

##### Create multiple Roles
```json
[
  {
    "name": "Interns"
  },
  {
    "name": "Editors"
  }
]
```

#### Update Roles

```http
PATCH /[project]/roles
PATCH /[project]/roles/[id]
PATCH /[project]/roles/[id1],[id2],[idN]
```

Updates the details of one or more roles

##### Update one Role

```http
PATCH /_/roles/3
```

```json
{
  "description": "new description"
}
```

##### Update multiple Roles with same data

```http
PATCH /_/roles/1,2,3
```

```json
{
  "ip_whitelist": "10.0.0.1,127.0.0.1"
}
```

##### Update multiple Permission with different data

```http
PATCH /_/roles
```

```json
[{
  "id": 1,
  "ip_whitelist": "10.0.0.1"
}, {
  "id": 2,
  "ip_whitelist": "127.0.0.1"
}]
```

#### Delete Roles

```http
DELETE /[project]/roles/[id]
DELETE /[project]/roles/[id1],[id2],[idN]
```

Permanently deletes one or more roles.

### Settings

These endpoints are used for creating, reading, updating, or deleting settings.

#### List Settings

```http
GET /[project]/settings
```

Returns the list of settings.

#### Get Settings

```http
GET /[project]/settings/[id]
GET /[project]/settings/[id1],[id2],[idN]
```

Returns the details of one or more settings.

#### Create Settings

```http
POST /[project]/settings
```

Creates one or more settings.

#### Update Settings

```http
PATCH /[project]/settings
PATCH /[project]/settings/[id]
PATCH /[project]/settings/[id1],[id2],[idN]
```

Updates the details of one or more settings.

#### Delete Settings

```http
DELETE /[project]/settings/[id]
DELETE /[project]/settings/[id1],[id2],[idN]
```

Permanently deletes one or more settings.

### Users

#### Create User

Creates a new user within this instance.

```http
POST /[project]/users
```

##### Body

The email and password for the new user to be created. Any other submitted fields are optional, but field keys must match column names within `directus_users`.

```json
{
    "email": "rijk@directus.io",
    "password": "d1r3ctus"
}
```

#### Get Users

Gets a single user from within this instance.

```http
GET /[project]/users/[pk]
GET /[project]/users/[pk],[pk],[pk]
```

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `status`      |
| `joins`       |

##### Examples

Returns the user with an ID of `1`.

```bash
curl -u <token>: https://api.directus.io/_/users/1
```

#### List Users

Returns a list of Directus users within this instance.

```http
GET /[project]/users
```

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `limit`       |
| `meta`        |
| `offset`      |
| `single`      |
| `sort`        |
| `status`      |
| `filter`      |
| `lang`        |
| `q`           |
| `groups`      |
| `joins`       |

##### Examples

Get a list of Directus Users.

```bash
curl -u <token>: https://api.directus.io/_/users
```

#### Update Users

Updates a Directus User.

```http
PATCH /[project]/users/[id]
```

@TODO DO WE WANT TO SUPPORT CSV OF PKs HERE TOO?

::: tip NOTE
**PATCH** will partially update the item with the provided data, any missing fields will be ignored.
:::

##### Body

An [User Object](#). Fields names must match column names within `directus_users` collection.

#### Delete Users

Deletes one or more Users from Directus.

```http
DELETE /[project]/users/[id]
DELETE /[project]/users/[id1],[id2],[idN]
```

#### Invite Users

```http
POST /[project]/users/invite
```

Invites one or more users to this instance. It will create an user with `invited` status, and then it will sends an email to the user with further instructions on how to activate their user.

The email will sends an url with a to
The API will generate and send a JWT token inside the email for this specific request.

The payload contains the following data:

- `type`: The token type, always set to `invitation`.
- `date`: The datetime when the token was generated.
- `exp`: The expiration datetime of the token.
- `email`: The email of the user that will receive the invitation.
- `sender`: The ID of the user that sends the invitation.

##### Body

An email, or a list of emails to send invites to.

Invite one user:

```json
{
    "email": "rijk@directus.io"
}
```

Invite multiple users:

```json
{
  "email": [
    "rijk@directus.io",
    "welling@directus.io",
    "ben@directus.io"
  ]
}
```

#### Accept Users Invitation

```http
POST /[project]/users/invite/[token]
```

Accepts and enable an invited user using an JWT invitation token.

#### Track User

Set the datetime and last Directus Web Application page accessed by the user. Last Access is used to determine if the user is still logged into the Directus Web Application, and Last Page is used to warn users when another users is editing the same item.

```http
PATCH /[project]/users/[id]/tracking/page
```

##### Body

The path to the last page the user was on in the Directus App.

```json
{
    "last_page": "/tables/projects"
}
```

#### Get User Revisions

```http
GET /[project]/users/[id]/revisions
```

Returns a list of revisions for an user.

#### Get User Revision

```http
GET /[project]/users/[id]/revisions/[offset]
```

Returns a revision of an user using a 0-index based offset.

## Utilities

| Hasher List   |
| ------------- |
| `core`        |
| `bcrypt`      |
| `sha1`        |
| `sha224`      |
| `sha256`      |
| `sha384`      |
| `sha512`      |

The default `hasher` is `core`. It uses the `password_hash` function and the php default algortim defined by `PASSWORD_DEFAULT`.

### Hash String

Hashes a submitted string using the chosen algorithm.

```http
POST /[project]/utils/hash
```

#### Body

The hashing algorithm and the string to hash.

```json
{
    "hasher": "sha1",
    "string": "Directus"
}
```

#### Response

```json
{
  "data": {
    "hash": "<hashed-string>"
  }
}
```

### Match Hashed String

Verifies that a string hashed with a given algorithm matches a hashed string.

```http
POST /[project]/utils/hash/match
```

#### Body

The hashing algorithm to use, the plain string, and the hashed string.

```json
{
    "hasher": "sha1",
    "string": "Directus",
    "hash": "c898896f3f70f61bc3fb19bef222aa860e5ea717"
}
```

#### Response

```json
{
  "data": {
    "valid": true
  }
}
```

### Generate Random String

Returns a random-generated alphanumeric string.

```http
POST /[project]/utils/random/string
```

#### Body

| Name   | Default | Description                  |
| ------ | ------- | ---------------------------- |
| length | 32      | Length of string to generate |

## Mail

Send an email to one or more recipients.

```http
POST /[project]/mail
```

### Body

```json
{
  "to": [
    1,
    "user@example.com",
    2,
    {"email": "intern@example.com", "name": "Jane Doe"}
  ],
  "subject": "New password",
  "body": "Hello <b>{{name}}</b>, this is your new password: {{password}}.",
  "type": "html",
  "data": {
    "user": "John Doe",
    "password": "secret"
  }
}
```

## SCIM

Directus partly supports Version 2 of System for Cross-domain Identity Management (SCIM). It is an open standard that allows for users to be created, managed, and disabled outside of Directus. It allows the exchange of user information between systems.

The user have the ability to use a single, centralize system for user provisioning and use SCIM to exchange this information with Directus using these endpoints.

### Endpoints

| Endpoint       | Methods                         |
| -------------- | ------------------------------- |
| `/Users`       | `GET`, `POST`                   |
| `/Users/{id}`  | `GET`, `PUT`, `PATCH`           |
| `/Groups`      | `GET`, `POST`                   |
| `/Groups/{id}` | `GET`, `PUT`, `PATCH`, `DELETE` |

Read more in the "SCIM Endpoints and HTTP Methods" section of [RFC7644](https://tools.ietf.org/html/rfc7644#section-3.2).

### List SCIM Users

```http
GET /[project]/scim/v2/Users
```

#### Supported Query Parameters
| Name         | Type        | Description
| ------------ | ------------| ------------
| `startIndex` | `Integer`   | The 1-based index of the first result in the current set of list results.
| `count`      | `Integer`   | Specifies the desired maximum number of query results per page.
| `filter`     | `String`    | `id`, `userName`, `emails.value` and `externalId` attribute Supported. Only operator `eq` is supported.

```http
GET /[project]/scim/v2/Users?filter=userName eq user@example.com
```

#### Response

```json
{
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:ListResponse"
  ],
  "totalResults": 3,
  "Resources": [
    {
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
      ],
      "id": "789",
      "externalId": 1,
      "meta": {
          "resourceType": "User",
          "location": "http://example.com/_/scim/v2/Users/789",
          "version": "W/\"fb2c131da3a58d1f32800c3179cdfe50\""
      },
      "name": {
          "familyName": "User",
          "givenName": "Admin"
      },
      "userName": "admin@example.com",
      "emails": [
          {
              "value": "admin@example.com",
              "type": "work",
              "primary": true
          }
      ],
      "locale": "en-US",
      "timezone": "Europe/Berlin",
      "active": true
    },
    {
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
      ],
      "id": "345",
      "externalId": 2,
      "meta": {
        "resourceType": "User",
        "location": "http://example.com/_/scim/v2/Users/345",
        "version": "W/\"68c210ea2la8isj2ba11d8b3b2982d\""
      },
      "name": {
        "familyName": "User",
        "givenName": "Intern"
      },
      "userName": "intern@example.com",
      "emails": [
        {
          "value": "intern@example.com",
          "type": "work",
          "primary": true
        }
      ],
      "locale": "en-US",
      "timezone": "America/New_York",
      "active": true
    },
    {
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
      ],
      "id": "123",
      "externalId": 3,
      "meta": {
        "resourceType": "User",
        "location": "http://example.com/_/scim/v2/Users/123",
        "version": "W/\"20e4fasdf0jkdf9aa497f55598c8c883\""
      },
      "name": {
        "familyName": "User",
        "givenName": "Disabled"
      },
      "userName": "disabled@example.com",
      "emails": [
        {
          "value": "disabled@example.com",
          "type": "work",
          "primary": true
        }
      ],
      "locale": "en-US",
      "timezone": "America/New_York",
      "active": false
    }
  ]
}
```

### Get SCIM User

```http
GET /[project]/scim/v2/Users/[id]
```

#### Response

```json
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:User"
  ],
  "id": "789",
  "externalId": 1,
  "meta": {
    "resourceType": "User",
    "location": "http://example.com/_/scim/v2/Users/789",
    "version": "W/\"fb2c131da3a58d1f32800c3179cdfe50\""
  },
  "name": {
    "familyName": "User",
    "givenName": "Admin"
  },
  "userName": "admin@example.com",
  "emails": [
    {
      "value": "admin@example.com",
      "type": "work",
      "primary": true
    }
  ],
  "locale": "en-US",
  "timezone": "Europe/Berlin",
  "active": true
}
```

### Create SCIM User

```http
POST /[project]/scim/v2/Users
```

#### Body

```json
{
  "schemas":["urn:ietf:params:scim:schemas:core:2.0:User"],
  "userName":"johndoe@example.com",
  "externalId":"johndoe-id",
  "name":{
    "familyName":"Doe",
    "givenName":"John"
  }
}
```

#### Response

```json
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:User"
  ],
  "id": "johndoe-id",
  "externalId": 4,
  "meta": {
    "resourceType": "User",
    "location": "http://example.com/_/scim/v2/Users/johndoe-id",
    "version": "W/\"fb2c131ad3a58d1f32800c1379cdfe50\""
  },
  "name": {
    "familyName": "Doe",
    "givenName": "John"
  },
  "userName": "johndoe@example.com",
  "emails": [
    {
      "value": "johndoe@example.com",
      "type": "work",
      "primary": true
    }
  ],
  "locale": "en-US",
  "timezone": "America/New_York",
  "active": false
}
```

### Update SCIM User

```http
PATCH /[project]/scim/v2/Users/[id]
```

#### Body

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "name": {
    "familyName": "Doe",
    "givenName": "Johnathan"
  }
}
```

#### Response

```json
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:User"
  ],
  "id": "johndoe-id",
  "externalId": 4,
  "meta": {
    "resourceType": "User",
    "location": "http://example.com/_/scim/v2/Users/johndoe-id",
    "version": "W/\"fb2c131ad3a66d1f32800c1379cdfe50\""
  },
  "name": {
    "familyName": "Doe",
    "givenName": "Johnathan"
  },
  "userName": "johndoe@example.com",
  "emails": [
    {
      "value": "johndoe@example.com",
      "type": "work",
      "primary": true
    }
  ],
  "locale": "en-US",
  "timezone": "America/New_York",
  "active": false
}
```

### List SCIM Groups

```http
GET /[project]/scim/v2/Groups
```

#### Supported Query Parameters

| Name         | Type        | Description
| ------------ | ------------| ------------
| `startIndex` | `Integer`   | The 1-based index of the first result in the current set of list results.
| `count`      | `Integer`   | Specifies the desired maximum number of query results per page.
| `filter`     | `String`    | `displayName` attribute Supported. Only operator `eq` is supported.

```http
GET /[project]/scim/v2/Groups
```

#### Response

```json
{
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:ListResponse"
  ],
  "totalResults": 3,
  "Resources": [
    {
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
      ],
      "id": "one",
      "externalId": 1,
      "meta": {
        "resourceType": "Group",
        "location": "http://example.com/_/scim/v2/Groups/one",
        "version": "W/\"7b7bc2512ee1fedcd76bdc68926d4f7b\""
      },
      "displayName": "Administrator",
      "members": [
        {
          "value": "admin@example.com",
          "$ref": "http://example.com/_/scim/v2/Users/789",
          "display": "Admin User"
        }
      ]
    },
    {
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
      ],
      "id": "two",
      "externalId": 2,
      "meta": {
        "resourceType": "Group",
        "location": "http://example.com/_/scim/v2/Groups/two",
        "version": "W/\"3d067bedfe2f4677470dd6ccf64d05ed\""
      },
      "displayName": "Public",
      "members": []
    },
    {
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
      ],
      "id": "three",
      "externalId": 3,
      "meta": {
        "resourceType": "Group",
        "location": "http://example.com/_/scim/v2/Groups/three",
        "version": "W/\"17ac93e56edd16cafa7b57979b959292\""
      },
      "displayName": "Intern",
      "members": [
        {
            "value": "intern@example.com",
            "$ref": "http://example.com/_/scim/v2/Users/345",
            "display": "Intern User"
        },
        {
            "value": "disabled@example.com",
            "$ref": "http://example.com/_/scim/v2/Users/123",
            "display": "Disabled User"
        }
      ]
    }
  ]
}
```

### Get SCIM Group

```http
GET /[project]/scim/v2/Groups/[id]
```

#### Response

```json
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:Group"
  ],
  "id": "one",
  "externalId": 1,
  "meta": {
    "resourceType": "Group",
    "location": "http://example.com/_/scim/v2/Groups/one",
    "version": "W/\"7b7bc2512ee1fedcd76bdc68926d4f7b\""
  },
  "displayName": "Administrator",
  "members": [
    {
      "value": "admin@example.com",
      "$ref": "http://example.com/_/scim/v2/Users/1",
      "display": "Admin User"
    }
  ]
}
```

### Create SCIM Group

```http
POST /[project]/scim/v2/Users
```

#### Body

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
  "displayName": "Editors",
  "externalId": "editors-id"
}
```

#### Response

```json
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:Group"
  ],
  "id": "editors-id",
  "externalId": 4,
  "meta": {
    "resourceType": "Group",
    "location": "http://example.com/_/scim/v2/Groups/editors-id",
    "version": "W/\"7b7bc2512ee1fedcd76bdc68926d4f7b\""
  },
  "displayName": "Editors",
  "members": []
}
```

### Update SCIM Group

```http
PATCH /[project]/scim/v2/Groups/[id]
```

#### Body

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
  "displayName": "Writers"
}
```

#### Response

```json
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:Group"
  ],
  "id": "editors-id",
  "externalId": 4,
  "meta": {
    "resourceType": "Group",
    "location": "http://example.com/_/scim/v2/Groups/editors-id",
    "version": "W/\"7b7bc2512ee1fedcd76bdc68926d4f7b\""
  },
  "displayName": "Writers",
  "members": []
}
```

### Delete SCIM Group

```http
DELETE /[project]/scim/v2/Groups/[id]
```

#### Response

Empty response when successful.

## Extending Endpoints

All custom endpoints defined in a extension (`pages` or `interfaces`) requires authentication.

### Interfaces

All endpoints defined in a interface will be located under the `interfaces` group.

```http
GET /[project]/interfaces/[interface-id]
```

### Pages

All endpoints defined in a page will be located under the `pages` group.

```http
GET /[project]/pages/[page-id]
```

### Custom Endpoints

All endpoints created by the user, that it's not related to any extension (`interfaces` or `pages`) will be located under the `custom` group.

::: warning
These endpoints don't require authentication. This means it has public access.
:::

```http
GET /[project]/custom/[endpoint-id]
```

## Extensions

Directus can easily be extended through the addition of several types of extensions. Extensions are important pieces of the Directus App that live in the decoupled Directus API. These include Interfaces, Layouts, and Pages. These three different types of extensions live in their own directory and may have their own endpoints.

### Get Interfaces, Layouts and Pages

These endpoints search for all enabled extensions and include the content of each extension's `meta.json` file.

```http
GET /interfaces
GET /layouts
GET /pages
```

<!--
::: tip
This is tip message
:::

::: warning
This is a warning
:::

::: danger
This is a danger Note
:::

::: danger STOP
This is danger note with a custom title
:::
-->

## Server

### Information

```http
GET /
```

Returns information about the server and API.

#### Response

```json
{
  "data": {
    "api": {
      "version": "2.0.0-rc.2"
    },
    "server": {
      "general": {
        "php_version": "7.2.1",
        "php_api": "apache2handler"
      },
      "max_upload_size": 8388608
    }
  }
}
```

### Ping

```http
GET /server/ping
```

If the server is setup correctly it will respond with `pong` as plain text.


## Project

### Information

@TODO: 

```http
GET /[project]/
```

Returns information about the server and API in relation to project.

An example could be increasing the `upload_max_size` for a specific project only.

#### Response

```json
{
  "data": {
    "api": {
      "version": "2.0.0-rc.2"
    },
    "server": {
      "general": {
        "php_version": "7.2.1",
        "php_api": "apache2handler"
      },
      "max_upload_size": 8388608
    }
  }
}
```

## Data Types

```http
GET /types
```

Returns the list of Directus data types.

## Webhooks

Webhooks allows you to send a HTTP request when an event happens.

Creating a webhook on Directus is done by creating a custom hook that makes a HTTP request.

The example below sends a `POST` request to `http://example.com/alert` every time an article is created, using the following payload:

```json
{
  "type": "article",
  "data": {
    "title": "new article",
    "body": "this is a new article"
  }
}
```

```php
<?php

return [
    'actions' => [
        // Send an alert when a post is created
        'collection.insert.articles' => function (array $data) {
            $client = new \GuzzleHttp\Client([
                'base_uri' => 'http://example.com'
            ]);

            $data = [
                'type' => 'article',
                'data' => $data
            ];

            $response = $client->request('POST', '/alert', [
                'json' => $data
            ]);
        }
    ]
];
```
