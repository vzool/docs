# Extensions

## Types of Extensions

* [Interfaces](./interfaces.md)
* Layouts
* Pages
* Storage Adapters
* Auth Providers

## Introduction

The API is completely decoupled from the application. This means that any application can (based on the settings) connect to any API. This created an interesting thought problem regarding the extensions. If you setup a field to use a particular interface for example, you expect every connected application to see and use that particular interface. By bundling the extensions into the application codebase, this wouldn’t be possible, as it would mean that every different instance of the application would have different extensions (and thus interfaces) at it’s disposal.

By having the interfaces in the app, we ran into another problem around custom interfaces. By having the interfaces included in the application in build-time, and the fact that the application is now a self-contained SPA, it would mean that the user has to re-build the whole application each time he/her wants to add a new extension. It would also make over-the-air installations of new extensions impossible.

To solve this problem, we decided to move the extensions into the API and have them served from there when they're needed in the application. To prevent confusion (and to prevent to have to build two different loaders), we decided to have the core extensions served from the API as well.

All extensions are at a base level “just” Vue single file component(s) with a JSON file added so the application has some metadata about the extension. You can see this setup reflected in the core extensions that are hosted in the directus/extensions repo.

Extension types (interfaces, pages, listings, and maybe more in the future) are based on a file naming scheme. Interfaces for example always contain a `readonly` (used to statically display data) and an `interface` component (the actual “input”).

Extensions are being served in bundled form from the API. In order for the API to serve them correctly, they have to be in the `/public/extensions` folder. This folder is split up into `core` and `custom` which both have the same nested file structure. For example, the full path of the `datetime` core interface would be `/public/extensions/core/interfaces/datetime/Interface.js`.

The application is build and bundled completely separate from the extensions and the extensions have their own build-chain setup which is currently setup in the `build` folder in the directus/extensions repo. I plan on releasing this (little) build chain (including the Vue mixins for extensions) as a separate CLI tool later on, but that has to wait until after the main application is finished and released.

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
