# Global Settings

These are the Core key-value-pairs within `directus_settings`.

Scope     | Key             | Description
--------- | --------------- | -----------------------------------------------------------------------------
`global`    | `project_name`    | The title of the project
`global`    | `auto_sign_out`   | Seconds until the auth token to expire after creation
`global`    | `default_limit`   | Number of items per request
`global`    | `logo`            | The project image logo url
`global`    | `sort_null_last`  | Set the null values at last when sorting. Default `1`.
`files`     | `file_naming`     | Naming for uploaded files. `id`, `uuid`, otherwise the original sanitized name. Replacing spaces with `_` (underscore) and leading `.` (dots) with `dot-`.
`files`     | `youtube_api_key` | Youtube API key used by to fetch video information when upload a youtube link
`thumbnail` | `not_found_location` | This image will be used when trying to generate a thumbnail with invalid options or an error happens on the server trying to create the image) | Returns 404
`thumbnail` | `dimensions`      | Comma separate value of dimensions in [width]x[height] format | 200x200
`thumbnail` | `quality_tags`    | Key-Value json string of qualities tagged with a name. Ex: `{"best": 100}`. Ranging from 0 to 100. 0 = Worst quality and smaller file size to 100 best quality biggest file size. | `{"poor": 25, "good": 50, "better":  75, "best": 100}`
`thumbnail` | `actions`         | **WIP**; List options to perform different thumbnail generation actions. | `contain` and `crop`
`thumbnail` | `cache_ttl`       | Cache time to live in seconds. It sets HTTP `max-age` and `Expires` datetime. Default: `86400` seconds = 1 day

 **NOTE**: The file naming `uuid`, uses UUID v5, and `6ba7b810-9dad-11d1-80b4-00c04fd430c8` as the namespace DNS. A constant value defined in [ramsey/uuid](https://github.com/ramsey/uuid/blob/5cadea8447ea1734b66e402aeb1a1739957d59f6/src/Uuid.php#L44) package.