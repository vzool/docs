# Troubleshooting

## Buildchain issues

If for some reason the buildchain is acting up, or you're not seeing the changes you've made reflected in the browser, please try the following things:

**Restart the buildchain**  
If you're running the application in development mode (by running `npm run dev`), stop the buildchain by pressing Ctrl+C and re-start it by running `npm run dev` again.

**Delete the caches**  
The buildchain caches the changes in the `node_modules/.cache` folder. Stop the buildchain by pressing Ctrl+C, delete that folder and restart the buildchain.

**Delete and re-install node_modules**  
This will both delete the cache and makes sure you're using the latest versions of the dependencies that Directus uses.

**Re-clone the project**  
If all else fails, a full reinstall of everything has to work. If it doesn't work after a reinstall, something else in the code is broken.

## Posting issues

When you're suspecting that you've run into a bug in the platform itself, please let us know on GitHub! The more info we got the better. 
