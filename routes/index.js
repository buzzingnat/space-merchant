const path = require("path");
const router = require("express").Router();
const models = require('../models/index');

// API Routes
router.route("/users")
    .get(function (req, res) {
    	// get all users
    	res.json([]);
    })
    .post(function (req, res) {
		models.User.create({
		    email: req.body.email
		}).then(function(user) {
		    res.json(user);
		});
    });

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;


