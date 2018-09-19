## Extensions

To keep the core codebase as simple and clean as possible, all edge-case (80/20 rule) functionality is added through extensions. There are many different types of extensions which we'll cover below.

### Repo Location Explained

Despite being an App resource, the Directus extensions are actually stored in the API codebase and repository. This seems counter-intuitive, but is neccesary because the Directus App supports multitenancy (you can connect to multiple APIs from one App). If you install a custom interface, like a "Seating Chart", you'll want that interface to be available within your project no matter which App you connect through.

Because of this, we store all _custom_ extensions in the API Instance, and to keep things organized, we decided to also serve all core extensions from the same place.

::: tip
If you're adding a GitHub issue related to an extension, you still add it to the App since that is the logical place to discuss GUI components.
:::

### Interfaces

Interfaces customize how a field is presented to the user. For example a `STRING` datatype would be shown as a text-input by default, but an interface could instead show that as a dropdown, Map, WYSIWYG Editor, or Color Picker.

Each interface also describes how a field's data should be shown on the Browse Items page. For example, you might want to show a boolean as a `✓` or `×` instead of `true` or `false`.

[Learn more about creating and extending Directus Interfaces](#)

### Layouts

Layouts are custom designs for the Browse Items page. The core layouts are the List view (system default), which shows items in a tabular format, and a Card view (default for Users and Files) for image-based collections.

Other custom layouts include:

* **Map** – For location items
* **Calendar** – For date/time items
* **Split** – For browsing while viewing
* **Spreadsheet** – For inline editing of raw datasets
* **Chart** – For readonly data-visualization

[Learn more about creating and extending Directus Layouts](#)

### Pages

Pages handle everything not covered by Interfaces and Layouts. Pages allow anything to be built inside of Directus: custom dashboards, reports, point-of-sale systems, etc. Each page is protected within the auth gateway and can easily access instance data or global variables (eg: current user).

[Learn more about creating and extending Directus Pages](#)

### SSO Services

Users can use their Directus password to authenticate, or any enabled Single Sing-On (SSO) services. Supported services include:

* **Google** – Service's email must match user's Directus email
* **Twitter** – Service's email must match user's Directus email
* **Facebook** – Service's email must match user's Directus email
* **GitHub** – Service's email must match user's Directus email
* **Okta** – Service's email must match user's Directus email

[Learn more about adding SSO Services](#)

### Storage Adapters

Storage Adapters allow you to save Directus files anywhere. By default the system uses the filesystem adpater, but others include:

* **AWS S3** – Store files on Amazon's Simple Storage Service
* **Rackconnect** – Store files on Rackspace's storage solution

[Learn more about adding Directus Storage Adapters](#)