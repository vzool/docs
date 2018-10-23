# Updating the API

## Versionless

With a versionless API, nothing is ever removed or changed—only added. This means that you never have to worry about breaking your integrations when upgrading to the latest version. We've thoroughly vetted every endpoint and parameter in our new decoupled API to ensure there is no need for deprecations in the foreseeable future. You'll also notice that our API URLs don't include a version number, but you can still reference the technical API version in code to know which new features are available.

## Using Git

If you're using a direct clone of the `build` branch, all you need to do to update the API is run

```bash
$ git pull
```

## Manually

Updating is basically the same as installing fresh. You can download a copy of the latest version from [the releases page](https://github.com/directus/api/releases) and overwrite the files you had before. **Make sure not to override any uploads within `/public/uploads/`, logs within `/logs`, or config files within `/config/*.php`**.

## Upgrade Database

After you update the Directus API code, there may be changes in the database, such as a new field, a field with a different interface or new options.

You can upgrade the database using the [terminal](../contributor/cli.md) or the [endpoint](../reference.md#update)