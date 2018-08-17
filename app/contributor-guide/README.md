# Contributor Guide

Thanks for taking the interest in helping out to make Directus a better platform! This doc will tell you everything you need to help work on the platform.

## Installation

In order to work on the platform, it's recommended to install the application and API locally. Seeing that both have some sort of buildchain involved, you need to run it when you make changes in order to see the changes you've made.

::: tip
Seeing this is the contributor guide for the application, we'll focus on installing the app only.
:::

::: tip
You can use our demo API (https://next.demo-api.directus.app) to debug the application. If you'd like to run the API locally as well, checkout the [local install guide](#) for the API.
:::

### Requirements

In order to build and run the dev server for the app, you'll need [Node.js](http://nodejs.org/) LTS or higher.

### Steps

Clone the latest version of the app on GitHub:

```bash
git clone https://github.com/directus/app.git
```

Install the npm dependencies

```bash
cd app
npm install
```

Run the development server

```bash
npm run dev
```

This will fire up the build process and launch a local development server. By default this will make the app available at [http://localhost:8080](http://localhost:8080). If that port is already taken by something else, check the terminal window for the updated port.

The development server will also watch for changes and auto-reload the application accordingly.

### Testing production build

In order to double check if everything works as expected, you can build the app in production mode by running

```bash
npm run build
```

This will build everthing into the `dist` folder. This folder can then be hosted on any static server. In order to check this folder, you'll need some sort of static file server. We recommend using [`http-server`](https://www.npmjs.com/package/http-server):

```bash
http-server dist
```

## Troubleshooting

## Design Styleguide

## Code Styleguide

## Submitting Pull Requests

## Need Help?

## Page Index

* [Edit Form Grid](./edit-form-grid.md)
* [Error Handling](./error-handling.md)
* [Events](./events.md)
* [GitHub](./github.md)
* [Globals](./globals.md)
* [Helpers](./helpers.md)
* [Internationalization](./i18n.md)
* [Install Dev Env](./install-dev.md)
* [Modals](./modals.md)
* [Notifications](./notifications.md)
* [Running Rabbit (loading indicator)](./running-rabbit.md)
* [Using the API (SDK)](./sdk-api.md)
* [Shortcuts](./shortcuts.md)
* [Store](./store.md)
* [Styleguide](./styleguide.md)
* [Tooltips](./tooltips.md)
* [Troubleshooting](./troubleshooting.md)
