# USAGE GUIDE

1. Add the url to the 'config.js' file - e.g `https://rattata.pub.shipit-climbcredit.com`
2. Install nodemon globally `npm i nodemon -g`
3. run `npm i`
4. type `npm run start` in the local folder

### CORS ERRORS

- If you're still having cors errors, try adjusting the origin in the config file to `{ origin: "*" }`
- But be weary, since the server is **NOT** HTTPS I would advise against using wildcard (i.e `"*"`) on public networks
