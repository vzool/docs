# Translations

Directus uses the [vue-i18n](https://github.com/kazupon/vue-i18n) plugin to manage the translations across the platform. The language files and the init code are located in the `/src/lang/` folder of the app repo. The plugin contains a [bunch of methods](https://kazupon.github.io/vue-i18n/) to render these translations.

The one that's most often used is `$t`:

```vue
<p>{{ $t('collections') }}</p>
```

## Translations in extensions

Extensions can provide their own translations if there aren't any useful ones in the core app. The `meta.json` file of the extension has a `translation` key that allows you to add new translations for use in the system. 

```json
"translation": {
  "en-US": {
    "color": "Color",
    "input": "Input",
    "input_comment": "The unit in which the user will enter the data",
    "output": "Output",
    "output_comment": "The unit in which the data gets saved to the DB",
    "format": "Format",
    "format_comment": "Show value as color swatch",
    "palette": "Palette",
    "palette_comment": "Add color options as hex values",
    "palette_only": "Palette Only",
    "palette_only_comment": "Only allow the user to pick from the palette",
    "allow_alpha": "Allow alpha",
    "allow_alpha_comment": "Allow values with an alpha channel"
  }
}
```

The translations in extensions are namespaced to avoid conflicts between packages (/ the main app). The namespace is `<ext-type>-<name>-<string>`. The above example is of the color interface. To use those translations, you have to use `$t('interfaces-color-palette_only')`.

You can even use the translations in the `meta.json` to translate values _in_ that same `meta.json` key. So meta! This is especially useful to add translatable names for the extension and it's options.

## Title formatter

Most (raw) values in Directus are being displayed in title case. We try to prevent showing users raw (db) names like `image_gallery`, instead we want to show "Image Gallery". This formatter function is available to all Vue components. The function is available in the `$helper` directive with the method name `formatTitle`:

```js
this.$helpers.formatTitle("hello_world"); // Hello World
this.$helpers.formatTitle("iphone_storageSolution"); // iPhone Storage Solution
```

This function is alternatively available as a stand-alone npm package: [@directus/format-title](https://npmjs.com/@directus/format-title).
