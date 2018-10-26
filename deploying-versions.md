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
