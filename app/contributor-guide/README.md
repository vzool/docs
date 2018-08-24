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

## Authentication

> When demoing `SDK.whatever()` method, that's either fired through `this.$api` or on the `api` object directly after it being imported.

### Token

The Directus API returns a [JWT token](https://jwt.io/) on successful login. This token will always expire in 5 minutes.

### SDK Login / Logout

The application forwards the credentials to the SDK, which will make the request for the token and start an internal interval.

**The SDK keeps the user logged in forever**. To logout of the application, the `logout` method has to be fired on the SDK. This will delete the token locally and cancel the refresh interval. Checkout the [SDK implementation](https://github.com/directus/directus-sdk-javascript/blob/3.0.0/remote.js) for the actual inner working of this.

### Application Auth Flow

The SDK uses [Emittery](https://github.com/sindresorhus/emittery) under the hood. The SDK is "connected" to the store via these events. For example: `login:success` will `commit` a login mutation to the store, setting the `loggedIn` flag in the store to true. Likewise, `login:failed` / `logout` will set this flag to false. The store is only used to reflect the current loggedin state of the SDK. The application has no further involvement in keeping the user logged in.

#### Logging In

- User enters credentials
- Application fires `SDK.login()` with the credentials
- SDK reports logged in => store.state.auth.loggedIn = true.
- SDK reports logged in failed => store.state.auth.loggedIn = false && store.state.auth.error = error.

The `SDK.login()` method returns a promise. The promise will resolve on a successful login. Therefore, the application can navigate away from the login page on a resolve of this promise.

#### Logging Out

- Application fires `SDK.logout()`
- SDK logs out the user
- SDK reports logged out => store.state.auth.loggedIn = false.

### Persisted Sessions

Keeps the access token in the SDK and the application store in sync. The token in the store gets saved and retrieved to/from localstorage so the user isn't logged out on refresh.

If the user re-opens the page when there is an invalid token in the store, the SDKs loggedIn flag will be false and the application will logout immediately.

## Component Naming

Please give the outer most class of your Vue single file components a class name that matches the name of the component. This makes it both easy to style, easy to find in the devtools, and easy to override in custom styling.

## Global Events

Directus uses a global event system internally for things like handling errors gracefully or showing notifications to the user.

The event bus can be used by either importing the `/src/events.js` file:

```js
import events from "/src/events.js";

events.emit('some-event');
events.on('some-event');
```

or by using the Vue prototype reference of the event emitter:

```js
export default {
  created() {
    this.$events.emit('created', { message: 'Here I am!' });
  }
}
```

The following events are globally in use:

### Error

#### When

Something went wrong somewhere in the system

#### What

The global parent app will console.error the error and optionally show a notification to the user

#### Options

| name    | type     | default                    | description                                            |
|---------|----------|----------------------------|--------------------------------------------------------|
| notify  | Boolean  | false                      | Show a notification to the user                        |
| message | [String] | $t('something_went_wrong') | Message to show in the console / notification          |
| error   | Object   | null                       | The error stacktrace or whatever error you want logged |

## State and Data Management

In general, the less data we need to manage the better. Keep it simple, stupid.

## Fetching Data

Fetching data is done through using [`directus-sdk-javascript`](https://npmjs.org/directus-sdk-javascript). The SDK is available in each Vue component through `this.$api` or can be used by importing the `/src/api.js` file.

## Best Practices

### Error Storing

Since we're relying on fetching data for everything, it's always a good idea to expect errors to happen. Therefore, when working with external data in the local state or Vuex store, use the following structure:

```javascript
data() {
  return {
    data: null,
    error: null,
    loading: false,
  };
}
```

That way, you can safely store and handle the returned error.

### Action and Mutation Naming

In the Vuex store, actions that are going to retrieve data are always called `get<data>`, f.e. `getItems` or `getUserInfo`. These actions will always fire two out of three possible mutations:

_Using `getUserInfo` action as example_:

* `USER_PENDING` — Start fetching the data
* `USER_SUCCESS` — Got the user info
* `USER_FAILED` — Fetching user error failed

### Promises
Every store action that fetches data should return a promise so the caller can know when the request is done. The promise will resolve _without_ any data, since that data will be in the store. This limitation forces the implementation to rely on the store as single source of truth. The promise will also resolve on a "failed" request, since a response with an api error is also a "successful" request response.

## Error Handling

Directus uses a global error handler to make sure errors are handled in an expectable way. Using a single error handling function also means we can tap into external logging services to keep track of what is going wrong.

The error handler function can be fired by emitting an event from anywhere in the platform as follows:

```js
this.$api.getItems()
  .catch(err => {
    this.$events.emit('error', {
      notify: 'Oops... Something wen\'t wrong... Please try again later', // show error notification to the user
      message: 'Fetching item 25 in collection projects failed during hydration', // optional message to be logged in `console.error`
      error: err, // The full error stack trace / verbose debug info
    });
  });
```

## Global Settings

The global settings page works a bit... differently. The problem we have with (global) settings is the fact that there can be a potentially infinite number of fields (1 per setting) with only one row per setting (there can only be one value per field).

This means we either have to:
- Create a table with a very large number of columns and enforce the fact that there is only one row, or:
- Create a table where the rows are treaded _as if they were columns_, where the columns are treated as key-value:

### First option:

| id | cms_user_auto_sign_out | project_name | project_url          | rows_per_page | thumbnail_quality |
|----|------------------------|--------------|----------------------|---------------|-------------------|
| 1  | 60                     | Directus 7   | demo.getdirectus.com | 200           | low               |

### Second option:

| id | key                    | value                |
|----|------------------------|----------------------|
| 1  | cms_user_auto_sign_out | 60                   |
| 2  | project_name           | Directus 7           |
| 3  | project_url            | demo.getdirectus.com |
| 4  | rows_per_page          | 200                  |
| 5  | thumbnail_quality      | low                  |

We felt the second is cleaner and is easier to update / extent with new options, seeing we wouldn't have to update the database schema.

However, this structure introduces the problem where the edit view that is being used to edit the values of a single row now expects the wrong data. Instead of dealing with individual rows, the page should deal with the whole table at once. This is the main reason behind the big differences between the "regular" edit view (/routes/Edit.vue) and the global settings view (/routes/SettingsGlobal.vue). The global settings view "mangles" the settings table to work with the EditForm component (/containers/EditForm.vue).

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
