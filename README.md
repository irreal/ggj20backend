# ggj20backend
The nodejs express backend for our gamejam project

This project works together with a Unity engine 3D game and the frontend game in phaser found here: https://github.com/irreal/ggj20phaser

Setup:
run `npm install` to get needed packages
run `npm run dev` to boot up a development version which will auto-reload the service once the source code is changed.

Once you are done with your changes, bump the version of the service in package.json manually or by running `npm version minor`, then push to github.

Azure will automatically sync to the latest version and it will become available @ `https://ggj20.azurewebsites.net`

There are currently no automated tests, so please make sure your changes are not crashing the server before pushing.