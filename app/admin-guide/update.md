# Updating the Directus Application

## Using Git

If you're using a direct clone of the `build` branch, all you need to do to update the application is run 

```bash
$ git pull
```

## Manually

Updating is basically the same as installing fresh. You can download a copy of the latest version from [the releases page](https://github.com/directus/app/releases) and overwrite the files you had before. **Make sure not to override your `config.js` file**.

## Using Docker

Updating the application is the same as in the manual way. Download a fresh copy of the application from the [releases page](https://github.com/directus/app/releases) and overwrite all the files in use. Remember to restart your Docker process.