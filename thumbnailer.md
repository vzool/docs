# Thumbnailer

The thumbnailer is a feature of Directus that dynamically returns thumbnails upon request. To avoid a potential DDoS or other malicious activity, all thumbnail versions are whitelisted based on the configuration.

## URL Syntax

```url
https://directus.example.com/thumbnail/<project>/<width>/<height>/<action>/<quality>/<filename>
```

## Request Flow

1. A user requests a thumbnail of a specific Directus file using the URL syntax above
2. The request is routed through an .htaccess file (or nginx equivalent) to the thumbnailer that checks if the thumbnail already exists
3. If it already exists:  
    1. **The thumbnail is returned**
4. If it does _NOT_ exist  
    1. The requested size is validated against the whitelist
    2. The thumbnail is generated and saved in the filesystem
    3. **The thumbnail is returned**

As you can see, when requesting a thumbnail the end result is the same, all of the heavy-lifting happens automatically behind the scenes.

## Configuration

The whitelist is managed within the project's _Global Settings_ and are stored in the `directus_settings` collection using the `thumbnail` scope. Below are the configurable options:

* `dimensions` – An array of allowed sizes with the format: `[width]x[height]` in pixels (eg: `100x100`)
* `qualityTags` – An array of key-value-pairs where the key is the name used in the url and the value is the JPG compression (0-100) (eg: `'better' => 75`)
* `actions` – This is an array of actions, each with nested options defining specifically how the thumbnail will be created. The two predefined options are:
  * `contain` – Maintains the original aspect ratio, scaling the image to fit entirely within the dimension bounds. Any "negative space" can be filled with the `canvasBackground` color.
  * `crop` –  Scales the image to completely fill the entire dimension bounds; the aspect ratio will always match the dimensions

:::tip
Make sure the `root`, `root_url`, and `thumb_root` keys within the `filesystem` section of your project config file are set properly. Otherwise you may receive 404s instead of images.
:::

### Example Configuration

```php
// dimensions
[
  '100x100',
  '200x200',
  '100x200',
]

// qualityTags
[
  'poor' => 25,
  'good' => 50,
  'better' => 75,
  'best' => 100,
]

// actions
'contain' => [
  'options' => [
    'resizeCanvas' => false, // http://image.intervention.io/api/resizeCanvas
    'position' => 'center',
    'resizeRelative' => false,
    'canvasBackground' => 'ccc', // http://image.intervention.io/getting_started/formats
   ]
 ],
'crop' => [
  'options' => [
    'position' => 'center', // http://image.intervention.io/api/fit
   ]
]
```

## Examples

Based on the configuration above, below are a few examples that show the output of the Thumbnailer.

[Original File Used Below](./img/thumbnailer/original.jpg)<br>_602KB • 1800x1200_

### Crop Better 200x200

Using the URL `http://directus.example.com/thumbnail/_/200/200/crop/better/file-name.jpg` a thumbnail would be generated on the server's filesystem at `thumbnail/_/200/200/crop/better/file-name.jpg`. We crop the image from the previous landscape aspect-ratio to become the a square. The "better" quality has a few compression artifacts, but keeps the filesize down significantly. Below we compare all four possible qualities for a 200x200 crop to see the balance between compression and filesize:

| Poor | Good | Better | Best |
|------|------|--------|------|
| ![Poor](./img/thumbnailer/200-200-crop-poor.jpg)<br>_4KB_ | ![Good](./img/thumbnailer/200-200-crop-good.jpg)<br>_6KB_ | ![Better](./img/thumbnailer/200-200-crop-better.jpg)<br>_8KB_ | ![Best](./img/thumbnailer/200-200-crop-best.jpg)<br>_38KB_ |

:::tip
Images are never stretched or distorted even when changing the aspect ratio.
:::

## Contain Better 200x200

Now let's use the first example again, but this time with `contain` action. Now our URL is `http://directus.example.com/thumbnail/_/200/200/contain/better/file-name.jpg`, which saves the thumbnail to the server's filesystem at `thumbnail/_/200/200/contain/better/file-name.jpg`. As you can see ferom the example below, this new thumbnail has not been cropped at all... it has simply been shrunk to fit within the 200x200 bounds.

<!-- ![Contain](./img/thumbnailer/200-200-contain-better.jpg)<br>_27KB • 200x133_ -->

:::tip
You can also use the contain action with the `resizeCanvas` enabled. This would result in the same thumbnail as above but with "letterboxing" since the requested dimensions are forced and any negative space is filled with the `canvasBackground` color.
:::
