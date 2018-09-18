# API Reference

## Introduction

### Versioning

The Directus API uses [SemVer](https://semver.org/) for version labeling within the repo and for files which mention a specific version (eg: `package.json`). The API will _not_ include the version in the URL because the API is "versionless". Being versionless means that existing API behavior will not be removed or changed, only new features and enhancements will be added. Therefore, no breaking changes will ever be introduced and you can safely keep your APIs up-to-date.

### Project Prefix

All endpoints are prefixed with a project key (based on the configuration file name). The API will attempt to find a configuration file that matches the provided project key and use its settings. The underscore (`_`) is reserved as the _default_ project key.

Below are few examples of API requests when your API is located in an `/api` sub-directory:

*   `/api/_/collections` (uses the default config file `api.php`)
*   `/api/prod/items/projects` (uses "prod" config file `api.prod.php`)

::: tip NOTE
The naming format of the configuration file is `api.<project-key>.php`
:::

::: warning
A default API project (`api.php`) is required for the API to function properly.
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

The API uses HTTP status codes in addition to the message value. Everything in the 200 range is a valid response.

| Code   | Description           |
| ------ | --------------------- |
| `200`  | OK                    |
| `201`  | Created               |
| `204`  | No Content            |
| `400`  | Bad Request           |
| `401`  | Unauthorized          |
| `403`  | Forbidden             |
| `404`  | Not Found             |
| `409`  | Conflict              |
| `422`  | Unprocessable Entity  |
| `500`  | Internal Server Error |
| `503`  | Service Unavailable   |

### Error Codes

The API uses numeric codes to avoid the need for translated error messages based on locale. The `error` property is only present when an error has occurred.

#### General Error Codes

- `0000` - Internal Error (500)
- `0001` - Not Found (404)
- `0002` - Bad Request (400)
- `0003` - Unauthorized (401)
- `0004` - Invalid Request (400) (_Validation_)
- `0005` - Endpoint Not Found (404)
- `0006` - Method Not Allowed (405)
- `0007` - Too Many Requests (429)
- `0008` - API Project Configuration Not Found (404)
- `0009` - Failed Generating SQL Query (500)
- `0010` - Forbidden (403)
- `0011` - Failed to Connect to the Database (500)
- `0012` - Unprocessable Entity (422)
- `0013` - Invalid or Empty Payload (400)
- `0014` - Default Project Not Configured Properly (503)
- `0015` - Batch Upload Not Allowed (400)
- `0016` - Invalid Filesystem Path (500)
- `0017` - Invalid Configuration Path (422)
- `0018` - Project Name Already Exists (409)
- `0018` - Unauthorized Location Access (401)

#### Authentication Error Codes

- `0100` - Invalid Credentials (404)
- `0101` - Invalid Token (401)
- `0102` - Expired Token (401)
- `0103` - Inactive User (401)
- `0104` - Invalid Reset Password Token (401)
- `0105` - Expired Reset Password Token (401)
- `0106` - User Not Found (404)
- `0107` - User with Provided Email Not Found (404)
- `0108` - User Not Authenticated (401)

#### Items Error Codes

- `0200` - Collection Not Found (404)
- `0201` - Not Allow Direct Access To System Table (401)
- `0202` - Field Not Found (404)
- `0203` - Item Not Found (404)
- `0204` - Duplicate Item (409)
- `0205` - Collection Not Managed by Directus
- `0206` - Field Not Managed by Directus
- `0207` - Revision Not Found (404)
- `0208` - Revision Has Invalid Delta
- `0209` - Field Invalid (400) - _Trying to use a field that doesn't exists for actions such as filtering and sorting_
- `0210` - Can Not Create Comment for Item
- `0211` - Can Not Update Comment for Item
- `0212` - Can Not Delete Comment from Item

#### Collections Error Codes

- `0300` - Reading Items Denied (403)
- `0301` - Creating Items Denied (403)
- `0302` - Updating Items Denied (403)
- `0303` - Deleting Items Denied (403)
- `0304` - Reading Field Denied (403)
- `0305` - Updating Field Denied (403)
- `0306` - Altering Collection Denied (403)
- `0307` - Collection Already Exists (422)
- `0308` - Field Already Exists (422)
- `0309` - Unable to Find Items Owned by User (403)

#### Schema Error Codes

- `0400` - Unknown Error (500)
- `0401` - Unknown Data Type (400)

#### Mail Error Codes

- `0500` - Mailer Transport Not Found (500)
- `0501` - Invalid Transport Option (500)
- `0502` - Invalid Transport Instance (500)

#### Filesystem Error Codes

- `0600` - Unknown Error (500)
- `0601` - Uploaded File Exceeds Server's Max Upload Size (500)
- `0602` - Uploaded File Exceeds Client's Max Upload Size (500)
- `0603` - File Only Partially Uploaded (500)
- `0604` - No File Uploaded (500)
- `0605` - _Not yet defined_
- `0606` - Missing Temporary Upload Directory (500)
- `0607` - Failed to Write File to Disk (500)
- `0608` - File Upload Stopped by PHP Extension (500)

#### Utils Error Codes

- `1000` - Hasher Not Found (400)

### Validation

The API performs two types of validation on submitted data:

*   **Data Type** – The API checks the submitted value's type against the Directus or database's field type. For example, a String submitted for an INT field will result in an error.
*   **RegEx** – The API checks the submitted value against its column's `directus_fields.validation` RegEx. If the value doesn't match then an error will be returned.

## Authentication

Most endpoints are checked against permissions. If a user is not authenticated or isn’t allowed to access certain endpoints then the API will respond with either a `401 Unauthorized` or a `403 Forbidden` respectively. In addition to these status codes, the API returns a specific reason in the `error.message` field.

### Tokens

To gain access to protected data, you must include an access token with every request. There are two types of tokens.

#### Static Tokens

These optional tokens never expire and can be assigned to specific Directus users within `directus_users.token`.

#### Temporary Tokens

These tokens are generated upon the user's request and follow the [JWT spec](https://jwt.io).

The JWT token payload contains the user ID, type of token (`auth`), and an expiration date, which is signed with a secret key using the `HS256` hashing algorithm.

There are several ways to include this access token:

#### 1. Bearer Token in Authorization Header

```
curl -H "Authorization: Bearer Py8Rumu.LD7HE5j.uFrOR5" https://example.com/api/`
curl -H "Authorization: Bearer staticToken" https://example.com/api/`
```

::: warning NOTE
For security reasons Apache hides the Authorization header to prevent other scripts from seeing the credentials used to access the server. Make sure your Apache is passing the `Authentication` header. [Read more](https://httpd.apache.org/docs/2.4/en/mod/core.html#cgipassauth)
:::

#### 2. HTTP Basic Auth

```
curl -u Py8Ru.muLD7HE.5juFrOR5: https://example.com/api/
curl -u staticToken: https://example.com/api/
```

Notice that the token is `Py8Ru.muLD7HE.5juFrOR5` and has a colon `:` at the end. Using Basic auth, the auth user is the token and the auth password should be either blank or the same token.

#### 3. Query Parameter

```
curl https://example.com/api/?access_token=Py8RumuLD.7HE5j.uFrOR5
curl https://example.com/api/?access_token=staticToken
```

### Get Auth Token

Gets a token after validating the Directus user's credentials.

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

| Endpoint                         | Protected
| -------------------------------- | -----------------------
| `/[project]/`                    | **Yes**
| `/[project]/activity`            | **Yes**
| `/[project]/auth`                | No
| `/[project]/collections`         | **Yes**
| `/[project]/collection_presets`  | **Yes**
| `/[project]/custom`              | No
| `/[project]/fields`              | **Yes**
| `/[project]/files`               | **Yes**
| `/[project]/items`               | **Yes**
| `/[project]/interfaces`          | **Yes**
| `/[project]/mail`                | **Yes**
| `/[project]/pages`               | **Yes**
| `/[project]/permissions`         | **Yes**
| `/[project]/relations`           | **Yes**
| `/[project]/revisions`           | **Yes**
| `/[project]/roles`               | **Yes**
| `/[project]/scim`/v2             | **Yes**
| `/[project]/settings`            | **Yes**
| `/[project]/users`               | **Yes**
| `/[project]/utils`               | **Yes**
| `/`                              | **Yes**
| `/projects`                      | No
| `/interfaces`                    | **Yes**
| `/layouts`                       | **Yes**
| `/pages`                         | **Yes**
| `/server/ping`                   | No
| `/types`                         | **Yes**

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

The API will send an email to the requested user’s email containing a link with a short-lived reset token link. This reset token can be used to finish the password reset flow.

The reset token is a JWT token that includes the user ID, email, type (`reset_password`), and expiration time.

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

The API checks the validity of the reset token, that it hasn't expired, and that the email address contained in the token payload matches one in the database. It uses a GET request so users can access it from links within their email clients. This endpoint generates a random password for the user and sends it to their email address.

```http
GET /[project]/auth/password/reset/[reset-token]
```

### SSO

Directus supports modular Single Sign-On (SSO) authentication services, such as Google and Facebook.

#### Get SSO Services

A list of third-party SSO authentication services available for this project.

```http
GET /[project]/auth/sso
```

#### Authorization Redirect

Automatically redirects to the authorization url if the origin host is allowed by the API, otherwise it will return the authorization url.

```http
GET /[project]/auth/sso/[provider]
```

#### OAuth Authentication

When the server has authorized the user after being authenticated, it returns an `oauth_token` and `oauth_verifier` (version 1.0) or `code` (version 2.0).

```http
POST /[project]/auth/sso/[provider]
```

::: warning
This endpoint is only useful when the callback is not handled by the API. See: /[project]/auth/sso/[provider]/callback.
:::

##### Body

The user's email address and the app URL from which the reset is requested.

_OAuth 1.0_

```json
{
    "oauth_token": "[oauth-token]",
    "oauth_verifier": "[oauth-verifier]"
}
```

_Or, for OAuth 2.0:_

```json
{
    "code": "[verification-code]"
}
```

#### Callback

Set this URL as the callback for the Single Sign-On (SSO) OAuth service and it will return a "request token" that the client can use to request the access token.

```http
GET /[project]/auth/sso/[provider]/callback
```

#### Get Access Token

Using the request token that was returned by the `/[project]/auth/sso/[provider]/callback` endpoint to get the access token.

```http
POST /[project]/auth/sso/access_token
```

##### Body

```json
{
    "request_token": "<request-token>"
}
```

## Query Parameters

The API has a set of query parameters that can be used for specific actions, such as: filtering, sorting, limiting, and choosing fields. These supported query parameters are listed below:

| Name          | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `meta`        | Include metadata related to the result
| `fields`      | Include only specific fields in the result
| `limit`       | The maximum number of items in the result
| `offset`      | The results offset, in combination with `limit`
| `single`      | Returns the first item
| `sort`        | Sorting the results by one or multiple fields
| `status`      | Filter items by the provided statuses
| `filter`      | Search for items that matches the filters
| `lang`        | Include translation information
| `q`           | Search for items that matches the given string in any of their fields*
| `groups`      | Groups the items by one or more fields
| `joins`       | Joins the result with another collection using SQL Joins

### Metadata

The `meta` parameter is a CSV of metadata fields to include. This parameter supports the wildcard (`*`) to return all metadata fields.

#### Options

*   `result_count` - Number of items returned in this response
*   `total_count` - Total number of items in this collection
*   `status` - Collection item count by statuses
*   `collection` - The collection name
*   `type`
    *   `collection` If it is a collection of items
    *   `item` If it is a single item

### Fields

`fields` is a CSV of columns to include in the result. This parameter supports dot notation to request nested relational fields. You can also use a wildcard (`*`) to include all fields at a specific depth.

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

`sort` is a CSV of fields used to sort the fetched items. Sorting defaults to ascending (ASC) order but a minus sign (`-`) can be used to reverse this to descending (DESC) order. Fields are prioritized by their order in the CSV. You can also use a `?` to sort randomly.

#### Examples

*   `sort=?` Sorts randomly
*   `sort=name` Sorts by `name` ASC
*   `&sort=name,-age` Sorts by `name` ASC, followed by `age` DESC
*   `sort=name,-age,?` Sorts by `name` ASC, followed by `age` DESC, followed by random sorting

### Status

@TODO

### Filtering

Used to search items in a collection that matche the filter's conditions. Filters follow the syntax `filter[<field-name>][<operator>]=<value>`. The `field-name` supports dot-notation to filter on nested relational fields.

#### Filter Operators

| Operator             | Description                            |
| -------------------- | -------------------------------------- |
| `=`, `eq`            | Equal to                               |
| `<>`, `!=`, `neq`    | Not equal to                           |
| `<`, `lt`            | Less than                              |
| `<=`, `lte`          | Less than or equal to                  |
| `>`, `gt`            | Greater than                           |
| `>=`, `gte`          | Greater than or equal to               |
| `in`                 | Exists in one of the values            |
| `nin`                | Not in one of the values               |
| `null`               | It is null                             |
| `nnull`              | It is not null                         |
| `contains`, `like`   | Contains the substring                 |
| `ncontains`, `nlike` | Doesn't contain the substring          |
| `between`            | The value is between two values        |
| `nbetween`           | The value is not between two values    |
| `empty`              | The value is empty (null or falsy)     |
| `nempty`             | The value is not empty (null or falsy) |
| `all`                | Contains all given related item's IDs  |
| `has`                | Has one or more related items's IDs    |

#### AND vs OR

By default, all chained filters are treated as ANDs, which means _all_ conditions must match. To create an OR combination, you can add the `logical` operator, as shown below:

```
GET /items/projects?filter[category][eq]=development&filter[title][logical]=or&filter[title][like]=design
```

::: tip
In many cases, it makes more sense to use the `in` operator instead of going with the logical-or. For example, the above example can be rewritten as

```
GET /items/projects?filter[category][in]=development,design
```

:::

#### Filtering by Dates and Times

The format for date is `YYYY-MM-DD` and for datetime is `YYYY-MM-DD HH:MM:SS`. This formats translate to `2018-08-29 14:51:22`.

- Year in `4` digits
- Months, days, minutes and seconds in two digits, adding leading zero padding when it's a one digit month
- Hour in 24 hour format

@TODO: Implemented soon

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

The `lang` parameter is a CSV of languages that should be returned with the response. This parameter can only be used when a Translation field has been included in the collection. This parameter supports the wildcard (`*`) to return all language translations.

### Search Query

The `q` parameter allows you to perform a search on all `string` and `number` type fields within a collection. It's an easy way to search for an item without creating complex field filters – though it is far less optimized. It only searches the root item's fields, related item fields are not included.

### Groups

The `groups` parameter allows grouping the result by one or more fields.

#### Examples

* `groups=id,name` Groups the result by `id` and `name` fields

### Joins

The `joins` parameter allows joining items from another collection to the main result.

#### Examples

@TODO: Add examples and useful examples behind this feature

## Items

Items are essentially individual database records which each contain one or more fields (database columns). Each item belongs to a specific collection (database table) and is identified by the value of its primary key field. In this section we describe the different ways you can manage items.

This endpoint is dedicated to all user-defined collections only. Accessing system tables is forbidden. See [Systems Endpoints](#system) for more information.

### Create Items

Creates one or more items in a given collection.

```http
POST /[project]/items/[collection-name]
```

#### Body

A single item or an array of multiple items to be created. Field keys must match the collection's column names.

```json
{
    "title": "Project One",
    "category": "Design"
}
```

_Or, for batch creating multiple items:_

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
The API may not return any data for successful requests if the user doesn't have adequate read permission. Instead, `204 NO CONTENT` is returned.
:::

### Get Item

Get a single item from a given collection using its primary key (PK).

```http
GET /[project]/items/[collection-name]/[pk]
```

#### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `status`      |
| `lang`        |

#### Examples

*   Return the project item with an primary key of `1`
    ```bash
    curl -u <token>: https://api.directus.io/_/items/projects/1
    ```

### Get Multiple Items

Get multiple items from a given collection using their primary keys (PK).

```http
GET /[project]/items/[collection-name]/[pk1],[pk2],[pk3]
```

#### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `status`      |
| `lang`        |

#### Examples

*   Return project items with primary keys of `1`, `3`, `11`
    ```bash
    curl -u <token>: https://api.directus.io/_/items/projects/1,3,11
    ```

### Get Items

Get an array of items within a given collection.

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

Get a specific revision of an item. This endpoint uses a zero-based offset to select a revision, where `0` is the creation revision. Negative offsets are allowed, and select as if `0` is the current revision.

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

### Update Item

Update or replace a single item from a given collection.

@TODO LOOK INTO ALLOWING FILTER PARAM FOR UPDATES, EG: `PUT /[project]/items/projects?filter[title][eq]=title`

```http
PATCH /[project]/items/[collection-name]/[pk]
```

::: warning

*   **PATCH** partially updates the item with the provided data, any missing data is ignored

:::

#### Body

A single item to be updated. Field keys must match the collection's column names.

#### Examples

*   Return the project item with an primary key of `1`
    ```bash
    curl -u <token>: -d "title=new title" https://api.directus.io/_/items/projects/1
    ```

### Update Items

Update multiple items in a given collection.

```http
PATCH /[project]/items/[collection-name]
PATCH /[project]/items/[collection-name]/[pk1],[pk2],[pk3],...
```

::: warning PATCH

*   **PATCH** partially updates the item with the provided data, any missing data is ignored

:::

::: danger WARNING
Batch updating can quickly overwrite large amounts of data. Please be careful when implementing this request.
:::

#### Body

Update multiple items with the same data: `PATCH /items/projects/1,2`


```json
{
  "title": "Unknown Title"
}
```

Update multiple items, each with its dataset: `PATCH /items/projects`. Each item requires a primary key fields to identify to which item the dataset belongs.


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

Reverts an item to a previous revision state.

```http
PATCH /[project]/items/[collection-name]/[item-pk]/revert/[revision-id]
```

#### Body

There is no need for a body with this request.

#### Examples

*   Revert the project item (PK:`1`) to its previous state in revision (PK:`2`)
    ```bash
    curl -u <token>: https://api.directus.io/_/items/projects/1/revert/2
    ```

### Delete Items

Deletes one or more items from a specific collection. This endpoint also accepts CSV of primary key values, and would then return an array of items.

```http
DELETE /[project]/items/[collection-name]/[pk]
DELETE /[project]/items/[collection-name]/[pk1],[pk2],[pk3],...
```

::: danger WARNING
Batch Delete can quickly destroy large amounts of data. Please be careful when implementing this request.
:::

## System

@TODO These endpoints need the same reference as listed above

All system tables (`directus_*`) are blocked from being used through the regular `/items` endpoint to prevent security leaks or because they require additional processing before sending to the end user. This means that any requests to `/items/directus_*` will always return `401 Unauthorized`.

These system endpoints still follow the same spec as a “regular” `/items/[collection-name]` endpoint but require the additional processing outlined below:

### Activity

#### Activity Actions

| Name           | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `authenticate` | User authenticated using credentials                       |
| `comment`      | Comment was added to an item                               |
| `upload`       | File was created                                           |
| `create`       | Item was created                                           |
| `update`       | Item was updated                                           |
| `delete`       | Item was deleted                                           |
| `soft-delete`  | Item was soft-deleted. Updated to a soft-deleted status    |
| `revert`       | Item was updated using a revision's data                   |

#### Get Activity

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

Get one or more specific activity events.

```http
GET /[project]/activity/[id]
GET /[project]/activity/[id1],[id2],[id3],...
```

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `status`      |
| `lang`        |

#### Create Comment

Create a new comment on an item. Each comment must include the item primary key and its parent collection name.

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

Update a comment by its ID.

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

Delete a comment by its ID.

```http
DELETE /[project]/activity/comment/[id]
```

### Collections

These endpoints are used for creating, reading, updating, and deleting collections. Similar to `/fields`, it alters the database schema directly as needed.

#### Create Collection

Creates a new collection.

```http
POST /[project]/collections
```

In the top-level object, the `collection` field is required.

In the `fields` list, `field`, `type`, and `interface` are required.

The `datatype` (database vendor specific) may also be required if the `type` supports different datatypes. For example, the `primary_key` type supports both _string_ and _number_, so it is also required to set the `datatype` to a numeric or string datatype.

When `type` requires a length, such as a string or numeric, a `length` attribute is required.

```json
{
    "collection": "projects",
    "item_name_template": null,
    "managed": true,
    "hidden": false,
    "single": false,
    "translation": null,
    "note": "This collection will store all of our projects",
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

#### Get Collections

Returns a list of all collections in the database.

```http
GET /[project]/collections
```

#### Get Collection

Returns the details of a single collection.

```http
GET /[project]/collections/[name]
```

#### Update Collection

Adds new fields, updates existing fields, and manages the other details of a given collection.

```http
PATCH /[project]/collections/[name]
```

```json
{
    "note": "This collection stores all of our client projects",
    "fields": [
        {
            "field": "title",
            "length": 128
        }
    ]
}
```

::: danger WARNING
Updating field names, can break existing API endpoints and changing field length/type can result in a loss of data. Please be careful when implementing this request.
:::

#### Delete Collection

Permanently deletes a collection information, the table and all its contents.

```http
DELETE /[project]/collections/[name]
```

:::warning
Deleting a collection removes the actual table and any records therein from the database permanently. Please proceed with extreme caution.
:::

### Collection Presets

These endpoints are used for creating, reading, updating, and deleting collection presets.

#### Create Collection Preset

Creates a new collection preset.

```http
POST /[project]/collection_presets
```

#### Get Collection Presets

Returns a list of collection presets.

```http
GET /[project]/collection_presets
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

#### Get Collection Preset

Returns the details of one or more collection presets.

```http
GET /[project]/collection_presets/[id]
GET /[project]/collection_presets/[id1],[id2],[id3],...
```

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Update Collection Preset

Updates the details of one or more collection presets.

```http
PATCH /[project]/collection_presets
PATCH /[project]/collection_presets/[id]
PATCH /[project]/collection_presets/[id1],[id2],[id3],...
```

#### Delete Collection Preset

Permanently deletes a collection_presets.

```http
DELETE /[project]/collection_presets/[id]
DELETE /[project]/collection_presets/[id1],[id2],[id3],...
```

::: danger WARNING
Batch Delete can quickly destroy large amounts of data. Please be careful when implementing this request.
:::

### Fields

These endpoints are used for creating, reading, updating, and deleting fields within a collection. It alters the database schema directly as needed.

#### Create Field

Creates a new field in a given collection.

```http
POST /[project]/fields/[collection]
```

```json
{
  "field": "description",
  "type": "text",
  "interface": "textarea"
}
```

#### Get Fields

Returns the list of all fields that belongs to a given collection.

```http
GET /[project]/fields/[collection]
```

#### Get Field

Returns the details of a single field.

```http
GET /[project]/fields/[collection]/[field]
```

#### Update Field

Updates the details of a given field.

```http
PATCH /[project]/fields/[collection]/[field]
```

```json
{
  "required": true
}
```

#### Delete Field

Permanently deletes a field and its content.

```http
DELETE /[project]/fields/[collection]
```

:::warning
Deleting a field removes the actual column and any data therein from the database permanently. Please proceed with extreme caution.
:::

### Files

These endpoints are used for uploading, updating, and deleting files and virtual folders.

#### Upload File

Uploads or creates a new file.

```http
POST /[project]/files
```

There are two ways to upload a file:

##### Using Base64 Content

Using passing the base64 file contents to the `data` field.

```json
{
  "filename": "image.jpg",
  "data": "<base64-content>"
}
```

##### Using `multipart/form-data` Content Type

Passing the file form-data to the `data` field when making the `multipart/form-data` `POST` request.

This allows for easier uploading of files when using an HTML form element with the `enctype` (encoding type) set to `multipart/form-data`.

#### Get Files

Returns a list of files.

```http
GET /[project]/files
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

#### Get File

Returns the details of one or more files.

```http
GET /[project]/files/[id]
GET /[project]/files/[id1],[id2],[id3],...
```

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Update File

Replaces a file or updates its details.

```http
PATCH /[project]/files/[id]
```

```json
{
  "data": "<base64-content>",
  "description" : "new description"
}
```

#### Update Multiple Files

Replaces several files, or updates their details.

```http
PATCH /[project]/files
PATCH /[project]/files/[id1],[id2],[id3],...
```

##### Different Data

Each file object requires the `id` field to identify which record the new data will belongs to.

```
PATCH /_/files
```

```json
[{
  "id": 1,
  "data": "<base64-content>",
  "description" : "New Description"
}, {
  "id": 2,
  "title" : "New Title"
}]
```

##### Same Data

```
PATCH /_/files/1,2,3
```

```json
{
  "tags": ["marketing", "2017"]
}
```

#### Delete File

Permanently deletes one or more files from the filesystem and database.

```http
DELETE /[project]/files/[id]
DELETE /[project]/files/[id1],[id2],[id3],...
```

::: danger WARNING
Batch Delete can quickly destroy large amounts of data. Please be careful when implementing this request.
:::

#### Get File Revisions

Returns a list of file's revisions.

```http
GET /[project]/files/[id]/revisions
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
| `q`           |
| `groups`      |
| `joins`       |

#### Get File Revision

```http
GET /[project]/files/[id]/revisions/[offset]
```

Returns the revisions of a file using a 0-index based offset.

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

### Folders

These endpoints are used for creating, reading, updating, and deleting virtual folders.

#### Create Folder

Creates a new virtual folder.

```http
POST /[project]/files/folders
```

```json
{
  "name": "Christmas 2017",
  "parent_folder": null
}
```

#### Get Folders

Returns a list of virtual folders.

```http
GET /[project]/files/folders
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

#### Get Folder

Returns the details of one or more virtual folders.

```http
GET /[project]/files/folders/[id]
GET /[project]/files/folders/[id1],[id2],[id3],...
```

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Update Folder

Updates the details of a given virtual folder.

```http
PATCH /[project]/files/folders/[id]
```

```json
{
  "name": "Christmas Photos 2017"
}
```

#### Delete Folder

Permanently deletes one or more virtual folders.

```http
DELETE /[project]/files/[id]
DELETE /[project]/files/[id1],[id2],[id3],...
```

:::warning
This is not a recurrsive delete. As of now, any sub-folders and files are left orphaned in the heirarchy. Be sure to empty a virtual folder before deleting it.
:::

### Permissions

These endpoints are used for creating, reading, updating, and deleting permissions.

#### Create Permission

Creates one or more permissions.

```http
POST /[project]/permissions
```

##### Body

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

_Or, for multiple permissions:_

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

#### Get Permissions

Returns a list of permissions.

```http
GET /[project]/permissions
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

#### Get Permission

Returns the details of one or more permissions.

```http
GET /[project]/permissions/[id]
GET /[project]/permissions/[id1],[id2],[id3],...
```

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Get My Permissions

Returns all permissions belonging to the currently authenticated user.

```http
GET /[project]/permissions/me
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

#### Get My Collection Permissions

Returns a collection's permissions belonging to the currently authenticated user.

```http
GET /[project]/permissions/me/[collection-name]
```

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Update Permission

Updates the details of one or more permissions.

```http
PATCH /[project]/permissions
PATCH /[project]/permissions/[id]
PATCH /[project]/permissions/[id1],[id2],[id3],...
```

##### Examples

```http
PATCH /_/permissions/1
```

```json
{
  "create": "none"
}
```

_Or, for multiple permissions with the same data:_

```http
PATCH /_/permissions/1,2,3
```

```json
{
  "create": "none",
  "delete": "none"
}
```

_Or, for multiple permissions with different data:_

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

#### Delete Permission

Permanently deletes one or more permissions.

```http
DELETE /[project]/permissions/[id]
DELETE /[project]/permissions/[id1],[id2],[id3],...
```

::: danger WARNING
Batch Delete can quickly destroy large amounts of data. Please be careful when implementing this request.
:::

### Relations

These endpoints are used for creating, reading, updating, and deleting collection relations.

#### Create Relation

Creates one or more relations.

```http
POST /[project]/relations
```

##### Examples

```json
{
  "collection_many": "projects",
  "field_many": "author",
  "collection_one": "directus_users",
  "field_one": null
}
```

_Or, for multiple relations:_

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

#### Get Relations

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

#### Get Relation

Returns the details of one or more relations.

```http
GET /[project]/relations/[id]
GET /[project]/relations/[id1],[id2],[id3],...
```

##### Supported Query Parameters

| Name          |
| ------------- |
| `fields`      |
| `meta`        |
| `joins`       |

#### Update Relation

Updates the details of one or more relations.

```http
PATCH /[project]/relations
PATCH /[project]/relations/[id]
PATCH /[project]/relations/[id1],[id2],[id3],...
```

##### Examples

```http
PATCH /_/relations/1
```

```json
{
  "field_one": "projects"
}
```

_Or, for multiple relations with the same data:_

```http
PATCH /_/relations/1,2
```

```json
{
  "field_one": null
}
```

_Or, for multiple relations with different data:_

```http
PATCH /_/relations
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

Permanently deletes one or more relations.

```http
DELETE /[project]/relations/[id]
DELETE /[project]/relations/[id1],[id2],[id3],...
```

::: danger WARNING
Batch Delete can quickly destroy large amounts of data. Please be careful when implementing this request.
:::

### Revisions

These endpoints are used for fetching one or more revisions.

#### Get Revisions

Get a list of all revisions.

```http
GET /[project]/revisions
```

#### Get Revisions

Get the details of one or more revisions by their ID.

```http
GET /[project]/revisions/[id]
GET /[project]/revisions/[id1],[id2],[id3],...
```

### Roles

These endpoints are used for creating, reading, updating, and deleting roles.

#### Create Role

Creates one or more roles.

```http
POST /[project]/roles
```

::: warning NOTE
Directus is also compatible with _System for Cross-domain Identity Management_ (SCIM) protocol. All roles have an `external_id` to link each with the external system, these must be unique within Directus. Directus will automatically generate a UUID (v4) if this field is left blank when creating a role.
:::

```json
{
  "name": "Interns"
}
```

_Or, to create multiple at once:_

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

#### Get Roles

Returns a list of roles.

```http
GET /[project]/roles
```

#### Get Role

Returns the details of one or more roles.

```http
GET /[project]/roles/[id]
GET /[project]/roles/[id1],[id2],[id3],...
```

#### Update Role

Updates the details of one or more roles.

```http
PATCH /[project]/roles
PATCH /[project]/roles/[id]
PATCH /[project]/roles/[id1],[id2],[id3],...
```

##### Examples

_To update a single role:_

```http
PATCH /_/roles/3
```

###### Body

```json
{
  "description": "new description"
}
```

_Or, to update multiple with the same data:_

```http
PATCH /_/roles/1,2,3
```

###### Body

```json
{
  "ip_whitelist": "10.0.0.1,127.0.0.1"
}
```

_Or, to update multiple with different data:_

```http
PATCH /_/roles
```

###### Body

```json
[{
  "id": 1,
  "ip_whitelist": "10.0.0.1"
}, {
  "id": 2,
  "ip_whitelist": "127.0.0.1"
}]
```

#### Delete Role

Permanently deletes one or more roles.

```http
DELETE /[project]/roles/[id]
DELETE /[project]/roles/[id1],[id2],[id3],...
```

::: danger WARNING
Batch Delete can quickly destroy large amounts of data. Please be careful when implementing this request.
:::

### Settings

These endpoints are used for creating, reading, updating, and deleting the general settings.

#### Create Setting

Creates one or more settings.

```http
POST /[project]/settings
```

#### Get Settings

Returns the list of settings.

```http
GET /[project]/settings
```

#### Get Setting

Returns the details of one or more settings.

```http
GET /[project]/settings/[id]
GET /[project]/settings/[id1],[id2],[id3],...
```

#### Update Setting

Updates the details of one or more settings.

```http
PATCH /[project]/settings
PATCH /[project]/settings/[id]
PATCH /[project]/settings/[id1],[id2],[id3],...
```

#### Delete Setting

Permanently deletes one or more settings.

```http
DELETE /[project]/settings/[id]
DELETE /[project]/settings/[id1],[id2],[id3],...
```

::: danger WARNING
Batch Delete can quickly destroy large amounts of data. Please be careful when implementing this request.
:::

### Users

#### Create User

Creates a new Directus user within this project.

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

Returns a list of Directus users within this project.

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

Get a list of Directus users.

```bash
curl -u <token>: https://api.directus.io/_/users
```

#### Get User

Gets a single user from within this project.

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

#### Update User

Updates a Directus User.

```http
PATCH /[project]/users/[id]
```

@TODO DO WE WANT TO SUPPORT CSV OF PKs HERE TOO?

:::tip NOTE
**PATCH** will partially update the item with the provided data, any missing fields will be ignored.
:::

##### Body

An [User Object](#). Fields names must match column names within `directus_users` collection.

#### Delete User

Deletes one or more users from this project.

```http
DELETE /[project]/users/[id]
DELETE /[project]/users/[id1],[id2],[id3],...
```

::: tip NOTE
Instead of deleting a user, you should instead soft-delete them (update their `status` to "suspended" or "deleted") to maintain accountability relations with the `directus_users.id`. Only hard-delete if the user was created in error and never used.
:::

::: danger WARNING
Batch Delete can quickly destroy large amounts of data. Please be careful when implementing this request.
:::

#### Invite User

Invites one or more users to this project. It creates a user with an `invited` status, and then sends an email to the user with instructions on how to activate their account.

```http
POST /[project]/users/invite
```

The API will generate and send a JWT token inside the email for this specific request. The payload contains the following data:

- `type`: The token type, always set to `invitation`.
- `date`: The datetime when the token was generated.
- `exp`: The expiration datetime of the token.
- `email`: The email of the user that will receive the invitation.
- `sender`: The ID of the user that sends the invitation.

##### Body

A single email or list of emails to send invites to.

```json
{
    "email": "rijk@directus.io"
}
```

_Or, to invite multiple users:_

```json
{
  "email": [
    "rijk@directus.io",
    "welling@directus.io",
    "ben@directus.io"
  ]
}
```

#### Accept User Invitation

Accepts and enables an invited user using a JWT invitation token.

```http
POST /[project]/users/invite/[token]
```

#### Track User

Sets the last accessed page/datetime of the Directus App. This information is used to determine if the user is still logged into the Directus App and to warn when multiple users are editing the same item.

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

Returns a list of revisions of a user.

```http
GET /[project]/users/[id]/revisions
```

#### Get User Revision

Returns a single revision of an user using a 0-index based offset.

```http
GET /[project]/users/[id]/revisions/[offset]
```

## Utilities

| Available Hashers |
| ----------------- |
| `core`            |
| `bcrypt`          |
| `sha1`            |
| `sha224`          |
| `sha256`          |
| `sha384`          |
| `sha512`          |

The default `hasher` is `core` which uses the `password_hash` function and the PHP default algorthim defined by `PASSWORD_DEFAULT`.

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

Returns a randomly generated alphanumeric string.

```http
POST /[project]/utils/random/string
```

#### Body

| Name   | Default | Description                  |
| ------ | ------- | ---------------------------- |
| length | 32      | Length of string to generate |

## Mail

### Send Email

Send an email to one or more recipients.

```http
POST /[project]/mail
```

#### Body

```json
{
  "to": [
    1,
    "user@example.com",
    2,
    {"email": "intern@example.com", "name": "Jane Doe"}
  ],
  "subject": "New Password",
  "body": "Hello <b>{{name}}</b>, this is your new password: {{password}}.",
  "type": "html",
  "data": {
    "user": "John Doe",
    "password": "secret"
  }
}
```

## Extensions

Directus can easily be extended through the addition of several types of extensions. Extensions are and important part of the Directus App that live within the decoupled Directus API. These extensions include: Interfaces, Layouts, and Pages. These three different types of extensions live in their own directory and may have their own endpoints. All custom endpoints defined in extensions (`pages`, `interfaces`, etc) require authentication.

### Get Extensions

These endpoints search for different types of enabled extensions and include the content of each extension's `meta.json` file.

```http
GET /interfaces
GET /layouts
GET /pages
```

### Get Interface

All endpoints defined in an interface will be located within the `interfaces` group.

```http
GET /[project]/interfaces/[interface-id]
```

### Get Page

All endpoints defined in a page will be located within the `pages` group.

```http
GET /[project]/pages/[page-id]
```

### Get Custom Endpoint

All custom endpoints that are not related to an extension will be located under the `custom` group.

::: warning
These endpoints do not require authentication, and are therefore publically accessible.
:::

```http
GET /[project]/custom/[endpoint-id]
```

## Server

A server is comprised of the OS, HTTP server, PHP, and an instance of the Directus API.

### Information

Returns information about the server and API instance.

```http
GET /
```

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

If the server is setup correctly it will respond with `pong` as plain text.

```http
GET /server/ping
```

## Projects

Each instance of Directus can manage multiple projects. A project is comprised of a dedicated SQL database, a config file, and any storage directories.

### Information

Returns information about the server and API instance in relation to project.

```http
GET /[project]/
```

An example would be if `upload_max_size` has been increased only for a single project within this API instance.

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

### Create Project

Create a new project (database and config file) to be managed by this API instance.

```http
POST /projects
```

#### Body

| Attribute       | Description                            | Required
| --------------- | -------------------------------------- | ---------
| `project`       | The project key. Default: `_`          | No
| `force`         | Force the installation                 | No
| `db_type`       | Database type. Only `mysql` supported  | No
| `db_host`       | Database host. Default: `localhost`    | No
| `db_port`       | Database port. Default: `3306`         | No
| `db_name`       | Database name                          | Yes
| `db_user`       | Database user name                     | Yes
| `db_password`   | Database user password                 | No
| `user_email`    | Directus Admin email                   | Yes
| `user_password` | Directus Admin password                | Yes
| `user_token`    | Directus Admin token. Default: `null`  | No
| `mail_from`     | Default mailer `from` email            | No
| `project_name`  | The project name. Default: `Directus`  | No
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

## Field Types

Returns the list of Directus field types.

```http
GET /types
```

## Webhooks

Webhooks allow you to send an HTTP request when a specific event occurs. Creating a webhook in Directus is done by creating a custom hook that makes an HTTP request.

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
        // Send an alert when a article is created
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

## Directus Objects

A list of all system objects expected or returned by Directus endpoints.

### Activity Object

| Key                   |  Type             | Description                               |
| --------------------- | ----------------- | ----------------------------------------- |
| `id`                  | `integer`         |                                           |
| `action`              | `string`          |                                           |
| `action_by`           | `integer`,`User`  |                                           |
| `action_on`           | `timestamp`       |                                           |
| `ip`                  | `string`          |                                           |
| `user_agent`          | `string`          |                                           |
| `collection`          | `string`          |                                           |
| `item`                | `string`          |                                           |
| `edited_on`           | `timestamp`       |                                           |
| `comment`             | `string`          |                                           |
| `comment_deleted_on`  | `timestamp`       |                                           |

### Activity Seen Object

| Key                   |  Type                 | Description                               |
| --------------------- | --------------------- | ----------------------------------------- |
| `id`                  | `integer`             |                                           |
| `activity`            | `integer`, `Activity` |                                           |
| `user`                | `integer`,`User`      |                                           |
| `seen_on`             | `timestamp`           |                                           |
| `archived`            | `boolean`             |                                           |

### Collection Object

| Key                   |  Type                | Description                               |
| --------------------- | -------------------- | ----------------------------------------- |
| `collection`          | `string`             |                                           |
| `managed`             | `boolean`            |                                           |
| `hidden`              | `boolean`            |                                           |
| `single`              | `boolean`            |                                           |
| `translation`         | `json`               |                                           |
| `note`                | `string`             |                                           |
| `icon`                | `string`             |                                           |

### Collection Preset Object

| Key                   |  Type                | Description                               |
| --------------------- | -------------------- | ----------------------------------------- |
| `id`                  | `integer`            |                                           |
| `title`               | `string`             |                                           |
| `user`                | `integer`,`User`     |                                           |
| `role`                | `integer`, `Role`    |                                           |
| `collection`          | `string`             |                                           |
| `search_query`        | `string`             |                                           |
| `filters`             | `json`               |                                           |
| `view_type`           | `string`             |                                           |
| `view_query`          | `json`               |                                           |
| `view_options`        | `json`               |                                           |
| `translation`         | `json`               |                                           |

### Field Object

| Key                   |  Type                  | Description                               |
| --------------------- | ---------------------- | ----------------------------------------- |
| `id`                  | `integer`              |                                           |
| `collection`          | `string`, `Collection` |                                           |
| `field`               | `string`               |                                           |
| `type`                | `string`               |                                           |
| `interface`           | `string`               |                                           |
| `options`             | `json`                 |                                           |
| `locked`              | `boolean`              |                                           |
| `translation`         | `json`                 |                                           |
| `readonly`            | `boolean`              |                                           |
| `required`            | `boolean`              |                                           |
| `sort`                | `integer`              |                                           |
| `view_width`          | `integer`              |                                           |
| `note`                | `string`               |                                           |
| `hidden_input`        | `boolean`              |                                           |
| `validation`          | `string`               |                                           |
| `hidden_list`         | `boolean`              |                                           |
| `group`               | `integer`              |                                           |

### File Object

### Folder Object

### Permission Object

### Relation Object

### Revision Object

### Role Object

### Setting Object

### User Object

### User Role Object

## SCIM

Directus partially supports Version 2 of System for Cross-domain Identity Management (SCIM). It is an open standard that allows for the exchange of user information between systems, therefore allowing users to be created, managed, and disabled outside of Directus.

### Overview

| Endpoint       | Methods                         |
| -------------- | ------------------------------- |
| `/Users`       | `GET`, `POST`                   |
| `/Users/[id]`  | `GET`, `PUT`, `PATCH`           |
| `/Groups`      | `GET`, `POST`                   |
| `/Groups/[id]` | `GET`, `PUT`, `PATCH`, `DELETE` |

Learn more within the "SCIM Endpoints and HTTP Methods" section of [RFC7644](https://tools.ietf.org/html/rfc7644#section-3.2).

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

### Get SCIM Users

```http
GET /[project]/scim/v2/Users
```

#### Supported Query Parameters
| Name         | Type        | Description
| ------------ | ------------| ------------
| `startIndex` | `Integer`   | The 1-based index of the first result in the current set of list results.
| `count`      | `Integer`   | Specifies the desired maximum number of query results per page.
| `filter`     | `String`    | `id`, `userName`, `emails.value` and `externalId` attributes are supported. Only the `eq` operator is supported.

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

### Get SCIM Groups

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

Response is empty when successful.