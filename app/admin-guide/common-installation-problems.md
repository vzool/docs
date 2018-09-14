# Common Installation Problems

**The app shows an error saying that there aren't any system extensions installed**  
This is shown when the API you're trying to connect to doesn't have any extensions installed. This often occurs when you've installed the API from source, but forgot to build the extensions. You can fix this by going in the `extensions` folder in your `api` directory and running `npm install && npm run build`

**When I refresh, I get a 404**  
The application is a single-page webapp, meaning that all routing is done client side. By default, the app tries using pretty URLs for it's pages. If your webserver doesn't route all requests to `/index.html` correctly, there's no page to return and you'll end up with a 404. To fix this, you can either update your servers routing setup _or_ switch the app's [`routerMode` to `hash`](./config-file.md).