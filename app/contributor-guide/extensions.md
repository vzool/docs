# Extensions

## Types of Extensions

* [Interfaces](#interfaces)
* [Layouts](#layouts)
* [Pages](#pages)
* [Storage Adapters](#storage-adapters)
* [Auth Providers](#auth-providers)

### Interfaces

Interfaces are one of the most important aspects of Directus. Since Directus is essentially a [database wrapper](../../primer.html#database-wrapper), we know that our managed content is kept in tables (collections) with columns (fields) datatype (eg: `INT`). That takes care of storage, but if you've ever worked directly with a database you know it's not the most intuitive presentation.

Directus extends the basic functionality of each column by layering it with a graphic user interface (GUI). Let's look at an example:

Your database has a column called `background_color` using a `VARCHAR(6)` datatype. By default, Directus would show this as a text input with a max-length of any 6 characters – which works. However if you choose the _Color Palette_ interface it would instead show a grid of allowed color options. Clicking on a color would select it, and save the hex value to the database field. This helps you visualize the abstract, validate the value, and set specific options.

What makes interfaces so powerful are their options. The Color Palette interface, for example, might have options for the allowed/default color values, or whether or not to include the `#` when saving.

:::tip
For technical information, read our article on creating [Interfaces](./interfaces.md).
:::

### Layouts

Layouts are different ways to view or manage a collection's Items Browse page. Out-of-the-box there are two core layouts, List and Card. But others could be created to fit specific needs. Let's take a look some different options:

* **List** – The system default and fallback, this layout is a tabular view that will work with any type of data. It allows you to choose visible columns, sort by specific column data, reorder with drag-and-drop, and more.
* **Card** – Ideal for image-centric collections, this layout showcases an image thumbnail with some configurable text details below. It is the default for the Users and Files pages.
* **Map** – Ideal for location based data, this would show each item as a pin on a map.
* **Calendar** – Ideal for date-time based data, this would show each item as an event on a calendar.
* **Split Pan** – Similar to the List layout, instead of navigating to the Item Detail page when clicking an item, it's  opened in a right pane on the browse page. Great when you need to quickly see or manage items without losing your place.
* **Spreadsheet** – Also similar to the List layout, this view would work best with "raw" data that can easily be edited _inline_ by clicking into individual cells.
* **Chart** – This is an example of a read-only layout. Here we show the item's data presented as a configurable chart. For instance, you could then toggle between viewing Sales as a normal list and as a chart of data over time.
* **To-Do List** – Some layouts could be tailored to specific collection data or functionality. For example, a To-Do list layout might contain dedicated features to nest todos or mark them as complete.

For technical information, read our article on creating [Layouts](#).

## Pages

For technical information, read our article on creating [Pages](#).

## Storage Adapters

For technical information, read our article on creating [Storage Adapters](#).

## Auth Providers

For technical information, read our article on creating [Auth Providers](#).

## Architecture Explanation

The API is completely decoupled from the application. This means that any application can (based on the settings) connect to any API. This created an interesting thought problem regarding extensions. If you setup a field to use a particular interface for example, you expect every connected application to have and use that particular interface. If we bundled the extensions into the application codebase, this wouldn’t be possible, as it would mean that every different instance of the application would have different extensions (and thus interfaces) at it’s disposal.

By having the interfaces in the app, we ran into another problem around custom interfaces. By having the interfaces included in the application in build-time, and the fact that the application is now a self-contained SPA, it would mean that the user has to re-build the whole application each time he/her wants to add a new extension. It would also make over-the-air installations of new extensions impossible.

To solve this problem, we decided to move the extensions into the API and have them served from there when they're needed in the application. To prevent confusion (and to prevent to have to build two different loaders), we decided to have the core extensions served from the API as well.

All extensions are “just” Vue single file component(s) with a JSON file added so the application has some additional metadata.

Extension types (interfaces, pages, layouts, etc) are based on a file naming scheme. Interfaces for example always contain a `readonly` (used to statically display data) and an `interface` component (the actual “input”).

Extensions are being served in bundled form from the API. In order for the API to serve them correctly, they have to be in the `/public/extensions` folder. This folder is split up into `core` and `custom` which both have the same nested file structure. For example, the full path of the `datetime` core interface would be `/public/extensions/core/interfaces/datetime/Interface.js`.

The application is built and bundled completely separate from the extensions and the extensions have their own build-chain setup which is currently setup in the `build` folder in the directus/extensions repo. We plan on releasing this (little) build chain (including the Vue mixins for extensions) as a separate CLI tool later on, but that has to wait until after the main application is finished and released.

// TODO:

* Explain where interfaces/extensions are located, and why (api repo)
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
