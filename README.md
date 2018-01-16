# space-merchant
A React browser game.

## The Game
You captain a space ship. Will you become rich or go bankrupt? Will you be extorted by pirates or become a force they fear? Play and find out!

## The Code
### Backend:
- Node
- Express
- PostgreSQL
- Sequelize
- Grunt
- Gulp

### Frontend:
- React
- SASS/SCSS
- PureCSS
- FontAwesome Icons

## Notes about project initialization:
1. use `create-react-app` to build root directory
2. use `$ create-react-app client` inside root directory
3. `$ yarn install && cd client && yarn install && cd ../` to get the right modules installed
4. in root directory, use command `$ yarn add -D concurrently` to enable running two processes simultaneously. We want to do this because:
> We want concurrently to execute two commands, one to boot the API server and one to boot the Webpack development server. You boot multiple commands by passing them to concurrently in quotes.
> --- ["How to get "create-react-app" to work with your API" by Anthony Accomazzo](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)
5. We are going to solve several problems at once next. First, we need to run the concurrently command while we develop. Second, we prepare to work with a database that we will want to be emptying and filling frequently during development, so we'll prepare a seed file for that with an easy command to run it with. Third, our folder structure doesn't play nice with Heroku, so in case we end up deploying our app through their infrastructure we will go ahead and set our nested `create-react-app` folders to build correctly when building on heroku. Fourth, we are going to install `nodemon` to enable autoreloading the app during development. To do all of this, in root `package.json` file replace `scripts` section with the following:
```
"scripts": {
    "build": "react-scripts build",
    "client": "npm --prefix client start",
    "dev": "concurrently \"nodemon --ignore client/ --inspect server.js\" \"npm run client\"",
    "eject": "react-scripts eject",
    "heroku-prebuild": "cd client/ && yarn install && yarn build; cd ../",
    "seed": "node scripts/seedDB.js",
    "start": "node server.js",
    "test": "react-scripts test --env=jsdom",
    "watch": "nodemon server.js"
  }
```
6. run `$ yarn add -D nodemon husky lint-staged prettier chalk && yarn add sequelize cookie-parser express-session connect-sequelize pg`

7. Use Sequelize CLI to generate the database and model structure to use later. Start with a simple User/ToDo List pair of models and a single seeded User.
    1. in command line, run `yarn add sequelize-cli` to include the sequelize CLI in the project
    2. in command line, run `node_modules/.bin/sequelize init` to add 4 folders: `config`, `models`, `migrations`, `seeders`
    3. create a `db` folder in the app root and move `models`, `migrations`, `seeders` into it.
    4. create a `.sequelizerc` file in the app root. Copy and paste the following into it:
    ```
    const path = require('path');

    module.exports = {
      'config': path.resolve('./config', 'config.js'),
      'models-path': path.resolve('./db', 'models'),
      'seeders-path': path.resolve('./db', 'seeders'),
      'migrations-path': path.resolve('./db', 'migrations')
    }
    ```
    5. Modify the `config/config.js` file to use the correct database names, usernames, and passwords using ENV variables since it is a .js file and no longer unable to read the ENV. Copy this and edit it as appropriate:
    ```
    require('dotenv').config({
        silent: process.env.NODE_ENV === 'production'
    });
    const fs = require('fs');

    module.exports = {
        development: {
            username: process.env.DB_DEV_USERNAME,
            password: process.env.DB_DEV_PASSWORD,
            database: process.env.DB_DEV_NAME,
            host: '127.0.0.1',
            dialect: 'postgres'
        },
        test: {
            username: process.env.DB_TEST_USERNAME,
            password: process.env.DB_TEST_PASSWORD,
            database: process.env.DB_TEST_NAME,
            host: '127.0.0.1',
            dialect: 'postgres'
        },
        production: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOSTNAME,
            dialect: 'postgres'
        }
    };
    ```
    6. make a new database as defined in the config file using `$ node_modules/.bin/sequelize db:create`
    7. make a User model and a migrations file using the following command:
    `$ node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string`
    8. Generate a seed file: `$ node_modules/.bin/sequelize seed:generate --name demo-user`. Replace the contents of the newly created file in `seeders/new-file-here` with the following:
    ```
    'use strict';

    module.exports = {
        up: (queryInterface, Sequelize) => {
            return queryInterface.bulkInsert('Users', [{
                firstName: 'John',
                lastName: 'Doe',
                email: 'demo@demo.com',
                createdAt : new Date(),
                updatedAt : new Date(),
            }], {});
        },

        down: (queryInterface, Sequelize) => {
            return queryInterface.bulkDelete('Users', null, {});
        }
    };
    ```
    9. Run the seed to create entries in the `User` table with this command: `$ node_modules/.bin/sequelize db:seed:all`
