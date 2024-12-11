## Here some brief information about case

Within the folder structure you will ses "src" folder. Inside of this src folder, you can find all the related files written by me to complete the case. You can also find unit tests under test folder.

* PS: For the other folders like dev, docs, docs-src they came with the template and i neither change anything nor delete them.

I also changed the "serve" command inside package.json to look up index.html file always to prevent page loss during refresh since we do not have Nginx to configure this.

Please also note that, every running mode like prod and development is tested before pushing to main branc and code freezed.


## Before running in any mode
````bash
npm run install
````


## Running in Development Mode

````bash
npm run serve
````

## Running in Production Mode and serve the application.

````bash
npm run serve:prod
````


## Running tests

````bash
npm run test
````