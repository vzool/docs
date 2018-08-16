# Globals

Extensions are separate Vue components that are served from outside of the app. In order to allow these extensions to provide the best user experiences, we have been very liberal with adding useful things to the global Vue instance. We've also added a bunch of useful CSS Custom Properties (Variables) and classes.

## Styling

### Variables

#### Colors

Directus has the full Material Color palette included by default. Every color in that palette (as listed on [https://www.materialui.co/colors](https://www.materialui.co/colors)) can be used:

```css
p {
  color: var(--red);
}

small {
  color: var(--blue-gray-50);
}

h1 {
  color: var(--amber-500);
}
```

Next to the full color palette, there are a few "special" color names that you can use:

```
accent   // User configurable accent color. Used in f.e. logo BG and decorative items
action   // Action color. Used in buttons.
success  // Something succeeded or is good
warning  // Something needs the users attention before succeeding
danger   // Something failed

// Primarily used in hover states
accent-dark
action-dark
success-dark
warning-dark
danger-dark

// 50 shades of gray
black
darkest-gray
darker-gray
dark-gray
gray
light-gray
lighter-gray
lightest-gray
white
```

All these colors are variables and can be overwritten by the developer who set up the Directus instance. To ensure consistency in the platform, we require you to use one of the available color variables for every color in use in the platform. 

#### Shadows

We have two shadow styles that are used in the platform: one 'regular' and one for when something needs to pop out more.

```css
.card {
  box-shadow: var(--box-shadow);
}

.card:hover {
  box-shadow: var(--box-shadow-accent);
}
```

#### Transitions

**Speeds**:

```
fast
medium
slow
```

**Transition easing curves**

```
transition     // regular; hovers
transition-in  // something enters the view
transition-out // something leaves the view
```

Use slower speeds for larger UI elements.

#### Page Chrome

The sizes of the main Directus chrome pieces have their own variables in case you want to make something the same size as the main Directus chrome (f.e. a subheader or a secondary nav sidebar).

```
header-height
nav-sidebar-width
info-sidebar-width

page-padding

// In case you need more breathing room at the bottom
page-padding-bottom
```

### Classes

Nearly everything in these global classes is being controlled by CSS Custom Properties. This means that the platform is themeable. By relying on these classes (and variables), you make sure that your component, work, or code will fit nicely in the platform, no matter how the css has been altered.

#### Font Styles

By using the following classes

* `style-0` (display / title)
* `style-1` 
* `style-2`
* `style-3` (labels / section titles)
* `style-4` (small print, descriptions)
* `style-btn` (button text style)

#### (Input) Widths

By default, these widths range from 100px to 800px. These widhts are especially important when creating interfaces, as it makes sure that all interfaces align nicely on the edit forms.

* `x-small`
* `small`
* `normal`
* `large`
* `x-large`

#### Text Ellipsis

When working with user values, you'll often need to cut off and add ellipsis to text. To make this a little bit easier, you can add the `no-wrap` class. This stops text from wrapping and adds ellipsis where the text gets cut of. This is especially useful in the readonly component of interfaces, seeing those are being used on listing pages where space is often tight.

## Plugins

### Lodash

Lodash is available in every Vue component. It's accessible under the `$lodash` property:

```js
{
  computed: {
    fields() {
      return this.$lodash.keyBy(this.fields, "field");
    }
  }
}
```

### Directus SDK

Accessing the API is done through the Directus JavaScript SDK. The whole SDK is available in the `$api` property:

```js
{
  created() {
    this.$api.getItems("projects")
      .then(res => res.data)
      .then(fields => {
        this.fields = fields;
        this.loading = false;
      });
  }
}
```

::: tip
For more info on using the SDK, checkout [Working with the API](#) 
:::

### Notifications

You can use [Notyf](https://github.com/caroso1222/notyf) To show notifications / alerts on screen. Notyf is available in the `$notify` key: 

```js
{
  methods: {
    save() {
      // ...

      this.$notify.confirm("Saved succesfully!");
    }
  }
}
```
