# Interfaces

## Introduction

Interfaces are Directus' way of interacting with user data. An interface contains two parts: the actual Interface and a Readonly component. The Interface is the _thing_ the user uses to interact with and create data. Eg: a text-field, color picker, JSON editor, or WYSIWYG. These interfaces are primarily used on the edit page, but can also be used inside the filter, modals, or anywhere else.

## Files & Structure

An interface is made up out of three core files:

### input.vue

The main file is the input itself. This file contains the code that renders the interface and emits the value of the interface on change / input.

### display.vue

Certain interfaces need to display data differently elsewhere in the system: the interface saves a raw value, but the user wants to see the data in a more appropriate way elsewhere in the system. A good example of this is the Color Picker. The Color Picker interfaces saves the value as a HEX value, but the user wants to see a color swatch preview when looking at the data.

These display components are used in the system in places where the regular readonly state of the interface doesn't fit, or doesn't make sense. Examples of these are inline in the tabular listing view or in the title of a card.

### meta.json

The meta.json file contains information over the interface (like unique name, author, version) and it's options.

::: tip
To hide the label on the edit form, add `"hideLabel": true` to `meta.json`

## Boilerplate

The minimum files required for each interface are the aforementioned input.vue, display.vue, and meta.json files.

Both the interface and and readonly components are both a standard vue single file component:

```vue
<template>
  <input :value="value" @input="$emit('input')" />
</template>

<script>
import { interfaceMixin } from "@directus/vue-mixins";

export default {
  mixins: [interfaceMixin],
  name: "interface-example"
}
</script>

<style lang="scss" scoped>
input {
  border-radius: var(--border-radius);
}
</style>
```

The meta.json file requires at the least a name and a version:

```json
{
  "name": "interface-example",
  "version": "1.0.0"
}
```

## States
Every interface should support a `readonly` and a `disabled` state.

## Mixin (props)
We've prepared a [mixin](https://github.com/directus/extensions/blob/master/mixins/interface.js) that adds all the props to the component that the application passes to the interface. These include value, collection, relationship, and a bunch of others. A minimal interface mostly uses `value` and `options`.

## Testing

The alpha version of the directus app contains an interface debugger which you can use to test all the different properties and options of your interface. Head over to `/interfaces` in the app to see a list of all the available interfaces in the API you're connected to.

## Styling

Directus uses CSS Custom Properties across the application to enable theming and style consistencies. Check the [`global.scss`](https://github.com/directus/app/blob/master/src/assets/global.scss) file in the app for the full list of available variables.

### Colors

The full material design color palette is for use in custom properties, eg: `var(--red-50)` or `var(--deep-purple-500)`. However, we recommend sticking to the following color names, seeing these are the ones that will be overridden for theming:

```
var(--lightest-gray);
var(--lighter-gray);
var(--light-gray);
var(--gray);
var(--dark-gray);
var(--darker-gray);
var(--darkest-gray);

var(--accent);  // user configurable accent color
var(--action);  // color of action buttons, defaults to light-blue
var(--success); // something went well, green
var(--warning); // user's attention is needed before proceeding, yellow
var(--danger);  // something failed or the action has irreversible side effects; red
```
