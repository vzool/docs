# Installing the Build Version

## Using Git

The preferred way to install Directus is by cloning it directly from the repo. This will make upgrading things in the future far easier. From your terminal, navigate to the directory where you'd like to install Directus and use this command:

```
git clone -b build https://github.com/directus/directus.git
```

## Using FTP

If you don't have access to the command line or would rather upload files directly to your server, follow these steps:

1. Download the [latest build](https://github.com/directus/api/archive/build.zip) from GitHub
2. Upload it to your server via FTP/SFTP
3. Continue with the normal installation process

::: warning
Uploads may take a while since this version includes all neccesary dependencies.
:::