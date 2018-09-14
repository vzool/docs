# Installation

## Using Git

The easiest way of installing and updating the app is through using Git. By using the build branch on our repo, you're assured to have the latest version pre-bundled and ready to go.

To install the pre-bundled build version through Git, run 

```bash
$ git clone -b build https://github.com/directus/app.git directus
```

After the files are downloaded, you need to create a config file. This file controls what API instances the app tries to connect to. The easiest way to create this file is by renaming or duplicating the `config_example.js` file to `config.js` and adjusting the default settings within.

## Using Docker

@TODO

## Manually

If you don't have access to the command line in your server, you can download the static bundle manually as a zip. Head over to [the releases page](https://github.com/directus/app/releases) and download a fresh copy of the latest version. 

::: tip
For instructions on how to setup a local development copy, checkout our [dev install guide](https://docs.directus.io/app/contributor-guide/install-dev.html#decoupled)
:::
