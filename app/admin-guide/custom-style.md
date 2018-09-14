# Custom Styles

The Directus Application includes a (empty) /style.css file you can use to override any part of the application with your own custom styles.

Nearly every component in the platform has a class associated with it you can use to tweak the styles. If you have a style tweak that would benefit all users of Directus, please consider opening a [Pull Request](./github.md) for it!

Most styling related properties in the application are using CSS Custom Properties (variables). These variables can be overwritten in your custom styles file to change the appearance of the whole app. All variables that can be overwritten can be seen in the [global styles file](https://github.com/directus/app/blob/master/src/assets/global.scss).

::: warning
The styles of the actual components in the app are being added to the DOM dynamically. Therefore, your style file will be overwritten by the cascade. In order to prevent this, you'll have to use `!important` in your styles.
:::