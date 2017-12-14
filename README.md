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

## Notes about project intialization:
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
