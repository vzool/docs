# Store

Directus heavily uses [Vuex](https://vuex.vuejs.org/guide/) for global application state management. You can inspect the Vuex Store using the [Vue DevTools](https://github.com/vuejs/vue-devtools).

Please refer to the official [Vuex documentation](https://vuex.vuejs.org/guide/) for more information on how to use the store.

## About mutation types

We chose to put all the different mutation types as constants in `/store/mutation-types.js`. That way, we have a single source of all the available mutations that can happen in the store. If you're adding new mutations, please put your mutation type definition in that file.

If you're wondering why there's emoji's in the mutation types: it's just to make the devtools [a little more friendly](https://medium.com/@rijk/make-your-vuex-mutation-names-friendly-7e4b53597cd0) ☺️

![Store Mutations](./img/store/emoji.png)


## Action and Mutation Naming

In the Vuex store, actions that are going to retrieve data are always called `get<data>`, f.e. `getItems` or `getUserInfo`. These actions will always fire two out of three possible mutations:

_Using `getUserInfo` action as example_:

* `USER_PENDING` — Start fetching the data
* `USER_SUCCESS` — Got the user info
* `USER_FAILED` — Fetching user error failed


## Promises
Every store action that fetches data should return a promise so the caller can know when the request is done. The promise will resolve _without_ any data, since that data will be in the store. This limitation forces the implementation to rely on the store as single source of truth. The promise will also resolve on a "failed" request, since a response with an api error is also a "successful" request response.
