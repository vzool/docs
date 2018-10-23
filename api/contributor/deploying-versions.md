# Deploying Versions

1. Clone repo fresh (or remove any previous configs from an existing copy)
2. Update the version number in `package.json` and `src/core/Directus/Application/Application.php` (`DIRECTUS_VERSION` constant)
3. Install vendor dependencies using optimization flag
  * `composer install -a`
4. Install and build extensions
  * `cd extensions && npm install && npm run build`
5. Remove everything that's not needed in production. Things that need to stay:
  * `bin`
  * `docker`
  * `config`
  * `logs `
  * `migrations`
  * `public`
  * `src`
  * `vendor`
  * `README.md`
  * `LICENSE`
6. Clone the build branch of the API
  `$ git clone -b build git@github.com:directus/api.git build`
7. Remove everything (except the `.git` folder) from the build directory
8. Copy everything (except the `.git` folder) from the main api directory into the build directory
9. Commit the new release on the `build` folder
10. Push the changes on the build folder to the build branch
	`$ git push git@github.com:directus/api.git build:build
11. Delete both directories