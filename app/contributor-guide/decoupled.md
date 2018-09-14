# Decoupled

The API and the application are two separate entities, and both have their own repo. This means that the application can connect to any API. This also means that you will have to install two separate projects in order to work on the full Directus project.

## Extensions

Extensions, like _listings_, _interfaces_, and _pages_, are being served from the API. This means that multiple instances of the application have access to the extensions that are installed on a single API. In order to work on extensions for use in the application, you actually have to have a local instance of the API running.
