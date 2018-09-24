# Install the Source Version

If you want to install Directus from source or want the latest development version, you'll need to clone the Directus API repository from `https://github.com/directus/api`.

## Additional Requirements

* **[Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)** to fetch the source code from GitHub
* **[Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)** to install dependencies

Once you have `git` and `composer` you are ready to clone the repo and install the dependencies:

```
# Get the source code
$ git clone https://github.com/directus/api.git
# Go to the api directory
$ cd api
# Install the dependencies using composer
$ composer install
```

_You can also manually download the [latest release](https://github.com/directus/api/releases) from GitHub, upload it to your server, install dependencies using `composer install`, and continue with the steps below._