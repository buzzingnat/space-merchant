require('dotenv').config({
  silent: process.env.NODE_ENV === 'production'
});
const chalk = require('chalk');

// load dependencies
const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const cookieParser = require('cookie-parser');
const session = require('express-session');

console.log('Requiring routes...');
const routes = require("./routes");
console.log('Routes are now required.');

// initalize sequelize with session store
const SequelizeStore = require('connect-sequelize')(session),
    modelName = 'Session',
    options = {
        // our options if any. see above for example.
    };

// create database, ensure 'postgres' in your package.json
const db = require('./db/models');

// configure express
const app = express();
const server = require('http').Server(app);
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3001;
app.use(cookieParser());
/*app.use(session({
  secret: process.env.COOKIE_SECRET,
  // link to database here
  store: new SequelizeStore(db, options, modelName),
  proxy: true // if you do SSL outside of node.
})); */

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Connect to the Postgres DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/" + process.env.LOCAL_MONGO_DB, {useMongoClient: true})
//   .then(() => console.log(`${chalk.underline.yellow(`Mongoose`)}: Connected to MongoDB server.`))
//   .catch(err => {
//     console.error(`${chalk.underline.yellow(`Mongoose`)}: Connection error: ${err}`);
//     process.exit(1);
//   });

// TODO: REMOVE {force: true} ON DEPLOYMENT!!!!!
if (process.env.NODE_ENV === 'development') {
  db.sequelize.sync({force: false}).then(function() {
    apiServerStart();
  });
} else {
  db.sequelize.sync().then(function() {
    apiServerStart();
  });
}

// Start the API server
const apiServerStart = () => {
  server.listen(PORT, HOST, function() {
    console.log(`${chalk.underline.yellow(`express`)}: 🌎  ==> API Server now listening at ${HOST}:${PORT}`);
  });
}
