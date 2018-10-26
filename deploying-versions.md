# Deploying Versions

Deploying (/building) new versions of Directus is a multifaceted process. The application and api should be treated as two separate entities, only to be bundled together for a final build.

::: warning
These steps need to be followed precisely. Any deviation will cause breaking changes.
:::

::: tip Automated
Eventually, we want to automate these steps in some sort of deploy script to make sure the build is the same each time.
:::

## Deploying the application

1. Clone the app repo

```bash
$ git clone git@github.com:directus/app.git
$ cd app
```

2. Bump the version in `package.json`
  
3. Install npm dependencies

```bash
$ npm install
```

4. Build the app

```bash
npm run build
```

5. Clone the build branch of the app

```bash
$ cd ../
$ git clone -b build git@github.com:directus/app.git app-build
```

6. Delete everything in `app-build` except the `.git` folder

7. Copy everything from `app/dist` to `app-build`

```bash
$ cp -r app/dist/. app-build  
```

8. Delete all .DS_Store files

```bash
$ cd app-build
$ find . -name '.DS_Store' -type f -delete
```

9. Add-commit-push

```bash
$ git add .
$ git commit -m "<VERSION NUMBER>"
$ git push origin build
```

10. Create release on GH

11. Delete local repos

```bash
$ cd ..
$ rm -rf app
$ rm -rf app-build
```

## Deploying the API

1. Clone the api repo

```bash
$ git clone git@github.com:directus/api.git
$ cd api
```

2. Bump the version in `package.json` and `src/core/Directus/Application/Application.php`

3. Install the composer dependencies

```bash
$ composer install -a
```

4. Install and build the system extensions

```bash
$ cd extensions
$ npm install
$ npm run build
$ cd ..
```

5. Clone the build branch of the api

```bash
$ cd ..
$ git clone -b build git@github.com:directus/api.git api-build
```

6. Delete everything in `api-build` except the `.git` folder

7. Delete all nested .git folders (prevent submodules)

```bash
$ ( find . -type d -name ".git" \
  && find . -name ".gitignore" \
  && find . -name ".gitmodules" ) | xargs rm -rf
```

8. Move these files into `api-build`:

* bin/
* config/
* docker/
* logs/
* migrations/
* public/
* src/
* vendor/
* LICENSE.md
* README.md
* docker-compose.yml

```bash
$ cd api
$ cp -r ./{bin,config,docker,logs,migrations,public,src,vendor,LICENSE.md,README.md,docker-compose.yml} ../api-build
$ cd ..
```

9. Delete all .DS_Store files

```bash
$ cd api-build
$ find . -name '.DS_Store' -type f -delete
```

10. Add-commit-push

```bash
$ git add .
$ git commit -m "<VERSION NUMBER>"
$ git push origin build
```

11. Create release on GH

12. Delete local repos

```bash
$ cd ..
$ rm -rf api
$ rm -rf api-build
```

## Deploying the combined build

