# Extending Directus

To keep the core codebase as simple and clean as possible, all edge-case ([80/20 rule](../feature-requests.md#80-20-rule)) functionality is added through extensions. There are many different types of extensions which we'll cover, but first let's clarify why extensions are displayed in the App but located in the API codebase.

## Architecture Explanation

Despite being an App resource, the Directus extensions are actually stored in the API codebase and repository. This seems counter-intuitive, but is neccesary because the Directus App supports multitenancy (you can connect to multiple APIs from one App). If you install a custom interface, like a "Seating Chart", you'll want that interface to be available within your project no matter which App you connect through.

Because of this, we store all _custom_ extensions in the API Instance, and to keep things organized, we decided to also serve all _core_ extensions from the same place.

::: tip Reporting Extension Issues
If you're adding a GitHub issue related to an extension, you still [add it to the App](https://github.com/directus/app/issues/new/choose) since that is the logical place to discuss GUI components.
:::

[Learn more about Extension Architecture](./architecture.md)

### Interfaces

Interfaces customize how a field is presented to the user. For example a `STRING` datatype would be shown as a text-input by default, but an interface could instead show that as a dropdown, Map, WYSIWYG Editor, or Color Picker.

Each interface also describes how a field's data should be shown on the Browse Items page. For example, you might want to show a boolean as a `✓` or `×` instead of `true` or `false`.

[Learn more about Directus Interfaces](./interfaces.md)

### Layouts

Layouts are custom designs for the Browse Items page. The core layouts are the List view (system default), which shows items in a tabular format, and a Card view (default for Users and Files) for image-based collections.

[Learn more about Directus Layouts](./layouts.md)

## Pages

Pages handle everything not covered by Interfaces and Layouts. Pages allow anything to be built inside of Directus: custom dashboards, reports, point-of-sale systems, etc. Each page is protected within the auth gateway and can easily access instance data or global variables (eg: current user).

[Learn more about Directus Pages](./pages.md)

## Hooks

[Learn more about Directus Hooks](./hooks.md)

## Custom Endpoints

[Learn more about Directus Custom Endpoints](./custom-endpoints.md)

## Storage Adapters

Storage Adapters allow you to save Directus files anywhere. The default storage adapter is the API server's filesystem, but other adapters are available for other popular options. If you need to implement a proprietary or custom option, that is possible too.

[Learn more about Directus Storage Adapters](./storage-adapters.md)

## Auth Providers

Users can use their Directus password to authenticate, or any enabled Single Sing-On (SSO) services.

[Learn more about Directus Auth Providers](./auth-providers.md)

// TODO:

* Link to Install Wiki/Docs for getting up and running
* How to create a new one (write from scratch, copy existing)
* Maybe explain that the `value` is the important variable to save to? (should be obvious, but might help)
* How to work with validation, conditionals for styling, etc
* Options! What are they? How to set them, how to fetch/use them in the code
* Include link to full styleguide (Google Doc for now)
* Maybe explain the Core components they can use? (eg: `v-input` and `v-dropdown`)
* Quick explanation of each item in meta.json
* Rules for using/including external libraries (size, how to, license, etc)
* Can they write code tests for these interfaces?
* "Building" the interfaces... is this needed? When does it happen?
* `npm` commands... for some reason aI can't find them :confused:
* End with quick info on where/how to properly submit an interface PR to us
