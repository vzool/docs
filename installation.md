# Installing the Directus Suite

The easiest way to get up-and-running with Directus is with our [combined release](https://github.com/directus/directus), which includes the [Directus API](https://github.com/directus/api), the [Directus Application](https://github.com/directus/app), and all required dependencies. There are three ways to install the combined release:

## Using Git

The preferred method of installing is through Git by running the following command from your server's command line.

```bash
git clone https://github.com/directus/directus.git
```

:::tip
Don't have git? You can [install it with one command](https://git-scm.com/book/en/v1/Getting-Started-Installing-Git).
:::

## Manually

If you don't have access to the command line or would rather do things manually, you can download the static bundle manually as a [zip](https://github.com/directus/directus/archive/master.zip) or [tar](https://github.com/directus/directus/archive/master.tar.gz) file from [our releases page](https://github.com/directus/directus/releases).

:::tip
If your server doesn't have `gzip` then you can usually install it by running `sudo apt-get install zip`.
:::

### Zip File

```bash
# Get the zip file from GitHub
wget https://github.com/directus/directus/archive/master.zip

# Decompress the file
unzip master.zip
```

### Tar File

```bash
# Get the zip file from GitHub
wget https://github.com/directus/directus/archive/master.tar.gz

# Decompress the file
tar -xzf master.tar.gz
```

### Using FTP

If you don't have access to the command line then you'll need to decompress the files on your local computer before uploading to the remote server, though this will take _much_ longer.

## Using Docker

@TODO

Our [Docker image](https://github.com/directus/directus-docker) goes a few steps further by including the database and server setup. It's the most fool-proof way to install Directus.

Download a copy of the latest release from the [Releases Page](https://github.com/directus/directus/releases), `cd` into the directory and run

```bash
$ docker build . -t directus
```

Once the image has been built, you can run it with

```bash
$ docker run -it -d -e API_URL=<url> -p <port>:80 <name>
```

Replace `<url>` with the API URL you'd like to connect to, `<port>` with the port you want the application to be exposed on, and `<name>` with a name of your choosing which Docker will use internally.

---

## Other Options

### Install Individually

If you prefer, you can choose to only [install the Directus API](./app/admin-guide/install.md), or only [install the Directus App](./api/admin-guide/install.md). This is useful for multitenancy, such as when you need many instances of the API but only one App to manage them all.

### Install from Source

If you would like to extend or make contributions to the core codebase then you can [install the Directus API Source](./api/contributor-guide/install-dev.md), or [install the Directus App Source](./app/contributor-guide/install-dev.md). This process involves more steps, so we recommend using the combined build for normal usage.