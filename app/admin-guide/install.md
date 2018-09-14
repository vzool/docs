# Installing the Directus Application

The Directus application is a static single-page webapp (SPA) and can be installed in three ways:

### Using Git

The easiest way of installing and updating the app is through using Git. By using the build branch on our repo, you're assured to have the latest version pre-bundled and ready to go.

To install the pre-bundled build version through Git, run 

```bash
$ git clone -b build https://github.com/directus/app.git directus
``` 
    
### Manually

If you don't have access to the command line in your server, you can download the static bundle manually as a zip. Head over to [the releases page](https://github.com/directus/app/releases) and download a fresh copy of the latest version. 

::: tip
For instructions on how to setup a local development copy, checkout our [dev install guide](https://docs.directus.io/app/contributor-guide/install-dev.html#decoupled)
:::

### Using Docker

Seeing the Directus Application is a SPA, running it in Docker is a breeze. The application comes with it's own Dockerfile, which you can use to to run the application.

Download a copy of the latest release from the [Releases Page](https://github.com/directus/app/releases), `cd` into the directory and run

```bash
$ docker build . -t directus
```

After the image has been build, you can run it by running

```bash
$ docker run -it -d -e API_URL=<url> -p <port>:80 <name>
```

Replace `<url>` with the API URL you'd like to connect to, `<port>` with the port you want the application to be exposed on, and `<name>` with a name of your choosing which Docker will use internally.

## Post-Installation

After you've installed the application, you need to create a config file. This file controls what API instances the app tries to connect to. The easiest way to create this file is by renaming or duplicating the `config_example.js` file to `config.js` and adjusting the default settings within.