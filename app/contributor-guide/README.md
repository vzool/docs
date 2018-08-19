# App Contributor Guide

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

This will fire up a local static file server that allows you to check the production build of the app locally.

::: tip
For more information on installing the app or api, checkout our document about [installing the platform](./install-dev.md).
:::

## Design Styleguide

A lot of thought has gone into the Directus brand and UX. It is therefore extremely important to maintain consistency across the Application and all extensions. We've written [a comprehensive styleguide](./styleguide.md) you can follow when you're creating new user interface elements. Whenever possible, this guide should be followed to the letter. If any questions arise please feel free to reach out to Ben Haynes on [Directus Slack](https://slack.getdirectus.com) (@Ben), the Project Lead and head designer.

## Code Styleguide

Just like the UI design, we like to keep the codestyle as consistent as possible. In order to make sure the code is following the specs, you can use our linter setup to check your code:

```bash
npm run lint
```

We've also included a `fix` command you can use to automatically fix any codestyle issues:

```bash
npm run fix
```

Please make sure to run both the linter and the fix command before pushing changes or opening a pull request.

## Submitting Pull Requests

We like to keep a tight flow in working with GitHub, to make sure we have a clear history and accountability of what happened / changed when and where. Working with Git, and especially the GitHub specific features like forking and creating pull requests, can be quite daunting for new users. 

To help you out in your Git(Hub) adventures, we've put together [the flow of contributing to an open source repo](./github.md).

## Need Help?

If you run into anything or need pointers on how to continue, please feel free to reach out [on Slack](https://slack.getdirectus.com)!

## Page Index

* [Edit Form Grid](./edit-form-grid.md)
* [Error Handling](./error-handling.md)
* [Events](./events.md)
* [GitHub](./github.md)
* [Globals](./globals.md)
* [Helpers](./helpers.md)
* [Internationalization](./i18n.md)
* [Icons](./icons.md)
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
