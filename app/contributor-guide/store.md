# Store

Directus heavily uses [Vuex](https://vuex.vuejs.org/guide/) for global application state management. You can inspect the Vuex Store using the [Vue DevTools](https://github.com/vuejs/vue-devtools).

Please refer to the official [Vuex documentation](https://vuex.vuejs.org/guide/) for more information on how to use the store.

## About mutation types

We chose to put all the different mutation types as constants in `/store/mutation-types.js`. That way, we have a single source of all the available mutations that can happen in the store. If you're adding new mutations, please put your mutation type definition in that file.

If you're wondering why there's emoji's in the mutation types: it's just to make the devtools [a little more friendly](https://medium.com/@rijk/make-your-vuex-mutation-names-friendly-7e4b53597cd0) ☺️

![Store Mutations](./img/store/emoji.png)

